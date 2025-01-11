import { model, Schema } from 'mongoose';

export interface IChatMessage {
  chatRoomId: string;
  message: string;
  senderId: string;
  uuid: string;
}

const chatMessageSchema: Schema = new Schema<IChatMessage>(
  {
    chatRoomId: { type: String, required: true },
    message: { type: String, required: true },
    senderId: { type: String, required: true },
    uuid: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

export const ChatMessageModel = model<IChatMessage>('ChatMessage', chatMessageSchema);
