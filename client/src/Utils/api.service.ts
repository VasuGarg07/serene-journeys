import { BlogResponse, BlogRequest, LoginRequest, UserData } from "../Utils/interfaces";
import { urls } from "../Utils/urls";
import http from "../Utils/interceptor";

// LOGIN APIS
export const signup = (userCreds: LoginRequest) => {
  return http.post(urls.signupUrl, userCreds);
};

export const signin = (userCreds: LoginRequest) => {
  return http.post(urls.loginUrl, userCreds);
};

export const verifyTokenStatus = (token: string) => {
  return http.post(urls.verifyTokenUrl, { token });
}

export const resendToken = (token: string) => {
  return http.post(urls.resendTokenUrl, { token });
}

// BLOG POST APIS
// Fetcher Function
export const fetcher = async (url: string) => {
  try {
    const response = await http.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const getAll = () => {
//   return http.get<BlogResponse[]>(urls.blogListUrl);
// }

export const getFeatured = () => {
  return http.get<BlogResponse[]>(urls.featuredListUrl);
}

export const getSingleBlog = (id: string) => {
  return http.get<BlogResponse>(`${urls.singleBlogUrl}${id}/`);
}

export const postBlog = (data: BlogRequest) => {
  return http.post(urls.newBlogUrl, data)
}

// Profile APIS
export const updateProfile = (data: UserData) => {
  return http.post(urls.updateProfileUrl, data)
}