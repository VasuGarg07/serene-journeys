import { ObjectSchema, array, object, string } from "yup";
import { StorageHelper } from "./storage.helper";
import { SEVERITY } from "./enums";
import { DEFAULT_TOAST_CONFIG, InvalidImageUrl, imageLinkRegex } from "./constants";
import { toast } from "react-toastify";
import { BlogForm, UserData } from "./interfaces";

// Form Validation Schemas
const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character.`;
};

export const loginSchema = object({
  email: string().email().required(),
  password: string()
    .required("password is a required field")
    .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .min(8, "Password must have at least 8 characters")
    .max(20, "Password must not be greater than 20 characters"),
}).required();

export const blogValidationSchema: ObjectSchema<BlogForm> = object({
  title: string().required('Title is required').max(100, 'Title must be at most 50 characters'),
  // imageLink: string().required('Image Link is required').matches(imageLinkRegex, InvalidImageUrl),
  imageLink: string().required('Image Link is required'),
  description: string().required('Description is required').max(3000, 'Description must be at most 3000 characters'),
}).required();


export const isAuthenticated = () => {
  return StorageHelper.accessToken;
};


export const randomString = () => {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const length = 32;
  let result = "";
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

export function formatDate(dateString: string): string {
  const inputDate = new Date(dateString);
  if (isNaN(inputDate.getTime())) {
    return '--';
  }
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(inputDate);
}

export const showNotification = (severity: SEVERITY, toastText: string) => {
  if (severity === SEVERITY.Success) {
    toast.success(toastText, DEFAULT_TOAST_CONFIG);
  } else {
    toast.error(toastText, DEFAULT_TOAST_CONFIG);
  }
};

export const isEmpty = (val: any) => {
  return val == undefined || val == null || val == ''
}

// Avatar Utils
export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
}

export function userAvatar(user: UserData) {
  if (user.avatar) return { src: user.avatar }

  const name = user.username || 'Anonymous';
  return {
    sx: { bgcolor: stringToColor(name) },
    children: `${name.split(' ')[0][0]}`,
  };
}
