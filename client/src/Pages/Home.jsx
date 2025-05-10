import { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const users = ['Alice', 'Bob', 'Charlie', 'Diana'];
  const [message, setMessage] = useState('');

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      {/* Main content under navbar */}
      <div className="flex flex-1 mt-16 overflow-hidden relative">
        {/* Sidebar */}
        <div
          className={`bg-gray-100 w-64 p-4 shadow-md transition-transform duration-300 
            md:translate-x-0 md:static absolute z-10 h-full mt-6
            ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search users..."
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <ul className="space-y-2">
            {users.map((user, index) => (
              <li key={index} className="p-2 rounded hover:bg-gray-200">
                {user}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white p-4 overflow-hidden relative mt-2 flex flex-col">
          {/* Toggle Button */}
          <button
            className="md:hidden absolute top-2 left-2 z-20 bg-blue-600 text-white p-2 rounded"
            onClick={() => setShowSidebar(prev => !prev)}
          >
            ☰
          </button>

          {/* Chat messages area */}
          <div className="flex-1 bg-gray-100 p-4 rounded overflow-auto mb-16">
            <p>This is the chat container. Replace with your chat UI.</p>
          </div>

          {/* Message input */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 bg-white p-2 rounded shadow-md border">
            <button className="text-blue-600">
              <FaImage size={20} />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
