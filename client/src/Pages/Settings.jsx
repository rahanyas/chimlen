import { useState } from 'react';
import useTheme from '../Context/themeStore';
import Navbar from '../components/Navbar';
import useUser from '../Context/userStore';
import { Link, useNavigate } from 'react-router-dom';

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  // const [loading, setLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const {handleLogout, errMsg, isUser} = useUser();
  let navigate = useNavigate();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}absolute`}>
      <Navbar />
      
      {/* Flex container for vertical centering */}
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-4 py-8 relative top-13">
        <div className={`w-full max-w-3xl ${theme === 'dark' ? 'bg-gray-500' : 'bg-white'} p-8 rounded-xl shadow-lg border `}>
          {errMsg.length > 0 && 
          <div>
            {errMsg}
          </div>
          }
          {/* Header */}
          <h2 className="text-3xl font-bold text-center mb-6">Settings</h2>

          {/* Profile Settings */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
            <div className="flex flex-col gap-4">
              <input type="text" placeholder="Change your username" className="border border-gray-300 dark:border-gray-600 rounded-md p-2" />
              <input type="email" placeholder="Change your email" className="border border-gray-300 dark:border-gray-600 rounded-md p-2" />
              <input type="password" placeholder="Change your password" className="border border-gray-300 dark:border-gray-600 rounded-md p-2" />
            </div>
          </section>

          {/* Notification Preferences */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>
            <div className="flex items-center gap-3">
              <label htmlFor="notifications" className="text-sm">Enable Notifications</label>
              <input
                id="notifications"
                type="checkbox"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(prev => !prev)}
                className="rounded-full h-6 w-12 bg-blue-600 cursor-pointer"
              />
            </div>
          </section>

          {/* Theme Customization */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Theme</h3>
            <div className="flex items-center gap-3">
              <label htmlFor="darkMode" className="text-sm">Dark Mode</label>
              <input
                id="darkMode"
                type="checkbox"
                checked={theme === 'dark'}
                onChange={toggleTheme}
                className="rounded-full h-6 w-12 bg-blue-600 cursor-pointer"
              />
            </div>
          </section>

          {/* Logout Button */}
          <section>
            
            <button
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition cursor-pointer"
              onClick={() => handleLogout(navigate)}
              // disabled={loading}
            >
              logout
            </button>
          
          </section>

        </div>
      </div>
    </div>
  );
};

export default Settings;
