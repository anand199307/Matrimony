import { createSlice, combineReducers, createAsyncThunk } from '@reduxjs/toolkit';

import {
  InviteRequest,
  invite,
  users,
  requesData,
  planDatas,
  PlanFormRequest,
  planDataForm,
  planDataUpdateForm,
  Datafaq,
  faqdata,
  faqDatas,
  RequestUpdate,
  UpdateRequestProps,
  storyUpload,
} from '@app/api/setting.api';

export interface AuthSlice {
  activetab: string;
  tabOpen: boolean;
  formPlanDatas: any;
  info: any;
  requestList: any;
  planlist: any;
  planFormList: any;
  planFormUpdate: any;
  planUpdate: any;
  usersList: any;
  Successlist: any;
  Faqlist: any;
  listFaq: string | any;
  image: string;
}

const initialState: AuthSlice = {
  activetab: 'themecontrol',
  formPlanDatas: null,
  tabOpen: false,
  info: null,
  requestList: null,
  planlist: null,
  planFormList: null,
  planFormUpdate: null,
  planUpdate: null,
  usersList: null,
  Successlist: null,
  Faqlist: null,
  listFaq: null,
  image: '',
};

export const InviteAdmin = createAsyncThunk('user/admin_invite', async (invitePayload: InviteRequest, { dispatch }) =>
  invite(invitePayload).then((res) => {
    return res?.data;
  }),
);

export const PlanFormInfo = createAsyncThunk(
  'subscription/create_plan',
  async (planFormPayload: PlanFormRequest, { dispatch }) =>
    planDataForm(planFormPayload).then((res) => {
      return res?.data;
    }),
);

// faq get api
export const faqSegement = createAsyncThunk('site_info', async () => {
  const res = await faqDatas();
  // console.log(res);
  return res;
});

// faq post Api
export const FaqInfo = createAsyncThunk(
  'siteControll',
  async ({ FaqPayload, uuid }: { FaqPayload: faqdata; uuid?: any }, { dispatch }) =>
    Datafaq(FaqPayload, uuid).then((res) => {
      dispatch(faqSegement());
      return res?.data;
    }),
);

export const PlanFormUpdate = createAsyncThunk(
  'subscription/update',
  async (
    { planFormPayload, uuid, status }: { uuid: string; planFormPayload: PlanFormRequest; status: number },
    { dispatch },
  ) => {
    const response = await planDataUpdateForm(planFormPayload || {}, uuid, status);
    dispatch(PlanInfo());
    return response;
  },
);

export const UsersInfo = createAsyncThunk(
  '/users',
  async ({ filter, page }: { filter?: number | string | undefined; page?: number | undefined } = {}) => {
    const res = await users({ filter, page });
    return res;
  },
);

export const RequestInfo = createAsyncThunk('/user_requests', async () => {
  const res = await requesData();
  return res;
});

export const PlanInfo = createAsyncThunk('/subscription/plans', async (page?: number | undefined) => {
  const res = await planDatas(page);
  return res;
});

export const uploadedStory = createAsyncThunk('upload_stories', async () => {
  const res = await storyUpload();
  return res;
});

export const updateRequest = createAsyncThunk(
  '/update_verification_status',
  async ({ Payload }: { Payload: UpdateRequestProps }, { dispatch }) => {
    const response = await RequestUpdate(Payload);
    dispatch(RequestInfo());
    return response;
  },
);

const dataSlice = createSlice({
  name: 'activeTab',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activetab = action.payload;
    },
    setTabOpen: (state, action) => {
      state.tabOpen = action.payload;
    },
    SetformPlanDatas: (state, action) => {
      state.formPlanDatas = action.payload;
    },
    usersList: (state, action) => {
      state.usersList = action.payload;
    },
    getUrl: (state, action) => {
      state.image = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(UsersInfo.fulfilled, (state, action) => {
      state.info = action.payload;
    });
    builder.addCase(RequestInfo.fulfilled, (state, action) => {
      state.requestList = action.payload;
    });
    builder.addCase(PlanInfo.fulfilled, (state, action) => {
      state.planlist = action.payload;
    });
    builder.addCase(PlanFormInfo.fulfilled, (state, action) => {
      state.planFormList = action.payload;
    });

    builder.addCase(PlanFormUpdate.fulfilled, (state, action) => {
      state.planFormUpdate = action.payload;
    });
    builder.addCase(uploadedStory.fulfilled, (state, action) => {
      state.Successlist = action.payload.response;
    });
    builder.addCase(FaqInfo.fulfilled, (state, action) => {
      state.Faqlist = action.payload;
    });

    builder.addCase(faqSegement.fulfilled, (state, action) => {
      state.listFaq = action.payload;
    });
  },
});

const rootReducer = combineReducers({
  info: dataSlice.reducer,
});

export const { setTabOpen, setActiveTab, SetformPlanDatas, usersList, getUrl } = dataSlice.actions;
export default rootReducer;
