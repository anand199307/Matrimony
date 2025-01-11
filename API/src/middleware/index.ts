import { Request, Response, NextFunction } from 'express';
import { getUserByUuid, UserModel } from '../models/user';
import { errorResponse } from '../helpers';
import { getUserSession, decodeToken } from '../models/auth_sessions';
import logger from '../library/logger';
import crypto from 'crypto';
import { config } from '../config/config';

export const checkActiveSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.headers['authorization'] as string;
    if (!authToken) {
      throw new Error("404:Headers 'Authorization' Not Found!");
    }

    const authSession = await getUserSession(authToken).select('+expireAt +salt +sessionToken');

    if (!authSession) {
      throw new Error('403:Auth Session Not Found!');
    }

    const decrypt: any = decodeToken(authToken, authSession.salt);

    if (decrypt.sessionToken !== authSession.sessionToken) {
      throw new Error('403:Invalid Session!!');
    }

    const user = await getUserByUuid(decrypt.uuid);

    if (!user) {
      throw new Error('404:User Not Found!!');
    }

    if (user.status !== 1) {
      throw new Error('403:User is not active');
    }

    if (!authSession.loggedIn) {
      throw new Error('403:Session Not Logged In');
    }

    const expiresAtTimestamp: number = authSession.expireAt!.getTime() / 1000; // convert expires_at to Unix timestamp
    const currentTimestamp: number = Math.floor(Date.now() / 1000); // get current Unix timestamp
    if (expiresAtTimestamp <= currentTimestamp) {
      throw new Error('403:Session Expired!!');
    }

    res.locals.user = user;
    res.locals.session = authSession;
    next();
  } catch (error) {
    logger.error(error);
    return errorResponse(res, String(error));
  }
};

// --------- NOT USING THIS MIDDLEWARE, KEEPING FOR REFERENCE ---------
// export const razorpayWebhookAuthenticator = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const requestedBody = JSON.stringify(req.body);
//     const receivedSignature = req.headers['x-razorpay-signature'];
//     const expectedSignature = crypto.createHmac('sha256', config.razorpay.webhook_secret).update(requestedBody).digest('hex');
//     if (receivedSignature === expectedSignature) {
//       console.log('Request Authenticated');
//     } else {
//       throw new Error('500:Invalid Signature');
//     }
//     next();
//   } catch (error: any) {
//     logger.error(error);
//     return errorResponse(res, String(error));
//   }
// };

export const verifyPaymentSignature = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let body = req.body.response.razorpay_order_id + '|' + req.body.response.razorpay_payment_id;
    let expectedSignature = crypto.createHmac('sha256', config.razorpay.key_secret).update(body.toString()).digest('hex');
    console.log('sig received ', req.body.response.razorpay_signature);
    console.log('sig generated ', expectedSignature);
    let signatureIsValid = false;
    if (expectedSignature === req.body.response.razorpay_signature) signatureIsValid = true;
    res.locals.signatureIsValid = signatureIsValid;
    next();
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(res, String(error));
  }
};

// export const validateUserSubscription = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { user } = res.locals;
//     const { userId } = req.params;

//     let u = await UserModel.findOne({ uuid: userId });
//     if (!u) {
//       throw new Error('404:User Not Found');
//     }

//     next();
//   } catch (error: any) {
//     logger.error(error.message);
//     return errorResponse(res, String(error));
//   }
// };

export const parsePagination = (req: Request, res: Response, next: NextFunction) => {
  let { limit, page } = req.query;
  let pageLimit = Number(limit) || 10;
  let offset = Number(page) || 1;
  if (offset < 1) {
    offset = 1;
  }
  offset = offset - 1;
  let skip = offset * pageLimit;
  res.locals.limit = pageLimit;
  res.locals.skip = skip;
  next();
};
