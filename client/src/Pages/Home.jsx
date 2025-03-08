import { motion } from "framer-motion";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center text-center py-32 px-4 min-h-screen">
      <motion.h2 className="text-4xl font-bold mb-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        Connect, Chat, and Share – Anytime, Anywhere!
      </motion.h2>
      <motion.p className="text-lg text-gray-600 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        Experience seamless messaging, high-quality video calls, and smart search all in one place.
      </motion.p>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }}>
        <motion.button className="px-6 py-3 text-lg bg-black text-white rounded-lg shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          Get Started
        </motion.button>
      </motion.div>
    </main>
  );
};


export default Home