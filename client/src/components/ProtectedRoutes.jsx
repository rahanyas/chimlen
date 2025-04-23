
import { Navigate } from "react-router-dom";
import useUser from "../Context/userStore";
import LoadingScreen from "./Loading";

export const ProtectedRoute = ({ children }) => {
  const {isUser} = useUser();
  console.log(isUser);

  if(isUser.loading)
    {
       return <LoadingScreen />
    }else if(isUser.status === false){
      return <Navigate to="/login"/>
    }
  
  
  return children
};