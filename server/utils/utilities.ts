import jwt, { JwtPayload } from 'jsonwebtoken'
import { AES_KEY, JWT_SECRET } from "../configuration/config";
import { array, object, string } from "yup";
import { Types } from 'mongoose';
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'crypto';
import { encryptionType, imageLinkRegex } from './constants';
import { InvalidImageUrl } from './strings';

export const generateJwtToken = (userId: Types.ObjectId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '2h' });
}

export const verifyJwtToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
}

export const decodeJwt = (token: string): JwtPayload => {
  return jwt.decode(token) as JwtPayload
}

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str}.`;
};

export const loginSchema = object({
  email: string().email().required(),
  password: string()
    .required("password is a required field")
    .matches(/[A-Z]/, getCharacterValidationError("uppercase character"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase character"))
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .min(8, "Password must contain atleast 8 characters")
    .max(20, "Password can't be greater than 20 characters"),
});


export const blogValidationSchema = object({
  user: string().required('User is required'),
  title: string().required('Title is required').max(100, 'Title must be at most 50 characters'),
  imageLink: string().required('Image Link is required'),
  categories: array().max(4, 'Categories can have at most 4 items'),
  description: string().required('Description is required').max(3000, 'Description must be at most 3000 characters'),
});


// Encryption Utils

const encryptionIV = createHash("sha512").digest("hex").substring(0, 16);

export const generateAesKey = () => {
  const aesKey = randomBytes(16).toString("hex");
  return aesKey
};

export const encryptData = (data: string) => {
  const cipher = createCipheriv(encryptionType, AES_KEY, encryptionIV);
  return Buffer.from(cipher.update(data, "utf8", "hex") + cipher.final("hex")).toString("base64");
};

export const decryptData = (encryptedData: string) => {
  const buff = Buffer.from(encryptedData, "base64");
  const decipher = createDecipheriv(encryptionType, AES_KEY, encryptionIV);
  return decipher.update(buff.toString("utf8"), "hex", "utf8") + decipher.final("utf8");
};