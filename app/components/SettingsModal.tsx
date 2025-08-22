'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSettings, FiX, FiSave, FiEye, FiEyeOff, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { saveApiKey } from '@/lib/api-keys';

interface ApiKey {
  name: string;
  key: string;
  label: string;
  description: string;
  required: boolean;
  placeholder: string;
}

const API_KEYS: ApiKey[] = [
  {
    name: 'E2B_API_KEY',
    key: '',
    label: 'E2B API Key',
    description: 'Required for sandbox environment and code execution',
    required: true,
    placeholder: 'Enter your E2B API key...'
  },
  {
    name: 'ANTHROPIC_API_KEY',
    key: '',
    label: 'Anthropic API Key',
    description: 'For Claude AI model access',
    required: true,
    placeholder: 'Enter your Anthropic API key...'
  },
  {
    name: 'OPENAI_API_KEY',
    key: '',
    label: 'OpenAI API Key',
    description: 'For GPT models access',
    required: false,
    placeholder: 'Enter your OpenAI API key...'
  },
  {
    name: 'GROQ_API_KEY',
    key: '',
    label: 'Groq API Key',
    description: 'For fast LLM inference',
    required: false,
    placeholder: 'Enter your Groq API key...'
  },
  {
    name: 'GOOGLE_API_KEY',
    key: '',
    label: 'Google API Key',
    description: 'For Gemini models access',
    required: false,
    placeholder: 'Enter your Google API key...'
  }
];

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(API_KEYS);
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen) {
      loadApiKeys();
    }
  }, [isOpen]);

  const loadApiKeys = () => {
    const loadedKeys = API_KEYS.map(apiKey => ({
      ...apiKey,
      key: localStorage.getItem(apiKey.name) || ''
    }));
    setApiKeys(loadedKeys);
  };

  const handleKeyChange = (name: string, value: string) => {
    setApiKeys(prev => prev.map(key => 
      key.name === name ? { ...key, key: value } : key
    ));
  };

  const togglePasswordVisibility = (name: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const saveApiKeys = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      // Save to localStorage using the utility function
      apiKeys.forEach(apiKey => {
        saveApiKey(apiKey.name, apiKey.key);
      });

      // Validate required keys
      const missingRequired = apiKeys.filter(key => key.required && !key.key.trim());
      if (missingRequired.length > 0) {
        throw new Error(`Missing required API keys: ${missingRequired.map(k => k.label).join(', ')}`);
      }

      setSaveStatus('success');
      
      // Trigger a custom event to notify other components
      window.dispatchEvent(new CustomEvent('apiKeysUpdated'));
      
      setTimeout(() => {
        setSaveStatus('idle');
        onClose();
      }, 1500);

    } catch (error) {
      setSaveStatus('error');
      console.error('Error saving API keys:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const getMissingRequiredKeys = () => {
    return apiKeys.filter(key => key.required && !key.key.trim());
  };

  const missingRequired = getMissingRequiredKeys();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-lovable-chat-bg border border-white/20 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <FiSettings className="w-6 h-6 text-orange-400" />
                <h2 className="text-xl font-semibold text-white">API Settings</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Warning for missing required keys */}
              {missingRequired.length > 0 && (
                <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <FiAlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-red-400 mb-1">Required API Keys Missing</h3>
                    <p className="text-sm text-red-300">
                      The following API keys are required for full functionality: {missingRequired.map(k => k.label).join(', ')}
                    </p>
                  </div>
                </div>
              )}

              {/* API Keys Form */}
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-white flex items-center gap-2">
                        {apiKey.label}
                        {apiKey.required && (
                          <span className="text-red-400 text-xs">*</span>
                        )}
                      </label>
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(apiKey.name)}
                        className="p-1 text-white/60 hover:text-white transition-colors"
                      >
                        {showPasswords[apiKey.name] ? (
                          <FiEyeOff className="w-4 h-4" />
                        ) : (
                          <FiEye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    
                    <input
                      type={showPasswords[apiKey.name] ? 'text' : 'password'}
                      value={apiKey.key}
                      onChange={(e) => handleKeyChange(apiKey.name, e.target.value)}
                      placeholder={apiKey.placeholder}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
                    />
                    
                    <p className="text-xs text-white/60">{apiKey.description}</p>
                  </div>
                ))}
              </div>

              {/* Save Status */}
              {saveStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
                >
                  <FiCheck className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">API keys saved successfully!</span>
                </motion.div>
              )}

              {saveStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <FiAlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-red-400">Error saving API keys. Please try again.</span>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
              <button
                onClick={onClose}
                className="px-4 py-2 text-white/70 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveApiKeys}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave className="w-4 h-4" />
                    Save Keys
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}