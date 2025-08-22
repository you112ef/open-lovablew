# Deployment Guide

## Overview

This project uses `@e2b/code-interpreter` which is a native Node.js module that cannot run in Edge runtime. Therefore, deployment options are limited to platforms that support Node.js runtime.

## Deployment Options

### ✅ Recommended: Vercel (Node.js Runtime)

**Why Vercel?**
- Supports Node.js runtime for API routes
- Native module compatibility (`@e2b/code-interpreter`)
- Full feature support including sandbox functionality
- Easy deployment with `vercel --prod`

**Deploy to Vercel:**
```bash
npm run deploy:vercel
```

### ❌ Not Compatible: Cloudflare Pages (Edge Runtime Only)

**Why not Cloudflare Pages?**
- Only supports Edge runtime
- `@e2b/code-interpreter` is a native module that requires Node.js APIs
- Error: `TypeError: Native module not found: @e2b/code-interpreter`

## Configuration Files

### Vercel Configuration (`vercel.json`)
- Specifies Node.js runtime for API routes that use native modules
- Routes using `@e2b/code-interpreter` are configured for `nodejs18.x`

### Next.js Configuration (`next.config.ts`)
- Externalizes `@e2b/code-interpreter` package
- Optimized for Node.js runtime compatibility

## API Routes Runtime Requirements

**Node.js Runtime Required:**
- `/api/create-ai-sandbox` - Uses `@e2b/code-interpreter`
- `/api/apply-ai-code` - Uses `@e2b/code-interpreter`
- `/api/apply-ai-code-stream` - Uses `@e2b/code-interpreter`
- `/api/generate-ai-code-stream` - Complex AI operations
- `/api/install-packages` - Uses `@e2b/code-interpreter`
- `/api/run-command` - Uses `@e2b/code-interpreter`

**Edge Runtime Compatible:**
- All other API routes

## Environment Variables

Make sure to set these environment variables in your Vercel deployment:

```env
E2B_API_KEY=your_e2b_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
GROQ_API_KEY=your_groq_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
```

## Troubleshooting

### Native Module Errors
If you see `TypeError: Native module not found: @e2b/code-interpreter`, ensure:
1. You're deploying to a platform that supports Node.js runtime
2. The `vercel.json` configuration is properly set
3. Environment variables are configured

### Build Errors
If you encounter build errors:
1. Check that all dependencies are properly installed
2. Ensure the webpack configuration is correct
3. Verify that runtime declarations match the deployment platform