import { Request, Response } from "express";
import { createUser, getUser, resendVerificationToken, updateUserProfile, verifyEmail } from "../services/user.service";
import { sendEmail } from "../services/transporter.service";
import { verifyEmailBody, verifyEmailSubject } from "../utils/email.templates";
import { VerificationEmailSent } from "../utils/strings";
import { TokenVerifictionError } from "../utils/custom.errors";

export const registerUser = async (req: Request, res: Response) => {

  try {
    const { email, verificationToken } = await createUser(req.body);
    await sendEmail(email, verifyEmailSubject, verifyEmailBody(verificationToken));
    res.status(201).json({ message: VerificationEmailSent });

  } catch (error) {
    res.status(400).json({ error });
  }
}

export const loginUser = async (req: Request, res: Response) => {

  try {
    const { email, password } = req.body;
    const response = await getUser(email, password);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export const verifyEmailToken = async (req: Request, res: Response) => {
  try {
    const response = await verifyEmail(req.body.token);
    res.status(200).json(response);

  } catch (error) {
    const err = error as TokenVerifictionError;
    res.status(400).json({ message: err.message, errorCode: err.errorCode });
  }
};

export const resendToken = async (req: Request, res: Response) => {

  try {
    const { verificationToken, email } = await resendVerificationToken(req.body.token);
    await sendEmail(email, verifyEmailSubject, verifyEmailBody(verificationToken));
    res.status(200).json({ message: VerificationEmailSent });

  } catch (error) {
    const err = error as TokenVerifictionError;
    res.status(400).json({ message: err.message, errorCode: err.errorCode });
  }
};

export const updateProfile = async (req: Request, res: Response) => {

  try {
    const { _id, username, avatar } = req.body;
    const message = await updateUserProfile(_id, username, avatar);
    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ error });
  }
}