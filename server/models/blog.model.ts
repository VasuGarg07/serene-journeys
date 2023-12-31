import mongoose, { Schema } from "mongoose";
import { IBlog } from "../utils/interfaces";

const blogSchema = new Schema<IBlog>({
  title: { type: String, required: true, trim: true },
  imageLink: { type: String, required: true, trim: true },
  categories: { type: [String], required: true },
  description: { type: String, required: true, trim: true, maxlength: 3000 },
  isFeaturedPost: { type: Boolean },
  timeOfPost: { type: Date, default: Date.now },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export const Blog = mongoose.model<IBlog>("Blog", blogSchema);