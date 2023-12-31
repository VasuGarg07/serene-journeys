import { Types } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  token?: number;
  verified: boolean;
  username: string;
  avatar: string;
}

export interface IBlog {
  user: Types.ObjectId | IUser;
  title: string;
  imageLink: string;
  categories: string[],
  description: string;
  isFeaturedPost: boolean,
  timeOfPost: Date
}

export interface IBookmark {
  user: Types.ObjectId;
  blog: Types.ObjectId;
}

// Request Interface
export interface LoginResponse {
  _id: Types.ObjectId,
  username: string,
  avatar: string,
  token: string,
}