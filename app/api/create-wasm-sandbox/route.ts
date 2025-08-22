import { NextRequest, NextResponse } from 'next/server';

export const runtime = "edge";

interface WASMSandbox {
  id: string;
  files: Record<string, string>;
  status: 'created' | 'running' | 'stopped';
}

// In-memory storage for sandboxes (in production, use Redis or database)
const sandboxes = new Map<string, WASMSandbox>();

export async function POST(request: NextRequest) {
  try {
    const { projectName = "lovable-project", template = "react" } = await request.json();
    
    console.log('[create-wasm-sandbox] Creating WASM sandbox:', projectName);
    
    // Generate unique sandbox ID
    const sandboxId = `sandbox_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create template files based on template type
    let templateFiles: Record<string, string> = {};
    
    if (template === 'react') {
      templateFiles = {
        'package.json': JSON.stringify({
          name: projectName,
          version: "0.1.0",
          private: true,
          dependencies: {
            "react": "^18.2.0",
            "react-dom": "^18.2.0",
            "react-scripts": "5.0.1",
            "tailwindcss": "^3.3.0"
          },
          scripts: {
            "start": "react-scripts start",
            "build": "react-scripts build",
            "test": "react-scripts test"
          }
        }, null, 2),
        
        'public/index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
        
        'src/index.js': `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
        
        'src/App.js': `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to ${projectName}</h1>
        <p>Created by LovableW AI (WASM Sandbox)</p>
      </header>
    </div>
  );
}

export default App;`,
        
        'src/App.css': `.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  padding: 20px;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}`,
        
        'src/index.css': `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`,
        
        'README.md': `# ${projectName}

This project was created by LovableW AI using WASM Sandbox.

## Features
- ✅ React 18
- ✅ Tailwind CSS
- ✅ Hot Reload
- ✅ Edge Runtime Compatible

## Getting Started
This sandbox runs in the browser using WebAssembly.
`
      };
    } else if (template === 'vanilla') {
      templateFiles = {
        'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Welcome to ${projectName}</h1>
        <p>Created by LovableW AI (WASM Sandbox)</p>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
        
        'style.css': `body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    text-align: center;
    color: white;
    padding: 2rem;
}

h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

p {
    font-size: 1.2rem;
    opacity: 0.9;
}`,
        
        'script.js': `console.log('Hello from ${projectName}!');
console.log('This is running in a WASM sandbox.');

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    container.addEventListener('click', () => {
        container.style.transform = 'scale(1.05)';
        setTimeout(() => {
            container.style.transform = 'scale(1)';
        }, 200);
    });
});`
      };
    }
    
    // Create sandbox instance
    const sandbox: WASMSandbox = {
      id: sandboxId,
      files: templateFiles,
      status: 'created'
    };
    
    // Store in memory
    sandboxes.set(sandboxId, sandbox);
    
    console.log('[create-wasm-sandbox] Sandbox created:', sandboxId);
    
    return NextResponse.json({
      success: true,
      sandbox: {
        id: sandboxId,
        status: sandbox.status,
        files: Object.keys(templateFiles),
        url: `/sandbox/${sandboxId}` // Frontend route to view sandbox
      },
      message: 'WASM sandbox created successfully'
    });
    
  } catch (error) {
    console.error('[create-wasm-sandbox] Error:', error);
    return NextResponse.json({
      success: false,
      error: (error as Error).message
    }, { status: 500 });
  }
}

// GET endpoint to retrieve sandbox files
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sandboxId = searchParams.get('id');
    
    if (!sandboxId) {
      return NextResponse.json({
        success: false,
        error: 'Sandbox ID is required'
      }, { status: 400 });
    }
    
    const sandbox = sandboxes.get(sandboxId);
    if (!sandbox) {
      return NextResponse.json({
        success: false,
        error: 'Sandbox not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      sandbox: {
        id: sandbox.id,
        status: sandbox.status,
        files: sandbox.files
      }
    });
    
  } catch (error) {
    console.error('[create-wasm-sandbox] GET Error:', error);
    return NextResponse.json({
      success: false,
      error: (error as Error).message
    }, { status: 500 });
  }
}