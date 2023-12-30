import { Router } from "express";
import { updateProfile } from "../controllers/auth.controller";

export const profileRouter = Router();

profileRouter.post('/update-profile', updateProfile);
