import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom'

const ForgotPass = () => {
  const [email, setEmail] = useState('');
   const navigate = useNavigate() ;

  const getOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/otp/getotp', {email}, {withCredentials : true});
      console.log(res);
      const {userEmail} = res.data;
      localStorage.setItem('UserEmail', userEmail)
      if(res.status === 200){
        navigate('/otp')
      }
    } catch (err) {
      console.log(err)
    }

  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>
        <form className="space-y-4" onSubmit={getOtp}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;
