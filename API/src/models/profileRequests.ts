import { Schema, model } from "mongoose";
const mongoose = require('mongoose');

export interface ProfileRequest {
  requestId: string;
  senderUserId: string;
  receiverUserId: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const profileRequestSchema: Schema = new Schema<ProfileRequest>(
  {
    requestId: { type: String, required: true ,index: true},
    senderUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true, versionKey: false }
)

export const ProfileRequestModal = model<ProfileRequest>('ProfileRequests', profileRequestSchema)