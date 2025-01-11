import {
  USER_LOGGED,
  FORGOT_PASSWORD_MOBILENUMBER,
  COUNTRY_DETAILS,
  CURRENT_USER,
  LANGUAGE,
  RELIGION,
  CASTE,
  EDUCATION,
  SET_AUTHTOKEN,
} from '../types';

const setLogin = (payload: any) => ({
  type: USER_LOGGED,
  payload,
});

const setForgotPasswordNumber = (payload: any) => ({
  type: FORGOT_PASSWORD_MOBILENUMBER,
  payload,
});

const setCountry = (payload: any) => ({
  type: COUNTRY_DETAILS,
  payload,
});

const setLanguage = (payload: any) => ({
  type: LANGUAGE,
  payload,
});

const setCaste = (payload: any) => ({
  type: CASTE,
  payload,
});

const setReligion = (payload: any) => ({
  type: RELIGION,
  payload,
});

const setEducation = (payload: any) => ({
  type: EDUCATION,
  payload,
});

const setCurrentUser = (payload: any) => ({
  type: CURRENT_USER,
  payload,
});

const setAuthToken = (payload: any) => ({
  type: SET_AUTHTOKEN,
  payload,
});

export default {
  setLogin,
  setForgotPasswordNumber,
  setCountry,
  setCurrentUser,
  setLanguage,
  setCaste,
  setReligion,
  setEducation,
  setAuthToken,
};
