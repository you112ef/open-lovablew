'use client';

import { useState, useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import SettingsModal from './SettingsModal';

export default function SettingsButton() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Listen for custom event to open settings
  useEffect(() => {
    const handleOpenSettings = () => {
      setIsSettingsOpen(true);
    };

    window.addEventListener('openSettings', handleOpenSettings);
    return () => window.removeEventListener('openSettings', handleOpenSettings);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsSettingsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-200"
        title="API Settings"
      >
        <FiSettings className="w-4 h-4" />
        <span>Settings</span>
      </button>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
}