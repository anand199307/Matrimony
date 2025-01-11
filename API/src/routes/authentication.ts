import { Router } from 'express';

import { login, register, sendForgetPasswordOtp, verifyForgetPasswordOtp, resetPassword } from '../controllers/authetication';

export default (router: Router) => {
  router.post('/api/v1/auth/register', register);
  router.post('/api/v1/auth/login', login);
  router.post('/api/v1/auth/user/forgetPasswordOtp', sendForgetPasswordOtp);
  router.post('/api/v1/auth/user/verifyPasswordOtp/:token', verifyForgetPasswordOtp);
  router.post('/api/v1/auth/user/resetPassword/:token', resetPassword);
};
