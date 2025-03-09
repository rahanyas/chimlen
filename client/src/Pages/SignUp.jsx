import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const pageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y:0 , transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.4 } }, // ✅ Exit animation moves up
};

const SignUp = () => {
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

        <form className="mt-6 space-y-4">
          {["Username", "Email", "Mobile", "Password", "Confirm Password"].map((placeholder, index) => (
            <motion.input
              key={index}
              whileFocus={{ scale: 1.02 }}
              type={placeholder.includes("Password") ? "password" : placeholder === "Email" ? "email" : "text"}
              placeholder={placeholder}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-4 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Sign Up
          </motion.button>

          <div className="relative flex items-center justify-center w-full my-4">
            <hr className="w-full border-gray-300" />
            <span className="absolute px-2 text-sm text-gray-500 bg-white">OR</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-full gap-3 px-4 py-3 border rounded-lg hover:bg-gray-100"
          >
            <FcGoogle size={22} />
            Sign in with Google
          </motion.button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SignUp;
