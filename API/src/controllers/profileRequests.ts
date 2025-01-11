import { Request, Response } from "express";
import { ProfileRequestModal } from "../models/profileRequests";
import { generateRandomDigitNumber } from "../helpers";
import logger from "../library/logger";
import { createNotifications } from "../models/notifications";
//  send request to  profiles

export const sendProfileRequest = async (req: Request, res: Response) => {
    try {
        const { receiverUserId } = req.body;
        const { user } = res.locals;
        // Create a new request
        const requestId = generateRandomDigitNumber(4);
        const request = new ProfileRequestModal({ requestId, senderUserId: user.id, receiverUserId });
        await request.save();
        let details = {
            title: "Profile Request",
            body: `${user.firstName} has send the request.`,
            receiver: receiverUserId,
            sender: user.id,
            notificationType: "Profile Request"
        }
        await createNotifications(details);
        res.status(200).json({ data: "Request send sucessfully" });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Failed sending request' });
    }
}

// Get ProfileRequestList for a Specific User:
export const getUserRequestedProfiles = async (req: Request, res: Response) => {
    try {
        const { limit, skip } = res.locals;
        const { user } = res.locals;
        const status = req.query.status as string || 'pending';

        if (status !== 'pending' && status !== 'accepted' && status !== 'rejected') {
            return res.status(400).json({ message: "Invalid status value" });
        }
        const filter: any = { senderUserId: user.id, status };

        const projection = {
            _id: 0,
            updatedAt: 0,
            createdAt: 0,
        };

        const requestList = await ProfileRequestModal.find(filter)
            .sort({ createdAt: -1 })
            .select(projection)
            .populate([
                {
                    path: 'receiverUserId',
                    select: 'firstName lastName profileId avatar basicDetails',
                },
            ])
            .limit(limit)
            .skip(skip)
            .lean();

        const totalCount = await ProfileRequestModal.countDocuments(filter);
        res.status(200).json({ data: requestList, count: totalCount });
    } catch (error: any) {
        logger.error(error);
        res.status(500).json({ message: "Failed to fetch" });
    }
}

// Update request status
export const updateRequestStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;
        const requestId = req.params.requestId;
        const { user } = res.locals;
        if (status !== 'accepted' && status !== 'rejected') {
            return res.status(400).json({ message: "Invalid status value" });
        }
        const request = await ProfileRequestModal.findOneAndUpdate(
            { requestId: requestId },
            { status: status },
            { new: true }
        );
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        const receiverUserId = await ProfileRequestModal.find({ requestId: requestId })
        const receiverId = receiverUserId[0].receiverUserId;
        let details = {
            title: "Profile Request",
            body: `${user.firstName} has  ${status} the request.`,
            receiver: receiverId,
            sender: user.id,
            notificationType: "Profile Request"
        }
        await createNotifications(details);
        res.status(200).json({ data: `You ${status} the profile` });
    } catch (error) {
        console.log(error)
        logger.error(error);
        res.status(500).json({ message: 'Error updating request status' });
    }
}