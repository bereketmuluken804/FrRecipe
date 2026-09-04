import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import generateToken from "../../utils/generateToken.js";

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
		const newUser = User({
			name,
			email,
			passwordHash,
		});
		await newUser.save();
		const token = generateToken(newUser._id);
		res.status(201).json({
			user: {
				id: newUser._id,
				name: newUser.name,
				email: newUser.email,
				likedRecipes: newUser.likedRecipes,
				favoriteRecipes: newUser.favoriteRecipes,
			},
			token,
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

		const token = generateToken(user.id);
		res.status(200).json({
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				likedRecipes: user.likedRecipes,
				favoriteRecipes: user.favoriteRecipes,
			},
      token
		});
	} catch (error) {
    next(error)
  }
}
