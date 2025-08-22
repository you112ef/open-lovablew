# Cloudflare Pages Deployment Guide

## 🚀 Overview

This application is now fully configured for Cloudflare Pages deployment with:
- ✅ All API routes using Node.js runtime
- ✅ Dynamic API keys management
- ✅ Native module compatibility (@e2b/code-interpreter)
- ✅ Beautiful Lovable UI design

## 📋 Prerequisites

### Required API Keys
1. **E2B API Key** - [Get it here](https://e2b.dev)
2. **Anthropic API Key** - [Get it here](https://console.anthropic.com)

### Optional API Keys
- **OpenAI API Key** - [Get it here](https://platform.openai.com)
- **Groq API Key** - [Get it here](https://console.groq.com)
- **Google API Key** - [Get it here](https://makersuite.google.com)
- **Firecrawl API Key** - [Get it here](https://firecrawl.dev)

## 🛠️ Deployment Steps

### 1. Prepare the Application

```bash
# Install dependencies
pnpm install

# Fix runtime for all API routes (automated)
npm run fix:runtime

# Build for Cloudflare Pages
npm run prepare:cloudflare
```

### 2. Deploy to Cloudflare Pages

#### Option A: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Cloudflare Pages deployment"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to Pages
   - Click "Create a project"
   - Choose "Connect to Git"
   - Select your repository

3. **Configure Build Settings**
   - **Framework preset**: Next.js
   - **Build command**: `npm run prepare:cloudflare`
   - **Build output directory**: `.vercel/output/static`
   - **Root directory**: `/` (leave empty)

4. **Environment Variables** (Optional - can be set via UI)
   ```env
   E2B_API_KEY=your_e2b_key_here
   ANTHROPIC_API_KEY=your_anthropic_key_here
   OPENAI_API_KEY=your_openai_key_here
   GROQ_API_KEY=your_groq_key_here
   GOOGLE_API_KEY=your_google_key_here
   FIRECRAWL_API_KEY=your_firecrawl_key_here
   ```

#### Option B: Manual Deployment

```bash
# Build the project
npm run prepare:cloudflare

# Deploy using Wrangler
npm run deploy
```

## 🎯 What's Fixed

### ✅ Runtime Compatibility
- All 21 API routes now use `nodejs` runtime
- Native modules like `@e2b/code-interpreter` work perfectly
- No more "Native module not found" errors

### ✅ API Keys Management
- Dynamic settings modal accessible via "Settings" button
- Secure localStorage storage
- Real-time validation and warnings
- No need to edit environment files

### ✅ UI/UX
- Beautiful Lovable design theme
- Responsive and accessible
- Smooth animations and transitions
- Professional user experience

## 🔧 Technical Details

### API Routes Configuration
All API routes are configured with:
```typescript
export const runtime = "nodejs";
```

This ensures compatibility with:
- Native Node.js modules
- File system operations
- Complex AI operations
- Sandbox environment

### Build Process
The automated build process:
1. **Fixes runtime** for all API routes
2. **Builds Next.js** application
3. **Prepares for Cloudflare** Pages deployment

### Package Dependencies
All required packages are included:
- `@e2b/code-interpreter` - Sandbox environment
- `@ai-sdk/*` - AI model integrations
- `framer-motion` - Animations
- `lucide-react` - Icons
- And more...

## 🚨 Troubleshooting

### Build Errors
If you encounter build errors:

1. **Check dependencies**
   ```bash
   pnpm install
   ```

2. **Clear cache**
   ```bash
   rm -rf .next
   rm -rf node_modules/.cache
   ```

3. **Re-run build**
   ```bash
   npm run prepare:cloudflare
   ```

### Runtime Errors
If you see "Native module not found":

1. **Verify runtime settings**
   ```bash
   npm run fix:runtime
   ```

2. **Check API routes**
   - All routes should have `export const runtime = "nodejs"`

### API Key Issues
If API keys aren't working:

1. **Use the Settings modal**
   - Click "Settings" button in the app
   - Enter your API keys
   - Save and refresh

2. **Check browser console**
   - Look for any JavaScript errors
   - Verify localStorage is working

## 🎉 Success Indicators

Your deployment is successful when:

✅ **Build completes** without errors
✅ **All API routes** respond correctly
✅ **Settings modal** opens and saves keys
✅ **AI features** work (code generation, sandbox)
✅ **UI renders** with Lovable design
✅ **No console errors** in browser

## 📞 Support

If you encounter issues:

1. Check the [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/)
2. Verify your API keys are valid
3. Ensure all dependencies are installed
4. Check the browser console for errors

## 🚀 Ready to Deploy!

Your application is now fully configured for Cloudflare Pages deployment. The combination of Node.js runtime, dynamic API keys, and beautiful UI ensures a professional, fully-functional application that works seamlessly on Cloudflare's platform.