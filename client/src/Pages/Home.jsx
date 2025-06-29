import SideBar from "../components/SideBar";
import Navbar from '../components/Navbar';
import Demo from "./Demo";
import { Fragment } from "react";
const Home = () => {
  return (
    <Fragment>
    <Navbar />
      <SideBar />
      <Demo />
    </Fragment>
  )
};

export default Home