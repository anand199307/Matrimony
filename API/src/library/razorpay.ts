import { random } from '../helpers';
import Razorpay from 'razorpay';
import logger from './logger';
import { config } from '../config/config';

const rzp = new Razorpay({
  key_id: config.razorpay.key_id,
  key_secret: config.razorpay.key_secret
});

export const razorPayOrder = async (amount: any) => {
  console.log('--------------------------');
  console.log('--------------CREATE ORDER INITIATED------------');
  console.log(`--------------ORDER AMOUNT - ${amount * 100}------------`);
  try {
    const order = await rzp.orders.create({
      amount: amount * 100, // rzp format with paise
      currency: 'INR',
      receipt: `receipt_${random(8)}`, //Receipt no that corresponds to this Order,
      payment_capture: true
    });

    console.log('Created order:', order);
    return order;
  } catch (error: any) {
    logger.error('Error creating razor pay order');
    logger.error(error);
    if (error.response) {
      logger.error(error.response.body);
    }
  }
};
