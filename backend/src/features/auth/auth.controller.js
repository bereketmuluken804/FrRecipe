import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import generateToken from "../../utils/generateToken.js";
import crypto from "crypto";
import sendEmail from "../../utils/sendEmail.js";
import { BaseURL } from "../../utils/config.js";
import { verifyGoogleToken } from "../../utils/googleAuth.js";
export async function register(req, res, next) {
	if (!req.body) {
		return res.status(400).json({
			message: "Bad Request:  missing name, email and password",
		});
	}
	const { name, email, password } = req.body;

	if (!(name && email && password)) {
		return res.status(400).json({
			message: "Bad Request: missing name, email or password ",
		});
	}
	try {
		const exists = await User.findOne({ email });
		if (exists) {
			return res.status(400).json({
				message: "Bad Request: Email already registered",
			});
		}

		const passwordHash = await bcrypt.hash(password, 10);
		const now = new Date();
		const verificationExpires = new Date(
			now.getTime() + 12 * 60 * 60 * 1000,
		);
		const verificationToken = crypto.randomBytes(32).toString("base64url");
		const lastVerificationSentAt = new Date();
		const newUser = User({
			name,
			email,
			passwordHash,
			verificationToken,
			verificationExpires,
			lastVerificationSentAt,
		});

		const verifyLink = `${BaseURL}/api/auth/verify/${verificationToken}`;
		await sendEmail(email, "Email Verification", verifyLink);
		await newUser.save();
		res.status(201).json({
			message: "Registered. Check your email to verify your account.",
		});
	} catch (error) {
		next(error);
	}
}

export async function login(req, res, next) {
	if (!req.body) {
		return res.status(400).json({
			message: "Bad Request:  missing email and password",
		});
	}
	const { email, password } = req.body;

	if (!(email && password)) {
		return res.status(400).json({
			message: "Bad Request: missing email or password ",
		});
	}

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({
				message: "Unauthorized: Invalid email or password",
			});
		}

		const passMatches = await bcrypt.compare(password, user.passwordHash);
		if (!passMatches) {
			return res.status(401).json({
				message: "Unauthorized: Invalid email or password",
			});
		}
		if (!user.isVerified) {
			return res.status(403).json({
				message: "Please verify your email before logging in",
			});
		}
		const token = generateToken(user.id);
		res.status(200).json({
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				likedRecipes: user.likedRecipes,
				favoriteRecipes: user.favoriteRecipes,
			},
			token,
		});
	} catch (error) {
		next(error);
	}
}

function htmlPage(title, message, isError = false) {
	return `
    <div style="font-family: sans-serif; max-width: 420px; margin: 80px auto; padding: 32px; text-align: center; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
      <h2 style="color: ${isError ? "#E63946" : "#00C2A8"};">${title}</h2>
      <p style="color: #444; line-height: 1.6;">${message}</p>
      <a href="http://localhost:3003/login" style="display:inline-block; margin-top:16px; color:#FF4E6A; text-decoration:none; font-weight:600;">Go to app</a>
    </div>
  `;
}

export async function verifyEmail(req, res, next) {
	const token = req.params.token;
	if (!token) {
		return res
			.status(400)
			.send(
				htmlPage(
					"Missing Token",
					"No verification token was provided.",
					true,
				),
			);
	}

	const user = await User.findOne({ verificationToken: token });
	if (!user) {
		return res
			.status(401)
			.send(
				htmlPage(
					"Invalid Link",
					"This verification link is invalid or already used.",
					true,
				),
			);
	}

	const isExpired = user.verificationExpires < new Date().getTime();
	if (isExpired) {
		if (
			user.lastVerificationSentAt &&
			Date.now() - user.lastVerificationSentAt.getTime() < 60000
		) {
			res.status(429).send(
				htmlPage(
					"please wait",
					"A new link was already sent recently -check your inbox.",
					true,
				),
			);
		}
		const newToken = crypto.randomBytes(32).toString("base64url");
		user.verificationToken = newToken;
		user.verificationExpires = new Date(Date.now() + 12 * 60 * 60 * 1000);
		user.lastVerificationSentAt = new Date();
		await user.save();
		const verifyLink = `${BaseURL}/api/auth/verify/${newToken}`;
		await sendEmail(user.email, "Verify your account", verifyLink);
		return res
			.status(401)
			.send(
				htmlPage(
					"Link Expired",
					"This verification link has expired. Please register again.",
					true,
				),
			);
	}
	user.isVerified = true;
	user.verificationExpires = undefined;
	user.verificationToken = undefined;
	await user.save();
	res.status(200).send(
		htmlPage(
			"Email Verified",
			"Your account is now verified. You can log in.",
		),
	);
}

export async function googleAuthHandler(req, res, next) {
	try {
		const { credential } = req.body;
		if (!credential) {
			return res
				.status(400)
				.json({ error: "Google ID token is required" });
		}

		const { email, name, emailVerified } =
			await verifyGoogleToken(credential);
		if (!emailVerified) {
			return res
				.status(400)
				.json({ error: "Unverified Google email address." });
		}
		let user = await User.findOne({ email });
		if (user) {
			if (user.authProvider === "local") {
				user.authProvider = "google";
				await user.save();
			}
		} else {
			user = await User.create({
				email,
				name,
				authProvider: "google",
				passwordHash: null,
			});
		}
		const token = generateToken(user.id);
		return res.status(200).json({
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				likedRecipes: user.likedRecipes,
				favoriteRecipes: user.favoriteRecipes,
			},
			token,
		});
	} catch (error) {
		next(error)
	}
}
