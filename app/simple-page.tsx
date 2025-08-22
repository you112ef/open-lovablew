'use client';

import { useState } from 'react';
import { Plus, Image, Globe, Zap, ChevronDown, Send } from 'lucide-react';

export default function SimpleLovablePage() {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      console.log('Submitting:', inputValue);
      alert(`You entered: ${inputValue}`);
      setInputValue('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-700 to-pink-300 relative overflow-hidden">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }} 
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
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
                    title="Add attachment"
                  >
                    <Plus className="w-5 h-5 text-white" />
                  </button>
                  <button 
                    type="button"
                    className="p-2 rounded-full border border-gray-600 hover:border-gray-500 transition-colors hover:bg-gray-700/50"
                    title="Add image"
                  >
                    <Image className="w-5 h-5 text-white" />
                  </button>
                  <button 
                    type="button"
                    className="p-2 rounded-full border border-gray-600 hover:border-gray-500 transition-colors hover:bg-gray-700/50"
                    title="Browse web"
                  >
                    <Globe className="w-5 h-5 text-white" />
                  </button>
                  <button 
                    type="button"
                    className="flex items-center space-x-1 px-3 py-2 rounded-full border border-gray-600 hover:border-gray-500 transition-colors hover:bg-gray-700/50"
                    title="AI model options"
                  >
                    <Zap className="w-5 h-5 text-green-400" />
                    <ChevronDown className="w-4 h-4 text-green-400" />
                  </button>
                </div>

                <button 
                  type="submit"
                  className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors hover:scale-105"
                  title="Send message"
                >
                  <Send className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Simple demo message */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            This is a demo version of the Lovable interface
          </p>
        </div>
      </div>
    </div>
  );
}