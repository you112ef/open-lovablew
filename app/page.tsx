'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import AIChat from '../components/AIChat';
import CodeViewer from '../components/CodeViewer';
import Preview from '../components/Preview';
import QuickSetupPrompt from '../components/QuickSetupPrompt';

interface GeneratedFile {
  name: string;
  content: string;
  type: 'jsx' | 'tsx' | 'css' | 'json' | 'html';
  path: string;
}

export default function LovableApp() {
  const [activeTab, setActiveTab] = useState<'chat' | 'code' | 'preview'>('chat');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [projectName, setProjectName] = useState('تطبيق Lovable الجديد');
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFile[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAPISettings, setShowAPISettings] = useState(false);

  const handleFilesGenerated = (files: GeneratedFile[]) => {
    setGeneratedFiles(files);
    setIsGenerating(false);
  };

  const handleTabChange = (tab: 'chat' | 'code' | 'preview') => {
    setActiveTab(tab);
  };

  const handleProjectNameChange = (name: string) => {
    setProjectName(name);
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    // Simulate regeneration
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const handleDownload = () => {
    const projectData = {
      name: projectName,
      files: generatedFiles,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName}.json`;
    a.click();
    URL.revokeObjectURL(url);
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

      {/* Header */}
      <Header
        projectName={projectName}
        onProjectNameChange={handleProjectNameChange}
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
      />

      {/* Navigation */}
      <Navigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        hasGeneratedFiles={generatedFiles.length > 0}
      />

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex">
        {/* Chat Panel */}
        {activeTab === 'chat' && (
          <div className="w-full max-w-2xl bg-gray-900/50 backdrop-blur-sm border-r border-gray-700">
            <AIChat
              onFilesGenerated={handleFilesGenerated}
              onTabChange={handleTabChange}
              selectedModel={selectedModel}
            />
          </div>
        )}

        {/* Code Panel */}
        {activeTab === 'code' && (
          <div className="flex-1 bg-gray-900/50 backdrop-blur-sm">
            <CodeViewer
              files={generatedFiles}
              isGenerating={isGenerating}
              onRegenerate={handleRegenerate}
              onDownload={handleDownload}
            />
          </div>
        )}

        {/* Preview Panel */}
        {activeTab === 'preview' && (
          <div className="flex-1 bg-gray-900/50 backdrop-blur-sm">
            <Preview
              files={generatedFiles}
              projectName={projectName}
            />
          </div>
        )}
      </main>
    </div>
  );
}