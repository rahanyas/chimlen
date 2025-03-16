/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [isUser, setIsUser] = useState({status : false});
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get('/checkAuth');
        console.log(res);
        setIsUser({status : res?.data?.status})
      } catch (err) {
       console.log('err from checkAuth : ',err);
       setIsUser({status : false})
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
    <UserContext.Provider value={{isUser, setIsUser, handleLogout}}>
      {children}
    </UserContext.Provider>
  )
}

export default function useUser(){
  return useContext(UserContext)
}