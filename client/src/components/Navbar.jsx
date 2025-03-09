/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const btnVariants = {
  hover: { scale: 1.1, boxShadow: "0px 0px 8px rgb(255,255,255)" },
  tap: { scale: 0.9, backgroundColor: "#34D399" },
};

const menuVariants = {
  hidden: { y: 0, opacity: 0, transition: { duration: 0.0 } },
  visible: {
    y: 70,
    opacity: 1,
    transition: { duration: 0.3 , ease: "easeIn",},
    
  },
  exit: {
    y: 0,
    opacity : 0,
    transition: { duration: 0.3 , ease : 'easeOut'},  
  },
};

const Navbar = () => {

  const [isMobile, setIsMobile] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-black w-full text-white flex items-center justify-between px-6 p-5 fixed top-0 left-0 right-0 z-10"
    >
      <h1 className="capitalize text-[20px]">chimlen</h1>
      <div className="hidden md:flex gap-6">
          <Link to="/login">
        <motion.button
          variants={btnVariants}
          whileHover="hover"
          whileTap="tap"
          className="rounded-full px-4 py-2 cursor-pointer"
        >
          Login
        </motion.button>
          </Link>
          <Link to="/signup">
        <motion.button
          variants={btnVariants}
          whileHover="hover"
          whileTap="tap"
          className="rounded-full px-4 py-2 cursor-pointer"
        >
          Sign-up
        </motion.button>
          </Link>
      </div>
      <div className="md:hidden">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsMobile((prev) => !prev)}>
          {isMobile ? 
                      <X 
                      size={28} 
                      className="cursor-pointer" />  
                      :
                      <Menu 
                      size={28} 
                      className="cursor-pointer" />          
                    }
                  
        </motion.button>
      </div>
      <AnimatePresence>

      {isMobile && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed top-0 left-0 w-full h-fit bg-gray-900 flex flex-col items-center justify-center gap-6 p-6 md:hidden"
        >
            <Link to="/login">
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={btnVariants}
            exit="exit"
            className="rounded-full px-4 py-2 cursor-pointer"
          >
            login
          </motion.button>
            </Link>
            <Link to="/signup">
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={btnVariants}
            className="rounded-full px-4 py-2 cursor-pointer"
          >
            sign-In
          </motion.button>
            </Link>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
