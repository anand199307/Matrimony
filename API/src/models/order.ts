import { model, Schema } from 'mongoose';
import { Decimal128 } from 'mongodb';

export interface IOrder {
  uuid: string;
  userId: string;
  subscriptionPlanId: string;
  razorPayOrderId: string;
  razorPayReceiptId: string;
  razorPayPaymentId?: string;
  currencyCode: string;
  totalAmount: Decimal128;
  status: string;
  ipAddress: string;
  deviceName?: string;
  requestCountry?: string;
  userAgent?: string;
  subscriptionType: string;
}

const orderSchema: Schema = new Schema<IOrder>(
  {
    uuid: { type: String, required: true },
    userId: { type: String, required: true },
    subscriptionPlanId: { type: String, required: true },
    razorPayOrderId: { type: String, required: true },
    razorPayReceiptId: { type: String, required: true },
    razorPayPaymentId: String,
    currencyCode: String,
    totalAmount: { type: Decimal128 },
    status: String,
    ipAddress: String,
    deviceName: String,
    requestCountry: String,
    userAgent: String,
    subscriptionType: String
  },
  { timestamps: true, versionKey: false }
);

export const OrderModel = model<IOrder>('Order', orderSchema);
