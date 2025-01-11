import { model, Schema } from 'mongoose';

export interface IChatRoomParticipant {
  uuid: string;
  chatRoomId: string;
  userId: string;
  userFirstName: string;
  userLastName?: string;
  userProfilePhoto?: string;
}

const chatRoomParticipantSchema: Schema = new Schema<IChatRoomParticipant>(
  {
    uuid: { type: String, required: true },
    chatRoomId: { type: String, required: true },
    userId: { type: String, required: true },
    userFirstName: String,
    userLastName: String,
    userProfilePhoto: String
  },
  { timestamps: true, versionKey: false }
);

export const ChatRoomParticipantModel = model<IChatRoomParticipant>('ChatRoomParticipant', chatRoomParticipantSchema);
