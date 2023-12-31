import { Router } from "express";
import { bookmarkBlog, bulkUploadData, createNewBlog, deleteBlog, getBlogDetail, getBlogs, getBlogsByCategory, getBookmarks, getFeaturedBlogs, updateBlog } from "../controllers/blog.controller";
import { validateBlogData } from "../middlewares/blog.middleware";

export const blogRouter = Router();

blogRouter.post('/new', validateBlogData, createNewBlog);
blogRouter.get('/list', getBlogs);
blogRouter.get('/featured', getFeaturedBlogs);
blogRouter.get('/category/:category', getBlogsByCategory);
blogRouter.get('/:id', getBlogDetail);
blogRouter.delete('/delete/:id', deleteBlog);
blogRouter.put('/update/:id', updateBlog);

// Features
blogRouter.post('/bookmark', bookmarkBlog);
blogRouter.get('/bookmarks/:id', getBookmarks);

// DEV ONLY
blogRouter.post('/bulk', bulkUploadData);
