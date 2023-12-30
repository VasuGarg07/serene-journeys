export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserData {
  _id: string,
  username: string,
  avatar: string,
}

export interface LoginResponse extends UserData {
  token: string,
}

export interface BlogForm {
  title: string;
  imageLink: string;
  description: string;
}

export interface BlogRequest extends BlogForm {
  categories?: string[],
  user: string
}

export interface BlogResponse {
  _id: string;
  title: string;
  imageLink: string;
  categories: string[],
  description: string;
  isFeaturedPost: boolean,
  timeOfPost: string;
  user: UserData
}