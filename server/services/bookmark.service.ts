import { Blog } from "../models/blog.model";
import { Bookmarks } from "../models/bookmark.model";
import { User } from "../models/user.model";
import { PostNotFound, UserNotFound } from "../utils/strings";

export const toggleBookmark = async (userId: string, blogId: string) => {

  if (!userId || !blogId) {
    throw "Insufficient Params"
  }

  if (!await User.exists({ _id: userId })) {
    throw UserNotFound;
  }

  if (!await Blog.exists({ _id: blogId })) {
    throw PostNotFound;
  }

  try {
    // Check if the bookmark exists
    const existingBookmark = await Bookmarks.findOne({ user: userId, blog: blogId });

    if (existingBookmark) {
      await Bookmarks.findByIdAndDelete(existingBookmark._id);
      return { message: "Bookmark Added" }
    } else {
      const newBookmark = await Bookmarks.create({ user: userId, blog: blogId });
      return { message: "Bookmark Removed" }
    }
  } catch (error: any) {
    throw error.message
  }
};

export const getBookmarkedBlogs = async (userId: string) => {
  try {
    // Find all bookmarks for the given user
    const bookmarks = await Bookmarks.find({ user: userId });

    // If there are bookmarks, populate the related blogs
    if (bookmarks.length > 0) {
      const blogIds = bookmarks.map(bookmark => bookmark.blog);
      const bookmarkedBlogs = await Blog.find({ _id: { $in: blogIds } });
      return bookmarkedBlogs;
    } else {
      return [];
    }
  } catch (error: any) {
    throw error.message
  }
};