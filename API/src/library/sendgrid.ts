import { config } from '../config/config';
import logger from './logger';
const sendGridMail = require('@sendgrid/mail');

sendGridMail.setApiKey(config.twilio.sendgridApiKey);

const getMessage = (to: string, from: string, subject: string, body: string): Object => {
  return {
    to: to,
    from: from,
    subject: subject,
    text: body,
    html: `<strong>${body}</strong>`
  };
};

export async function sendEmail(to: string, from: string, subject: string, body: string) {
  try {
    await sendGridMail.send(getMessage(to, from, subject, body));
    logger.info('Email Send successfully');
  } catch (error: any) {
    logger.error('Error sending test email');
    logger.error(error);
    if (error.response) {
      logger.error(error.response.body);
    }
  }
}
