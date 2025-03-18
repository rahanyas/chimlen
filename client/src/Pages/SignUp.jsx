/* eslint-disable no-unused-vars */
import { motion } from "framer-motion"; 
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import useUser from "../Context/userStore";

const pageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.4 } }, 
};

const errorVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const SignUp = () => {
  const { errMsg, handleSignup, setUser } = useUser();
  const [confirmPass, setConfirmPass] = useState('');
  let Navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSignup(confirmPass, Navigate);
  };

  const handleLogin = () => {
    window.location.href = "http://localhost:9000/auth/google";
  };

  return (
    <motion.div
      key="signup"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <motion.div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
        <p className="mt-2 text-sm text-center text-gray-600">
          Create an account to get started
        </p>

        {/* Error Message UI */}
        {errMsg && (
          <motion.div
            className="w-full p-3 mt-4 text-sm font-medium text-red-700 bg-red-100 border border-red-400 rounded-lg"
            variants={errorVariants}
            initial="hidden"
            animate="visible"
          >
            {errMsg}
          </motion.div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <input
              type="text"
              name="userName"
              onChange={handleOnChange}
              placeholder="Username"
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </motion.div>

          {/* Email */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <input
              type="email"
              name="email"
              onChange={handleOnChange}
              placeholder="Email"
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </motion.div>

          {/* Mobile */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <input
              type="tel"
              name="mobile"
              onChange={handleOnChange}
              placeholder="Mobile Number"
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </motion.div>

          {/* Password */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <input
              type="password"
              name="password"
              onChange={handleOnChange}
              placeholder="Password"
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </motion.div>

          {/* Confirm Password */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </motion.div>

          {/* Sign Up Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-4 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 cursor-pointer"
          >
            Sign Up
          </motion.button>

          {/* OR Divider */}
          <div className="relative flex items-center justify-center w-full my-4">
            <hr className="w-full border-gray-300" />
            <span className="absolute px-2 text-sm text-gray-500 bg-white">OR</span>
          </div>
        </form>

        {/* Sign In with Google */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-full gap-3 px-4 py-3 border rounded-lg hover:bg-gray-100 cursor-pointer"
          onClick={handleLogin}
        >
          <FcGoogle size={22} />
          Sign in with Google
        </motion.button>

        {/* Already have an account? */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SignUp;
