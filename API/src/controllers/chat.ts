import { Request, Response, NextFunction } from 'express';
import logger from '../library/logger';
import { errorResponse, successResponse, generateUUID } from '../helpers';
import { ChatRoomModel, IChatRoom } from '../models/chatRoom';
import { ChatMessageModel, IChatMessage } from '../models/chatMessage';
import { ChatRoomParticipantModel, IChatRoomParticipant } from '../models/chatRoomParticipant';
import { getUserByUuid } from '../models/user';

export const getChatRooms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, limit, skip } = res.locals;
    // let fields = '-_id';

    let chatRoomIds = await ChatRoomParticipantModel.find({ userId: user.uuid }).distinct('chatRoomId');
    let query: any = { uuid: { $in: chatRoomIds } };

    let chatRooms = await ChatRoomModel.aggregate([
      { $match: query },
      { $sort: { lastMessageSentAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'chatroomparticipants',
          localField: 'uuid',
          foreignField: 'chatRoomId',
          pipeline: [{ $match: { userId: { $ne: user.uuid } } }, { $project: { _id: 0, chatRoomId: 0, uuid: 0 } }],
          as: 'userDetails'
        }
      }
      // {
      //   $unwind: {
      //     path: '$chatroomparticipants',
      //     preserveNullAndEmptyArrays: true
      //   }
      // },
      // {
      //   $lookup: {
      //     from: 'users',
      //     localField: 'users.uuid',
      //     foreignField: 'userId',
      //     as: 'userImage'
      //   }
      // }
    ]);

    // console.log(chatRooms);

    // const chatRooms = await ChatRoomModel.find(query, fields, { skip: skip, limit: limit }).sort({ lastMessageSentAt: -1 });
    successResponse(res, 200, { data: chatRooms });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(res, String(error));
  }
};

export const chatMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit, skip } = res.locals;
    const { roomId } = req.params;
    let query: any = { chatRoomId: roomId };
    let fields = '-_id';
    let count = await ChatMessageModel.find(query).countDocuments();
    let m = await ChatMessageModel.find(query, fields, { skip: skip, limit: limit }).sort({ createdAt: -1 });
    successResponse(res, 200, { count: count, data: m });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(res, String(error));
  }
};

export const createChatRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = res.locals;
    const { userId } = req.body;

    if (user.uuid === userId) {
      throw new Error('422:You cannot create self chat room');
    }

    const u = await getUserByUuid(userId);

    if (!u) {
      throw new Error('422:User not found to chat with!!');
    }

    let chatRoom: any;
    let chatRoomId;

    let chatRoomIds = await ChatRoomParticipantModel.find({ userId: user.uuid }).distinct('chatRoomId');

    // const chatRooms = await ChatRoomModel.find({ uuid: { $in: chatRoomIds } });

    chatRoom = await ChatRoomParticipantModel.find({
      chatRoomId: { $in: chatRoomIds },
      userId: userId
    });

    if (chatRoom.length === 0) {
      let roomData: IChatRoom = {
        uuid: generateUUID()
      };

      chatRoom = new ChatRoomModel(roomData);
      await chatRoom.save();
      chatRoomId = chatRoom.uuid;
      // Add Room Participants only if room not exist

      for (let userData of [user, u]) {
        let p: IChatRoomParticipant = {
          uuid: generateUUID(),
          chatRoomId: chatRoom.uuid,
          userId: userData.uuid,
          userFirstName: userData.firstName,
          userLastName: userData?.lastName,
          userProfilePhoto: userData?.avatar
        };
        let pObject = new ChatRoomParticipantModel(p);
        await pObject.save();
      }
    } else {
      chatRoomId = chatRoom[0].chatRoomId;
    }
    // Add Room Participants ends here

    successResponse(res, 200, { data: { chatRoomId } });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(res, String(error));
  }
};

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = res.locals;
    const { message, chatRoomId } = req.body;

    const room = await ChatRoomModel.findOne({ uuid: chatRoomId });

    if (!room) {
      throw new Error('404:Chat Room not found!!');
    }

    let msgData: IChatMessage = {
      message: message,
      chatRoomId: chatRoomId,
      senderId: user.uuid,
      uuid: generateUUID()
    };

    const msgObject = new ChatMessageModel(msgData);
    await msgObject.save();

    room.lastMessage = message;
    room.lastMessageSentAt = new Date();
    await room.save();

    successResponse(res, 200, { data: 'Message Sent Successfully' });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(res, String(error));
  }
};

export const chatRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = res.locals;
    const { roomId } = req.params;
    let participant = await ChatRoomParticipantModel.find({ chatRoomId: roomId, userId: { $ne: user.uuid } }).select('-uuid -_id');
    successResponse(res, 200, { data: participant });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(res, String(error));
  }
};
