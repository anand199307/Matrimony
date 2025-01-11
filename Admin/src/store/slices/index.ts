import userReducer from './userSlice';
import authReducer from './authSlice';
import themeReducer from './themeSlice';
import dataReducer from './settingSlice';
import memberReducer from './memberInfoSlice';
import addMember from './addMember';
import notificationReducer from './notificationslice';
import dashboard from './dashboard';

export default {
  user: userReducer,
  auth: authReducer,
  theme: themeReducer,
  data: dataReducer,
  member: memberReducer,
  form: addMember,
  notification: notificationReducer,
  dashboard: dashboard,
};
