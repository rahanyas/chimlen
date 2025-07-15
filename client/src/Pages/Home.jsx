import SideBar from "../components/SideBar";
import Navbar from '../components/Navbar';
import Demo from "./Demo";
import useUser from "../Context/userStore";
import MessageBox from "../components/MessageBox";
import MobileLandingPage from "../components/MobileLandingPage";

const Home = () => {
  const {users} = useUser();

  return (
    <div className="h-screen overflow-hidden">
    <Navbar />
    <div className="hidden sm:flex flex-1 gap-1 overflow-hidden">
      <SideBar />
      <MessageBox />
    </div>
    <div className="sm:hidden flex-1 overflow-auto">
     <MobileLandingPage />
    </div>
     {users &&   <Demo />}
    </div>
  )
};

export default Home