import { createSlice, combineReducers, createAsyncThunk } from '@reduxjs/toolkit';
import { selectedMember, updateUserInfo, UpdateInfo } from '@app/api/memberInfo.api';
import { UsersInfo } from './settingSlice';
import { idProps } from '@app/api/setting.api';

export interface AuthSlice {
  info: any;
  basicInfo: any;
}

const initialState: AuthSlice = {
  info: null,

  basicInfo: null,
};

export const MemberInfo = createAsyncThunk('user', async (uuid: string | undefined) => {
  if (uuid) {
    const res = await selectedMember(uuid);
    return res;
  }
});

export const updateUser = createAsyncThunk(
  'update_profile',
  async ({ uuid, status }: { uuid: string; status: number }, { dispatch }) => {
    const response = await updateUserInfo(uuid, status);
    // dispatch(UsersInfo());
    return response;
  },
);

const memberSlice = createSlice({
  name: 'memberInfo',
  initialState,

  reducers: {
    MemberBasicInfo: (state, action) => {
      state.basicInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(MemberInfo.fulfilled, (state, action) => {
      state.info = action.payload ? action.payload.response : undefined;
    });
  },
});

export const { MemberBasicInfo } = memberSlice.actions;

export default memberSlice.reducer;
