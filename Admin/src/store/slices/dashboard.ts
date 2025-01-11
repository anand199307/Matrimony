import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Profiles, UserCount, religiousList } from '../../api/Dashboard.api';

export interface Dashboarddata {
  count: [];
  religiousInfo: [];
  profilesInfo: [];
}
const initialState: Dashboarddata = {
  count: [],
  religiousInfo: [],
  profilesInfo: [],
};

export const UserCountInfo = createAsyncThunk('users_count?filter=year', async (activebtn: string) => {
  const res = await UserCount(activebtn);
  return res;
});

export const religiousData = createAsyncThunk(`religious-percentage`, async (activebtn: string) => {
  const res = await religiousList(activebtn);
  return res;
});

export const ProfilesChart = createAsyncThunk(
  'profiles',
  async ({ activebtn, year, filter }: { activebtn: string; year: string; filter?: string }) => {
    const res = await Profiles({ activebtn, year, filter });
    return res;
  },
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(UserCountInfo.fulfilled, (state, action) => {
      state.count = action.payload;
    });
    builder.addCase(religiousData.fulfilled, (state, action) => {
      state.religiousInfo = action.payload;
    });
    builder.addCase(ProfilesChart.fulfilled, (state, action) => {
      state.profilesInfo = action.payload;
      return state;
    });
  },
});

export default dashboardSlice.reducer;
