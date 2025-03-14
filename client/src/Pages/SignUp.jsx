/* eslint-disable no-unused-vars */
import { motion } from "framer-motion"; 
import { data, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import axios from 'axios'
const pageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.4 } }, 
};

const SignUp = () => {

  const [user, setUser] = useState({
     userName : '',
     email : '',
     mobile : '',
     password : ''
  })
  const [confirmPass, setConfirmPass] = useState('');
  const [errorMsg , setErrorMsg] = useState('');

  const handleOnChange = (e) => {
    const {name , value} = e.target
    setUser((prev) => (
      {...prev, [name] : value}
    ))
    console.log(user)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
      const req = await axios.post('/api/signup', {
   user
      })
      
      const res =  req.data;
      console.log(res)
      setErrorMsg(res?.respone?.data?.error)
      console.log(res?.respone?.data?.error)
  }


  return (
    
    <motion.div
      key="signup"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      {errorMsg && <h1>{errorMsg}</h1>}
      <motion.div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
        <p className="mt-2 text-sm text-center text-gray-600">
          Create an account to get started
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <input
              type="text"
              name="userName"
              onChange={handleOnChange}
              placeholder="username"
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </motion.div>

          {/* Email */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <input
              type="email"
              name="email"
              onChange={handleOnChange}
              placeholder=" email"
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </motion.div>

          {/* Mobile */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <input
              type="tel"
              name="mobile"
              onChange={handleOnChange}
              placeholder="mobile number"
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </motion.div>

          {/* Password */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <input
              type="password"
              onChange={handleOnChange}
              placeholder=" password"
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </motion.div>

          {/* Confirm Password */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <input
              type="password"
              name="password"
              onChange={handleOnChange}
              placeholder="Confirm your password"
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
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

          {/* Sign In with Google */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-full gap-3 px-4 py-3 border rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <FcGoogle size={22} />
            Sign in with Google
          </motion.button>
        </form>

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
