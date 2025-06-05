import SideBar from "../components/SideBar";
import Navbar from '../components/Navbar'
import { Fragment } from "react";
const Home = () => {
  return (
    <Fragment>
    <Navbar />
      <SideBar />
    </Fragment>
  )
};

export default Home