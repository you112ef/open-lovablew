// Cloudflare Pages Function for AI API
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import Groq from 'groq-sdk';

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    
    const { prompt, model, language, apiKeys } = body;
    
    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Get API key (from client or env)
    const getApiKey = (envKey, clientKey) => {
      return clientKey || env[envKey];
    };
    
    let aiClient;
    let aiType;
    
    if (model.startsWith('gpt-')) {
      const apiKey = getApiKey('OPENAI_API_KEY', apiKeys?.OPENAI_API_KEY);
      if (!apiKey) {
        return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      aiClient = new OpenAI({ apiKey });
      aiType = 'openai';
    } else if (model.startsWith('claude-')) {
      const apiKey = getApiKey('ANTHROPIC_API_KEY', apiKeys?.ANTHROPIC_API_KEY);
      if (!apiKey) {
        return new Response(JSON.stringify({ error: 'Anthropic API key not configured' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      aiClient = new Anthropic({ apiKey });
      aiType = 'anthropic';
    } else if (model.startsWith('llama-') || model.startsWith('mixtral-')) {
      const apiKey = getApiKey('GROQ_API_KEY', apiKeys?.GROQ_API_KEY);
      if (!apiKey) {
        return new Response(JSON.stringify({ error: 'Groq API key not configured' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      aiClient = new Groq({ apiKey });
      aiType = 'groq';
    } else {
      return new Response(JSON.stringify({ error: `Unsupported model: ${model}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
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

    let result;
    
    if (aiType === 'openai') {
      const completion = await aiClient.chat.completions.create({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      });
      
      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }
      
      try {
        result = JSON.parse(response);
      } catch {
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          result = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Invalid JSON response from AI');
        }
      }
    } else if (aiType === 'anthropic') {
      const message = await aiClient.messages.create({
        model: model,
        max_tokens: 4000,
        messages: [
          { role: 'user', content: `${systemPrompt}\n\nUser request: ${prompt}` }
        ],
      });
      
      const response = message.content[0]?.text;
      if (!response) {
        throw new Error('No response from Anthropic');
      }
      
      try {
        result = JSON.parse(response);
      } catch {
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          result = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Invalid JSON response from AI');
        }
      }
    } else if (aiType === 'groq') {
      const completion = await aiClient.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        model: model,
        temperature: 0.7,
        max_tokens: 4000,
      });
      
      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from Groq');
      }
      
      try {
        result = JSON.parse(response);
      } catch {
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          result = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Invalid JSON response from AI');
        }
      }
    }
    
    return new Response(JSON.stringify({
      success: true,
      data: result,
      model: model,
      timestamp: new Date().toISOString()
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('API error:', error);
    
    return new Response(JSON.stringify({
      error: error.message || 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestGet() {
  return new Response(JSON.stringify({
    message: 'Lovable AI API is running',
    availableModels: {
      openai: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
      anthropic: ['claude-3-sonnet-20240229', 'claude-3-opus-20240229'],
      groq: ['llama-3-8b-8192', 'mixtral-8x7b-32768']
    }
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}