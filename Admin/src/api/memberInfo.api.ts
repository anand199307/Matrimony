import { httpApi } from '@app/api/http.api';

export interface idProps {
  uuid: string | undefined;
  response: any;
}

export interface UpdateInfo {
  status?: number | undefined;
}
//to get selected memberInformation
export const selectedMember = (uuid: string | undefined): Promise<idProps | undefined> =>
  httpApi.get<idProps | undefined>(`user/${uuid}/profile`).then(({ data }) => data);

export const updateUserInfo = (uuid: string, status: number): Promise<UpdateInfo> =>
  httpApi.post<UpdateInfo>(`user/update_profile/${uuid}`, { status }).then(({ data }) => data);
