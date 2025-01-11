import { Request, Response, NextFunction } from 'express';
import { getUserByEmail, UserModel, getUserByPhoneNumber, getUserByResetPasswordToken } from '../models/user';
import { encryptPassword, errorResponse, generateUUID, random, successResponse, verifyPassword, isValidPhoneNumber, isValidEmail, generateProfileId } from '../helpers';
// import { generateUsername } from 'unique-username-generator';
import geoip from 'geoip-lite';
import UAParser from 'ua-parser-js';
import { AuthSessionModel, IAuthSession } from '../models/auth_sessions';
import logger from '../library/logger';
import { sendEmail } from '../library/sendgrid';
import { sendSms } from '../library/twilio';
// import { getUserInfo } from 'services/google';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, phoneNumber, profileId, password } = req.body;
    const ipAddress = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '') as string;
    const userAgent = req.headers['user-agent'] || '';
    const parsedUserAgent = new UAParser(userAgent).getResult();
    const deviceName = `${parsedUserAgent.device.vendor} ${parsedUserAgent.device.model}`;
    const requestCountry = geoip.lookup(ipAddress)?.country || '';

    if (!(email || phoneNumber || profileId) || !password) {
      throw new Error('404:Email/Phone number/ProfileId or Password is missing!');
      // return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select('+password +numOfLogins +numOfLogouts +lastLoginAt +uuid');

    if (!user) {
      throw new Error('404:User Not Found');
    }

    const verified = await verifyPassword(password, user.password);

    if (!verified) {
      throw new Error('403:Password is wrong, please try again!!');
    }

    const salt = random(40);
    const sessionToken = random(60);
    const session: IAuthSession = {
      userId: user.uuid,
      ipAddress: ipAddress,
      userAgent: userAgent,
      salt: salt,
      sessionToken: sessionToken,
      deviceName: deviceName,
      requestCountry: requestCountry
    };

    const new_session = new AuthSessionModel(session);
    await new_session.createSession();
    await user.afterLoginVerified();
    successResponse(res, 200, { authToken: new_session.authToken });
  } catch (error) {
    logger.error(error);
    errorResponse(res, String(error));
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, passwordConfirmation, firstName, lastName, profileType, dateOfBirth, age, phoneNumber, gender,role } = req.body;
    if (!email || !password || !passwordConfirmation || !firstName || !lastName || !profileType || !dateOfBirth || !phoneNumber || !gender || !age) {
      throw new Error('404:Params is missing, invalid request');
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      throw new Error('422:Phone number is not valid');
    }

    if (!isValidEmail(email)) {
      throw new Error('422:Email is not valid');
    }

    if (password != passwordConfirmation) {
      throw new Error('500:Password and Confirm Password should be same');
    }

    const getUser = await getUserByEmail(email);

    if (getUser) {
      throw new Error('422:Email already exist!!');
    }

    const verifyNumber = await getUserByPhoneNumber(String(phoneNumber));

    if (verifyNumber) {
      throw new Error('422:User with this phone number already exist!');
    }

    const user = new UserModel({
      email,
      status: 1,
      password: await encryptPassword(password),
      profileId: generateProfileId(),
      uuid: generateUUID(),
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      profileType: profileType,
      gender: gender,
      dateOfBirth: dateOfBirth,
      age: age,
      role: role
    });
    await user.save();
    sendEmail(email, 'arpit@aptonworks.com', 'Welcome To Royal Matrimoni', 'Thank you for registering with us');
    successResponse(res, 200, { user });
  } catch (error) {
    logger.error(error);
    errorResponse(res, String(error));
  }
};

export async function emailOtpSend(req: Request, res: Response) {
  const { email } = req.body;
  // const { session } = res.locals;
  try {
    if (!email) {
      throw new Error("404:Param 'email' is missing!!");
    }

    let user = await getUserByEmail(email);
    if (!user) {
      throw new Error('404:User not found');
    }
    // avoid brute force
    if (user.nextEmailCodeSendAt) {
      if (user.nextEmailCodeSendAt > new Date()) {
        throw new Error('403:Please try after some time!!');
      }
    }
    user.emailCodeSetUp();
    await user.save();
    // sendEmail('arpit@aptonworks.com', 'arpit@aptonworks.com', 'Testing', 'This is a test email');
    // session.loggedIn = false;
    // await session.save();
    successResponse(res, 200, { data: 'Otp sent successfully' });
    // successResponse(res, 4002, 200, { code: user.emailCode }); // use the email thirdparty to send opt
  } catch (error) {
    logger.error(error);
    errorResponse(res, String(error));
  }
}

export async function emailOtpVerify(req: Request, res: Response) {
  const { email, code } = req.body;
  const { session } = res.locals;
  try {
    if (!email) {
      throw new Error('404:Params email is misisng!!');
    }
    if (!code) {
      throw new Error('404:Param code is missing!!');
    }
    if (session.userId && session.loggedIn) {
      throw new Error('Session is loggedIn');
    }

    let user = await getUserByEmail(email);
    if (!user) {
      throw new Error('404:Email not found');
    }
    if (user.emailCode != code) {
      throw new Error('403:Invalid code');
    }
    if (user.emailCodeExpireAt) {
      if (user.emailCodeExpireAt < new Date()) {
        throw new Error('422:Code is expired!');
      }
    }
    await user.afterLoginVerified();
    await session.loggedInSession(user._id);
    successResponse(res, 200, { data: 'Email Verified Successfully' });
    // successResponse(res, 4003, 200);
  } catch (error) {
    logger.error(error);
    errorResponse(res, String(error));
  }
}

export const sendForgetPasswordOtp = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      throw new Error('404: Param phoneNumber is required');
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      throw new Error('422:Phone number is not valid');
    }

    const user = await getUserByPhoneNumber(String(phoneNumber));

    if (!user) {
      throw new Error('422:User with this phone number not exist!');
    }

    await user.phoneNumberCodeSetup();
    await user.setResetPassword();
    await user.save();
    let msg = `Your Forget Password verification code is: ${user.phoneNumberCode}`;
    await sendSms(String(phoneNumber), msg);
    successResponse(res, 200, { data: 'Otp Sent Successfully', token: user.resetPasswordToken });
  } catch (error: any) {
    logger.error(error?.message);
    errorResponse(res, String(error));
  }
};

export const verifyForgetPasswordOtp = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const { token } = req.params;

    if (!code || !token) {
      throw new Error("404:Param 'code' or 'token' is missing");
    }

    const user = await getUserByResetPasswordToken(String(token));

    if (!user) {
      throw new Error('404:User not found');
    }

    if (Number(code) !== Number(user.phoneNumberCode)) {
      throw new Error('400:Invalid Otp');
    }

    if (user.phoneNumberCodeExpireAt) {
      if (user.phoneNumberCodeExpireAt < new Date()) {
        throw new Error('422:Otp code expired!');
      }
    } else {
      throw new Error('422:code expiry not found');
    }

    if (user.resetPasswordTokenExpireAt) {
      if (user.resetPasswordTokenExpireAt < new Date()) {
        throw new Error('422:Password token expired');
      }
    }

    await user.phoneOtpVerified();
    successResponse(res, 200, { data: 'Otp verified successfully' });
  } catch (error: any) {
    logger.error(error?.message);
    errorResponse(res, String(error));
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { pwd, confirmPwd } = req.body;
    const { token } = req.params;

    if (!pwd || !token || !confirmPwd) {
      throw new Error("404:Param 'password' or 'token' or 'confirm password' is missing");
    }

    if (pwd !== confirmPwd) {
      throw new Error('422:Password and confirm password does not match');
    }

    const user = await getUserByResetPasswordToken(String(token));

    if (!user) {
      throw new Error('404:User not found');
    }

    if (user.resetPasswordTokenExpireAt) {
      if (user.resetPasswordTokenExpireAt < new Date()) {
        throw new Error('422:Password token expired');
      }
    }

    user.password = await encryptPassword(pwd);
    user.resetPassword = false;
    user.resetPasswordTokenExpireAt = new Date();
    await user.save();
    successResponse(res, 200, { data: 'Password Reset Successfully' });
  } catch (error: any) {
    logger.error(error?.message);
    errorResponse(res, String(error));
  }
};


// export async function oauthGoogle(req: Request, res: Response) {
//   const { id_token } = req.body;
//   const { session } = res.locals;
//   if (session.userId && session.loggedIn) {
//     errorResponse(res, 2005, 200);
//     return;
//   }
//   try {
//     const response = await getUserInfo(id_token);
//     let email: string = response['email'];
//     let user = await User.findOne({ email: email }).exec();
//     if (!user) {
//       user = new User({ email: email });
//     }
//     await user.googleOauthSetup(response);
//     await user.save();
//     await session.loggedInSession(user._id);
//     successResponse(res, 4005, 200);
//   } catch (err) {
//     console.log(err);
//     errorResponse(res, 5000, 422, (err as Error).message);
//     return;
//   }
// }
