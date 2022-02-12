import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://admin.duclux.com/api',
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  function (resp) {
    return resp.data;
  },
  function (resp) {
    return Promise.reject(resp);
  },
);

export default axiosInstance;
