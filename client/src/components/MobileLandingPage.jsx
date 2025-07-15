
import { Search, MessageCircleMore } from "lucide-react";
import { useState } from "react";
import MobileMsgUi from "./MobileMsgUi";

const MobileLandingPage = () => {
const users = [
  { id: 1, name: "Rahim", lastMsg: "Let's meet at 6", time: "10:45 AM", avatar: "" },
  { id: 2, name: "Fatima", lastMsg: "Sure!", time: "09:30 AM", avatar: "" },
  { id: 3, name: "Ali", lastMsg: "Call me back", time: "Yesterday", avatar: "" },
];

  const [clicked, setClicked] = useState(false)

  return (
    <>
   
     {clicked !== true ?     <div className="w-full h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold">Chats</h2>
        <MessageCircleMore className="text-gray-600" />
      </div>

      {/* Search Bar */}
      <div className="px-4 py-2">
        <div className="flex items-center bg-gray-100 p-2 rounded-md">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <div key={user.id} className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer border-b"  onClick={() => setClicked(true)}>
            {/* Profile Pic */}
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-4" />
            
            {/* Chat Info */}
            <div className="flex justify-between w-full">
              <div>
                <h3 className="font-semibold text-[16px]">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.lastMsg}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">{user.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div> :  <MobileMsgUi clickedd={setClicked} />  }

 </>
  );
}

export default MobileLandingPage