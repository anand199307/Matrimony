import { Router } from 'express';
import { checkActiveSession,parsePagination } from '../middleware';
import { createRequest, getAllUsersWithRequests, updateVerificationStatus } from '../controllers/userRequests';

export default (router: Router) => {
  router.post('/api/v1/create_request', checkActiveSession, createRequest);
  router.get('/api/v1/user_requests',checkActiveSession,getAllUsersWithRequests,parsePagination);
  router.post('/api/v1/update_verification_status',checkActiveSession,updateVerificationStatus)
};