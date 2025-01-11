import { Twilio } from 'twilio';
import { config } from '../config/config';
import logger from './logger';

const accountSid = config.twilio.accountSid;
const authToken = config.twilio.authToken;
const twilioNumber = config.twilio.phoneNumber;

export const sendSms = async (phone: string, message: string) => {
  if (accountSid && authToken && phone && twilioNumber) {
    const client = new Twilio(accountSid, authToken);
    await client.messages
      .create({
        body: message,
        from: twilioNumber,
        to: '+91' + phone
      })
      .then((message) => console.log(message.sid))
      .catch((error: any) => {
        logger.error(error?.message);
        return new Error('Failed to send Otp');
      });
  } else {
    logger.info('One of the Twilio variable is missing or empty!!');
    throw new Error('422:One of the Twilio variable is missing or empty!!');
  }
};
