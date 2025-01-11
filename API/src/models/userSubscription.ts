import { model, Schema } from 'mongoose';

export interface IUserSubscription {
  uuid: string;
  orderId: string;
  userId: string;
  subscriptionType: string;
  activatedAt: Date;
  expireAt: Date;
}

const userSubscriptionSchema: Schema = new Schema<IUserSubscription>(
  {
    uuid: { type: String, required: true },
    orderId: { type: String, required: true },
    userId: { type: String, required: true },
    subscriptionType: { type: String, required: true },
    activatedAt: Date,
    expireAt: Date
  },
  { timestamps: true, versionKey: false }
);

export const UserSubscriptionModel = model<IUserSubscription>('UserSubscription', userSubscriptionSchema);
