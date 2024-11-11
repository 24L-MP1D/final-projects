'use client';

import { useState } from 'react';
import { DashboardAside } from '../components/DashboardAside';

const Settings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(false);

  const handleSave = (e: any) => {
    e.preventDefault();
    // Handle the save logic here (e.g., send data to an API)
    console.log('Settings saved:', { username, email, notifications });
  };

  return (
    <div className="flex bg-[#F7F7F8]">
      <DashboardAside />
      <div className="bg-slate-100 rounded-xl mx-auto mt-2 p-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Тохиргоо</h1>
          <form onSubmit={handleSave} className="mt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 p-2 border rounded w-full" placeholder="Enter your username" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 border rounded w-full" placeholder="Enter your email" required />
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} className="form-checkbox" />
                <span className="ml-2">Enable Notifications</span>
              </label>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
