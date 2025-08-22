'use client';

import { RefreshCw, Download, FileText, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface GeneratedFile {
  name: string;
  content: string;
  type: 'jsx' | 'tsx' | 'css' | 'json' | 'html';
  path: string;
}

interface CodeViewerProps {
  files: GeneratedFile[];
  isGenerating: boolean;
  onRegenerate: () => void;
  onDownload: () => void;
}

export default function CodeViewer({ files, isGenerating, onRegenerate, onDownload }: CodeViewerProps) {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const copyToClipboard = async (content: string, fileName: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedFile(fileName);
      setTimeout(() => setCopiedFile(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'jsx':
      case 'tsx':
        return '⚛️';
      case 'css':
        return '🎨';
      case 'html':
        return '🌐';
      case 'json':
        return '📄';
      default:
        return '📁';
    }
  };

  const getFileColor = (type: string) => {
    switch (type) {
      case 'jsx':
      case 'tsx':
        return 'text-blue-400';
      case 'css':
        return 'text-pink-400';
      case 'html':
        return 'text-orange-400';
      case 'json':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const getSyntaxHighlighting = (type: string, content: string) => {
    // Simple syntax highlighting for different file types
    if (type === 'jsx' || type === 'tsx') {
      return content
        .replace(/\b(import|export|from|function|return|const|let|var)\b/g, '<span class="text-blue-400">$1</span>')
        .replace(/\b(React|useState|useEffect|useRef)\b/g, '<span class="text-purple-400">$1</span>')
        .replace(/\b(className|onClick|onChange|onSubmit)\b/g, '<span class="text-green-400">$1</span>')
        .replace(/(&lt;\/?[^&]*&gt;)/g, '<span class="text-orange-400">$1</span>');
    } else if (type === 'css') {
      return content
        .replace(/([^{}]+)(?={)/g, '<span class="text-blue-400">$1</span>')
        .replace(/([a-zA-Z-]+)(?=:)/g, '<span class="text-green-400">$1</span>')
        .replace(/(#[0-9a-fA-F]{3,6}|rgba?\([^)]+\))/g, '<span class="text-pink-400">$1</span>');
    } else if (type === 'html') {
      return content
        .replace(/(&lt;\/?[^&]*&gt;)/g, '<span class="text-orange-400">$1</span>')
        .replace(/\b(lang|charset|viewport|title|meta|link|script)\b/g, '<span class="text-blue-400">$1</span>');
    } else if (type === 'json') {
      return content
        .replace(/"([^"]+)":/g, '<span class="text-green-400">"$1"</span>:')
        .replace(/\b(true|false|null)\b/g, '<span class="text-purple-400">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="text-yellow-400">$1</span>');
    }
    return content;
  };

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <FileText className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-lg">لم يتم إنشاء أي ملفات بعد</p>
        <p className="text-sm">ابدأ المحادثة مع AI لإنشاء تطبيقك</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">الكود المُنشأ</h2>
          <div className="flex space-x-3">
            <button
              onClick={onRegenerate}
              disabled={isGenerating}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'جاري التوليد...' : 'إعادة توليد'}</span>
            </button>
            <button
              onClick={onDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>تنزيل المشروع</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Files Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {files.map((file, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors">
              {/* File Header */}
              <div className="bg-gray-700 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getFileIcon(file.type)}</span>
                  <div>
                    <span className="text-white font-medium">{file.name}</span>
                    <span className={`text-xs ml-2 ${getFileColor(file.type)}`}>({file.type})</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">{file.path}</span>
                  <button
                    onClick={() => copyToClipboard(file.content, file.name)}
                    className="p-1 rounded hover:bg-gray-600 transition-colors"
                    title="نسخ الكود"
                  >
                    {copiedFile === file.name ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* File Content */}
              <div className="p-4">
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-300 leading-relaxed">
                    <code 
                      dangerouslySetInnerHTML={{ 
                        __html: getSyntaxHighlighting(file.type, file.content) 
                      }} 
                    />
                  </pre>
                </div>
                
                {/* File Stats */}
                <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                  <span>{file.content.length} حرف</span>
                  <span>{file.content.split('\n').length} سطر</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Project Summary */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">ملخص المشروع</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{files.length}</div>
              <div className="text-sm text-gray-400">إجمالي الملفات</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {files.filter(f => f.type === 'jsx' || f.type === 'tsx').length}
              </div>
              <div className="text-sm text-gray-400">ملفات React</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">
                {files.filter(f => f.type === 'css').length}
              </div>
              <div className="text-sm text-gray-400">ملفات CSS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">
                {files.filter(f => f.type === 'html').length}
              </div>
              <div className="text-sm text-gray-400">ملفات HTML</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}