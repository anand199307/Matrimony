import { model, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import { getDate } from '../helpers';

export const getUserSession = (authToken: string) => AuthSessionModel.findOne({ authToken: authToken });

type Payload = {
  sessionToken: string;
  uuid: string;
  userAgent: string;
  ipAddress: string;
};

export interface IAuthSession {
  userId: string;
  ipAddress: string;
  userAgent: string;
  loggedIn?: boolean | true;
  salt: string;
  sessionToken: string;
  authToken?: string | '';
  expireAt?: Date;
  deviceName?: string;
  requestCountry?: string;
}

export interface IAuthSessionModel extends IAuthSession, Document {
  sessionSignOut(): void;
  createSession(): void;
  signOut(): void;
}

const authSessionSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    ipAddress: { type: String },
    userAgent: { type: String },
    loggedIn: { type: Boolean, default: false, index: true },
    salt: { type: String, required: true, select: false },
    sessionToken: { type: String, required: true, select: false },
    authToken: { type: String, required: true, select: false, index: true },
    expireAt: { type: Date, select: false, index: true },
    deviceName: { type: String, select: false },
    requestCountry: { type: String }
  },
  { timestamps: true, versionKey: false }
);

authSessionSchema.methods.createSession = async function () {
  // create session here
  // Define Payload for JWT encryption
  let payload: Payload = {
    sessionToken: this.sessionToken,
    uuid: this.userId,
    userAgent: this.userAgent,
    ipAddress: this.ipAddress
  };

  let token: string = await this.encodeToken(payload, this.salt);
  this.authToken = token;
  this.loggedIn = true;
  this.expireAt = getDate(7);
  await this.save();
  return this.authToken;
};

authSessionSchema.methods.encodeToken = function (payload: Object) {
  return jwt.sign(payload, this.salt) as string;
};

// const encodeToken = (payload: Payload, salt: string): string => {
//   return jwt.sign(payload, salt) as string;
// };

export const decodeToken = (authToken: string, salt: string): Object => {
  // Decode JWT Token HERE
  return jwt.verify(authToken, salt);
};

authSessionSchema.methods.sessionSignOut = function () {
  this.loggedIn = false;
  this.expireAt = new Date();
  return this.save();
};

export const AuthSessionModel = model<IAuthSessionModel>('AuthSession', authSessionSchema);
