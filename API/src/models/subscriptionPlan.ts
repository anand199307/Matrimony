import { Types, model, Schema } from 'mongoose';
import { Decimal128 } from 'mongodb';

export interface ISubscriptionPlan {
  name: string;
  uuid: string;
  price: Decimal128;
  durationInMonths: number;
  contactLimit: number;
  features?: string[];
  chatOption: boolean;
  horoscopeOption: boolean;
  status?: 0 | 1;
}

const subscriptionPlanSchema: Schema = new Schema<ISubscriptionPlan>(
  {
    name: { type: String, required: true },
    uuid: { type: String, required: true },
    price: { type: Decimal128, required: true },
    durationInMonths: { type: Number, required: true },
    contactLimit: {type: Number,default:0},
    features: { type: [String], default: [] },
    status:{type: Number,default: 1},
    chatOption: {type: Boolean, default:false},
    horoscopeOption: {type: Boolean,default:false}
  },
  { timestamps: true, versionKey: false }
);

export const SubscriptionPlanModel = model<ISubscriptionPlan>('SubscriptionPlan', subscriptionPlanSchema);
