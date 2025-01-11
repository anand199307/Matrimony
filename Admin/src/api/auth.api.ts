import { httpApi } from '@app/api/http.api';
import { UserModel } from '@app/domain/UserModel';
import { InviteResponse } from './setting.api';

export interface AuthData {
  email: string;
  password: string;
}

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface SecurityCodePayload {
  code: string;
}

export interface NewPasswordData {
  newPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  authToken: any;
  response: any;
  token: string;
  user?: UserModel;
}

export interface resetProps {
  pwd: string;
  confirmpwd: string;
}

//to login
export const login = (loginPayload: LoginRequest): Promise<LoginResponse> =>
  httpApi.post<LoginResponse>('auth/login', { ...loginPayload }).then(({ data }) => data?.response);

//to get current user info
export const currentUser = () => httpApi.get('/current_user').then(({ data }) => data);

// reset password
export const resetPwd = ({
  token,
  resetData,
}: {
  token: string | null;
  resetData: resetProps;
}): Promise<InviteResponse> =>
  httpApi.post(`auth/user/resetPassword/${token}`, { ...resetData }).then(({ data }) => data);

//forgot password
export const forgotPwd = (email: string) => httpApi.put(`forgot_password/${email}`).then(({ data }) => data);

//unused Aip's
export const signUp = (signUpData: SignUpRequest): Promise<undefined> =>
  httpApi.post<undefined>('auth/register', { ...signUpData }).then(({ data }) => data);

export const resetPassword = (resetPasswordPayload: ResetPasswordRequest): Promise<undefined> =>
  httpApi.post<undefined>('forgotPassword', { ...resetPasswordPayload }).then(({ data }) => data);

export const verifySecurityCode = (securityCodePayload: SecurityCodePayload): Promise<undefined> =>
  httpApi.post<undefined>('verifySecurityCode', { ...securityCodePayload }).then(({ data }) => data);

export const setNewPassword = (newPasswordData: NewPasswordData): Promise<undefined> =>
  httpApi.post<undefined>('setNewPassword', { ...newPasswordData }).then(({ data }) => data);
