import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const NewPassPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [msg, setMsg] = useState({ errorMsg: '', successMsg: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      return setMsg({ errorMsg: 'Passwords do not match', successMsg: '' });
    }

    setLoading(true);
    try {
      await axiosInstance.post("/setnewpass", { password });
      setMsg({ successMsg: 'Password changed successfully!', errorMsg: '' });

  
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.log(err);
      setMsg({ errorMsg: 'An error occurred while changing password', successMsg: '' });
    } finally {
      setLoading(false);
    }
  };

  const checkStrength = () => {
    if (password.length < 6) return "Weak";
    if (password.match(/[0-9]/) && password.match(/[A-Z]/) && password.length >= 8) return "Strong";
    return "Medium";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-purple-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Reset Your Password</h2>

        {msg.errorMsg && (
          <div className="mb-4 text-center text-red-600 font-medium">
            {msg.errorMsg}
          </div>
        )}
        {msg.successMsg && (
          <div className="mb-4 text-center text-green-600 font-medium">
            {msg.successMsg}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            {password && (
              <p className={`text-sm mt-1 ${checkStrength() === "Weak" ? "text-red-500" : checkStrength() === "Medium" ? "text-yellow-500" : "text-green-600"}`}>
                Strength: {checkStrength()}
              </p>
            )}
          </div>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setConfirmPass(e.target.value)}
            value={confirmPass}
            required
          />

          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              id="showPassword"
              onChange={() => setShowPassword(!showPassword)}
              className="accent-blue-500"
            />
            <label htmlFor="showPassword" className="text-gray-700">Show Password</label>
          </div>

          <button
            type="submit"
            className={`bg-blue-600 text-white py-2 rounded-md transition hover:bg-blue-700 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassPage;
