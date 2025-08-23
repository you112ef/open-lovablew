'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, Download, FileText, Code, Settings, AlertCircle } from 'lucide-react';
import aiService, { GeneratedFile, APIError } from '../lib/ai-service';

interface ChatMessage {
  id: string;
  content: string;
  type: 'user' | 'ai' | 'system' | 'error';
  timestamp: Date;
  isTyping?: boolean;
}

interface AIChatProps {
  onFilesGenerated: (files: GeneratedFile[]) => void;
  onTabChange: (tab: 'chat' | 'code' | 'preview') => void;
  selectedModel?: string;
}

export default function AIChat({ onFilesGenerated, onTabChange, selectedModel = 'gpt-4' }: AIChatProps) {
  const [inputValue, setInputValue] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'مرحباً! أنا Lovable، مساعدك الذكي لبناء التطبيقات. 🚀\n\nلبدء الاستخدام:\n1. اضغط على أيقونة المفتاح 🔑 لإعداد مفاتيح API\n2. أدخل مفتاح واحد على الأقل (OpenAI مُوصى به)\n3. أخبرني ما الذي تريد إنشاءه!\n\nيمكنني مساعدتك في بناء:\n• تطبيقات ويب بـ React\n• مواقع إلكترونية متجاوبة\n• لوحات تحكم وأدوات\n• وأكثر من ذلك بكثير! ✨',
      type: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiStatus, setApiStatus] = useState<'checking' | 'ok' | 'error'>('checking');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Check API status on component mount
  useEffect(() => {
    const checkAPIStatus = async () => {
      try {
        const status = await aiService.checkAPIStatus();
        setApiStatus(status.status);
        
        if (status.status === 'error') {
          setChatMessages(prev => [...prev, {
            id: Date.now().toString(),
            content: '⚠️ تحذير: لم يتم تكوين مفاتيح API للذكاء الاصطناعي. يرجى إعداد OPENAI_API_KEY أو ANTHROPIC_API_KEY أو GROQ_API_KEY في متغيرات البيئة.',
            type: 'error',
            timestamp: new Date()
          }]);
        }
      } catch (error) {
        setApiStatus('error');
        setChatMessages(prev => [...prev, {
          id: Date.now().toString(),
          content: '❌ خطأ في الاتصال بالخادم. يرجى التحقق من إعدادات الشبكة.',
          type: 'error',
          timestamp: new Date()
        }]);
      }
    };

    checkAPIStatus();
  }, []);

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

    try {
      // Add thinking message
      const thinkingMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `أفهم طلبك: "${inputValue}". جاري إنشاء التطبيق...`,
        type: 'ai',
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, thinkingMessage]);

      // Call real AI service
      const result = await aiService.generateCode(inputValue, selectedModel, 'ar');
      
      // Validate the response
      const validation = aiService.validateFiles(result.files);
      if (!validation.valid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }

      // Update files
      onFilesGenerated(result.files);
      setIsGenerating(false);
      onTabChange('code');

      // Add completion message
      const completionMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        content: `تم إنشاء تطبيقك بنجاح! 🎉\n\n${result.message}\n\nتم إنشاء ${result.files.length} ملفات:\n${result.files.map(f => `• ${f.name}`).join('\n')}\n\nيمكنك الآن معاينة الكود وتنزيل الملفات.`,
        type: 'ai',
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, completionMessage]);

    } catch (error) {
      console.error('AI generation error:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        content: `❌ حدث خطأ أثناء إنشاء التطبيق:\n\n${error instanceof Error ? error.message : 'خطأ غير معروف'}\n\nيرجى المحاولة مرة أخرى أو التحقق من إعدادات API.`,
        type: 'error',
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, errorMessage]);
      setIsGenerating(false);
    }
  };

  // Remove this unused function

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
                  : message.type === 'error'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-600 text-gray-300'
              }`}
            >
              <div className="whitespace-pre-wrap">
                {message.type === 'error' && <AlertCircle className="w-4 h-4 inline mr-2" />}
                {message.content}
              </div>
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
            placeholder={apiStatus === 'error' ? 'API غير متاح - يرجى التحقق من الإعدادات' : 'أخبرني ما الذي تريد إنشاءه...'}
            rows={3}
            disabled={isGenerating || apiStatus === 'error'}
          />
            <button
              type="submit"
              disabled={!inputValue.trim() || isGenerating || apiStatus === 'error'}
              className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors hover:scale-105"
              title={apiStatus === 'error' ? 'API غير متاح' : 'إرسال'}
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}