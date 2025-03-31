import axios from 'axios';

const baseURL = import.meta.env.VITE_NODE_ENV === "development" ? 'http://localhost:9000/api' : 'https://chimlen.onrender.com/api';

 console.log('baseurl fo axios : ',baseURL);

const axiosInstance = axios.create({
  baseURL : baseURL,
  withCredentials : true,
  headers : {
    'Content-Type' : 'application/json'
  }
});

export default axiosInstance;