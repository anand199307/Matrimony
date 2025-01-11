/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import {getInfo} from '../network/NetInfo';
import {useSelector} from 'react-redux';
// const { baseURL, header, log } = appConfig.apiConnections.server

// onRequest
const requestHandler = async (request: any) => {
  const isLoggedIn = useSelector((state: any) => state.todo.is_logged);
  const network = await getInfo();

  console.log('isLoggedIn', isLoggedIn);
  console.log('request', request);

  // Set default header if exist
  // if (header) request.headers = {
  //     ...header,
  //     "Authorization": isLoggedIn?.auth_token ?? '',
  //     ...request.headers,
  // }

  // stop req if network not exist
  if (!network.isOnline) {
    return false;
  }
  // log req if apiLog is true
  // if (log) console.log("### request from app", request)
  return request;
};

// onResponse
const responseHandler = (response: any) => response;

// onError
const errorHandler = (mode: string, error: any) => {
  return Promise.reject(error);
};

// onRequest Interceptor
const requestInterceptor = axios.interceptors.request.use(
  request => requestHandler(request),
  error => errorHandler('onRequest-app-interceptor', error),
);

// onResponse Interceptor
const responseInterceptor = axios.interceptors.response.use(
  response => responseHandler(response),
  error => errorHandler('onResponse-app-interceptor', error),
);

// Interceptor configure
// axios.defaults.baseURL = baseURL
export default () => {
  requestInterceptor;
  responseInterceptor;
};
