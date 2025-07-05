
import SearchBox from "./SearchBox";
import useUser from "../Context/userStore";

// in here show all users hwo added to friend by signed in person
const SideBar = () => {

   const {users} = useUser()
  return (
     <div className="w-[300px] h-full border mt-[100px]">
        
        {/* user search Inp */}
        <SearchBox className='border-2 outline-none p-3 ml-6 mt-4 rounded-full '/>

         {/* user showing div */}
        <div className="w-full border h-fit ">
           {users.map((user, index) => (
            <div key={index} className="flex  justify-center gap-3  border ">
                <div className="w-[30px] h-[30px] border rounded-full flex flex-st"/>
                <h1 className="text-justify">{user}</h1>
            </div>
           ))}
        </div>

     </div>
  )
};

export default SideBar 