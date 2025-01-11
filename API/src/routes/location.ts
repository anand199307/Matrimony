import { Router } from 'express';

import { country, states, cities } from '../controllers/location';
import { checkActiveSession, parsePagination } from '../middleware';

export default (router: Router) => {
  router.get('/api/v1/country', checkActiveSession, country);
  router.get('/api/v1/country/:countryId/states', checkActiveSession, parsePagination, states);
  router.get('/api/v1/states/:stateId/cities', checkActiveSession, parsePagination, cities);
};
