

import { Blog } from "../models/blog.model";
import { IBlog } from "../utils/interfaces";
import { BlogCreationFailure, PostDeleted, PostNotFound } from "../utils/strings";

export const createBlog = async ({ title, user, imageLink, description, categories, isFeaturedPost = false }: IBlog) => {

  try {
    const blog = await Blog.create({ title, user, imageLink, description, categories, isFeaturedPost });
    return blog
  } catch (error) {
    console.log(error)
    throw BlogCreationFailure
  }
}

export const fetchAllBlogs = async () => {
  try {
    const posts = await Blog.find().populate('user', 'username avatar').sort({ timeOfPost: -1 });
    return posts;
  } catch (err: any) {
    throw err.message
  }
}

export const fetchFeaturedBlogs = async () => {
  try {
    const posts = await Blog.find({ isFeaturedPost: true }).populate('user', 'username avatar').sort({ timeOfPost: -1 });
    return posts;
  } catch (err: any) {
    throw err.message
  }
};

export const fetchBlogsByCategory = async (category: string) => {
  try {
    const posts = await Blog.find({ categories: category }).populate('user', 'username avatar').sort({ timeOfPost: -1 });
    return posts;
  } catch (err: any) {
    throw err.message
  }
};

export const fetchBlogById = async (id: string) => {
  try {
    const post = await Blog.findById(id).populate('user', 'username avatar');
    if (!post) {
      throw PostNotFound
    }
    return post
  } catch (err: any) {
    throw err.message
  }
};

export const updatePost = async (id: string, data: IBlog) => {
  try {
    const updatedPost = await Blog.findByIdAndUpdate(id, data, { new: true });
    if (!updatedPost) {
      throw { code: 404, message: PostNotFound }
    }
    return updatedPost;
  } catch (err: any) {
    throw { code: 500, message: err.message }
  }
};

export const deletePost = async (id: string) => {
  try {
    const post = await Blog.findByIdAndDelete(id);
    if (!post) {
      throw { code: 404, message: PostNotFound }
    }
    return PostDeleted;
  } catch (err: any) {
    throw { code: 500, message: err.message }
  }
};