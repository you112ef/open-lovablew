'use client';

import { Code, FileText, Settings, MessageSquare, Zap, Play } from 'lucide-react';

interface NavigationProps {
  activeTab: 'chat' | 'code' | 'preview';
  onTabChange: (tab: 'chat' | 'code' | 'preview') => void;
  hasGeneratedFiles: boolean;
}

const tabs = [
  {
    id: 'chat' as const,
    name: 'المحادثة',
    icon: MessageSquare,
    description: 'تحدث مع AI لإنشاء تطبيقك',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500',
    disabled: false
  },
  {
    id: 'code' as const,
    name: 'الكود',
    icon: FileText,
    description: 'عرض الكود المُنشأ',
    color: 'text-green-400',
    bgColor: 'bg-green-500',
    disabled: false
  },
  {
    id: 'preview' as const,
    name: 'المعاينة',
    icon: Play,
    description: 'معاينة التطبيق مباشرة',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500',
    disabled: false
  }
];

export default function Navigation({ activeTab, onTabChange, hasGeneratedFiles }: NavigationProps) {
  return (
    <nav className="relative z-10 bg-gray-900/50 backdrop-blur-sm border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const isDisabled = tab.id === 'code' || tab.id === 'preview' ? !hasGeneratedFiles : false;
            
            return (
              <button
                key={tab.id}
                onClick={() => !isDisabled && onTabChange(tab.id)}
                disabled={isDisabled}
                className={`group relative py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? `border-${tab.bgColor.split('-')[1]}-500 text-${tab.color.split('-')[1]}-400`
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center space-x-2">
                  <tab.icon className={`w-4 h-4 ${isActive ? tab.color : ''}`} />
                  <span>{tab.name}</span>
                  {isDisabled && (
                    <span className="text-xs text-gray-500">(يتطلب إنشاء ملفات)</span>
                  )}
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${tab.bgColor} rounded-full`} />
                )}
                
                {/* Hover indicator */}
                {!isActive && !isDisabled && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" />
                )}
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {tab.description}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Progress indicator */}
        {hasGeneratedFiles && (
          <div className="mt-2 pb-2">
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>تم إنشاء الملفات</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>جاهز للمعاينة</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>يمكن التنزيل</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}