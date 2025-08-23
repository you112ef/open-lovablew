'use client';

import React, { useState, useEffect } from 'react';
import { Key, Check, AlertCircle, Wifi, WifiOff } from 'lucide-react';

interface APIKeyStatus {
  name: string;
  label: string;
  configured: boolean;
  required: boolean;
}

export default function APIKeyIndicator() {
  const [apiKeyStatus, setApiKeyStatus] = useState<APIKeyStatus[]>([]);
  const [hasAnyKey, setHasAnyKey] = useState(false);

  const decrypt = (encryptedText: string): string => {
    try {
      return decodeURIComponent(atob(encryptedText));
    } catch {
      return '';
    }
  };

  const checkAPIKeys = () => {
    const keys = [
      { name: 'OPENAI_API_KEY', label: 'OpenAI', required: true },
      { name: 'ANTHROPIC_API_KEY', label: 'Anthropic', required: false },
      { name: 'GROQ_API_KEY', label: 'Groq', required: false },
      { name: 'E2B_API_KEY', label: 'E2B', required: false },
      { name: 'FIRECRAWL_API_KEY', label: 'Firecrawl', required: false },
      { name: 'GEMINI_API_KEY', label: 'Gemini', required: false },
    ];

    const status = keys.map(key => {
      const encrypted = localStorage.getItem(`api_key_${key.name}`);
      const configured = !!(encrypted && decrypt(encrypted));
      return {
        ...key,
        configured
      };
    });

    setApiKeyStatus(status);
    setHasAnyKey(status.some(key => key.configured));
  };

  useEffect(() => {
    // Initial check
    checkAPIKeys();

    // Listen for localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.startsWith('api_key_')) {
        checkAPIKeys();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Check periodically (in case of direct localStorage changes)
    const interval = setInterval(checkAPIKeys, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const configuredCount = apiKeyStatus.filter(key => key.configured).length;
  const totalCount = apiKeyStatus.length;

  return (
    <div className="flex items-center space-x-2">
      {/* Status Icon */}
      <div className="relative">
        {hasAnyKey ? (
          <Wifi className="w-4 h-4 text-green-400" />
        ) : (
          <WifiOff className="w-4 h-4 text-red-400" />
        )}
        
        {/* Notification dot */}
        {!hasAnyKey && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        )}
      </div>

      {/* Status Text */}
      <div className="hidden sm:flex items-center space-x-1 text-xs">
        <span className={hasAnyKey ? 'text-green-400' : 'text-red-400'}>
          {hasAnyKey ? 'متصل' : 'غير متصل'}
        </span>
        <span className="text-gray-400">
          ({configuredCount}/{totalCount})
        </span>
      </div>

      {/* Detailed tooltip on hover */}
      <div className="group relative">
        <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg z-50">
          <div className="text-sm font-medium text-white mb-2">حالة مفاتيح API</div>
          <div className="space-y-1">
            {apiKeyStatus.map(key => (
              <div key={key.name} className="flex items-center justify-between text-xs">
                <span className="text-gray-300">
                  {key.label}
                  {key.required && <span className="text-red-400 mr-1">*</span>}
                </span>
                <div className="flex items-center space-x-1">
                  {key.configured ? (
                    <>
                      <Check className="w-3 h-3 text-green-400" />
                      <span className="text-green-400">✓</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3 text-gray-500" />
                      <span className="text-gray-500">×</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {!hasAnyKey && (
            <div className="mt-2 pt-2 border-t border-gray-700">
              <div className="text-xs text-yellow-400 flex items-start space-x-1">
                <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>يجب إعداد مفتاح واحد على الأقل</span>
              </div>
            </div>
          )}
          
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      </div>
    </div>
  );
}