import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for the menu

const btnVariants = {
  hover: {
    scale: 1.1,
    boxShadow: "0px 0px 8px rgb(255,255,255)"
  },
  tap: {
    scale: 0.9,
    backgroundColor: "#34D399"
  }
};

const menuVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
};

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-black w-screen text-white flex items-center justify-between px-6 p-4"
    >
      {/* Logo */}
      <motion.div>
        <h1 className="capitalize text-[20px]">chimlen</h1>
      </motion.div>

      {/* Desktop Menu */}
      <motion.div className="hidden md:flex gap-6">
        <motion.button
          variants={btnVariants}
          whileHover="hover"
          whileTap="tap"
          className="navbar-btn rounded-full"
        >
          Login
        </motion.button>
        <motion.button
          variants={btnVariants}
          whileHover="hover"
          whileTap="tap"
          className="navbar-btn rounded-full"
        >
          Sign-in
        </motion.button>
      </motion.div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobile(!isMobile)}
        >
          {isMobile ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobile && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed top-0 right-0 h-screen w-[60%] bg-gray-900 flex flex-col gap-6 p-6 md:hidden"
        >
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={btnVariants}
            className="navbar-btn rounded-full"
          >
            Login
          </motion.button>
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={btnVariants}
            className="navbar-btn rounded-full"
          >
            Sign-in
          </motion.button>
          <motion.button
            onClick={() => setIsMobile(false)}
            className="text-white mt-auto"
          >
            Close Menu
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Navbar;
