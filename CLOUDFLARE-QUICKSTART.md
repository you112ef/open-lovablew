# 🚀 Quick Start: Deploy to Cloudflare Pages

## Automated Setup (Recommended)

```bash
# Run the automated setup script
./setup-cloudflare.sh
```

## Manual Setup

### 1. Install Dependencies
```bash
npm install @cloudflare/next-on-pages @cloudflare/workers-types wrangler --save-dev
```

### 2. Use Cloudflare Config
```bash
# Backup current config
cp next.config.ts next.config.backup.ts

# Use Cloudflare config
cp next.config.cloudflare.ts next.config.ts
```

### 3. Add Environment Variables
```bash
# Copy template
cp .dev.vars.example .dev.vars

# Fill in your API keys in .dev.vars
```

### 4. Update package.json
Add these scripts to your `package.json`:
```json
{
  "scripts": {
    "build": "next build && next-on-pages",
    "build:cf": "next-on-pages", 
    "deploy": "wrangler pages deploy .vercel/output/static --compatibility-date=2024-08-20",
    "preview": "wrangler pages dev .vercel/output/static --compatibility-date=2024-08-20"
  }
}
```

### 5. Build and Test
```bash
npm run build
npm run preview
```

### 6. Deploy to Cloudflare Pages

#### Option A: CLI Deployment
```bash
npm run deploy
```

#### Option B: Dashboard Deployment
1. Push code to GitHub/GitLab
2. Connect repository in [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
3. Set build command: `npm run build`
4. Set build output: `.vercel/output/static`

## Environment Variables in Production

Set these in your Cloudflare Pages dashboard:
- `GROQ_API_KEY`
- `ANTHROPIC_API_KEY`
- `OPENAI_API_KEY`
- `E2B_API_KEY`
- `ANTHROPIC_BASE_URL`
- `OPENAI_BASE_URL`

## ⚠️ Important Notes

- Your app uses E2B code interpreter which may have limitations on Cloudflare Workers
- API routes will run in Cloudflare's edge runtime
- Global variables will be reset between requests
- See `cloudflare-setup-instructions.md` for detailed information

## Need Help?

- Read the full guide: `cloudflare-setup-instructions.md`
- Check Cloudflare Pages logs for errors
- Test locally with: `npm run preview`