import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import store from '../Redux/store';
import { authConstants } from '../Redux/actions/constants';
import { api } from '../Config/urlConfig';

const token = window.localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

axiosInstance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

// axiosInstance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   (error) => {
//     console.log(error.response);
//     const status = error.response ? error.response.status : 500;

//     if ((status && status === 500) || status === 400) {
//       localStorage.clear();
//       store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
