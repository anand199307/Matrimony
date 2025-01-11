// Mongoose is a Object Data Modeling (ODM) library for MongoDB
import { model, Schema } from 'mongoose';
import { generateOtp, random } from '../helpers/index';

export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  profileType: string;
  profielId: string;
  gender: string;
  dateOfBirth: string;
  age: number;
  uuid: string;
  status: number;
  resetPassword?: boolean;
  phoneNumber: string;
  avatar?: string;
  emailCode?: number;
  phoneNumberCode?: number;
  emailCodeExpireAt?: Date;
  phoneNumberCodeExpireAt?: Date;
  nextEmailCodeSendAt?: Date;
  isPhoneNumberVerified?: boolean;
  emailVerified?: boolean;
  numOfLogins?: number;
  lastLoginAt?: Date;
  numOfLogouts?: number;
  lastLogoutAt?: Date;
  oAuth?: Oauth;
  religionDetails?: object;
  locationDetails?: object;
  generalDetails?: object;
  careerDetails?: object;
  basicDetails?: object;
  lifeStyleDetails?: object;
  religiousDetails?: object;
  horoscopeDetails?: object;
  familyDetails?: object;
  partnerPreferences?: object;
  userVerificationDetails?: object;
  profileStatus: string[];
  membership: string;
  resetPasswordToken?: string;
  resetPasswordTokenExpireAt?: Date;
  profileViewed?: string[];
  idVerified?: boolean;
  favouriteProfiles?: string[];
  ignoredProfiles?: string[];
  phoneNumberViewed?: string[];
  viewedYourProfile?: string[];
  favouritedYourProfile?: string[];
  userRole: string
  galleryPhoto?: string[];
}

type Oauth = {
  google: Google;
};

type Google = {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: string;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: string;
  exp: string;
  alg: string;
  kid: string;
  typ: string;
};

export interface IUserDocument extends IUser, Document {
  emailCodeSetUp(): void;
  afterLoginVerified(): void;
  phoneNumberCodeSetup(): Number;
  setResetPassword(): void;
  phoneOtpVerified(): void;
  signOut(): void;
  googleOauthSetup(data: Google): void;
  ToJSON(): object;
}

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    firstName: { type: String, required: false, index: true },
    lastName: { type: String },
    uuid: { type: String, required: true, index: true },
    profileType: { type: String, required: false, index: true },
    profileId: { type: String, required: true, index: true },
    dateOfBirth: { type: String, required: false },
    age: { type: Number, required: false },
    gender: { type: String, required: false },
    avatar: {
      type: String
    },
    status: { type: Number, default: 0, index: true },
    resetPassword: { type: Boolean, default: false, select: false },
    resetPasswordToken: { type: String },
    resetPasswordTokenExpireAt: { type: Date },
    phoneNumber: { type: String, require: true, unique: true, index: true },
    phoneNumberCode: { type: Number },
    phoneNumberCodeExpireAt: { type: Date },
    isPhoneNumberVerified: { type: Boolean, default: false },
    emailCode: { type: Number },
    emailCodeExpireAt: {
      type: Date
    },
    nextEmailCodeSendAt: {
      type: Date,
      select: false
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    numOfLogins: {
      type: Number,
      default: 0
    },
    lastLoginAt: {
      type: Date
    },
    numOfLogouts: {
      type: Number,
      default: 0
    },
    oAuth: {
      type: Object,
      select: false
    },
    lastLogoutAt: {
      type: Date
    },
    religionDetails: {
      type: Object
    },
    locationDetails: {
      type: Object
    },
    generalDetails: {
      type: Object
    },
    careerDetails: {
      type: Object
    },
    basicDetails: {
      type: Object
    },
    lifeStyleDetails: {
      type: Object
    },
    religiousDetails: {
      type: Object
    },
    horoscopeDetails: {
      type: Object
    },
    familyDetails: {
      type: Object
    },
    partnerPreferences: {
      type: Object
    },
    userVerificationDetails: {
      type: Object
    },
    profileStatus: {
      type: Number,
      default: 0
    },
    membership: {
      type: String,
      default: 'Standard'
    },
    profileViewed: { type: [String], default: [] },
    viewedYourProfile: { type: [String], default: [] },
    idVerified: { type: Boolean, default: false },
    favouriteProfiles: { type: [String], default: [] },
    ignoredProfiles: { type: [String], default: [] },
    phoneNumberViewed: { type: [String], default: [] },
    favouritedYourProfile: { type: [String], default: [] },
    role: {
      type: String,
      required: true,
      default: 'user'
    },
    galleryPhoto:{type: [String],default:[]}
  },
  { timestamps: true, versionKey: false }
);

export const getUsers = () => UserModel.find().sort({ createdAt: 'desc' });

export const getRecentUser = () => UserModel.find().sort({ createdAt: -1 }).limit(5);

export const getRandomUsers = () => UserModel.aggregate([{ $sample: { size: 5 } }]);

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserByPhoneNumber = (phoneNumber: string) => UserModel.findOne({ phoneNumber: phoneNumber });

export const getUserByProfileId = (profielId: string) => UserModel.findOne({ profielId: profielId });

export const getUserByUuid = (uuid: string) => UserModel.findOne({ uuid: uuid });

export const getUserAllByUuid = (uuid: string[]) => UserModel.find({ uuid: { $in: uuid } });


export const getUserByResetPasswordToken = (resetPasswordToken: string) => UserModel.findOne({ resetPasswordToken: resetPasswordToken });

userSchema.methods.emailCodeSetUp = function () {
  this.emailCode = generateOtp();
  this.emailCodeExpireAt = new Date(Date.now() + 2 * 60 * 1000); // Expire in 2 minutes
  this.nextEmailCodeSendAt = new Date(Date.now() + 1 * 60 * 1000);
  return;
};

userSchema.methods.phoneNumberCodeSetup = function () {
  this.phoneNumberCode = generateOtp();
  this.phoneNumberCodeExpireAt = new Date(Date.now() + 2 * 60 * 1000); // Expire in 2 minutes
  return;
};

userSchema.methods.setResetPassword = function () {
  this.resetPasswordToken = random(18);
  this.resetPasswordTokenExpireAt = new Date(Date.now() + 4 * 60 * 1000); // Expire in 4 minutes
  this.resetPassword = true;
  return;
};

userSchema.methods.phoneOtpVerified = function () {
  this.isPhoneNumberVerified = true;
  this.save();
  return;
};

userSchema.methods.afterLoginVerified = function () {
  this.numOfLogins = (this.numOfLogins || 0) + 1;
  this.lastLoginAt = new Date();
  this.save();
  return;
};

userSchema.methods.signOut = function () {
  this.numOfLogouts = (this.numOfLogouts || 0) + 1;
  this.lastLogoutAt = new Date();
  this.save();
  return;
};

userSchema.methods.googleOauthSetup = function (data: Google) {
  let google: Google = data;
  let oa: Oauth = { google };
  this.oAuth = oa;
  this.numOfLogins = (this.numOfLogins || 0) + 1;
  this.lastLoginAt = new Date();
  return;
};

userSchema.methods.ToJSON = function () {
  let data = this.toObject();
  delete data._id;
  delete data.phoneNumberCode;
  delete data.phoneNumberCodeExpireAt;
  delete data.lastLogoutAt;
  delete data.numOfLogouts;
  delete data.numOfLogins;
  delete data.lastLoginAt;
  return data;
};

export const UserModel = model<IUserDocument>('User', userSchema);
