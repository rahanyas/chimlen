import { Phone, Video  } from "lucide-react";


const iconStyle = 'border p-3 rounded cursor-pointer'

const MessageBox = () => {
  return (
    <div className="mt-[110px] pb-9 border w-[1220px]">
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
    </div>
  )
}

export default MessageBox