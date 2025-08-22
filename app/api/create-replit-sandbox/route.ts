import { NextRequest, NextResponse } from 'next/server';

export const runtime = "edge";

interface ReplitProject {
  id: string;
  title: string;
  language: string;
  url: string;
}

export async function POST(request: NextRequest) {
  try {
    const { projectName = "lovable-project", language = "nodejs" } = await request.json();
    
    console.log('[create-replit-sandbox] Creating Replit project:', projectName);
    
    const REPLIT_API_KEY = process.env.REPLIT_API_KEY;
    if (!REPLIT_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'REPLIT_API_KEY environment variable is not set'
      }, { status: 400 });
    }
    
    // Create a new Replit project
    const createResponse = await fetch('https://api.replit.com/v0/projects', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${REPLIT_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: projectName,
        language: language,
        description: 'Created by LovableW AI',
        isPrivate: false
      })
    });
    
    if (!createResponse.ok) {
      const error = await createResponse.text();
      throw new Error(`Replit API error: ${error}`);
    }
    
    const project: ReplitProject = await createResponse.json();
    
    console.log('[create-replit-sandbox] Project created:', project.id);
    
    // Initialize with basic React template
    const templateFiles = {
      'package.json': JSON.stringify({
        name: projectName,
        version: "0.1.0",
        private: true,
        dependencies: {
          "react": "^18.2.0",
          "react-dom": "^18.2.0",
          "react-scripts": "5.0.1",
          "tailwindcss": "^3.3.0",
          "@tailwindcss/forms": "^0.5.0"
        },
        scripts: {
          "start": "react-scripts start",
          "build": "react-scripts build",
          "test": "react-scripts test",
          "eject": "react-scripts eject"
        },
        browserslist: {
          production: [">0.2%", "not dead", "not op_mini all"],
          development: ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"]
        }
      }, null, 2),
      
      'public/index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Created by LovableW AI" />
    <title>${projectName}</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
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
        <p>Created by LovableW AI</p>
      </header>
    </div>
  );
}

export default App;`,
      
      'src/App.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

.App {
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`,
      
      'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
      
      'README.md': `# ${projectName}

This project was created by LovableW AI.

## Getting Started

1. Run \`npm start\` to start the development server
2. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
`
    };
    
    // Upload files to Replit
    for (const [filename, content] of Object.entries(templateFiles)) {
      const fileResponse = await fetch(`https://api.replit.com/v0/projects/${project.id}/files/${filename}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${REPLIT_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: content
        })
      });
      
      if (!fileResponse.ok) {
        console.warn(`Failed to upload ${filename}:`, await fileResponse.text());
      }
    }
    
    return NextResponse.json({
      success: true,
      project: {
        id: project.id,
        title: project.title,
        url: project.url,
        language: project.language
      },
      message: 'Replit project created successfully'
    });
    
  } catch (error) {
    console.error('[create-replit-sandbox] Error:', error);
    return NextResponse.json({
      success: false,
      error: (error as Error).message
    }, { status: 500 });
  }
}