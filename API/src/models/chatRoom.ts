import { model, Schema } from 'mongoose';

export interface IChatRoom {
  uuid: string;
  lastMessage?: string;
  lastMessageSentAt?: Date;
  lastMessageReadAt?: Date;
}

const chatRoomSchema: Schema = new Schema<IChatRoom>(
  {
    uuid: { type: String, required: true },
    lastMessage: { type: String },
    lastMessageSentAt: Date,
    lastMessageReadAt: Date
  },
  { timestamps: true, versionKey: false }
);

export const ChatRoomModel = model<IChatRoom>('ChatRoom', chatRoomSchema);
