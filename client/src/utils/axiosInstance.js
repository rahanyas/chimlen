import axios from 'axios';

const baseURL = import.meta.env.VITE_NODE_ENV === "development" ? `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:9000'}/api` : `${import.meta.env.VITE_PRODUCTION_BACKEND_URL || 'https://chimlen.onrender.com'}/api`;

 console.log('baseurl for axios : ',baseURL);

const axiosInstance = axios.create({
  baseURL : baseURL,
  withCredentials : true,
  headers : {
    'Content-Type' : 'application/json'
  }
});

export default axiosInstance;