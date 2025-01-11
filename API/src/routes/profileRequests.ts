import { Router } from "express";
import { checkActiveSession, parsePagination } from './../middleware';

import { sendProfileRequest,getUserRequestedProfiles, updateRequestStatus } from "../controllers/profileRequests";

export default (router: Router) => {
    router.post('/api/v1/user/send_profile_request', checkActiveSession,sendProfileRequest);
    router.get('/api/v1/user/requested_profiles',checkActiveSession,parsePagination,getUserRequestedProfiles);
    router.put('/api/v1/user/:requestId/requests',checkActiveSession,updateRequestStatus)
}