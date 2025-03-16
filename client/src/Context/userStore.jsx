/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [isUser, setIsUser] = useState({status : false});
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get('/checkAuth', {withCredentials : true});
        console.log(res);
        setIsUser(res?.data)
      } catch (err) {
       console.log(err);
       setIsUser({status : ''})
      }
    }
    checkAuth()
  }, []);

  const handleLogout = async () => {
        try {
          const res = await axiosInstance.post('/logout', {withCredentials : true});
          setIsUser({status : false})
          console.log(res)
        } catch (err) {
          console.log(err.message)
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