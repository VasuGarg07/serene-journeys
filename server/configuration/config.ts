import dotenv from "dotenv";
dotenv.config();

// Prod Build
export const PROD = false;

// MongoDB Uri obtained after generating cluster and select nodejs as connection method
export const MONGO_URI = process.env.MONGODB_URI!;

// Random string
export const JWT_SECRET = process.env.JWT_SECRET!;

export const SERVER_PORT = process.env.SERVER_PORT!;

export const BASE_URL = process.env.BASE_URL!;

// Random Generate AES Key using utilities generateRandomString Function
export const AES_KEY = process.env.AES_KEY!;

// To use nodemailer service I have used ethereal (https://ethereal.email/) for testing
export const NODEMAILER_CONFIG = {
  host: PROD ? process.env.NODEMAILER_PROD_HOST! : process.env.NODEMAILER_HOST!,
  port: PROD ? process.env.NODEMAILER_PROD_PORT! : process.env.NODEMAILER_PORT!,
  auth: {
    user: PROD ? process.env.NODEMAILER_PROD_USER! : process.env.NODEMAILER_USER!,
    pass: PROD ? process.env.NODEMAILER_PROD_PASS! : process.env.NODEMAILER_PASS!,
  },
};

export const FROM_EMAIL = PROD ? process.env.NODEMAILER_FROM_EMAIL : "noreply@instaread.com";