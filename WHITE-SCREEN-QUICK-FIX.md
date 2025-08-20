# Quick Fix Commands for White Screen Issue

## Method 1: Update Cloudflare Pages Settings

### Go to your Cloudflare Pages Dashboard and update:

**Build Settings:**
```
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Build output directory: out
Node.js version: 18
```

**Environment Variables:**
```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
SKIP_ENV_VALIDATION=true
```

## Method 2: Manual Commands

### If you have access to the repository locally:

```bash
# Update configuration
git pull origin main

# Build locally to test
npm install
npm run build

# Check if out/ directory is created
ls -la out/

# If out/ exists and has files, the build is working
# The issue is in Cloudflare Pages configuration
```

## Method 3: Simple Next.js Config

### Replace your next.config.ts with this minimal version:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: undefined,
  basePath: ''
}

module.exports = nextConfig
```

## Common Issues Check:

1. **Console Errors**: Open browser DevTools → Console
2. **Network Issues**: Check DevTools → Network tab
3. **Build Logs**: Check Cloudflare Pages → Deployments → View build logs
4. **File Structure**: Ensure `out/` directory is created during build

## If still not working:

1. Share the live URL
2. Share build logs from Cloudflare Pages
3. Share any console errors from browser DevTools