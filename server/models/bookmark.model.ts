import mongoose, { Schema } from "mongoose";
import { IBookmark } from "../utils/interfaces";

const bookmarkSchema = new Schema<IBookmark>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  }
})

export const Bookmarks = mongoose.model<IBookmark>("Bookmarks", bookmarkSchema);
export const Likes = mongoose.model<IBookmark>("Likes", bookmarkSchema);
