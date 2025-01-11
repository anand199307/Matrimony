import { generateRandomDigitNumber } from '../helpers';
import { model, Schema } from 'mongoose'
const mongoose = require('mongoose');

export interface Notifications {
    notificationId: string,
    sender: string,
    receiver: string,
    title?: string,
    body?: string
    status?: boolean,
    notificationType?: string
}

const notificationsSchema = new Schema<Notifications>(
    {
        notificationId: { type: String, required: true, index: true },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: false,
        },
        notificationType: {
            type: String,
        }
    },
    { timestamps: true, versionKey: false }
)

export const createNotifications = async (details: { title: string; body: any; receiver: string; sender: string; notificationType: string; }) => {
    const { title, body, receiver, notificationType, sender } = details;
    const notificationId = generateRandomDigitNumber(6);
    const notification = new NotificationModal({
        notificationId,
        title,
        body,
        receiver,
        sender,
        notificationType
    });
    await notification.save();
    return;
};

export const NotificationModal = model<Notifications>('Notifications', notificationsSchema)