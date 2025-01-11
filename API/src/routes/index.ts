import { Router } from 'express';
import authentication from './authentication';
import users from './users';
import location from './location';
import chat from './chat';
import commonapis from './commonapis';
import userRequests from './userRequests';
import subscriptions from './subscriptions';
import notifications from './notifications';
import matchMaking from './matchMaking';
import profileRequests from './profileRequests';

const router = Router();

export default (): Router => {
  authentication(router);
  users(router);
  location(router);
  chat(router);
  commonapis(router);
  userRequests(router);
  subscriptions(router);
  notifications(router);
  matchMaking(router);
  profileRequests(router);
  return router;
};
