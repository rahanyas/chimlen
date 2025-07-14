import SideBar from "../components/SideBar";
import Navbar from '../components/Navbar';
import Demo from "./Demo";
import useUser from "../Context/userStore";
import MessageBox from "../components/MessageBox";

const Home = () => {
  const {users} = useUser();

  return (
    <div className="h-screen overflow-hidden">
    <Navbar />
    <div className="flex gap-1">
      <SideBar />
      <MessageBox />
    </div>
     {users &&   <Demo />}
    </div>
  )
};

export default Home