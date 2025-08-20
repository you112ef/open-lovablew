# Cloudflare Pages Deployment Setup

This guide will help you deploy your Open Lovable Next.js application to Cloudflare Pages.

## Prerequisites

- Cloudflare account
- GitHub/GitLab repository connected to your Cloudflare account
- Node.js 18+ installed locally

## Step 1: Install Required Dependencies

Add these dependencies to your `package.json`:

```bash
npm install @cloudflare/next-on-pages @cloudflare/workers-types wrangler --save-dev
```

## Step 2: Update package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "build:cf": "next-on-pages",
    "start": "next start",
    "deploy": "wrangler pages deploy .vercel/output/static --compatibility-date=2024-08-20",
    "preview": "wrangler pages dev .vercel/output/static --compatibility-date=2024-08-20",
    "lint": "next lint"
  }
}
```

## Step 3: Update Your Next.js Configuration

Replace your current `next.config.ts` with the Cloudflare-compatible version:

```bash
# Backup your current config
mv next.config.ts next.config.backup.ts

# Use the Cloudflare config
mv next.config.cloudflare.ts next.config.ts
```

## Step 4: Set Up Environment Variables

### Local Development
Create a `.dev.vars` file in your project root:

```bash
# .dev.vars (for local development)
GROQ_API_KEY=your_groq_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
OPENAI_API_KEY=your_openai_api_key
E2B_API_KEY=your_e2b_api_key
ANTHROPIC_BASE_URL=https://api.anthropic.com/v1
OPENAI_BASE_URL=your_openai_base_url
```

### Production Environment
Set these environment variables in your Cloudflare Pages dashboard:
- `GROQ_API_KEY`
- `ANTHROPIC_API_KEY`  
- `OPENAI_API_KEY`
- `E2B_API_KEY`
- `ANTHROPIC_BASE_URL`
- `OPENAI_BASE_URL`

## Step 5: Configure Cloudflare Pages

### Option A: Dashboard Deployment

1. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
2. Click "Create a project"
3. Connect your Git repository
4. Configure build settings:
   - **Build command**: `npm run build && npm run build:cf`
   - **Build output directory**: `.vercel/output/static`
   - **Node.js version**: `18` or `20`

### Option B: CLI Deployment

```bash
# Build for production
npm run build
npm run build:cf

# Deploy using Wrangler CLI
npm run deploy
```

## Step 6: Update Compatibility Settings

In your Cloudflare Pages dashboard:
1. Go to Settings → Functions
2. Set **Compatibility date** to `2024-08-20`
3. Enable **Node.js compatibility**

## Important Notes

### API Routes Compatibility

Your API routes use several features that need special consideration:

1. **AI SDK Integration**: All AI models (Groq, Anthropic, OpenAI) should work with Cloudflare Workers runtime
2. **E2B Code Interpreter**: This requires server-side execution and may have limitations on Cloudflare Workers
3. **Global Variables**: Server-side state management will be reset between requests in Cloudflare Workers

### Potential Issues and Solutions

1. **E2B Integration**: The E2B code interpreter might not work fully in Cloudflare Workers environment. Consider:
   - Moving to Cloudflare Workers with longer execution time limits
   - Using Cloudflare Durable Objects for persistent state
   - Implementing alternative sandbox solutions

2. **File System Access**: If your API routes use file system operations, they'll need to be adapted for Cloudflare Workers

3. **Long-Running Processes**: Cloudflare Workers have execution time limits (CPU time, wall time)

## Testing Your Deployment

1. **Local Testing**:
   ```bash
   npm run build
   npm run build:cf
   npm run preview
   ```

2. **Production Testing**: 
   - Test all API endpoints
   - Verify AI model integrations
   - Check sandbox functionality

## Troubleshooting

### Build Errors
- Check Node.js version compatibility
- Ensure all dependencies support edge runtime
- Review Cloudflare Workers compatibility

### Runtime Errors
- Check environment variables are set correctly
- Monitor Cloudflare Pages function logs
- Verify API rate limits and quotas

### Performance Issues
- Review function execution time
- Check memory usage
- Optimize API response sizes

## Alternative: Cloudflare Workers + Pages

If the current setup has limitations, consider:
1. Moving API routes to separate Cloudflare Workers
2. Using Cloudflare Pages for static frontend only
3. Setting up custom domains and routing

## Support

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)