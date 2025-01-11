import { httpApi } from '@app/api/http.api';

// to get Religion Added
export const religiousList = (activebtn: string) =>
  httpApi.get(`religious-percentage?filter=${activebtn}`).then(({ data }) => data);

//to get members count
export const UserCount = (activebtn: string) => httpApi.get(`users_count?filter=${activebtn}`).then(({ data }) => data);

//to get male and female  profiles
export const Profiles = ({ activebtn, year, filter }: { activebtn: string; year: string; filter?: string }) =>
  httpApi
    .get(
      activebtn === 'year'
        ? `/users_count_chart?filter=${activebtn}&year=${filter}`
        : activebtn === 'month'
        ? `/users_count_chart?filter=${activebtn}&year=${year}&month=${filter}`
        : `/users_count_chart?filter=${activebtn}`,
    )
    .then(({ data }) => data);
