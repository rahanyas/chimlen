import { useState } from "react";


const Otp = () => {
      const [otpInp, setOtpInp] = useState(new Array(5).fill(0));

      const [otp, setOtp] = useState('')
  return <div className="border w-fit h-[300px] p-5 flex flex-col justify-center items-center mx-auto my-[200px]">
    <div className="flex gap-3">
    {otpInp.map((item, index) => (
      <input 
      key={index}
      type="text" 
      value={item}
      className="border w-10 p-3 flex-col text-center font-bold"
      />
    ))}
    </div>
  </div>
};

export default Otp