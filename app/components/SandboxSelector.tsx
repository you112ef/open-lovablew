'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface SandboxProvider {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

const sandboxProviders: SandboxProvider[] = [
  {
    id: 'replit',
    name: 'Replit',
    description: 'Full-featured online IDE with real-time collaboration',
    icon: '🚀',
    color: 'bg-blue-500',
    features: ['Real-time collaboration', 'Full IDE features', 'Database support', 'Deployment']
  },
  {
    id: 'codesandbox',
    name: 'CodeSandbox',
    description: 'Lightning-fast development environment',
    icon: '⚡',
    color: 'bg-orange-500',
    features: ['Fast loading', 'Template library', 'Git integration', 'Preview modes']
  },
  {
    id: 'stackblitz',
    name: 'StackBlitz',
    description: 'Instant development environment in your browser',
    icon: '⚡',
    color: 'bg-purple-500',
    features: ['Instant loading', 'WebContainers', 'NPM support', 'Real-time preview']
  },
  {
    id: 'wasm',
    name: 'WASM Sandbox',
    description: 'Lightweight sandbox running in your browser',
    icon: '🔧',
    color: 'bg-green-500',
    features: ['No external dependencies', 'Edge runtime compatible', 'Fast execution', 'Offline capable']
  }
];

interface SandboxSelectorProps {
  onSelect: (provider: string) => void;
  onCancel: () => void;
}

export default function SandboxSelector({ onSelect, onCancel }: SandboxSelectorProps) {
  const [selectedProvider, setSelectedProvider] = useState<string>('');

  const handleCreate = () => {
    if (selectedProvider) {
      onSelect(selectedProvider);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Choose Your Sandbox Provider</h2>
          <p className="text-gray-400">
            Select a sandbox provider to create and run your projects. Each provider offers different features and capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {sandboxProviders.map((provider) => (
            <div
              key={provider.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedProvider === provider.id
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => setSelectedProvider(provider.id)}
            >
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">{provider.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{provider.name}</h3>
                  <p className="text-sm text-gray-400">{provider.description}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-300">Features:</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  {provider.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!selectedProvider}
            className={`${selectedProvider ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'}`}
          >
            Create Sandbox
          </Button>
        </div>

        {selectedProvider && (
          <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <h4 className="text-sm font-medium text-blue-300 mb-2">Selected: {sandboxProviders.find(p => p.id === selectedProvider)?.name}</h4>
            <p className="text-xs text-gray-400">
              Click "Create Sandbox" to proceed with {sandboxProviders.find(p => p.id === selectedProvider)?.name} as your sandbox provider.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}