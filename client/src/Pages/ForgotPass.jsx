import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom'

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState(''); // 'error' or 'success'
  const navigate = useNavigate();

  const getOtp = async (e) => {
    e.preventDefault();
    setMsg(''); // Reset message
    try {
      const res = await axiosInstance.post('/otp/getotp', { email }, { withCredentials: true });
      console.log(res);
      const { userEmail } = res.data;
      localStorage.setItem('UserEmail', userEmail);
      
      if (res.status === 200) {
        setMsg('OTP sent successfully. Please check your email.');
        setMsgType('success');
        setTimeout(() => navigate('/otp'), 1500); // Short delay before redirect
      }
    } catch (err) {
      console.log(err);
      const errorMsg = err?.response?.data?.msg || 'Something went wrong.';
      setMsg(errorMsg);
      setMsgType('error');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>

        {/* Message Box */}
        {msg && (
          <div className={`text-sm mb-4 px-4 py-2 rounded-lg ${msgType === 'error' ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-green-100 text-green-700 border border-green-300'}`}>
            {msg}
          </div>
        )}

        <form className="space-y-4" onSubmit={getOtp}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Enter Your Registered Email Address
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
