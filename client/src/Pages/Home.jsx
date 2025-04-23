import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const Home = () => {
  const [users, setUsers] = useState([]);7

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axiosInstance.get("/getUsers");
      console.log("fetchUsers Resp : ", res);
      setUsers(res?.data?.data);
    };
      fetchUsers();
    
  }, []);

  
  return (
   <h1>home page</h1>
  );
};

export default Home;
