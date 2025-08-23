import { appConfig } from '../config/app.config';

export interface GeneratedFile {
  name: string;
  content: string;
  type: 'jsx' | 'tsx' | 'css' | 'json' | 'html';
  path: string;
}

export interface AIResponse {
  files: GeneratedFile[];
  message: string;
}

export interface APIError {
  error: string;
  details?: any;
}

class AIService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
  }

  async generateCode(
    prompt: string, 
    model: string = 'gpt-4', 
    language: string = 'ar'
  ): Promise<AIResponse> {
    const maxRetries = appConfig.api.maxRetries;
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(`${this.baseUrl}/ai`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt,
            model,
            language,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Unknown error occurred');
        }

        return data.data;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        if (attempt === maxRetries) {
          throw lastError;
        }

        // Wait before retrying
        await new Promise(resolve => 
          setTimeout(resolve, appConfig.api.retryDelay * attempt)
        );
      }
    }

    throw lastError || new Error('Failed to generate code');
  }

  async checkAPIStatus(): Promise<{
    status: 'ok' | 'error';
    message: string;
    configured: {
      openai: boolean;
      anthropic: boolean;
      groq: boolean;
    };
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/ai`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        status: 'ok',
        message: data.message,
        configured: data.configured,
      };
    } catch (error) {
      return {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        configured: {
          openai: false,
          anthropic: false,
          groq: false,
        },
      };
    }
  }

  validateFiles(files: GeneratedFile[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!Array.isArray(files) || files.length === 0) {
      errors.push('No files generated');
      return { valid: false, errors };
    }

    for (const file of files) {
      if (!file.name || !file.content) {
        errors.push(`Invalid file: missing name or content`);
        continue;
      }

      if (!['jsx', 'tsx', 'css', 'json', 'html'].includes(file.type)) {
        errors.push(`Invalid file type for ${file.name}: ${file.type}`);
      }

      if (file.content.length > appConfig.files.maxFileSize) {
        errors.push(`File ${file.name} is too large`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  getDefaultFiles(): GeneratedFile[] {
    return [
      {
        name: 'App.jsx',
        content: `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>تطبيق Lovable</h1>
        <p>ابدأ بإنشاء تطبيقك الآن</p>
      </header>
      <main className="app-main">
        <p>اكتب طلبك في مربع المحادثة وسأقوم بإنشاء التطبيق لك</p>
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
}

.app-header h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.app-main {
  padding: 2rem;
}`,
        type: 'css',
        path: 'src/App.css'
      }
    ];
  }
}

export const aiService = new AIService();
export default aiService;