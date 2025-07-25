import { motion, AnimatePresence } from "framer-motion";
import { useState, lazy } from "react";
import { Menu, X, Settings, Search, CircleUserRound, House } from "lucide-react";
import { Link } from "react-router-dom";
import useUser from "../Context/userStore";

const SearchInp = lazy(() => import('./SearchBox'));

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
  const { isUser } = useUser();
  const [isMobile, setIsMobile] = useState(false);
  const [showInp, setShowInp] = useState(false);

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
          <div className="flex items-center justify-between gap-4 relative">
            {showInp && (
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full flex justify-center"
              >
                <SearchInp className="border p-3 rounded-full outline-none w-full max-w-xs" />
              </motion.div>
            )}

            {/* Home Icon */}
            <motion.h1
              variants={btnVariants}
              whileHover="hover"
              whileTap="tap"
              className="rounded-full px-4 py-2 cursor-pointer"
            >
              <Link to="/home">
                <House />
              </Link>
            </motion.h1>

            {/* Search Icon */}
            <motion.button
              type="button"
              variants={btnVariants}
              whileHover="hover"
              whileTap="tap"
              className="rounded-full px-4 py-2 cursor-pointer"
              onClick={() => setShowInp(!showInp)}
            >
              <Search />
            </motion.button>

            {/* Profile Icon */}
            <motion.h1
              variants={btnVariants}
              whileHover="hover"
              whileTap="tap"
              title="profile"
              className="rounded-full px-4 py-2 cursor-pointer"
            >
              <CircleUserRound />
            </motion.h1>

            {/* Settings */}
            <motion.button
              variants={btnVariants}
              whileHover="hover"
              whileTap="tap"
              type="button"
              title="settings"
              className="rounded-full px-4 py-2 cursor-pointer"
            >
              <Link to="/settings">
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
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsMobile((prev) => !prev)}>
          {isMobile ? (
            <X size={28} className="cursor-pointer" />
          ) : (
            <Menu size={28} className="cursor-pointer" />
          )}
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
              <div className="w-full">
                {showInp ? (
                  // Only search input + close
                  <div className="w-full flex items-center justify-center gap-3">
                    <SearchInp className="w-full px-4 py-2 rounded-full border border-white bg-transparent text-white placeholder:text-white/70 outline-none max-w-[90%]" />
                    <motion.button
                      onClick={() => setShowInp(false)}
                      variants={btnVariants}
                      whileTap="tap"
                      className="rounded-full p-2"
                    >
                      <X />
                    </motion.button>
                  </div>
                ) : (
                  // Normal nav icons
                  <div className="w-full flex justify-center gap-3 items-center">
                    {/* Home */}
                    <motion.h1
                      variants={btnVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="rounded-full px-4 py-2 cursor-pointer"
                    >
                      <Link to="/home">
                        <House />
                      </Link>
                    </motion.h1>

                    {/* Search */}
                    <motion.button
                      variants={btnVariants}
                      whileHover="hover"
                      whileTap="tap"
                      type="button"
                      className="rounded-full px-4 py-2 cursor-pointer"
                      onClick={() => setShowInp(true)}
                    >
                      <Search />
                    </motion.button>

                    {/* Profile */}
                    <motion.h1
                      variants={btnVariants}
                      whileHover="hover"
                      whileTap="tap"
                      title="profile"
                      className="rounded-full px-4 py-2 cursor-pointer"
                    >
                      <CircleUserRound />
                    </motion.h1>

                    {/* Settings */}
                    <motion.button
                      variants={btnVariants}
                      whileHover="hover"
                      whileTap="tap"
                      type="button"
                      title="settings"
                      className="rounded-full px-4 py-2 cursor-pointer"
                    >
                      <Link to="/settings">
                        <Settings />
                      </Link>
                    </motion.button>
                  </div>
                )}
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
