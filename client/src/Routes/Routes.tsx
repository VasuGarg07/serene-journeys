import { Navigate, createBrowserRouter } from "react-router-dom";
import { authGaurd, loginGuard } from "./guards";
import CreateBlog from "../Pages/CreateBlog/CreateBlog";
import MyProfile from "../Pages/MyProfile/MyProfile";
import VerifyToken from "../Pages/Auth/VerifyToken";
import Login from "../Pages/Auth/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Blogs from "../Pages/Blogs/Blogs";
import BlogDetails from "../Pages/BlogDetails/BlogDetails";

export const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
    loader: loginGuard
  },
  {
    path: 'verify-email',
    element: <VerifyToken />
  },
  {
    path: "home",
    element: <Dashboard />,
    loader: authGaurd,

    children: [
      {
        path: '',
        element: <Blogs />
      },
      {
        path: 'new-post',
        element: <CreateBlog />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: 'blog/:blogId',
        element: <BlogDetails />,
      }
    ]
  },
  {
    path: '*',
    element: <Navigate replace to="/home" />
  }
])