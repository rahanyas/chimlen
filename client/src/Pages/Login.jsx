/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import useUser from '../Context/userStore';

export default function Login() {

  const {handleLogin, googleLogin, handleOnChange, errMsg} = useUser();

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(navigate);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input 
              type="email"
              name="email" 
              onChange={handleOnChange}
              placeholder="Email" 
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300" 
            />
            <input 
              type="password"
              name="password" 
              onChange={handleOnChange}
              placeholder="Password" 
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300" 
            />
          </div>
          
          {errMsg && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="mt-2 text-sm text-center text-red-500"
            >
              {errMsg}
            </motion.p>
          )}
          
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="w-full p-3 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 mt-3"
          >
            Login
          </motion.button>
        </form>
        
        <p className="text-center text-gray-500">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
        
        <div className="flex flex-col space-y-3">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="w-full p-3 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Login with Mobile Number
          </motion.button>
          
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="w-full p-3 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
            onClick={googleLogin}
          >
            Login with Google
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
