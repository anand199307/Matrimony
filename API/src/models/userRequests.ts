import { Schema, model } from "mongoose";
const mongoose = require('mongoose');

export interface UserRequest {
  requestId: string;
  user: string;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  reasons?: string;
  requestType: string;
}

const userRequestSchema: Schema = new Schema<UserRequest>(
  {
    requestId: { type: String, required: true ,index: true},
    user: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
   verificationStatus: {type: String, default:'pending'},
   reasons: {type: String},
   requestType: {type: String, required: true}
  },
  { timestamps: true, versionKey: false }
)

export const UserRequestModal = model<UserRequest>('UserRequest',userRequestSchema)