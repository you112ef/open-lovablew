import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, model, context, isEdit } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      );
    }
    
    console.log('[generate-ai-code] Generating code for prompt:', prompt);
    console.log('[generate-ai-code] Model:', model);
    console.log('[generate-ai-code] Is edit:', isEdit);
    
    // Create a readable stream for real-time response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Send initial status
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify({ type: 'status', message: 'Starting AI generation...' })}\n\n`)
          );
          
          // Simulate thinking phase
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify({ type: 'thinking', text: 'Analyzing your request...' })}\n\n`)
          );
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify({ type: 'thinking', text: 'Planning the structure...' })}\n\n`)
          );
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify({ type: 'thinking', text: 'Generating code...' })}\n\n`)
          );
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Send completion
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify({ type: 'thinking_complete' })}\n\n`)
          );
          
          // Simulate generated code
          const generatedCode = `// Generated code for: ${prompt}
import React from 'react';

function App() {
  return (
    <div className="app">
      <h1>AI Generated App</h1>
      <p>This app was generated based on your request: "${prompt}"</p>
      <div className="features">
        <h2>Features</h2>
        <ul>
          <li>Modern React component</li>
          <li>Responsive design</li>
          <li>Clean code structure</li>
        </ul>
      </div>
    </div>
  );
}

export default App;`;
          
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify({ 
              type: 'code', 
              code: generatedCode,
              files: ['src/App.jsx'],
              explanation: `Generated a React component based on your request: "${prompt}". The component includes modern styling and a clean structure.`
            })}\n\n`)
          );
          
          // Send completion status
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify({ type: 'complete' })}\n\n`)
          );
          
        } catch (error) {
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify({ type: 'error', error: error instanceof Error ? error.message : 'Unknown error' })}\n\n`)
          );
        } finally {
          controller.close();
        }
      }
    });
    
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
    
  } catch (error) {
    console.error('[generate-ai-code] Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to generate code' 
      },
      { status: 500 }
    );
  }
}