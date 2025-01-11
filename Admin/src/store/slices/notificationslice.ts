import { createSlice, combineReducers, createAsyncThunk } from '@reduxjs/toolkit';
import { notificationlist, notificationStatus } from '@app/api/notification.api';

export interface NotificationData {
  notificationInfo: any;
  dataNotification: any;
  updateStatusNotification: any;
  notifcationCount: any;
}

const initialState: NotificationData = {
  notificationInfo: null,
  dataNotification: null,
  updateStatusNotification: null,
  notifcationCount: null,
};

export const notificationUsers = createAsyncThunk('notifications', async () => {
  const res = await notificationlist();
  return res;
});

export const updateNotificationStatus = createAsyncThunk(
  'notification/read',
  async ({ uuid, status }: { uuid: string; status: number }, { dispatch }) => {
    const response = await notificationStatus(uuid, status);
    dispatch(notificationUsers());
    return response;
  },
);

const notificationSlice = createSlice({
  name: 'notificationInfo',
  initialState,

  reducers: {
    setNotificationInfo: (state, action) => {
      state.notificationInfo = action.payload;
    },
    setnotifcationCount: (state, action) => {
      state.notifcationCount = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(notificationUsers.fulfilled, (state, action) => {
      state.dataNotification = action.payload.data;
    });
    builder.addCase(updateNotificationStatus.fulfilled, (state, action) => {
      state.updateStatusNotification = action.payload.response;
    });
  },
});

const rootReducer = combineReducers({
  info: notificationSlice.reducer,
});

export const { setNotificationInfo, setnotifcationCount } = notificationSlice.actions;

export default rootReducer;
