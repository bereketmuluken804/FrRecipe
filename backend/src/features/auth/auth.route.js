import { Router } from "express";
import { login, register, verifyEmail, googleAuthHandler } from "./auth.controller.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post("/auth/register", register);
authRouter.post("/auth/login", login);
authRouter.get("/auth/verify/:token", verifyEmail);
authRouter.post("/auth/google", googleAuthHandler);

authRouter.get("/health", authMiddleware ,(req, res) => {
	res.json({ ok: true });
});
export default authRouter;
