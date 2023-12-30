import { ToastOptions, toast } from "react-toastify";

export const imageLinkRegex = /\.(jpg|jpeg|png|webp)$/i;

export const MAX_TAG_LIMIT = 4;

export const DEFAULT_TOAST_CONFIG: ToastOptions = {
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const signUpText = "New here? Let's get started! Create an account to explore a diverse range of articles, save your favorites, and connect with fellow readers";
export const loginText = "Unlock the full experience! Sign in to personalize your feed, save your favorite articles, and join our community";
export const userCreationSuccess = "User Created Successfully";
export const userLoginSuccess = "User Logged in Successfully";
export const miscErr = "Something went wrong";
export const BlogCreated = "Your Blog has been published";
export const InvalidImageUrl = 'Image URL must end with .jpg, .jpeg, or .png';

export const COVER_IMAGES = [
  'https://images.unsplash.com/photo-1543310465-f4d3ca5a2a25?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1541753236788-b0ac1fc5009d?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1542977466-bbacf83cb0b4?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1543158266-0066955047b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1543241964-2aff6a70473f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1541623089466-8e777dd05d70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1503104538136-7491acef4d5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
]

export const AVATARS = [
  'https://www.svgrepo.com/show/384676/account-avatar-profile-user-6.svg',
  'https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png',
  'https://cdn-icons-png.flaticon.com/512/8090/8090406.png',
  'https://cdn.iconscout.com/icon/free/png-256/free-avatar-373-456325.png'
]

export const CATEGORIES = [
  'Travel', 'Nature', 'City', 'Adventure', 'Beaches', 'Landmarks', 'Mountains',
  'Technology', 'Gaming', 'Lifestyle', 'Fashion', 'Food', 'Sports', 'Fitness',
  'Literature', 'Business', 'Philosophy'
];
