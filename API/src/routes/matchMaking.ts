import { Router } from "express";
import { checkActiveSession, parsePagination } from './../middleware';

import { filterProfiles, newMatchMaking, newMatchMakingV2 } from "../controllers/matchMaking";

export default (router: Router) => {
    router.get('/api/v1/user/new_matches', checkActiveSession, parsePagination, newMatchMakingV2);
    router.get('/api/v1/user/profile-search',checkActiveSession,parsePagination,filterProfiles)
}