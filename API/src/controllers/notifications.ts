import { Request, Response, NextFunction } from 'express'
import { NotificationModal } from '../models/notifications'
import { generateRandomDigitNumber, errorResponse, successResponse } from '../helpers';
import logger from "../library/logger";


// send or create notifications

export const sendNotifications = async (req: Request, res: Response) => {
    try {
        const { title, body, receiver, notificationType } = req.body;
        const { user } = res.locals;

        // Check for required parameters
        if (!title || !body || !receiver) {
            throw new Error('400: Required parameters were not met.');
        }

        // Generate a random notification ID
        const notificationId = generateRandomDigitNumber(6);

        // Create a new notification and save it to the database
        const notification = new NotificationModal({
            notificationId,
            title,
            body,
            receiver,
            sender: user.id,
            notificationType
        });

        await notification.save();
        successResponse(res, 200, { message: 'Notification sent successfully' });
    } catch (error: any) {
        logger.error(error.message);
        return errorResponse(res, 'Failed to send notification')
    }
};

// Get Notifications for a Specific User:
export const getUserNotification = async (req: Request, res: Response) => {
    try {
        const { limit, skip } = res.locals;
        const { user } = res.locals;
        let status = req.query.status as unknown as boolean;
        // If status is not provided or is empty, set it to default value 1
        if (!status) {
            status = false;
        }
        // Create a filter object based on the query parameters
        const filter: any = { receiver: user.id , status };

        // Find notifications for the specified user id and status, sorted by createdAt in descending order
        const notifications = await NotificationModal.find(filter)
            .sort({ createdAt: -1 })
            .populate([
                // {
                //     path: 'receiver',
                //     select: 'firstName lastName profileId', // Select only the desired fields from the receiver
                // },
                {
                    path: 'sender',
                    select: 'firstName lastName profileId', // Select only the desired fields from the sender
                },
            ]).select('-_id -updatedAt').limit(limit).skip(skip).lean();

        // Get the total count of notifications for the user
        const totalCount = await NotificationModal.countDocuments(filter);
        successResponse(res, 200, { data: notifications, count: totalCount });
    } catch (error: any) {
        return errorResponse(res, 'Failed to fetch notifications')
    }
}

// Mark a Notification as Read:
export const markAsRead = async (req: Request, res: Response) => {
    try {
        const { notificationId } = req.params;

        // Find the unread notification by ID and update the read status to true
        const updatedNotification = await NotificationModal.findOneAndUpdate(
            { notificationId: notificationId, status: false }, // Use both _id and status in the filter
            { status: true },
            { new: true } // Return the updated document
        ).lean();

        if (!updatedNotification) {
            return res.status(404).json({ error: 'Notification not found or already read' });
        }

        successResponse(res, 200, { message: 'Notification marked as read' });
    } catch (error: any) {
        logger.error(error.message);
        return errorResponse(res, 'Failed to mark notification as read');
    }
};

// get All notifications
export const getNotificationsWithFilter = async (req: Request, res: Response,) => {
    try {
        let status = false;
        const { notificationId, type } = req.query;
        const { limit, skip } = res.locals;

        // Create a filter object based on the query parameters
        const filter: any = { status };

        // Add filter for notificationId if provided
        if (notificationId) {
            filter.notificationId = notificationId;
        }

        // Add filter for type if provided
        if (type) {
            filter.type = type;
        }

        // Find notifications with the specified filter, sorted by createdAt in descending order
        const notifications = await NotificationModal.find(filter)
            .sort({ createdAt: -1 })
            .select('-_id -updatedAt -__v') // Exclude unnecessary fields
            .populate([
                {
                    path: 'sender',
                    select: 'firstName lastName profileId', // Select only the desired fields from the sender
                },
            ]).limit(limit).skip(skip).lean();

        // Get the total count of notifications with the specified filter
        const totalCount = await NotificationModal.countDocuments(filter);

        successResponse(res, 200, { data: notifications, count: totalCount });
    } catch (error: any) {
        logger.error(error.message);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
};
