import { httpApi } from './http.api';
export interface idProps {
  uuid: string;
  response: any;
}

export interface notificationStatusInfo {
  status?: number | undefined;
}

// to get notification

export const notificationlist = () => httpApi.get('/notifications').then(({ data }) => data?.response);

// to update notification data

export const notificationStatus = (uuid: string, status: number): Promise<idProps> =>
  httpApi.put(`notification/${uuid}/read`, { status }).then(({ data }) => data?.response);
