import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const btnVariants = {
  hover: { scale: 1.1, boxShadow: "0px 0px 8px rgb(255,255,255)" },
  tap: { scale: 0.9, backgroundColor: "#34D399" },
};

const menuVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
};

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-black w-full text-white flex items-center justify-between px-6 p-5 fixed top-0 left-0 right-0 z-10">
      <h1 className="capitalize text-[20px]">chimlen</h1>
      <div className="hidden md:flex gap-6">
        <motion.button variants={btnVariants} whileHover="hover" whileTap="tap" className="rounded-full">Login</motion.button>
        <motion.button variants={btnVariants} whileHover="hover" whileTap="tap" className="rounded-full">Sign-in</motion.button>
      </div>
      <div className="md:hidden">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsMobile(!isMobile)}>
          {isMobile ? <X size={28} /> : <Menu size={28} className="cursor-pointer" />}
        </motion.button>
      </div>
      {isMobile && (
        <motion.div variants={menuVariants} initial="hidden" animate="visible" exit="hidden" className="fixed top-0 right-0 h-screen w-[60%] bg-gray-900 flex flex-col gap-6 p-6 md:hidden">
          <motion.button whileHover="hover" whileTap="tap" variants={btnVariants} className="rounded-full">Login</motion.button>
          <motion.button whileHover="hover" whileTap="tap" variants={btnVariants} className="rounded-full">Sign-in</motion.button>
          <motion.button onClick={() => setIsMobile(false)} className="text-white mt-auto cursor-pointer">Close Menu</motion.button>
        </motion.div>
      )}
    </motion.nav>
  );
};


export default Navbar