import { Router } from "express";
import { loginUser, registerUser, resendToken, verifyEmailToken } from "../controllers/auth.controller";

export const authRouter = Router();
authRouter.post("/verify-token", verifyEmailToken);
authRouter.post("/resend-token", resendToken);

export const loginRouter = Router();
loginRouter.post("/register", registerUser);
loginRouter.post("/login", loginUser);