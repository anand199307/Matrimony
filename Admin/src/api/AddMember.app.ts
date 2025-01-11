import { httpApi } from '@app/api/http.api';
import { onBoradingProps } from '@app/components/common/forms/Partners Preferences/PartnerInfoData';
import { type } from 'os';

interface LanguageProps {
  page: number;
  limit: number;
  response: any;
}
interface CityProps {
  stateId: string;
  response: any;
}
interface stateProps {
  uuid: string;
  response: any;
}
interface ImageProps {
  name: string;
  type: string;
  response: any;
}

export interface RegisterRequest {
  profileType: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  age: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirmation: string;
}
export interface RegisterResponse {
  response: any;
  data: string;
}

//to get mother-tounges list
export const listOfLanguages = ({ page, limit }: { page: number; limit: number }): Promise<LanguageProps> =>
  httpApi.get<LanguageProps>(`mother_tongues?page=${page}&limit${limit}`).then(({ data }) => data);

//to get Countrylist
export const countryData = () => httpApi.get('country').then(({ data }) => data);

// to get citylist
export const cityData = (stateId: string): Promise<CityProps> =>
  httpApi.get<CityProps>(`states/${stateId}/cities`).then(({ data }) => data);

// to get statelist
export const stateData = (uuid: string): Promise<stateProps> =>
  httpApi.get<stateProps>(`country/${uuid}/states`).then(({ data }) => data);

//to get religious list
export const listOfReligious = () => httpApi.get('religious').then(({ data }) => data);

//to get cast list
export const listOfCast = () => httpApi.get('cast_list').then(({ data }) => data);

//to get educationlist
export const listOfEducation = () => httpApi.get('education_list').then(({ data }) => data);

//to get dosham list
export const dhosamList = () => httpApi.get('dhosam_list').then(({ data }) => data);

// to get star list
export const starlist = () => httpApi.get('zodiacDetails').then(({ data }) => data);

//upload image
export const imageUpload = () =>
  httpApi.get<ImageProps>(`user/getSignedUrl?imageType=profile`).then(({ data }) => data);
//IDuploader
export const IdUploader = (type: string) =>
  httpApi.get<ImageProps>(`user/getSignedUrl?imageType= ${type}`).then(({ data }) => data);
//upload profile pdf
export const downloadPdf = (uuid: string) => httpApi.get(`user/${uuid}/profile_pdf`).then(({ data }) => data);

//to register
export const Register = (registerPayload: RegisterRequest): Promise<RegisterResponse> =>
  httpApi.post<RegisterResponse>('auth/register', { ...registerPayload }).then(({ data }) => data?.response);

//onBorading Api
export const onBorading = (onboardingPayload: onBoradingProps): Promise<RegisterResponse> =>
  httpApi.post<RegisterResponse>('/user/onboarding', { ...onboardingPayload }).then(({ data }) => data?.response);

//update Member
export const updateBorading = ({
  onboardingPayload,
  uuid,
}: {
  onboardingPayload: onBoradingProps;
  uuid: string;
}): Promise<RegisterResponse> =>
  httpApi
    .put<RegisterResponse>(`/user/update_profile/${uuid}`, { ...onboardingPayload })
    .then(({ data }) => data?.response);

// to get professions list (Occupation)
export const professionslist = ({ page, limit }: { page: number; limit: number }): Promise<LanguageProps> =>
  httpApi.get(`professions?page=${page}&limit${limit}`).then(({ data }) => data);
