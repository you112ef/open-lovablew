'use client';

import { useState } from 'react';
import { Plus, Image, Globe, Zap, ChevronDown, Send } from 'lucide-react';

export default function HomePage() {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      console.log('Submitting:', inputValue);
      // Here you can add your AI chat logic
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      {/* Header text */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Build something Lovable
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
          Create apps and websites by chatting with AI
        </p>
      </div>

      {/* Chat input area */}
      <div className="w-full max-w-4xl">
        <form onSubmit={handleSubmit}>
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700">
            {/* Input field */}
            <div className="mb-4">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-transparent text-gray-300 placeholder-gray-400 resize-none outline-none text-lg"
                placeholder="Ask Lovable to create a web app that..."
                rows={3}
              />
            </div>

            {/* Bottom row of icons and buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button 
                  type="button"
                  className="p-2 rounded-full border border-gray-600 hover:border-gray-500 transition-colors hover:bg-gray-700/50"
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
                <button 
                  type="button"
                  className="p-2 rounded-full border border-gray-600 hover:border-gray-500 transition-colors hover:bg-gray-700/50"
                >
                  <Image className="w-5 h-5 text-white" />
                </button>
                <button 
                  type="button"
                  className="p-2 rounded-full border border-gray-600 hover:border-gray-500 transition-colors hover:bg-gray-700/50"
                >
                  <Globe className="w-5 h-5 text-white" />
                </button>
                <button 
                  type="button"
                  className="flex items-center space-x-1 px-3 py-2 rounded-full border border-gray-600 hover:border-gray-500 transition-colors hover:bg-gray-700/50"
                >
                  <Zap className="w-5 h-5 text-green-400" />
                  <ChevronDown className="w-4 h-4 text-green-400" />
                </button>
              </div>

              <button 
                type="submit"
                className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors hover:scale-105"
              >
                <Send className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}