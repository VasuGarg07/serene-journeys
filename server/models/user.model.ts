import mongoose, { Schema } from "mongoose";
import { IUser } from "../utils/interfaces";

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  token: { type: Number },
  verified: { type: Boolean, default: false },
  username: { type: String, trim: true },
  avatar: { type: String }
});

export const User = mongoose.model<IUser>("User", userSchema);
