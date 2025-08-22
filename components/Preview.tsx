'use client';

import { useState, useEffect } from 'react';
import { Play, Square, RotateCcw, Maximize, Download, Share2, Settings } from 'lucide-react';

interface GeneratedFile {
  name: string;
  content: string;
  type: 'jsx' | 'tsx' | 'css' | 'json' | 'html';
  path: string;
}

interface PreviewProps {
  files: GeneratedFile[];
  projectName: string;
}

export default function Preview({ files, projectName }: PreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  const [previewSettings, setPreviewSettings] = useState({
    theme: 'light',
    device: 'desktop',
    showCode: false
  });

  useEffect(() => {
    if (files.length > 0) {
      generatePreview();
    }
  }, [files]);

  const generatePreview = () => {
    // Find HTML file
    const htmlFile = files.find(f => f.type === 'html');
    const cssFile = files.find(f => f.type === 'css');
    const jsxFile = files.find(f => f.type === 'jsx' || f.type === 'tsx');

    if (htmlFile) {
      let htmlContent = htmlFile.content;
      
      // Inject CSS if available
      if (cssFile) {
        const styleTag = `<style>${cssFile.content}</style>`;
        htmlContent = htmlContent.replace('</head>', `${styleTag}\n</head>`);
      }

      // Inject React-like functionality if JSX file is available
      if (jsxFile) {
        const reactScript = `
          <script>
            // Simple React-like renderer for preview
            function renderApp() {
              const root = document.getElementById('root');
              if (root) {
                root.innerHTML = \`
                  <div class="app">
                    <header class="app-header">
                      <h1>${projectName}</h1>
                      <p>تم إنشاؤه بواسطة Lovable</p>
                    </header>
                    <main class="app-main">
                      <p>مرحباً بك في تطبيقك الجديد!</p>
                      <div class="features">
                        <h2>المميزات</h2>
                        <ul>
                          <li>تصميم جميل ومتطور</li>
                          <li>واجهة سهلة الاستخدام</li>
                          <li>متجاوب مع جميع الأجهزة</li>
                        </ul>
                      </div>
                      <div class="demo-buttons">
                        <button onclick="alert('مرحباً بك في ${projectName}!')" class="demo-btn">
                          انقر هنا
                        </button>
                        <button onclick="changeTheme()" class="demo-btn secondary">
                          تغيير المظهر
                        </button>
                      </div>
                    </main>
                  </div>
                \`;
              }
            }

            function changeTheme() {
              document.body.classList.toggle('dark-theme');
            }

            // Auto-render on load
            document.addEventListener('DOMContentLoaded', renderApp);
            renderApp();
          </script>
        `;
        htmlContent = htmlContent.replace('</body>', `${reactScript}\n</body>`);
      }

      setPreviewHtml(htmlContent);
      
      // Create blob URL for preview
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
    }
  };

  const togglePreview = () => {
    setIsPlaying(!isPlaying);
  };

  const resetPreview = () => {
    generatePreview();
  };

  const downloadPreview = () => {
    if (previewHtml) {
      const blob = new Blob([previewHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectName}-preview.html`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const sharePreview = () => {
    if (navigator.share) {
      navigator.share({
        title: projectName,
        text: 'شاهد تطبيقي الجديد المُنشأ بواسطة Lovable!',
        url: previewUrl
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(previewUrl);
      alert('تم نسخ رابط المعاينة إلى الحافظة!');
    }
  };

  const getDeviceClass = () => {
    switch (previewSettings.device) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      case 'desktop':
        return 'w-full';
      default:
        return 'w-full';
    }
  };

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
          <Maximize className="w-8 h-8" />
        </div>
        <p className="text-lg">لا توجد ملفات للمعاينة</p>
        <p className="text-sm">ابدأ المحادثة مع AI لإنشاء تطبيقك</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">معاينة التطبيق</h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg transition-colors ${
                showSettings ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title="إعدادات المعاينة"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={togglePreview}
              className={`p-2 rounded-lg transition-colors ${
                isPlaying ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
              }`}
              title={isPlaying ? 'إيقاف المعاينة' : 'تشغيل المعاينة'}
            >
              {isPlaying ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={resetPreview}
              className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
              title="إعادة تحميل"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={downloadPreview}
              className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              title="تنزيل المعاينة"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={sharePreview}
              className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              title="مشاركة المعاينة"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-4 bg-gray-800 border-b border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">المظهر</label>
              <select
                value={previewSettings.theme}
                onChange={(e) => setPreviewSettings(prev => ({ ...prev, theme: e.target.value }))}
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:outline-none focus:border-blue-500"
              >
                <option value="light">فاتح</option>
                <option value="dark">داكن</option>
                <option value="auto">تلقائي</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">نوع الجهاز</label>
              <select
                value={previewSettings.device}
                onChange={(e) => setPreviewSettings(prev => ({ ...prev, device: e.target.value }))}
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:outline-none focus:border-blue-500"
              >
                <option value="mobile">جوال</option>
                <option value="tablet">تابلت</option>
                <option value="desktop">كمبيوتر</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={previewSettings.showCode}
                  onChange={(e) => setPreviewSettings(prev => ({ ...prev, showCode: e.target.checked }))}
                  className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-300">إظهار الكود</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Preview Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className={`${getDeviceClass()} transition-all duration-300`}>
          {/* Browser Frame */}
          <div className="bg-white rounded-lg overflow-hidden shadow-2xl border border-gray-300">
            {/* Browser Header */}
            <div className="bg-gray-100 px-4 py-2 border-b flex items-center space-x-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white rounded-lg px-3 py-1 text-sm text-gray-600 text-center">
                  {projectName} - Lovable
                </div>
              </div>
            </div>
            
            {/* Preview Frame */}
            <div className="relative">
              {isPlaying && previewUrl ? (
                <iframe
                  src={previewUrl}
                  className="w-full h-96 border-0"
                  title={`Preview of ${projectName}`}
                  sandbox="allow-scripts allow-same-origin"
                />
              ) : (
                <div className="h-96 bg-gray-50 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">انقر على زر التشغيل لبدء المعاينة</p>
                    <p className="text-sm">سيتم عرض تطبيقك هنا</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Code Preview (if enabled) */}
          {previewSettings.showCode && (
            <div className="mt-6 bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">كود المعاينة</h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300">
                  <code>{previewHtml}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Preview Info */}
          <div className="mt-6 bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">معلومات المعاينة</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400">{files.length}</div>
                <div className="text-sm text-gray-400">الملفات</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {files.filter(f => f.type === 'jsx' || f.type === 'tsx').length}
                </div>
                <div className="text-sm text-gray-400">مكونات React</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-400">
                  {files.filter(f => f.type === 'css').length}
                </div>
                <div className="text-sm text-gray-400">أنماط CSS</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-400">
                  {files.filter(f => f.type === 'html').length}
                </div>
                <div className="text-sm text-gray-400">صفحات HTML</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}