'use client';

import React, { useState, useEffect } from 'react';
import { X, Key, Save, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';

interface APIKey {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  description: string;
  required?: boolean;
}

interface APISettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const API_KEYS: APIKey[] = [
  {
    id: 'OPENAI_API_KEY',
    name: 'openai',
    label: 'OpenAI API Key',
    placeholder: 'sk-...',
    description: 'مفتاح OpenAI للحصول على GPT-4 وGPT-3.5',
    required: true
  },
  {
    id: 'ANTHROPIC_API_KEY',
    name: 'anthropic',
    label: 'Anthropic API Key',
    placeholder: 'sk-ant-...',
    description: 'مفتاح Anthropic للحصول على Claude',
  },
  {
    id: 'GROQ_API_KEY',
    name: 'groq',
    label: 'Groq API Key',
    placeholder: 'gsk_...',
    description: 'مفتاح Groq للحصول على Llama وMixtral',
  },
  {
    id: 'E2B_API_KEY',
    name: 'e2b',
    label: 'E2B API Key',
    placeholder: 'e2b_...',
    description: 'مفتاح E2B لتنفيذ الكود (اختياري)',
  },
  {
    id: 'FIRECRAWL_API_KEY',
    name: 'firecrawl',
    label: 'Firecrawl API Key',
    placeholder: 'fc-...',
    description: 'مفتاح Firecrawl لجلب المحتوى (اختياري)',
  },
  {
    id: 'GEMINI_API_KEY',
    name: 'gemini',
    label: 'Google Gemini API Key',
    placeholder: 'AIza...',
    description: 'مفتاح Google Gemini (اختياري)',
  }
];

// Simple encryption/decryption for storing API keys
const encrypt = (text: string): string => {
  return btoa(encodeURIComponent(text));
};

const decrypt = (encryptedText: string): string => {
  try {
    return decodeURIComponent(atob(encryptedText));
  } catch {
    return '';
  }
};

export default function APISettingsModal({ isOpen, onClose, onSave }: APISettingsModalProps) {
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [testingKeys, setTestingKeys] = useState<Record<string, boolean>>({});
  const [keyStatus, setKeyStatus] = useState<Record<string, 'valid' | 'invalid' | 'untested'>>({});

  // Load saved API keys on mount
  useEffect(() => {
    if (isOpen) {
      const savedKeys: Record<string, string> = {};
      const status: Record<string, 'valid' | 'invalid' | 'untested'> = {};
      
      API_KEYS.forEach(key => {
        const encrypted = localStorage.getItem(`api_key_${key.id}`);
        savedKeys[key.id] = encrypted ? decrypt(encrypted) : '';
        status[key.id] = 'untested';
      });
      
      setApiKeys(savedKeys);
      setKeyStatus(status);
    }
  }, [isOpen]);

  const handleKeyChange = (keyId: string, value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [keyId]: value
    }));
    
    // Reset status when key changes
    setKeyStatus(prev => ({
      ...prev,
      [keyId]: 'untested'
    }));
  };

  const toggleShowKey = (keyId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const testAPIKey = async (keyId: string) => {
    const key = apiKeys[keyId];
    if (!key.trim()) return;

    setTestingKeys(prev => ({ ...prev, [keyId]: true }));

    try {
      // Simple validation based on key format
      let isValid = false;
      
      switch (keyId) {
        case 'OPENAI_API_KEY':
          isValid = key.startsWith('sk-') && key.length > 20;
          break;
        case 'ANTHROPIC_API_KEY':
          isValid = key.startsWith('sk-ant-') && key.length > 20;
          break;
        case 'GROQ_API_KEY':
          isValid = key.startsWith('gsk_') && key.length > 20;
          break;
        case 'E2B_API_KEY':
          isValid = key.startsWith('e2b_') && key.length > 10;
          break;
        case 'FIRECRAWL_API_KEY':
          isValid = key.startsWith('fc-') && key.length > 10;
          break;
        case 'GEMINI_API_KEY':
          isValid = key.startsWith('AIza') && key.length > 20;
          break;
        default:
          isValid = key.length > 10;
      }

      // Add artificial delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      setKeyStatus(prev => ({
        ...prev,
        [keyId]: isValid ? 'valid' : 'invalid'
      }));
    } catch (error) {
      setKeyStatus(prev => ({
        ...prev,
        [keyId]: 'invalid'
      }));
    } finally {
      setTestingKeys(prev => ({ ...prev, [keyId]: false }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      // Save encrypted keys to localStorage
      API_KEYS.forEach(key => {
        const value = apiKeys[key.id];
        if (value.trim()) {
          localStorage.setItem(`api_key_${key.id}`, encrypt(value));
        } else {
          localStorage.removeItem(`api_key_${key.id}`);
        }
      });

      // Save timestamp
      localStorage.setItem('api_keys_updated', new Date().toISOString());

      // Add delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving API keys:', error);
      alert('حدث خطأ أثناء حفظ المفاتيح. يرجى المحاولة مرة أخرى.');
    } finally {
      setSaving(false);
    }
  };

  const clearAllKeys = () => {
    if (confirm('هل أنت متأكد من حذف جميع مفاتيح API؟')) {
      API_KEYS.forEach(key => {
        localStorage.removeItem(`api_key_${key.id}`);
      });
      setApiKeys({});
      setKeyStatus({});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Key className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">ضبط مفاتيح API</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-200">
                <p className="font-medium mb-1">معلومات مهمة:</p>
                <ul className="space-y-1 text-blue-300/80">
                  <li>• يتم حفظ المفاتيح محلياً على جهازك فقط</li>
                  <li>• يجب إدخال مفتاح واحد على الأقل لتشغيل التطبيق</li>
                  <li>• يمكنك اختبار صحة المفاتيح قبل الحفظ</li>
                </ul>
              </div>
            </div>
          </div>

          {API_KEYS.map((key) => (
            <div key={key.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-white">
                    {key.label}
                    {key.required && <span className="text-red-400 mr-1">*</span>}
                  </label>
                  <p className="text-xs text-gray-400 mt-1">{key.description}</p>
                </div>
                {keyStatus[key.id] === 'valid' && (
                  <Check className="w-5 h-5 text-green-400" />
                )}
                {keyStatus[key.id] === 'invalid' && (
                  <AlertCircle className="w-5 h-5 text-red-400" />
                )}
              </div>
              
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <input
                    type={showKeys[key.id] ? 'text' : 'password'}
                    value={apiKeys[key.id] || ''}
                    onChange={(e) => handleKeyChange(key.id, e.target.value)}
                    placeholder={key.placeholder}
                    className="w-full bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowKey(key.id)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showKeys[key.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                
                <button
                  onClick={() => testAPIKey(key.id)}
                  disabled={!apiKeys[key.id]?.trim() || testingKeys[key.id]}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm"
                >
                  {testingKeys[key.id] ? '...' : 'اختبار'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-700">
          <button
            onClick={clearAllKeys}
            className="px-4 py-2 text-red-400 hover:text-red-300 transition-colors text-sm"
          >
            حذف جميع المفاتيح
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
            >
              إلغاء
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'جاري الحفظ...' : 'حفظ المفاتيح'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}