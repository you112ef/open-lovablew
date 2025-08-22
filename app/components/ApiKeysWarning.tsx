'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiX } from 'react-icons/fi';
import { checkRequiredApiKeys } from '@/lib/api-keys';

export default function ApiKeysWarning() {
  const [isVisible, setIsVisible] = useState(true);
  const [validation, setValidation] = useState(checkRequiredApiKeys());

  // Listen for API keys updates
  useEffect(() => {
    const handleApiKeysUpdate = () => {
      setValidation(checkRequiredApiKeys());
    };

    window.addEventListener('apiKeysUpdated', handleApiKeysUpdate);
    return () => window.removeEventListener('apiKeysUpdated', handleApiKeysUpdate);
  }, []);

  // Hide warning if keys are valid
  if (validation.isValid) {
    return null;
  }

  if (isVisible) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4"
      >
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <FiAlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-medium text-red-400 mb-1">API Keys Required</h3>
              <p className="text-sm text-red-300 mb-3">
                Some features require API keys to work properly. Please configure your API keys in settings.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    // Trigger settings modal by dispatching a custom event
                    window.dispatchEvent(new CustomEvent('openSettings'));
                  }}
                  className="px-3 py-1 text-xs bg-red-500/20 text-red-300 hover:text-red-200 hover:bg-red-500/30 transition-colors rounded"
                >
                  Open Settings
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="px-3 py-1 text-xs text-red-300 hover:text-red-200 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 text-red-400 hover:text-red-300 transition-colors"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
}