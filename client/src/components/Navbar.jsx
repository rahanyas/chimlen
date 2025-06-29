/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Menu, X, Settings, Search, CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import useUser from "../Context/userStore";
const SearchInp = React.lazy(() =>import('./SearchBox'))

const btnVariants = {
  hover: { scale: 1.1, boxShadow: "0px 0px 10px rgb(255,255,255)" },
  tap: { scale: 0.9, backgroundColor: "#34D399" },
};

const menuVariants = {
  hidden: {
    y: "-100%",
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    y: "-100%",
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const Navbar = () => {
  const { isUser, handleLogout } = useUser();
  const [isMobile, setIsMobile] = useState(false);
  const [showInp, setShowInp] = useState(false)

  if (isUser === null) return <p className="text-white text-center">Loading...</p>;

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-r from-black via-gray-900 to-black/80 backdrop-blur-md w-full text-white flex items-center justify-between px-6 p-8 fixed top-0 left-0 right-0 z-10"
    >
      <h1 className="capitalize text-[20px]">chimlen</h1>

      {/* Desktop View */}
      <div className="hidden md:flex gap-6">
        {isUser.status === true ? (
          <div className="flex items-center justify-between gap-4 relative ">
          
          {showInp && <SearchInp /> }
            

            {/* search icon */}
           <motion.h1 
           variants={btnVariants}
           whileHover='hover'
           whileTap='tap'
           className="rounded-full px-4 py-2 cursor-pointer"
           onClick={() => setShowInp(!showInp)}
           >
                <Search />
             </motion.h1>
            {/* profile icon */}
            <motion.h1 
             variants={btnVariants}
             whileHover='hover'
             whileTap='tap'
            className="rounded-full px-4 py-2 cursor-pointer">
              <CircleUserRound />
            </motion.h1>
            {/* settings btn */}
            <motion.button
              variants={btnVariants}
              whileHover="hover"
              whileTap="tap"
              className="rounded-full px-4 py-2 cursor-pointer"
            >
              <Link to='/settings'>
              <Settings />
              </Link>
            </motion.button>
           
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsMobile(prev => !prev)}>
          {isMobile ? <X size={28} className="cursor-pointer" /> : <Menu size={28} className="cursor-pointer" />}
        </motion.button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobile && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-0 w-full bg-gray-900 flex flex-col items-center justify-center gap-6 p-6 md:hidden"
          >
            {isUser.status === true ? (
              <div className="flex gap-3 items-center relative">

                <SearchInp />
                
            {/* search icon */}
           <motion.h1 
           variants={btnVariants}
           whileHover='hover'
           whileTap='tap'
           className="rounded-full px-4 py-2 cursor-pointer"
           >
                <Search />
             </motion.h1>
            {/* profile icon */}
            <motion.h1 
             variants={btnVariants}
             whileHover='hover'
             whileTap='tap'
            className="rounded-full px-4 py-2 cursor-pointer">
              <CircleUserRound />
            </motion.h1>
                <motion.button
                  variants={btnVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="rounded-full px-4 py-2 cursor-pointer"
                >
                 
                  <Link to='/settings'>
                  <Settings />
                  </Link>
                 
                </motion.button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link to="/login">
                  <motion.button
                    whileHover="hover"
                    whileTap="tap"
                    variants={btnVariants}
                    className="rounded-full px-4 py-2 cursor-pointer"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    whileHover="hover"
                    whileTap="tap"
                    variants={btnVariants}
                    className="rounded-full px-4 py-2 cursor-pointer"
                  >
                    Sign-Up
                  </motion.button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
