import axios from 'axios';

const defaultOptions = {
  timeout: 10000,
};

const axiosApiInstance = axios.create(defaultOptions);

axiosApiInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response),
);

export default axiosApiInstance;
