import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { Response } from 'express';

export const random = (bits: number) => crypto.randomBytes(bits).toString('base64');

const saltRounds = 12;
const now = new Date();

export const encryptPassword = (pwd: string) => {
  return bcrypt.hash(pwd, saltRounds);
};

export const verifyPassword = (pwd: string, hash: string) => {
  return bcrypt.compare(pwd, hash);
};

export const generateUUID = () => {
  return crypto.randomUUID();
};

export const getDate = (days: number) => new Date(now.setDate(now.getDate() + days));

export const errorResponse = (res: Response, error: string) => {
  let errMessage = error.split(':');
  return res.status(Number(errMessage[1] || 500)).json({ statusCode: Number(errMessage[1]) || 500, error: String(errMessage[2]) });
};

export const successResponse = (res: Response, statusCode: number, response: any) => {
  return res.status(Number(statusCode)).json({ statusCode: Number(statusCode), response: response });
};

export const generateOtp = (): Number => Math.floor(100000 + Math.random() * 900000);

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  // Regex to check valid
  // International Phone Numbers
  let regex = new RegExp(/^(\+91)?(-)?\s*?(91)?\s*?(\d{3})-?\s*?(\d{3})-?\s*?(\d{4})$/);
  // TESTED formats with above regex
  // 9992223333
  // +91 9992223333
  // 91 9992223333
  // 91999 222 3333
  // +91999 222 3333
  // +91 999-222-3333
  // +91 999 222 3333
  // 91 999 222 3333
  // 999 222 3333
  // +919992223333

  // if phonenumber
  // is empty return false
  if (!phoneNumber) {
    return false;
  }

  // Return true if the phonenumber
  // matched the ReGex
  if (regex.test(phoneNumber) == true) {
    return true;
  } else {
    return false;
  }
};

export const isValidEmail = (email: string): boolean => {
  // Regex to check valid email
  let regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

  // if email
  // is empty return false
  if (!email) {
    return false;
  }

  // Return true if the email
  // matched the ReGex
  if (regex.test(email) == true) {
    return true;
  } else {
    return false;
  }
};

export const generateProfileId = () => {
  return 'R' + crypto.randomBytes(4).toString('hex');
};

export const getDateRangeFromMonths = (months: number): [Date, Date] => {
  const currentDate = new Date();
  const startYear = currentDate.getFullYear();
  const startMonth = currentDate.getMonth();
  const endYear = startYear + Math.floor((startMonth + months) / 12);
  const endMonth = (startMonth + months) % 12;

  const startDate = new Date(startYear, startMonth, currentDate.getDate());
  const endDate = new Date(endYear, endMonth, currentDate.getDate());

  return [startDate, endDate];
};

export const generateToken=(length: number)=> {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const tokenArray = new Array(length);
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    tokenArray[i] = characters[randomIndex];
  }
  return tokenArray.join('');
}

export const generateRandomDigitNumber=(length: number)=> {
  const randomDecimal = Math.random(); // Generate a random decimal between 0 and 1
  const randomDigitNumber = Math.floor(randomDecimal * 10000); // Multiply by 10000 and round down
  return randomDigitNumber.toString(); // Convert to string and pad with leading zeros if needed
}

//  Filter Function
export const getStartDate = (filter: string): Date => {
  const currentDate = new Date();

  switch (filter) {
    case 'week':
      return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
    case 'month':
      return new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
    case 'year':
      return new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
    default:
      return new Date(0); // Start of time (to get all records)
  }
};