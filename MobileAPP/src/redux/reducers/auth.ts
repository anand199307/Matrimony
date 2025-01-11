import {
  USER_LOGGED,
  FORGOT_PASSWORD_MOBILENUMBER,
  COUNTRY_DETAILS,
  CURRENT_USER,
  RELIGION,
  EDUCATION,
  CASTE,
  LANGUAGE,
  SET_AUTHTOKEN,
} from '../types';

const initialState = {
  is_logged: false,
  forgotPasswordMobileNumber: {
    mobileNumber: '',
    token: '',
  },
  country: [],
  currentUser: {},
  language: [],
  religion: [],
  caste: [],
  education: [],
  authToken: null,
};

type Action = {
  type: string;
  payload?: any;
};

export default (state: any = initialState, action: Action) => {
  switch (action.type) {
    case USER_LOGGED:
      return Object.assign({}, state, {
        is_logged: action.payload,
      });
    case FORGOT_PASSWORD_MOBILENUMBER:
      return Object.assign({}, state, {
        forgotPasswordMobileNumber: action.payload,
      });
    case COUNTRY_DETAILS:
      return Object.assign({}, state, {
        country: action.payload,
      });
    case CURRENT_USER:
      return Object.assign({}, state, {
        currentUser: action.payload,
      });
    case LANGUAGE:
      return Object.assign({}, state, {
        language: action.payload,
      });
    case RELIGION:
      return Object.assign({}, state, {
        religion: action.payload,
      });
    case CASTE:
      return Object.assign({}, state, {
        caste: action.payload,
      });
    case EDUCATION:
      return Object.assign({}, state, {
        education: action.payload,
      });
    case SET_AUTHTOKEN:
      return Object.assign({}, state, {
        authToken: action.payload,
      });
    default:
      return state;
  }
};
