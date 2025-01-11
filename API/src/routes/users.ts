import { Router } from 'express';

import {
  currentUser,
  getAllUsers,
  phoneOtpSend,
  signOut,
  verifyPhoneOtp,
  userOnbaording,
  getSignedUrl,
  profileImageUpload,
  zodiacDetails,
  matchingProfiles,
  userProfile,
  viewPhoneNumber,
  sendAdminInvite,
  acceptInvite,
  updateUser,
  idVerify,
  actionCounts,
  profilePDF,
  deleteProfileImage,
  getStoriesImageUrl,
  forgotPassword,
  addToIgnoreList,
  addToFavouriteList,
  profileViewed,
  getAllUserUuid,
  getRecentUserData,
  getRandomUserData
} from '../controllers/users';
import { checkActiveSession } from '../middleware';
import { userDataValidator } from '../library/validations';
import { parsePagination, verifyPaymentSignature } from '../middleware/index';
import { createOrder, verifyPayment } from '../controllers/payment';

export default (router: Router) => {
  router.get('/api/v1/users', checkActiveSession, getAllUsers,parsePagination);
  router.get('/api/v1/current_user', checkActiveSession, currentUser);
  router.post('/api/v1/user/sendPhoneOtp', checkActiveSession, phoneOtpSend);
  router.post('/api/v1/user/verifyPhoneOtp', checkActiveSession, verifyPhoneOtp);
  router.post('/api/v1/user/signOut', checkActiveSession, signOut);
  router.post('/api/v1/user/onboarding', checkActiveSession, userDataValidator, userOnbaording);
  router.get('/api/v1/user/getSignedUrl', checkActiveSession, getSignedUrl);
  router.put('/api/v1/user/profileImageUpload', checkActiveSession, profileImageUpload);
  router.get('/api/v1/zodiacDetails', checkActiveSession, zodiacDetails);
  router.get('/api/v1/matchingProfiles', checkActiveSession, parsePagination, matchingProfiles);
  router.post('/api/v1/user/razorpay/create', checkActiveSession, createOrder);
  router.post('/api/v1/user/verify/payment', checkActiveSession, verifyPaymentSignature, verifyPayment);
  router.get('/api/v1/user/:userId/profile', checkActiveSession, userProfile);
  router.get('/api/v1/user/:userId/profileNumber', checkActiveSession, viewPhoneNumber);
  router.post('/api/v1/user/admin_invite',checkActiveSession,sendAdminInvite);
  router.get('/api/v1/user/accept_invitation',acceptInvite);
  router.put('/api/v1/user/update_profile/:uuid',checkActiveSession,updateUser);
  router.get('/api/v1/user/id_verification/:uuid',checkActiveSession,idVerify);
  router.get('/api/v1/user/action_counts',checkActiveSession,actionCounts);
  router.get('/api/v1/user/:userId/profile_pdf',profilePDF);
  router.post('/api/v1/user/delete_image',checkActiveSession,deleteProfileImage);
  router.get('/api/v1/upload_stories',checkActiveSession,getStoriesImageUrl);
  router.put('/api/v1/forgot_password/:email',forgotPassword);
  router.put('/api/v1/user/:userId/addToIgnore',checkActiveSession,addToIgnoreList);
  router.put('/api/v1/user/:userId/addToFavorite',checkActiveSession,addToFavouriteList);
  router.put('/api/v1/user/:userId/addToViewedList',checkActiveSession,profileViewed)
  router.post('/api/v1/user/getUserByUuid',checkActiveSession,getAllUserUuid)
  router.get('/api/v1/user/getRecentUser',checkActiveSession,getRecentUserData)
  router.get('/api/v1/user/getRandomUsers',checkActiveSession,getRandomUserData)
};
