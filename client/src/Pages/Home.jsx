import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-[250px] bg-white border-r border-gray-300 p-4"
      >
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 mb-4 border rounded text-sm"
        />
        <div className="space-y-4 overflow-y-auto h-[calc(100vh-100px)]">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-gray-300" />
              <span className="text-sm font-medium">User {index + 1}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Chat Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center justify-between px-4 py-3 border-b bg-white shadow-sm"
        >
          <h1 className="text-lg font-semibold">User Name</h1>
          <div className="flex gap-3">
            <button className="text-blue-600 hover:underline">Audio Call</button>
            <button className="text-blue-600 hover:underline">Video Call</button>
          </div>
        </motion.div>

        {/* Messages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex-1 p-4 overflow-y-auto space-y-4"
        >
          <div className="max-w-xs bg-white p-3 rounded shadow">Hey, how are you?</div>
          <div className="max-w-xs ml-auto bg-blue-100 p-3 rounded shadow">I'm good, you?</div>
          <div className="max-w-xs bg-white p-3 rounded shadow">All set for the project?</div>
          <div className="max-w-xs ml-auto bg-blue-100 p-3 rounded shadow">Almost done!</div>
        </motion.div>

        {/* Input Box */}
        <div className="flex items-center px-4 py-3 border-t bg-white">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded mr-2"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
