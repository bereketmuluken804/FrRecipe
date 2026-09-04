import nodemailer from "nodemailer";
import { EMAIL_USER, EMAIL_PASS, PORT } from "./config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export default async function sendEmail(to, subject, verifylink) {
  const html = `<div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
									<h2 style="color: #1A1A1A;">Verify your email</h2>
									<p style="color: #444; line-height: 1.6;">
										Thanks for signing up to FrRecipes! Click the button below to verify your email and activate your account.
									</p>
									<a href="${verifylink}" style="display: inline-block; background: #a7ff4e; color: white; text-decoration: none; padding: 12px 24px; border-radius: 999px; font-weight: 600; margin: 16px 0;">
										Verify My Account
									</a>
									<p style="color: #888; font-size: 0.85rem; line-height: 1.5;">
										If this wasn't you, you can safely ignore this email — no account will be created without verification.
									</p>
								</div>`;

  await transporter.sendMail({
    from: EMAIL_USER,
    to,
    subject,
    html,
  });
}


