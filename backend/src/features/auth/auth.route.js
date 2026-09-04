import { Router } from "express";
import { login, register } from "./auth.controller.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post("/auth/register", register);
authRouter.post("/auth/login", login);

authRouter.get("/health", authMiddleware ,(req, res) => {
	res.json({ ok: true });
});
export default authRouter;
