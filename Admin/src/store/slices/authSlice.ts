import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  ResetPasswordRequest,
  login,
  LoginRequest,
  signUp,
  SignUpRequest,
  resetPassword,
  verifySecurityCode,
  SecurityCodePayload,
  NewPasswordData,
  setNewPassword,
  currentUser,
  resetPwd,
  resetProps,
  forgotPwd,
} from '@app/api/auth.api';
import { setUser } from '@app/store/slices/userSlice';
import { deleteToken, deleteUser, persistToken, readToken } from '@app/services/localStorage.service';

export interface AuthSlice {
  token: string | null;
  userInfo: any;
}

const initialState: AuthSlice = {
  token: readToken(),
  userInfo: null,
};

export const doLogin = createAsyncThunk('auth/login', async (loginPayload: LoginRequest, { dispatch }) =>
  login(loginPayload).then((res) => {
    dispatch(setUser(res.authToken));
    persistToken(res.authToken);
    return res.token;
  }),
);

export const CurrentUserInfo = createAsyncThunk('/current_user', async () => {
  const res = await currentUser();
  // console.log(res);
  return res;
});

export const doSignUp = createAsyncThunk('auth/register', async (signUpPayload: SignUpRequest) =>
  signUp(signUpPayload),
);

export const doResetPassword = createAsyncThunk(
  'auth/doResetPassword',
  async (resetPassPayload: ResetPasswordRequest) => resetPassword(resetPassPayload),
);

export const doVerifySecurityCode = createAsyncThunk(
  'auth/doVerifySecurityCode',
  async (securityCodePayload: SecurityCodePayload) => verifySecurityCode(securityCodePayload),
);

export const doSetNewPassword = createAsyncThunk('auth/doSetNewPassword', async (newPasswordData: NewPasswordData) =>
  setNewPassword(newPasswordData),
);

export const doLogout = createAsyncThunk('user/signOut', (payload, { dispatch }) => {
  deleteToken();
  deleteUser();
  dispatch(setUser(null));
  localStorage.removeItem('activeTab');
});

export const ResetPassword = createAsyncThunk(
  'reset',
  async ({ token, resetData }: { token: string | null; resetData: resetProps }) => {
    const res = await resetPwd({ token, resetData });
    return res;
  },
);

export const ForgotPassword = createAsyncThunk('forgot', async (email: string) => {
  const res = forgotPwd(email);
  return res;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(doLogout.fulfilled, (state) => {
      state.token = '';
    });
    builder.addCase(CurrentUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload.response;
    });
  },
});

export default authSlice.reducer;
