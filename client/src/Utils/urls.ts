const serverUrl = `http://localhost:8080/api/v1/`;

export namespace urls {
  export const signupUrl = `${serverUrl}auth/register/`;
  export const loginUrl = `${serverUrl}auth/login/`;
  export const verifyTokenUrl = `${serverUrl}auth/verify-token/`;
  export const resendTokenUrl = `${serverUrl}auth/resend-token/`;

  export const blogListUrl = `${serverUrl}blog/list/`;
  export const featuredListUrl = `${serverUrl}blog/featured/`;
  export const singleBlogUrl = `${serverUrl}blog/`;
  export const newBlogUrl = `${serverUrl}blog/new/`;

  export const updateProfileUrl = `${serverUrl}profile/update-profile/`;
}