/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useUser from "../Context/userStore";

const LandingPage = () => {

  const {isUser} = useUser();
  return (
    <div className="relative bg-gradient-to-b from-green-50 to-green-100">
      <section className="overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:max-h-[900px] lg:min-h-[900px]">
          <div className="flex items-center justify-center w-full lg:order-2 lg:w-7/12">
            <div className="h-full px-4 pt-24 pb-16 sm:px-6 lg:px-24 2xl:px-32 lg:pt-40 lg:pb-14">
              <div className="flex flex-col justify-between flex-1 h-full">
                <div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20, letterSpacing : "-0.05em" }}
                    animate={{ opacity: 1, y: 0 , letterSpacing: "0em"}}
                    transition={{ duration: 1, ease:"easeOut" }}
                    className="text-4xl font-bold text-black sm:text-6xl xl:text-7xl"
                  >
                    Seamless Communication for Everyone
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mt-6 text-base text-black sm:text-xl"
                  >
                    Connect, chat, and call with ease using our feature-rich chat web application.
                  </motion.p>
                  {isUser.status === true ? (
  <Link to="/home">
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0px 0px 20px rgba(72, 187, 120, 0.8)",
      }}
      whileTap={{ scale: 0.95, backgroundColor: "#16A34A" }}
     className="inline-flex items-center px-6 py-4 text-lg font-semibold text-white 
  bg-green-500 shadow-md transition-all duration-300 hover:bg-green-600 focus:bg-green-600 rounded-lg"
    >
      get started
    </motion.button>
  </Link>
) : (
  <Link to="/signup">
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0px 0px 10px rgba(72, 187, 120, 0.8)",
      }}
      whileTap={{ scale: 0.9, backgroundColor: "#22c55e" }}
      className="inline-flex items-center px-6 py-5 text-base font-semibold text-black transition-all duration-200 bg-green-300 mt-9 rounded-lg hover:bg-green-400 focus:bg-green-400 cursor-pointer"
    >
      Sign up for Free
    </motion.button>
  </Link>
)}


                </div>

                <div className="mt-8 border-t-2 border-black lg:mt-auto sm:mt-14">
                  <div className="pt-8 sm:flex sm:items-center sm:justify-between sm:pt-14">
                    <p className="text-base font-semibold text-black">App available on</p>
                    <div className="flex items-center mt-5 space-x-5 sm:mt-0">
                      <a href="#" className="block transition-all duration-200 hover:opacity-80 focus:opacity-80" role="button">
                        <img className="w-auto rounded h-14 sm:h-16" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/app-store-button.png" alt="App Store" />
                      </a>
                      <a href="#" className="block transition-all duration-200 hover:opacity-80 focus:opacity-80" role="button">
                        <img className="w-auto rounded h-14 sm:h-16" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/play-store-button.png" alt="Play Store" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full overflow-hidden lg:w-5/12 lg:order-1">
            <div className="lg:absolute lg:bottom-0 lg:left-0">
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="w-full"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/phone-mockup.png"
                alt="Phone Mockup"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
