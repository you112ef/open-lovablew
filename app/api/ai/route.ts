import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import Groq from 'groq-sdk';
import { z } from 'zod';

// Force dynamic rendering for API routes
export const dynamic = 'force-dynamic';

// Validation schema for the request
const requestSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
  model: z.string().optional().default('gpt-4'),
  language: z.string().optional().default('ar'),
  apiKeys: z.record(z.string()).optional(),
});

// API service configuration
const getAIClient = (model: string, clientApiKeys?: Record<string, string>) => {
  // Try to get API keys from request body first (from localStorage), then fallback to env vars
  const getApiKey = (envKey: string, clientKey?: string) => {
    return clientKey || process.env[envKey];
  };

  if (model.startsWith('gpt-')) {
    const apiKey = getApiKey('OPENAI_API_KEY', clientApiKeys?.OPENAI_API_KEY);
    if (!apiKey) throw new Error('OpenAI API key not configured');
    return { type: 'openai', client: new OpenAI({ apiKey }) };
  }
  
  if (model.startsWith('claude-')) {
    const apiKey = getApiKey('ANTHROPIC_API_KEY', clientApiKeys?.ANTHROPIC_API_KEY);
    if (!apiKey) throw new Error('Anthropic API key not configured');
    return { type: 'anthropic', client: new Anthropic({ apiKey }) };
  }
  
  if (model.startsWith('llama-') || model.startsWith('mixtral-')) {
    const apiKey = getApiKey('GROQ_API_KEY', clientApiKeys?.GROQ_API_KEY);
    if (!apiKey) throw new Error('Groq API key not configured');
    return { type: 'groq', client: new Groq({ apiKey }) };
  }
  
  throw new Error(`Unsupported model: ${model}`);
};

// Generate code using AI
async function generateCode(prompt: string, model: string, language: string = 'ar', clientApiKeys?: Record<string, string>) {
  const { type, client } = getAIClient(model, clientApiKeys);
  
  const systemPrompt = `You are an expert web developer and AI assistant. Create a complete web application based on the user's request.

Requirements:
1. Generate multiple files (HTML, CSS, JavaScript/React, package.json)
2. Create modern, responsive, and beautiful UI
3. Use best practices and clean code
4. Include proper error handling
5. Make it production-ready
6. Respond in ${language === 'ar' ? 'Arabic' : 'English'}

Format your response as a JSON object with this structure:
{
  "files": [
    {
      "name": "filename.ext",
      "content": "file content",
      "type": "jsx|tsx|css|json|html",
      "path": "src/filename.ext"
    }
  ],
  "message": "Brief description of what was created"
}

Focus on creating practical, working applications.`;

  try {
    if (type === 'openai') {
      const openai = client as OpenAI;
      const completion = await openai.chat.completions.create({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      });
      
      const response = completion.choices[0]?.message?.content;
      if (!response) throw new Error('No response from OpenAI');
      
      try {
        return JSON.parse(response);
      } catch {
        // If JSON parsing fails, try to extract JSON from the response
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        throw new Error('Invalid JSON response from AI');
      }
    }
    
    if (type === 'anthropic') {
      const anthropic = client as Anthropic;
      const message = await anthropic.messages.create({
        model: model,
        max_tokens: 4000,
        messages: [
          { role: 'user', content: `${systemPrompt}\n\nUser request: ${prompt}` }
        ],
      });
      
      const response = message.content[0]?.text;
      if (!response) throw new Error('No response from Anthropic');
      
      try {
        return JSON.parse(response);
      } catch {
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        throw new Error('Invalid JSON response from AI');
      }
    }
    
    if (type === 'groq') {
      const groq = client as Groq;
      const completion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        model: model,
        temperature: 0.7,
        max_tokens: 4000,
      });
      
      const response = completion.choices[0]?.message?.content;
      if (!response) throw new Error('No response from Groq');
      
      try {
        return JSON.parse(response);
      } catch {
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        throw new Error('Invalid JSON response from AI');
      }
    }
    
    throw new Error(`Unsupported AI type: ${type}`);
  } catch (error) {
    console.error('AI generation error:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, model, language, apiKeys } = requestSchema.parse(body);
    
    // Validate that at least one API key is configured (either from client or env)
    const hasOpenAI = !!(apiKeys?.OPENAI_API_KEY || process.env.OPENAI_API_KEY);
    const hasAnthropic = !!(apiKeys?.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY);
    const hasGroq = !!(apiKeys?.GROQ_API_KEY || process.env.GROQ_API_KEY);
    
    if (!hasOpenAI && !hasAnthropic && !hasGroq) {
      return NextResponse.json(
        { error: 'No AI API keys configured. Please configure API keys in the settings or set environment variables.' },
        { status: 500 }
      );
    }
    
    const result = await generateCode(prompt, model, language, apiKeys);
    
    return NextResponse.json({
      success: true,
      data: result,
      model: model,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Lovable AI API is running',
    availableModels: {
      openai: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
      anthropic: ['claude-3-sonnet-20240229', 'claude-3-opus-20240229'],
      groq: ['llama-3-8b-8192', 'mixtral-8x7b-32768']
    },
    configured: {
      openai: !!process.env.OPENAI_API_KEY,
      anthropic: !!process.env.ANTHROPIC_API_KEY,
      groq: !!process.env.GROQ_API_KEY
    }
  });
}