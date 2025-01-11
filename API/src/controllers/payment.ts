import { Request, Response, NextFunction } from 'express';
import logger from '../library/logger';
import { errorResponse, successResponse, generateUUID, getDateRangeFromMonths } from '../helpers';
import { razorPayOrder } from '../library/razorpay';
import geoip from 'geoip-lite';
import UAParser from 'ua-parser-js';
import { IOrder, OrderModel } from '../models/order';
import { SubscriptionPlanModel } from '../models/subscriptionPlan';
import { IUserSubscription, UserSubscriptionModel } from '../models/userSubscription';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = res.locals;
    const { subscriptionId } = req.body;

    if (!subscriptionId) {
      throw new Error('404:Param subscriptionId is missing!!');
    }

    const sp = await SubscriptionPlanModel.findOne({ uuid: subscriptionId });
    if (!sp) {
      throw new Error('404:Plan not found!!');
    }
    const ipAddress = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '') as string;
    const userAgent = req.headers['user-agent'] || '';
    const parsedUserAgent = new UAParser(userAgent).getResult();
    const deviceName = `${parsedUserAgent.device.vendor} ${parsedUserAgent.device.model}`;
    const requestCountry = geoip.lookup(ipAddress)?.country || '';
    const order = await razorPayOrder(sp.price);

    if (!order) {
      throw new Error('422:Failed to create Razor pay order');
    }

    const orderData: IOrder = {
      uuid: generateUUID(),
      userId: user.uuid,
      subscriptionPlanId: sp.uuid,
      razorPayOrderId: order.id,
      razorPayReceiptId: String(order.receipt),
      currencyCode: order.currency,
      totalAmount: sp.price,
      status: order.status,
      ipAddress: ipAddress,
      deviceName: deviceName,
      requestCountry: requestCountry,
      userAgent: userAgent,
      subscriptionType: sp.name
    };

    const orderObject = new OrderModel(orderData);
    const o = await orderObject.save();

    const responseData = {
      uuid: o.uuid,
      userId: o.userId,
      razorPayOrderId: o.razorPayOrderId,
      razorPayReceiptId: o.razorPayReceiptId,
      currencyCode: o.currencyCode,
      totalAmount: parseFloat(o.totalAmount.toString()),
      status: o.status
    };

    successResponse(res, 201, { data: responseData });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(res, String(error));
  }
};

export const verifyPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, signatureIsValid } = res.locals;
    const { razorpay_order_id, razorpay_payment_id } = req.body.response;
    let verified = false;

    if (signatureIsValid) {
      verified = true;
      let order = await OrderModel.findOne({ userId: user.uuid, razorPayOrderId: razorpay_order_id }).exec();
      if (!order) {
        throw new Error('404:Order Not Found');
      }

      if (order.status === 'paid') {
        throw new Error('422:Payment is already verified');
      }

      order.razorPayPaymentId = razorpay_payment_id;
      order.status = 'paid';
      await order.save();

      let sp = await SubscriptionPlanModel.findOne({ uuid: order.subscriptionPlanId });

      if (!sp) {
        throw new Error('404:Subscription Plan not found');
      }
      const [startDate, endDate] = getDateRangeFromMonths(sp.durationInMonths);

      let userData: IUserSubscription = {
        uuid: generateUUID(),
        orderId: order.uuid,
        userId: user.uuid,
        subscriptionType: order.subscriptionType,
        activatedAt: startDate,
        expireAt: endDate
      };

      let userSubscriptionObject = new UserSubscriptionModel(userData);
      await userSubscriptionObject.save();
      user.membership = order.subscriptionType;
      await user.save();
    } else {
      verified = false;
    }
    successResponse(res, 200, { verified });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(res, String(error));
  }
};

// NOT USING THIS METHOD, KEEPING FOR REFERENCE
// export const razorPayWebhook = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     console.log('-------- Update Order Here --------');
//   } catch (error: any) {
//     logger.error(error.message);
//     return errorResponse(res, String(error));
//   }
// };
