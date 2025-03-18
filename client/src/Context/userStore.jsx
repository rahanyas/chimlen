/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState, useCallback } from "react";
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


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get('/checkAuth');
        console.log(res);
        setIsUser({status : res?.data?.status})
      } catch (err) {
        console.log('Error from checkAuth:', err)
        if (err.response?.status === 400) {
          console.log("User is not authenticated");
        }
    
        setIsUser({ status: false });
      }
    }
    checkAuth()
  }, []);

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
        const {data} = await axiosInstance.post('/signup', user);
        console.log(data);
        setIsUser({status : true});
        navigate('/') 
      } catch (err) {
        setErrMsg(err?.response?.data?.error || 'signup failed');
        console.log(err?.response?.data?.error);
        setIsUser({status : false})
      }
    },[user],
  );
  

  

  const handleLogout =useCallback(
    async () => {
      try {
        const res = await axiosInstance.post('/logout');
        setIsUser({status : res?.data?.status})
        console.log(res)
      } catch (err) {
        console.log(err)
      }
  },[],
  );


  return (
    <UserContext.Provider value={{isUser, setIsUser, handleLogout, handleSignup, setUser, errMsg}}>
      {children}
    </UserContext.Provider>
  )
}

export default function useUser(){
  return useContext(UserContext)
}