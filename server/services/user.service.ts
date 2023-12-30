import { User } from "../models/user.model";
import { TokenValidity } from "../utils/constants";
import { TokenVerifictionError } from "../utils/custom.errors";
import { TokenVerifictionErrorCodes } from "../utils/enums";
import { IUser, LoginResponse } from "../utils/interfaces";
import { AlreadyVerified, InvalidLink, TokenExpired, UserCreationFailure, UserExist, UserNotExist, UserNotVerified, UserUpdateFailure, VerificationEmailAlreadySent } from "../utils/strings";
import { decryptData, encryptData, generateJwtToken } from "../utils/utilities";


export const getUser = async (email: string, password: string) => {

  const user = await User.findOne({ email });

  if (!user || password !== decryptData(user.password)) {
    throw UserNotExist;
  }

  if (!user.verified) {
    throw UserNotVerified;
  }

  const response: LoginResponse = {
    token: generateJwtToken(user._id),
    _id: user._id,
    username: user.username || '',
    avatar: user.avatar || ''
  }

  return response;
};

export const createUser = async (userData: IUser) => {
  const user = await User.findOne({ email: userData.email });

  if (!user) {
    try {
      const user = await User.create({
        email: userData.email,
        password: encryptData(userData.password),
        token: new Date().valueOf() + TokenValidity
      });

      return {
        email: user.email,
        verificationToken: encryptData(JSON.stringify({
          id: user._id.toString(),
          token: user.token
        }))
      };
    } catch (err) {
      console.log(err)
      throw UserCreationFailure;
    }
  }

  throw UserExist;
};

export const verifyEmail = async (token: string) => {
  let currentTime = new Date().valueOf();
  try {

    const decryptedData = JSON.parse(decryptData(token));
    let user = await User.findById(decryptedData.id);
    if (!user) throw InvalidLink;

    if (user && user.token) {

      if (decryptedData.token > currentTime) {
        user = await User.findByIdAndUpdate(user._id,
          {
            verified: true,
            token: ""
          },
          { new: true }
        );

        const response: LoginResponse = {
          token: generateJwtToken(user!._id),
          _id: user!._id,
          username: user?.username || '',
          avatar: user?.avatar || ''
        }
        return response;

      } else {
        throw new TokenVerifictionError(TokenExpired, TokenVerifictionErrorCodes.Expired);
      }

    } else {
      throw new TokenVerifictionError(AlreadyVerified, TokenVerifictionErrorCodes.AlreadyVerified);
    }

  } catch (err) {

    console.log(err)
    if (!(err instanceof TokenVerifictionError)) {
      throw new TokenVerifictionError(InvalidLink, TokenVerifictionErrorCodes.Invalid);
    }

    throw err;
  }
};

export const resendVerificationToken = async (token: string) => {
  let currentTime = new Date().valueOf();
  try {

    const decryptedData = JSON.parse(decryptData(token));
    let user = await User.findById(decryptedData.id);
    console.log("user:", user)
    if (!user) throw InvalidLink;

    if (user && user.token) {

      if (user.token > currentTime) {
        throw new TokenVerifictionError(VerificationEmailAlreadySent, TokenVerifictionErrorCodes.AnotherTokenSent);

      } else {
        user = await User.findById(user._id,
          { token: currentTime + TokenValidity },
          { returnDocument: "after" }
        );

        return {
          email: user!.email,
          verificationToken: encryptData(JSON.stringify({
            id: user!._id.toString(),
            token: user!.token
          }))
        };

      }

    } else {
      throw new TokenVerifictionError(AlreadyVerified, TokenVerifictionErrorCodes.AlreadyVerified);
    }

  } catch (err) {

    console.log(err)
    if (!(err instanceof TokenVerifictionError)) {
      throw new TokenVerifictionError(InvalidLink, TokenVerifictionErrorCodes.Invalid);
    }
    throw err;
  }
};

export const updateUserProfile = async (id: string, username: string, avatar: string) => {

  try {
    const user = await User.findByIdAndUpdate(id, { username, avatar }, { new: true });
    console.log(user)
    return "User profile has been updated successfully."

  } catch (err) {
    console.log(err)
    throw UserUpdateFailure;
  }

};