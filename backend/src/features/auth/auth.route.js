import { Router } from "express";
import { login, register, verifyEmail, googleAuthHandler } from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/verify/:token", verifyEmail);
authRouter.post("/google", googleAuthHandler);

export default authRouter;
