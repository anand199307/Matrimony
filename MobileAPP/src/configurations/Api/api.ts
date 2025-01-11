import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getInfo} from '../network/NetInfo';
import {authAction} from '../../redux/actions';
import store from '../../redux/store';

let headers = {};

// https://royal-matrimoni-api-c5tbent7ka-el.a.run.app
const api = axios.create({
  baseURL: 'https://royal-matrimoni-api-c5tbent7ka-el.a.run.app/api/v1/',
  headers,
});

api.interceptors.request.use(
  async config => {
    const network = await getInfo();
    if (network.isOnline) {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = token;
      }
    } else {
      //toast
    }
    return config;
  },
  error =>
    new Promise((resolve, reject) => {
      reject(error);
    }),
);

api.interceptors.response.use(
  response =>
    new Promise((resolve, _reject) => {
      resolve(response);
    }),
  error =>
    new Promise((resolve, reject) => {
      if (error.response.status === 403) {
        AsyncStorage.setItem('token', '');
        store.dispatch(authAction.setLogin(false));
        store.dispatch(authAction.setAuthToken(null));
      }
      reject(error.response);
    }),
);

export default api;
