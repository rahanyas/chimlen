/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import axiosInstance from "../utils/axiosInstance";
import {io} from "socket.io-client";

 const baseUrl = import.meta.env.VITE_NODE_ENV ==="development" ? import.meta.env.VITE_BACKEND_URL  : import.meta.env.VITE_PRODUCTION_BACKEND_URL ;

 console.log('base url :', baseUrl);

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [isUser, setIsUser] = useState({});

  const [user, setUser] = useState({
    userName : '',
    email : '',
    password: '',
    mobile : ''
  });

  const socketRef = useRef(null);

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get('/checkAuth', {withCredentials : true});
        console.log('checkAuth Res : ', res);
        setIsUser({status : res?.data?.status, loading : res?.data?.loading});
      } catch (err) {
        console.log('Error from checkAuth:', err)
        if (err.response?.status === 400) {
          console.log("User is not authenticated");
        }; 
        setIsUser({ status: false, loading : true });
      };
    };
    checkAuth();
  }, []);

  useEffect(() => {
        if(isUser.status){
          connectSocket()
        };

        return () => {
          disConnectSocket()
        }
  }, [isUser.status])

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = useCallback(
    async (confirmPass, navigate) => {
      if (!user.userName || !user.email || !user.mobile || !user.password || !confirmPass) {
        setErrMsg("All fields are required");
        return;
      }
      if(user.password !== confirmPass){
        setErrMsg("password do not match");
        return;
      };
  
      try {
        const res = await axiosInstance.post('/signup', user, {withCredentials : true});
        console.log(res);
        setIsUser({status : true  , loading : false});
        navigate('/') 
      } catch (err) {
        console.log(err)
        setErrMsg(err?.response?.data?.error || 'signup failed');
        console.log(err?.response?.data?.error);
        setIsUser({status : false})
      }
    },[user],
  );
  

  const handleLogout = useCallback(
    async (navigate) => {
      try {
        const res = await axiosInstance.post('/logout');
        setIsUser({status : res?.data?.status});
        setErrMsg(res?.data?.msg)
        disConnectSocket();
        setTimeout(() => {
          navigate('/')
        }, 1500);
      } catch (err) {
        console.log(err);
        setErrMsg(err?.response?.data?.msg || 'something went wrong... Logout failed ')
      }
  },[],
  );

  function connectSocket(){
    console.log('socket ref : ', socketRef.current);
    
    if(socketRef.current?.connected) return; 
    const socket = io(baseUrl, {
      withCredentials : true
    });
    socket.connect();
    socketRef.current = socket;
  };

  const handleLogin =  useCallback(
    async (navigate) => {
      try {
        const {email, password} = user;
        if(!email || !password){
          setErrMsg('all feids are required');
          return;
        }
          const res = await axiosInstance.post('/login',{email, password}, {withCredentials
             : true
          });
          console.log('login successfull : ' , res);
          setIsUser({status : true, loading : false});
          navigate('/');
      } catch (err) {
        console.log(err);
        setErrMsg(err?.response?.data?.msg || "Login failed")
        setIsUser({status : false})
      }
    },[user]
  );


  function disConnectSocket(){
    if(socketRef.current?.connected){
      socketRef.current?.disconnect();
      socketRef.current = null
    }
  }

  const googleLogin = () => {
    window.location.href = import.meta.env.VITE_NODE_ENV === "development" ? 'http://localhost:9000/auth/google' : "https://chimlen.onrender.com/auth/google"
  };

  const users = [
  "Omar",
  "Yusuf",
  "Ahmed",
  "Zayd",
  "Khalid",
  "Hassan",
  "Abdullah",
  "Tariq",
  "Ali",
  "Ibrahim"
];



  return (
    <UserContext.Provider value={{users, isUser, setIsUser, handleLogout, handleSignup, setUser, errMsg, setErrMsg, handleLogin, googleLogin, handleOnChange}}>
      {children}
    </UserContext.Provider>
  )
}

export default function useUser(){
  return useContext(UserContext)
}