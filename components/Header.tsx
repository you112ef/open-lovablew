'use client';

import { useState } from 'react';
import { Zap, ChevronDown, Settings, User, HelpCircle, Github, Twitter, Mail, Key } from 'lucide-react';
import APISettingsModal from './APISettingsModal';
import APIKeyIndicator from './APIKeyIndicator';

interface HeaderProps {
  projectName: string;
  onProjectNameChange: (name: string) => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const models = [
  { id: 'gpt-4', name: 'GPT-4', description: 'أقوى نموذج ذكي', icon: '🤖', color: 'text-green-400' },
  { id: 'gpt-3.5', name: 'GPT-3.5', description: 'سريع ومتطور', icon: '⚡', color: 'text-blue-400' },
  { id: 'claude', name: 'Claude', description: 'متفوق في البرمجة', icon: '🧠', color: 'text-purple-400' },
  { id: 'gemini', name: 'Gemini', description: 'مبتكر من Google', icon: '💎', color: 'text-yellow-400' },
  { id: 'llama', name: 'Llama', description: 'مفتوح المصدر', icon: '🦙', color: 'text-orange-400' }
];

export default function Header({ projectName, onProjectNameChange, selectedModel, onModelChange }: HeaderProps) {
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAPISettings, setShowAPISettings] = useState(false);

  const currentModel = models.find(m => m.id === selectedModel);

  return (
    <header className="relative z-10 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Lovable</h1>
            </div>

            {/* Project Name Input */}
            <div className="relative">
              <input
                type="text"
                value={projectName}
                onChange={(e) => onProjectNameChange(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 min-w-48"
                placeholder="اسم المشروع"
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <span className="text-gray-400 text-sm">📁</span>
              </div>
            </div>
          </div>

          {/* Center Section */}
          <div className="flex items-center space-x-4">
            {/* AI Model Selector */}
            <div className="relative">
              <button
                onClick={() => setShowModelSelector(!showModelSelector)}
                className="flex items-center space-x-3 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-600 hover:border-gray-500"
              >
                <Zap className="w-4 h-4 text-green-400" />
                <span className="font-medium">{currentModel?.name}</span>
                <span className="text-lg">{currentModel?.icon}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showModelSelector ? 'rotate-180' : ''}`} />
              </button>
              
              {showModelSelector && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-2">اختر نموذج AI</h3>
                    <p className="text-sm text-gray-400">اختر النموذج المناسب لمشروعك</p>
                  </div>
                  <div className="p-2">
                    {models.map(model => (
                      <button
                        key={model.id}
                        onClick={() => {
                          onModelChange(model.id);
                          setShowModelSelector(false);
                        }}
                        className={`w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors ${
                          selectedModel === model.id ? 'bg-blue-600 text-white' : 'text-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{model.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium">{model.name}</div>
                            <div className={`text-sm ${selectedModel === model.id ? 'text-blue-100' : 'text-gray-400'}`}>
                              {model.description}
                            </div>
                          </div>
                          {selectedModel === model.id && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              {/* API Key Status */}
              <APIKeyIndicator />
              
              <button
                onClick={() => setShowAPISettings(true)}
                className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                title="ضبط مفاتيح API"
              >
                <Key className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                title="المساعدة"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                title="الإعدادات"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-2">
              <a
                href="https://github.com/lovable-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/lovable_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@lovable.ai"
                className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                title="Contact"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:block">حسابي</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="p-2">
                    <button className="w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>الملف الشخصي</span>
                      </div>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white">
                      <div className="flex items-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>الإعدادات</span>
                      </div>
                    </button>
                    <div className="border-t border-gray-700 my-1"></div>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white">
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Help Panel */}
      {showHelp && (
        <div className="absolute top-full left-0 right-0 bg-gray-800 border-b border-gray-700 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">🚀 كيف تبدأ</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• اكتب وصفاً لما تريد إنشاءه</li>
                  <li>• اختر نموذج AI المناسب</li>
                  <li>• انتظر حتى يتم إنشاء التطبيق</li>
                  <li>• معاينة وتنزيل الكود</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">💡 نصائح</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• كن محدداً في وصفك</li>
                  <li>• اذكر التقنيات المفضلة</li>
                  <li>• حدد الميزات المطلوبة</li>
                  <li>• استخدم أمثلة واضحة</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">🔧 الميزات</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• إنشاء تطبيقات React</li>
                  <li>• تصميم متجاوب</li>
                  <li>• معاينة مباشرة</li>
                  <li>• تنزيل الكود</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API Settings Modal */}
      <APISettingsModal
        isOpen={showAPISettings}
        onClose={() => setShowAPISettings(false)}
        onSave={() => {
          // Force refresh to reload API keys
          window.location.reload();
        }}
      />
    </header>
  );
}