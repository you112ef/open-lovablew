'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { getApiKeys, saveApiKeys, clearApiKeys, type ApiKeys } from '@/lib/api-keys';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Settings({ isOpen, onClose }: SettingsProps) {
  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    E2B_API_KEY: '',
    FIRECRAWL_API_KEY: '',
    ANTHROPIC_API_KEY: '',
    OPENAI_API_KEY: '',
    GEMINI_API_KEY: '',
    GROQ_API_KEY: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Load saved API keys from localStorage on component mount
  useEffect(() => {
    if (isOpen) {
      const savedKeys = getApiKeys();
      setApiKeys(savedKeys);
    }
  }, [isOpen]);

  const handleInputChange = (key: keyof ApiKeys, value: string) => {
    setApiKeys(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setSaveStatus('saving');

    try {
      // Save to localStorage using utility function
      saveApiKeys(apiKeys);
      
      // Simulate API call to save keys (you can implement this later)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Failed to save API keys:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setApiKeys({
      E2B_API_KEY: '',
      FIRECRAWL_API_KEY: '',
      ANTHROPIC_API_KEY: '',
      OPENAI_API_KEY: '',
      GEMINI_API_KEY: '',
      GROQ_API_KEY: ''
    });
    clearApiKeys();
  };

  const getApiKeyStatus = (key: keyof ApiKeys) => {
    const value = apiKeys[key];
    if (!value) return 'missing';
    if (value.startsWith('your_') || value.includes('your_')) return 'placeholder';
    return 'configured';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'configured': return 'text-green-600';
      case 'placeholder': return 'text-yellow-600';
      case 'missing': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'configured': return '✓ Configured';
      case 'placeholder': return '⚠ Placeholder';
      case 'missing': return '✗ Missing';
      default: return 'Unknown';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="border-0 shadow-none">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold">Settings</CardTitle>
                  <CardDescription>
                    Configure your API keys for AI services and tools
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Required API Keys */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
                  Required API Keys
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="E2B_API_KEY" className="flex items-center gap-2">
                      E2B API Key
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                        Required
                      </span>
                    </Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="E2B_API_KEY"
                        type="password"
                        placeholder="Get from https://e2b.dev (Sandboxes)"
                        value={apiKeys.E2B_API_KEY}
                        onChange={(e) => handleInputChange('E2B_API_KEY', e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open('https://e2b.dev', '_blank')}
                        className="px-3 py-2 text-xs whitespace-nowrap"
                        title="Go to E2B website"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Get Key
                      </Button>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(getApiKeyStatus('E2B_API_KEY'))}`}>
                        {getStatusText(getApiKeyStatus('E2B_API_KEY'))}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="FIRECRAWL_API_KEY" className="flex items-center gap-2">
                      Firecrawl API Key
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                        Required
                      </span>
                    </Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="FIRECRAWL_API_KEY"
                        type="password"
                        placeholder="Get from https://firecrawl.dev (Web scraping)"
                        value={apiKeys.FIRECRAWL_API_KEY}
                        onChange={(e) => handleInputChange('FIRECRAWL_API_KEY', e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open('https://firecrawl.dev', '_blank')}
                        className="px-3 py-2 text-xs whitespace-nowrap"
                        title="Go to Firecrawl website"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Get Key
                      </Button>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(getApiKeyStatus('FIRECRAWL_API_KEY'))}`}>
                        {getStatusText(getApiKeyStatus('FIRECRAWL_API_KEY'))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional AI Provider API Keys */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  AI Provider API Keys (Optional - Need at least one)
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="ANTHROPIC_API_KEY">
                      Anthropic API Key
                    </Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="ANTHROPIC_API_KEY"
                        type="password"
                        placeholder="Get from https://console.anthropic.com"
                        value={apiKeys.ANTHROPIC_API_KEY}
                        onChange={(e) => handleInputChange('ANTHROPIC_API_KEY', e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open('https://console.anthropic.com', '_blank')}
                        className="px-3 py-2 text-xs whitespace-nowrap"
                        title="Go to Anthropic console"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Get Key
                      </Button>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(getApiKeyStatus('ANTHROPIC_API_KEY'))}`}>
                        {getStatusText(getApiKeyStatus('ANTHROPIC_API_KEY'))}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="OPENAI_API_KEY">
                      OpenAI API Key
                    </Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="OPENAI_API_KEY"
                        type="password"
                        placeholder="Get from https://platform.openai.com (GPT-5)"
                        value={apiKeys.OPENAI_API_KEY}
                        onChange={(e) => handleInputChange('OPENAI_API_KEY', e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open('https://platform.openai.com', '_blank')}
                        className="px-3 py-2 text-xs whitespace-nowrap"
                        title="Go to OpenAI platform"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Get Key
                      </Button>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(getApiKeyStatus('OPENAI_API_KEY'))}`}>
                        {getStatusText(getApiKeyStatus('OPENAI_API_KEY'))}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="GEMINI_API_KEY">
                      Gemini API Key
                    </Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="GEMINI_API_KEY"
                        type="password"
                        placeholder="Get from https://aistudio.google.com/app/apikey"
                        value={apiKeys.GEMINI_API_KEY}
                        onChange={(e) => handleInputChange('GEMINI_API_KEY', e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open('https://aistudio.google.com/app/apikey', '_blank')}
                        className="px-3 py-2 text-xs whitespace-nowrap"
                        title="Go to Google AI Studio"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Get Key
                      </Button>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(getApiKeyStatus('GEMINI_API_KEY'))}`}>
                        {getStatusText(getApiKeyStatus('GEMINI_API_KEY'))}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="GROQ_API_KEY">
                      Groq API Key
                    </Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="GROQ_API_KEY"
                        type="password"
                        placeholder="Get from https://console.groq.com (Fast inference - Kimi K2 recommended)"
                        value={apiKeys.GROQ_API_KEY}
                        onChange={(e) => handleInputChange('GROQ_API_KEY', e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open('https://console.groq.com', '_blank')}
                        className="px-2 py-2 text-xs whitespace-nowrap"
                        title="Go to Groq console"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Get Key
                      </Button>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(getApiKeyStatus('GROQ_API_KEY'))}`}>
                        {getStatusText(getApiKeyStatus('GROQ_API_KEY'))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? 'Saving...' : 'Save Settings'}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleReset}
                  disabled={isLoading}
                >
                  Reset
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>

              {/* Save Status */}
              {saveStatus !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center p-3 rounded-lg ${
                    saveStatus === 'saved' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : saveStatus === 'error'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}
                >
                  {saveStatus === 'saving' && 'Saving settings...'}
                  {saveStatus === 'saved' && 'Settings saved successfully! ✓'}
                  {saveStatus === 'error' && 'Failed to save settings. Please try again.'}
                </motion.div>
              )}

              {/* Help Text */}
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <p><strong>Note:</strong> API keys are stored locally in your browser and are not sent to our servers.</p>
                <p><strong>Required:</strong> E2B and Firecrawl API keys are needed for sandbox and web scraping functionality.</p>
                <p><strong>AI Providers:</strong> At least one AI provider API key is recommended for code generation features.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}