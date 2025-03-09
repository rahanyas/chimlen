/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu} from "lucide-react";

const btnVariants = {
  hover: { scale: 1.1, boxShadow: "0px 0px 8px rgb(255,255,255)" },
  tap: { scale: 0.9, backgroundColor: "#34D399" },
};

const menuVariants = {
  hidden: {y:0, opacity: 0 , transition : {duration : 0.}},
  visible: { 
    y: 70, 
    opacity: 1, 
    transition: { duration: 0.3 },
    ease : 'easeIn' 
  },
  exit:{
    y:0,
    transition : {duration : 0.3}
  }
};

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-black w-full text-white flex items-center justify-between px-6 p-5 fixed top-0 left-0 right-0 z-10">
      <h1 className="capitalize text-[20px]">chimlen</h1>
      <div className="hidden md:flex gap-6">
        <motion.button variants={btnVariants} whileHover="hover" whileTap="tap" className="rounded-full px-4 py-2 cursor-pointer ">Login</motion.button>
        <motion.button variants={btnVariants} whileHover="hover" whileTap="tap" className="rounded-full px-4 py-2 cursor-pointer">Sign-in</motion.button>
      </div>
      <div className="md:hidden">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsMobile(!isMobile)}>
          <Menu size={28} className="cursor-pointer" />
        </motion.button>
      </div>
      {isMobile && (
        <motion.div variants={menuVariants} initial="hidden" animate="visible" exit="hidden" className="fixed top-0 left-0 w-full h-fit bg-gray-900 flex flex-col items-center justify-center gap-6 p-6 md:hidden">
          <motion.button whileHover="hover" whileTap="tap" variants={btnVariants} exit='exit' className="rounded-full px-4 py-2 cursor-pointer">Login</motion.button>
          <motion.button whileHover="hover" whileTap="tap" variants={btnVariants} className="rounded-full px-4 py-2 cursor-pointer">Sign-in</motion.button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
