import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { sandboxId } = await request.json();
    
    if (!sandboxId) {
      return NextResponse.json(
        { success: false, error: 'Sandbox ID is required' },
        { status: 400 }
      );
    }
    
    console.log('[fetch-sandbox-files] Fetching files for sandbox:', sandboxId);
    
    // Simulate fetching sandbox files
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate sandbox files structure
    const sandboxFiles = {
      'package.json': JSON.stringify({
        name: 'ai-generated-app',
        version: '1.0.0',
        type: 'module',
        scripts: {
          dev: 'vite',
          build: 'vite build',
          preview: 'vite preview'
        },
        dependencies: {
          'react': '^18.2.0',
          'react-dom': '^18.2.0'
        },
        devDependencies: {
          '@vitejs/plugin-react': '^4.0.0',
          'vite': '^4.4.0'
        }
      }, null, 2),
      'index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI Generated App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
      'src/main.jsx': `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,
      'src/App.jsx': `import React from 'react'

function App() {
  return (
    <div className="app">
      <h1>AI Generated App</h1>
      <p>Welcome to your AI-generated application!</p>
    </div>
  )
}

export default App`,
      'src/index.css': `#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.app {
  padding: 2rem;
}

h1 {
  color: #333;
  margin-bottom: 1rem;
}

p {
  color: #666;
  line-height: 1.6;
}`
    };
    
    const response = {
      success: true,
      files: sandboxFiles,
      structure: Object.keys(sandboxFiles),
      sandboxId,
      timestamp: new Date().toISOString()
    };
    
    console.log('[fetch-sandbox-files] Files fetched successfully');
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('[fetch-sandbox-files] Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch sandbox files' 
      },
      { status: 500 }
    );
  }
}