import { httpApi } from '@app/api/http.api';

export interface InviteRequest {
  email: string;
  role: string;
}
export interface InviteResponse {
  response: any;
  data: string;
}

export interface PlanFormRequest {
  chatOption?: boolean;
  contactLimit?: number;
  durationInMonths?: number;
  features?: string[];
  horoscopeOption?: boolean;
  name?: string;
  price?: number;
  status?: number;
}
export interface UpdateRequestProps {
  requestId: string | any;
  verificationStatus: string;
  reasons?: any;
}
export interface idProps {
  uuid: string;
  response: any;
}

export interface faqdata {
  action?: string;
  objectType?: string;
  item?: {
    id?: string;
    question?: string;
    answer?: string;
    storyImage?: string;
    storyContent?: string;
  };
  itemId?: any;
}

export interface planFormUpdateInfo {
  status?: number | undefined;
}

//to invite admin
export const invite = (invitePayload: InviteRequest): Promise<InviteResponse> =>
  httpApi.post<InviteResponse>('user/admin_invite', { ...invitePayload }).then(({ data }) => data?.response);

// to post plan data

export const planDataForm = (planFormPayload: PlanFormRequest): Promise<InviteResponse> =>
  httpApi.post<InviteResponse>('subscription/create_plan', { ...planFormPayload }).then(({ data }) => data?.response);

// to updateRequest
export const RequestUpdate = (Payload: UpdateRequestProps) =>
  httpApi.post(`update_verification_status`, { ...Payload }).then(({ data }) => data?.response);
// to update plan data form

export const planDataUpdateForm = (planFormPayload: PlanFormRequest, uuid: string, status: number): Promise<idProps> =>
  httpApi
    .post<idProps>(`subscription/${uuid}/update`, { ...planFormPayload, status })
    .then(({ data }) => data?.response);

// to update faq
export const Datafaq = (FaqPayload: faqdata, uuid?: any): Promise<InviteResponse> =>
  httpApi.put<InviteResponse>(`/siteControll/${uuid}`, { ...FaqPayload }).then(({ data }) => data?.response);

// to get faq
export const faqDatas = () => httpApi.get('site_info').then(({ data }) => data);

//to get list of users
export const users = ({ filter, page }: { filter?: number | string | undefined; page?: number | undefined } = {}) =>
  httpApi
    .get(filter !== undefined ? `/users?status=${filter}` : `/users?page=${page === undefined ? 1 : page}&limit=10`)
    .then(({ data }) => data);

// to get request table data
export const requesData = () => httpApi.get('/user_requests').then(({ data }) => data);

// to get plan table data

export const planDatas = (page?: number) =>
  httpApi.get(page ? `/subscription/plans?page=${page}&limit=10` : `/subscription/plans`).then(({ data }) => data);

// Upload stories
export const storyUpload = () => httpApi.get(`upload_stories?fileType=image/png`).then(({ data }) => data);
