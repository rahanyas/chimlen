

import { Phone, Video, Mic, Send, ChevronLeft } from "lucide-react";

const MobileMsgUi = ({clickedd}) => {
    
    const iconStyle = 'border p-2 rounded cursor-pointer';
    const iconStyle2 = 'border p-2 rounded-full cursor-pointer';
    
    const messages = [
        { id: 1, text: "Hey there!", who: "receiver" },
        { id: 2, text: "Hello! How are you?", who: "sender" },
        { id: 3, text: "I'm good. What's up?", who: "receiver" },
        { id: 4, text: "Let's catch up later.", who: "sender" },
    ];
    return (

    <div className="relative w-full h-screen flex flex-col bg-white overflow-hidden mt-[100px]">
      {/* Header */}
      <div className="p-3 border-b flex justify-between items-center bg-white">
        <div className="flex items-center gap-3">
            <button onClick={() => clickedd(false)}><ChevronLeft /></button>
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
          <h1 className="font-medium text-base">user name</h1>
        </div>
        <div className="flex gap-4">
          <button className={iconStyle}><Phone size={20} /></button>
          <button className={iconStyle}><Video size={20} /></button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-100">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.who === "sender" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 text-sm rounded-2xl text-white ${
                msg.who === "sender" ? "bg-blue-600" : "bg-green-600"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="w-full border-t p-2 flex items-center gap-3 bg-gray-200 absolute bottom-[105px]">
        <input
          type="text"
          placeholder="Type something"
          className="flex-1 px-3 py-2 text-sm outline-none rounded-md bg-white"
        />
        <button className={iconStyle2}><Mic size={18} /></button>
        <button className={iconStyle2}><Send size={18} /></button>
      </div>
    </div>
  );
};




export default MobileMsgUi