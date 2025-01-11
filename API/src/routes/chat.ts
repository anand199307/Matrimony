import { Router } from 'express';

import { checkActiveSession, parsePagination } from '../middleware';
import { createChatRoom, sendMessage, chatMessages, chatRoom, getChatRooms } from '../controllers/chat';

export default (router: Router) => {
  router.post('/api/v1/user/createChatRoom', checkActiveSession, createChatRoom);
  router.post('/api/v1/user/sendMessage', checkActiveSession, sendMessage);
  router.get('/api/v1/user/getMessages/:roomId', checkActiveSession, parsePagination, chatMessages);
  router.get('/api/v1/user/chatRoom/:roomId', checkActiveSession, chatRoom);
  router.get('/api/v1/user/chatRooms', checkActiveSession, parsePagination, getChatRooms);
};
