import axios from 'axios';

const baseURL = import.meta.env.VITE_NODE_ENV === "development" ? import.meta.env.VITE_BACKEND_URL+'/api' : import.meta.env.VITE_PRODUCTION_BACKEND_URL+'/api';
// console.log(baseURL);

const axiosInstance = axios.create({
  baseURL : baseURL,
  withCredentials : true,
  headers : {
    'Content-Type' : 'application/json'
  }
});

export default axiosInstance;