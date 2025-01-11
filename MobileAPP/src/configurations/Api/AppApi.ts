import api from './api';

interface request {
  url?: any;
  headers?: object | any;
  body?: object | any;
  params?: object | any;
  id?: string | number;
  page?: string;
  limit?: number;
  uuid?: string;
  roomId?: string;
  imageType?: string;
  status?: string;
}

const AppApi = {
  signUp: ({body}: request) => api.post('auth/register', body),
  signIn: ({body}: request) => api.post('auth/login', body),
  signOut: () => api.post('user/signOut'),
  getCurrentUser: () => api.get('current_user'),
  onBoardRegister: ({body}: request) => api.post('user/onboarding', body),
  sentPhoneNumberVerification: () => api.post('user/sendPhoneOtp'),
  verfiyOtp: ({body}: request) => api.post('user/verifyPhoneOtp', body),
  forgotPassword: ({body}: request) =>
    api.post('auth/user/forgetPasswordOtp', body),
  forgotPasswordOtp: ({body}: request, token: any) =>
    api.post(`auth/user/verifyPasswordOtp/${token}`, body),
  resetPassword: ({body}: request, token: any) =>
    api.post(`auth/user/resetPassword/${token}`, body),
  signedUrl: ({imageType}: request) =>
    api.get(`user/getSignedUrl?imageType=${imageType}`),
  profileImageUpload: ({body}: request) =>
    api.put('user/profileImageUpload', body),
  zodiacDetails: () => api.get('zodiacDetails'),
  country: () => api.get('country'),
  language: (page: number, limit: number, query: string) =>
    api.get(
      `mother_tongues?page=${page}&limit=${limit}&search${
        query ? `=${query}` : ''
      }`,
    ),
  religion: (page: number, limit: number, param: string) =>
    api.get(
      `religious?page=${page}&limit=${limit}&search${param ? `=${param}` : ''}`,
    ),
  caste: (page: number, limit: number, query: string) =>
    api.get(
      `cast_list?page=${page}&limit=${limit}&search${query ? `=${query}` : ''}`,
    ),
  education: (param: string) =>
    api.get(`education_list?search${param ? `=${param}` : ''}`),
  states: ({url}: request) => api.get(url),
  cities: ({url}: any) => api.get(url),
  getActionCount: () => api.get('/user/action_counts'),
  getProfessions: (page: number, limit: number, param: string = '') =>
    api.get(
      `/professions?page=${page}&limit=${limit}&search${
        param ? `=${param}` : ''
      }`,
    ),
  getNewMatches: ({limit, body}: request) =>
    api.get(`/user/new_matches?limit=${limit}`, body),
  addToFavouriteList: ({id}: request) => api.put(`/user/${id}/addToFavorite`),
  addToIngoreList: ({id}: request) => api.put(`/user/${id}/addToIgnore`),
  addToProfileViewdList: ({id}: request) =>
    api.put(`/user/${id}/addToViewedList`),
  getProfileInfo: ({id}: request) => api.get(`/user/${id}/profile`),
  getPlans: () => api.get('/subscription/plans?status=1'),
  getDoshamList: () => api.get('/dhosam_list'),
  updateProfile: ({body}: request, uuid: string) =>
    api.put(`/user/update_profile/${uuid}`, body),
  createChatRoom: ({body}: request) => api.post('/user/createChatRoom', body),
  getChatMessage: ({limit, page, roomId}: request) =>
    api.get(`/user/getMessages/${roomId}?limit=${limit}&page=${page}`),
  getChatRooms: () => api.get('/user/chatRooms'),
  sendMessage: ({body}: request) => api.post('/user/sendMessage', body),
  getNotifications: ({limit, page}: request) =>
    api.get(`/user/notifications?limit=${limit}&page=${page}`),
  updateNotificationStatus: ({id}: request) =>
    api.put(`/notification/${id}/read`),
  createRequest: ({body}: request) => api.post('/create_request', body),
  sendProfileRequest: ({body}: request) =>
    api.post('/user/send_profile_request', body),
  getRequestedProfiles: ({limit, page, status}: request) =>
    api.get(
      `/user/requested_profiles?limit=${limit}&page=${page}&status=${status}`,
    ),
  getPaymentOrderId: ({body}: request) =>
    api.post('/user/razorpay/create', body),
  verifyPaymentSignature: ({body}: request) => {
    return api.post('/user/verify/payment', body);
  },
  getPhoneNumber: (id: string) => {
    return api.get(`/user/${id}/profileNumber`);
  },
};

export default AppApi;
