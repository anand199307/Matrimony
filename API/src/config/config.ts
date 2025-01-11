import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from '../library/logger';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || '';
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8080;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || '';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || '';
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || '';
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

export const config = {
  mongo: {
    url: MONGO_URL
  },
  server: {
    port: SERVER_PORT
  },
  twilio: {
    sendgridApiKey: SENDGRID_API_KEY,
    accountSid: TWILIO_ACCOUNT_SID,
    authToken: TWILIO_AUTH_TOKEN,
    phoneNumber: TWILIO_PHONE_NUMBER
  },
  razorpay: {
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET
  }
};

export const connectDb = async (mongoUri: string) => {
  await mongoose
    .connect(mongoUri)
    .then(() => {
      console.log('connected to MongoDb')
      logger.info('connected to MongoDb');
    })
    .catch((error) => {
      logger.error('Could not connect to database!!');
      logger.error(error);
      process.exit(1);
    });
};
