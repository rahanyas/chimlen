
import { Navigate } from "react-router-dom";
import useUser from "../Context/userStore";

export const ProtectedRoute = ({ children }) => {
  const {isUser} = useUser();
  console.log(isUser);
  
  if(isUser.status === false){
    return <Navigate to="/login"/>
  }
  return children
};