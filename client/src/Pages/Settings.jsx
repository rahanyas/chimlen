import { useState } from 'react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className={`min-h-screen bg-${darkMode ? 'gray-900' : 'gray-50'} text-${darkMode ? 'white' : 'gray-800'} p-6`}>
      <div className={`max-w-3xl mx-auto bg-${darkMode ? 'gray-500' : 'white'}  p-8 rounded-xl shadow-lg border`}>
        {/* Header */}
        <h2 className="text-3xl font-bold text-center mb-6">Settings</h2>

        {/* Profile Settings */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Change your username"
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2"
            />
            <input
              type="email"
              placeholder="Change your email"
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2"
            />
            <input
              type="password"
              placeholder="Change your password"
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2"
            />
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>
          <div className="flex items-center gap-3">
            <label htmlFor="notifications" className="text-sm">
              Enable Notifications
            </label>
            <input
              id="notifications"
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              className="rounded-full h-6 w-12 bg-blue-600 cursor-pointer "
            />
          </div>
        </section>

        {/* Theme Customization */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Theme</h3>
          <div className="flex items-center gap-3">
            <label htmlFor="darkMode" className="text-sm">
              Dark Mode
            </label>
            <input
              id="darkMode"
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="rounded-full h-6 w-12 bg-blue-600 cursor-pointer"
            />
          </div>
        </section>

        {/* Privacy Settings */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Privacy Settings</h3>
          <div className="flex items-center gap-3">
            <label htmlFor="profileVisibility" className="text-sm">
              Profile Visibility
            </label>
            <select
              id="profileVisibility"
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm"
            >
              <option className='text-black '>Public</option>
              <option  className='text-black '>Friends Only</option>
              <option  className='text-black '>Private</option>
            </select>
          </div>
        </section>

        {/* Logout Button */}
        <section>
          <button
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition cursor-pointer"
            onClick={() => alert('Logging out...')}
          >
            Logout
          </button>
        </section>
      </div>
    </div>
  );
};

export default Settings;
