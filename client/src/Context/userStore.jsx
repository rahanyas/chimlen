
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const userContext = createContext(null);

export const UserProvider = ({children}) => {
  const [isUser, setUser] = useState({
    status : '',
    id : ''
  });
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/api/checkAuth', {withCredentials : true});
        console.log(res);
        if(res?.data?.status === true){
         setUser(true);
        }else{
          setUser(false)
        }
      } catch (err) {
       console.log(err);
       setUser(false)
      }
    }
    checkAuth()
  }, [])

  return (
    <userContext.Provider value={{isUser, setUser}}>
      {children}
    </userContext.Provider>
  )
}

export default function useUser(){
  return useContext(userContext)
}