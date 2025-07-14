import { Phone, Video, Mic, Send   } from "lucide-react";


const iconStyle = 'border p-3 rounded cursor-pointer'

const iconStyle2 = 'border p-2 rounded-full cursor-pointer'

const messages = [
  { id: 1, text: "Hey there!", who: "receiver" },
  { id: 2, text: "Hello! How are you?", who: "sender" },
  { id: 3, text: "I'm good. What's up?", who: "receiver" },
  { id: 4, text: "Let's catch up later.", who: "sender" },
];

const MessageBox = () => {
  return (
    <div className="relative mt-[110px]  border w-[1220px]">
        {/* //user heading// */}
        <div className="p-2 border flex justify-between items-center">  
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 border rounded-full"/>
            <h1>user name</h1>
          </div>
          {/* call option */}
          <div className="flex gap-6">
             <button className={`${iconStyle}`}><Phone /></button>
             <button className={`${iconStyle}`}><Video  /></button>
          </div>
        </div>

        {/* here i want to create msg dispaying from sender and reciever */}
      {/* Messages Display Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100 ">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.who === "sender" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-xl text-white ${
                msg.who === "sender" ? "bg-blue-600" : "bg-green-600"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

         {/* this is msg sending ui */}
        <div className="absolute bottom-[110px] border w-full flex justify-between items-center p-2">

          {/* msg typing input field */}
          <input type="text" className="outline-none  min-w-1/2 text-[18px]" placeholder="type something" />


            {/* options for sending and voice */}
          <div className="flex gap-6">
           <button className={`${iconStyle2}`}><Mic /></button>
           <button className={`${iconStyle2}`}><Send /></button>
          </div>
        </div>
    </div>
  )
}

export default MessageBox