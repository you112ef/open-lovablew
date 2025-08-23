'use client';

import React, { useState, useEffect } from 'react';
import { Key, X, Zap } from 'lucide-react';

interface QuickSetupPromptProps {
  onOpenSettings: () => void;
}

export default function QuickSetupPrompt({ onOpenSettings }: QuickSetupPromptProps) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const decrypt = (encryptedText: string): string => {
    try {
      return decodeURIComponent(atob(encryptedText));
    } catch {
      return '';
    }
  };

  const checkIfAPIKeysConfigured = () => {
    const keyNames = ['OPENAI_API_KEY', 'ANTHROPIC_API_KEY', 'GROQ_API_KEY', 'E2B_API_KEY', 'FIRECRAWL_API_KEY', 'GEMINI_API_KEY'];
    return keyNames.some(keyName => {
      const encrypted = localStorage.getItem(`api_key_${keyName}`);
      return !!(encrypted && decrypt(encrypted));
    });
  };

  useEffect(() => {
    // Check if user dismissed this prompt
    const wasDismissed = localStorage.getItem('quick_setup_dismissed') === 'true';
    setDismissed(wasDismissed);

    if (!wasDismissed) {
      // Wait a bit then check API keys
      const timer = setTimeout(() => {
        const hasKeys = checkIfAPIKeysConfigured();
        setShowPrompt(!hasKeys);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShowPrompt(false);
    setDismissed(true);
    localStorage.setItem('quick_setup_dismissed', 'true');
  };

  const handleSetupClick = () => {
    setShowPrompt(false);
    onOpenSettings();
  };

  if (!showPrompt || dismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 shadow-lg border border-blue-500/30 z-50 animate-slide-up">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="pr-6">
        <div className="flex items-center space-x-2 mb-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          <h3 className="text-white font-bold">ابدأ الآن!</h3>
        </div>
        
        <p className="text-blue-100 text-sm mb-3">
          لاستخدام Lovable، تحتاج إلى إعداد مفتاح API واحد على الأقل.
        </p>
        
        <div className="flex space-x-2">
          <button
            onClick={handleSetupClick}
            className="flex items-center space-x-2 bg-white text-blue-600 px-3 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors"
          >
            <Key className="w-4 h-4" />
            <span>إعداد المفاتيح</span>
          </button>
          
          <button
            onClick={handleDismiss}
            className="text-blue-100 hover:text-white px-3 py-2 text-sm transition-colors"
          >
            لاحقاً
          </button>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}