import { Request, Response } from "express";
import { createBlog, deletePost, fetchAllBlogs, fetchBlogById, fetchBlogsByCategory, fetchFeaturedBlogs, updatePost } from "../services/blog.service";
import { Blog } from "../models/blog.model";

export const createNewBlog = async (req: Request, res: Response) => {
  try {
    const blog = await createBlog(req.body);
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await fetchAllBlogs();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error });
  }
}

export const getFeaturedBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await fetchFeaturedBlogs();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error });
  }
}

export const getBlogsByCategory = async (req: Request, res: Response) => {
  try {
    const category = req.params.category
    const blogs = await fetchBlogsByCategory(category);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export const getBlogDetail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const blog = await fetchBlogById(id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const message = await deletePost(id);
    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ error });
  }
}

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body
    const blog = await updatePost(id, data);
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
}

// DEV ONLY
export const bulkUploadData = async (req: Request, res: Response) => {
  try {
    const data = req.body
    const blogs = await Blog.create(data);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error });
  }
}