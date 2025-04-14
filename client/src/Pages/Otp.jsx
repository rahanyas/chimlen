import { useEffect, useRef, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const Otp = () => {
  const [inputArr, setInputArr] = useState(new Array(5).fill(""));
  const [errorMsg, setErrorMsg] = useState('');
  const refArr = useRef([]);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newValue = value.trim();
    const newArr = [...inputArr];

    if (newValue === "") {
      newArr[index] = "";
      setInputArr(newArr);

      // created this timeout because backspace is not working in mobile phone
      setTimeout(() => {
        if (index > 0) {
          refArr.current[index - 1]?.focus();
        }
      }, 0);
    }

    newArr[index] = newValue.slice(-1);
    setInputArr(newArr);
    newValue && refArr.current[index + 1]?.focus();
  };

  const handleSubmit = async () => {
    const otp = inputArr.join('');
    const email = localStorage.getItem('UserEmail');

    try {
      const res = await axiosInstance.post('/otp/verifyOtp', { otp, email });
      console.log(res);

      // Clear error on success
      setErrorMsg('');
      localStorage.removeItem('UserEmail');

      // Optional: Redirect or success message here

    } catch (err) {
      console.error('Error in OTP handleSubmit:', err);

      // Extracting message in a standard way
      const message =
        err?.response?.data?.msg ||
        err?.response?.data?.message ||
        'Something went wrong. Please try again.';

      setErrorMsg(message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      
      {errorMsg && (
        <div className="w-full max-w-sm mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{errorMsg}</span>
        </div>
      )}

      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 text-gray-800">
          Enter OTP
        </h2>

        <div className="flex justify-center gap-2 sm:gap-3 mb-6">
          {inputArr.map((item, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={inputArr[index]}
              className="w-10 sm:w-12 h-12 sm:h-14 text-center text-lg font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={(input) => (refArr.current[index] = input)}
              onChange={(e) => handleChange(e.target.value, index)}
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-300"
        >
          Submit OTP
        </button>
      </div>
    </div>
  );
};

export default Otp;
