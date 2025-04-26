import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const NewPassPage = () => {
  const [password, setPassWord] = useState('');
  const [confirmPass, setConfrimPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Prevent page refresh

    if (password !== confirmPass) {
      return setErrorMsg('Passwords do not match');
    }

    try {
      const res = await axiosInstance.post('/setnewpass', { password });
      console.log(res);
      setErrorMsg('Password changed successfully!'); // ✅ success feedback (optional)
    } catch (err) {
      console.log(err);
      setErrorMsg('An error occurred while changing password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Change Password</h2>

        {/* ✅ Show Error Message */}
        {errorMsg.length > 0 && (
          <div className="mb-4 text-center text-red-500 font-semibold">
            {errorMsg}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassWord(e.target.value)}
            value={password}
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setConfrimPass(e.target.value)}
            value={confirmPass}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassPage;
