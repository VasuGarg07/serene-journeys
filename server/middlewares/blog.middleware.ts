import { ValidationError } from "yup";
import { blogValidationSchema } from "../utils/utilities";
import { NextFunction, Request, Response } from "express";
import { Bookmarks } from "../models/bookmark.model";

export const validateBlogData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await blogValidationSchema.validate(req.body);
    return next();
  } catch (error: any) {
    let knownError = error as ValidationError;
    return res.status(400).json({ error: knownError.errors[0] });
  }
};