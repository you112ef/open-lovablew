'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, Download, FileText, Code, Settings } from 'lucide-react';

interface ChatMessage {
  id: string;
  content: string;
  type: 'user' | 'ai' | 'system';
  timestamp: Date;
  isTyping?: boolean;
}

interface GeneratedFile {
  name: string;
  content: string;
  type: 'jsx' | 'tsx' | 'css' | 'json' | 'html';
  path: string;
}

interface AIChatProps {
  onFilesGenerated: (files: GeneratedFile[]) => void;
  onTabChange: (tab: 'chat' | 'code' | 'preview') => void;
}

export default function AIChat({ onFilesGenerated, onTabChange }: AIChatProps) {
  const [inputValue, setInputValue] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'مرحباً! أنا Lovable، مساعدك الذكي لبناء التطبيقات. أخبرني ما الذي تريد إنشاءه وسأساعدك في بنائه خطوة بخطوة.',
      type: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isGenerating) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      type: 'user',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsGenerating(true);

    // محاكاة استجابة AI
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `أفهم طلبك: "${inputValue}". سأقوم بإنشاء التطبيق المطلوب...`,
        type: 'ai',
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiResponse]);

      // محاكاة إنشاء الملفات
      setTimeout(() => {
        const newFiles: GeneratedFile[] = [
          {
            name: 'App.jsx',
            content: `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>تطبيقي الجديد</h1>
        <p>تم إنشاؤه بواسطة Lovable</p>
      </header>
      <main className="app-main">
        <p>مرحباً بك في تطبيقك الجديد!</p>
        <div className="features">
          <h2>المميزات</h2>
          <ul>
            <li>تصميم جميل ومتطور</li>
            <li>واجهة سهلة الاستخدام</li>
            <li>متجاوب مع جميع الأجهزة</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;`,
            type: 'jsx',
            path: 'src/App.jsx'
          },
          {
            name: 'App.css',
            content: `.app {
  text-align: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.app-header {
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.app-header h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.app-header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.app-main {
  padding: 3rem 2rem;
}

.app-main p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.features {
  max-width: 600px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.features h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.features ul {
  list-style: none;
  padding: 0;
}

.features li {
  font-size: 1.1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.features li:last-child {
  border-bottom: none;
}`,
            type: 'css',
            path: 'src/App.css'
          },
          {
            name: 'index.html',
            content: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>تطبيقي الجديد - Lovable</title>
  <meta name="description" content="تطبيق تم إنشاؤه بواسطة Lovable">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>`,
            type: 'html',
            path: 'public/index.html'
          },
          {
            name: 'package.json',
            content: `{
  "name": "my-lovable-app",
  "version": "1.0.0",
  "description": "تطبيق تم إنشاؤه بواسطة Lovable",
  "main": "index.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.4.0"
  }
}`,
            type: 'json',
            path: 'package.json'
          }
        ];

        setGeneratedFiles(newFiles);
        setIsGenerating(false);
        onFilesGenerated(newFiles);
        onTabChange('code');

        const completionMessage: ChatMessage = {
          id: (Date.now() + 2).toString(),
          content: `تم إنشاء تطبيقك بنجاح! 🎉\n\nتم إنشاء ${newFiles.length} ملفات:\n${newFiles.map(f => `• ${f.name}`).join('\n')}\n\nيمكنك الآن معاينة الكود وتنزيل الملفات.`,
          type: 'ai',
          timestamp: new Date()
        };

        setChatMessages(prev => [...prev, completionMessage]);
      }, 2000);
    }, 1000);
  };

  const setGeneratedFiles = (files: GeneratedFile[]) => {
    // This will be handled by the parent component
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {chatMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : message.type === 'ai'
                  ? 'bg-gray-700 text-gray-100'
                  : 'bg-gray-600 text-gray-300'
              }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
              {message.isTyping && (
                <div className="flex space-x-1 mt-2">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isGenerating && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>جاري إنشاء التطبيق...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-6 border-t border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-3">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-gray-800 text-white placeholder-gray-400 resize-none outline-none rounded-lg p-3 border border-gray-600 focus:border-blue-500"
              placeholder="أخبرني ما الذي تريد إنشاءه..."
              rows={3}
              disabled={isGenerating}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isGenerating}
              className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors hover:scale-105"
              title="إرسال"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}