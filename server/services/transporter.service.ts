import nodemailer, { TransportOptions } from 'nodemailer';
import { FROM_EMAIL, NODEMAILER_CONFIG } from '../configuration/config';

export const sendEmail = async (email: string, subject: string, html: string) => {
  try {
    const transporter = nodemailer.createTransport(NODEMAILER_CONFIG as TransportOptions);

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: subject,
      html: html,
    });
    return { success: true }

  } catch (error) {
    return { success: false, error }
  }
};

