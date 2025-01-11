import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  listOfCast,
  listOfEducation,
  listOfLanguages,
  listOfReligious,
  countryData,
  cityData,
  stateData,
  dhosamList,
  starlist,
  imageUpload,
  RegisterRequest,
  Register,
  downloadPdf,
  onBorading,
  updateBorading,
  IdUploader,
  professionslist,
} from '@app/api/AddMember.app';
import axios from 'axios';
import { onBoradingProps } from '@app/components/common/forms/Partners Preferences/PartnerInfoData';
import { UsersInfo } from './settingSlice';
import { MemberInfo } from './memberInfoSlice';
import { number } from 'echarts';

export interface AuthSlice {
  languages: {
    data: { _id: string; name: string; uuid: string }[];
  };
  religious: { data: { name: string; uuid: string }[] };
  casts: any;
  educationList: any;
  list: any;
  countries: any;
  selectCities: { data: [] };
  selectStates: { data: [] };
  dhosams: { data: [] };
  stars: { data: [] };
  url: any;
  card: any;
  profilePdf: any;
  register: any;
  onboarding: any;
  type: string;
  starList: any;
  PartnerstarList: any;
  OccupationData: {
    data: { _id: string; name: string; uuid: string }[];
  };
}

const initialState: AuthSlice = {
  languages: { data: [] },
  religious: { data: [] },
  casts: null,
  educationList: null,
  list: null,
  countries: null,
  selectCities: { data: [] },
  selectStates: { data: [] },
  dhosams: { data: [] },
  stars: { data: [] },
  url: null,
  card: null,
  profilePdf: null,
  register: null,
  onboarding: null,
  type: '',
  starList: null,
  PartnerstarList: null,
  OccupationData: { data: [] },
};

interface FileDetails {
  lastModified: number;
  //lastModifiedDate?: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
export const motherTounges = createAsyncThunk(
  'mother_tongues',
  async ({ page, limit }: { page: number; limit: number }) => {
    const res = await listOfLanguages({ page, limit });
    return res;
  },
);

export const religiuosList = createAsyncThunk('religious', async () => {
  const res = await listOfReligious();
  return res;
});
export const cast_list = createAsyncThunk('cast_list', async () => {
  const res = await listOfCast();
  return res;
});

export const education_list = createAsyncThunk('education_list', async () => {
  const res = await listOfEducation();
  return res;
});

export const countryList = createAsyncThunk('country', async () => {
  const res = await countryData();
  return res;
});

export const citylist = createAsyncThunk('states/cities', async (stateId: string) => {
  const res = await cityData(stateId);
  return res.response;
});

export const statelist = createAsyncThunk('country/states', async (uuid: string) => {
  const res = await stateData(uuid);
  return res.response;
});

export const dhosamData = createAsyncThunk('dhosam_list', async () => {
  const res = await dhosamList();
  return res;
});

export const starData = createAsyncThunk('zodiacDetails', async () => {
  const res = await starlist();
  return res;
});

export const uploadedimage = createAsyncThunk('user/getSignedUrl', async () => {
  const res = await imageUpload();
  return res;
});
export const UploadID = createAsyncThunk('DocumentUploader', async (type: string) => {
  const res = await IdUploader(type);
  return res;
});
export const downloadProfile = createAsyncThunk('user/profile_pdf', async (uuid: string) => {
  const res = await downloadPdf(uuid);
  window.open(`https://royal-matrimoni-api-c5tbent7ka-el.a.run.app/api/v1/user/${uuid}/profile_pdf`, '_blank');
  return res;
});

export const RegisterApi = createAsyncThunk('auth/register', async (registerPayload: RegisterRequest, { dispatch }) =>
  Register(registerPayload).then((res) => {
    return res?.data;
  }),
);

export const OnboardingApi = createAsyncThunk(
  'user/onboarding',
  async (onboardingPayload: onBoradingProps, { dispatch }) =>
    onBorading(onboardingPayload).then((res) => {
      dispatch(UsersInfo({}));
      return res;
    }),
);

export const updateMember = createAsyncThunk(
  'updatingMemmer',
  async ({ onboardingPayload, uuid }: { onboardingPayload: onBoradingProps; uuid: string }, { dispatch }) => {
    try {
      const res = await updateBorading({ onboardingPayload, uuid });
      dispatch(UsersInfo({}));
      dispatch(MemberInfo(uuid));
      return res;
    } catch (err) {
      throw err;
    }
  },
);

export const listOccupation = createAsyncThunk(
  'professions',
  async ({ page, limit }: { page: number; limit: number }) => {
    const res = await professionslist({ page, limit });
    return res;
  },
);

export const getImage = (url: any, FileObj: FileDetails) => {
  return async (dispatch: any) => {
    if (url && FileObj) {
      try {
        await axios.put(url?.url, FileObj, {
          headers: {
            'Content-Type': FileObj?.type,
          },
        });
      } catch (error) {
        console.log('error', error);
      }
    }
  };
};
const AddSlice = createSlice({
  name: 'memberInfo',
  initialState,
  reducers: {
    languagesList: (state, action) => {
      state.list = action.payload;
    },
    slectedIdCard: (state, action) => {
      state.type = action.payload;
    },
    selectedMoonSign: (state, action) => {
      state.starList = action.payload;
    },
    selectedPartnerSign: (state, action) => {
      state.PartnerstarList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(motherTounges.fulfilled, (state, action) => {
      state.languages = action.payload.response;
    });

    builder.addCase(countryList.fulfilled, (state, action) => {
      state.countries = action.payload.response;
    });

    builder.addCase(citylist.fulfilled, (state, action) => {
      state.selectCities = action.payload;
    });

    builder.addCase(statelist.fulfilled, (state, action) => {
      state.selectStates = action.payload;
    });
    builder.addCase(religiuosList.fulfilled, (state, action) => {
      state.religious = action.payload.response;
    });
    builder.addCase(cast_list.fulfilled, (state, action) => {
      state.casts = action.payload.response;
    });
    builder.addCase(education_list.fulfilled, (state, action) => {
      state.educationList = action.payload.response;
    });
    builder.addCase(dhosamData.fulfilled, (state, action) => {
      state.dhosams = action.payload.response;
    });

    builder.addCase(starData.fulfilled, (state, action) => {
      state.stars = action.payload.response;
    });
    builder.addCase(uploadedimage.fulfilled, (state, action) => {
      state.url = action.payload.response;
    });
    builder.addCase(UploadID.fulfilled, (state, action) => {
      state.card = action.payload.response;
    });
    builder.addCase(downloadProfile.fulfilled, (state, action) => {
      state.profilePdf = action.payload.response;
    });
    builder.addCase(RegisterApi.fulfilled, (state, action) => {
      state.register = action.payload;
    });
    builder.addCase(OnboardingApi.fulfilled, (state, action) => {
      state.onboarding = action.payload;
    });
    builder.addCase(listOccupation.fulfilled, (state, action) => {
      state.OccupationData = action.payload.response;
    });
  },
});

export const { languagesList, slectedIdCard, selectedMoonSign, selectedPartnerSign } = AddSlice.actions;
export default AddSlice.reducer;
