/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [isUser, setIsUser] = useState({status : false});

  const [user, setUser] = useState({
    userName : '',
    email : '',
    password: '',
    mobile : ''
  });

  const [errMsg, setErrMsg] = useState('');

  const handleSignup = async (cp, nav) => {
    if (!user.userName || !user.email || !user.mobile || !user.password || !cp) {
      setErrMsg("All fields are required");
      return;
    }
    if(user.password !== cp){
      setErrMsg("password do not match");
      return;
    };

    try {
      const {data} = await axiosInstance.post('/signup', user);
      console.log(data);
      setIsUser({status : true});
      nav('/') 
    } catch (err) {
      setErrMsg(err?.response?.data?.error || 'signup failed');
      console.log(err?.response?.data?.error);
      setIsUser({status : false})
    }
  }
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get('/checkAuth');
        console.log(res);
        setIsUser({status : res?.data?.status})
      } catch (err) {
        console.log('Error from checkAuth:', err?.response?.data?.msg || err.message)
        if (err.response?.status === 400) {
          console.log("User is not authenticated");
        }
    
        setIsUser({ status: false });
      }
    }
    checkAuth()
  }, []);

  const handleLogout = async () => {
        try {
          const res = await axiosInstance.post('/logout');
          setIsUser({status : res?.data?.status})
          console.log(res)
        } catch (err) {
          console.log(err)
        }
  }

  return (
    <UserContext.Provider value={{isUser, setIsUser, handleLogout, handleSignup, setUser, errMsg}}>
      {children}
    </UserContext.Provider>
  )
}

export default function useUser(){
  return useContext(UserContext)
}