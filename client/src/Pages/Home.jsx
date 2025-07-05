import SideBar from "../components/SideBar";
import Navbar from '../components/Navbar';
import Demo from "./Demo";
import { Fragment } from "react";
import useUser from "../Context/userStore";

const Home = () => {
  const {users} = useUser();

  return (
    <div className="h-screen overflow-hidden">
    <Navbar />
      <SideBar />
     {users &&   <Demo />}
    </div>
  )
};

export default Home