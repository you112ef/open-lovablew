# 🚀 Deploy to Cloudflare Pages Dashboard

## Step-by-Step Deployment Guide

### 1. Access Cloudflare Pages Dashboard
1. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
2. Sign up/Log in to your Cloudflare account
3. Click **"Create a project"**

### 2. Connect Your Repository
1. Choose **"Connect to Git"**
2. Select **GitHub** and authorize Cloudflare to access your repositories
3. Select your repository: **`you112ef/open-lovablew`**
4. Click **"Begin setup"**

### 3. Configure Build Settings
Set the following configuration:

**Project name**: `open-lovablew` (or your preferred name)

**Production branch**: `main`

**Build settings**:
- **Framework preset**: `Next.js (Static HTML Export)`
- **Build command**: `npm run build`
- **Build output directory**: `.vercel/output/static`
- **Root directory**: `/` (leave empty)

**Environment variables**: 
*Add these in the dashboard (you'll set them in step 4)*

### 4. Set Environment Variables
In the build settings page, add these environment variables:

```
GROQ_API_KEY = your_actual_groq_api_key
ANTHROPIC_API_KEY = your_actual_anthropic_api_key  
OPENAI_API_KEY = your_actual_openai_api_key
E2B_API_KEY = your_actual_e2b_api_key
ANTHROPIC_BASE_URL = https://api.anthropic.com/v1
OPENAI_BASE_URL = your_actual_openai_base_url (if needed)
NODE_ENV = production
```

### 5. Advanced Settings
1. Click **"Advanced settings"**
2. Set **Node.js version**: `20`
3. Enable **"Compatibility flags"**: Add `nodejs_compat`

### 6. Deploy
1. Click **"Save and Deploy"**
2. Cloudflare will automatically:
   - Clone your repository
   - Install dependencies
   - Build your Next.js app
   - Deploy to the global edge network

### 7. Configure Custom Domain (Optional)
After deployment:
1. Go to your project's **"Custom domains"** tab
2. Add your domain name
3. Cloudflare will provide SSL certificates automatically

## 🔧 If Build Fails

### Common Issues & Solutions:

**1. Node Version Issues**
- Go to **Settings > Environment variables**
- Add: `NODE_VERSION = 20`

**2. Build Command Issues**
Try these alternative build commands:
```bash
# Option 1: Install with force
npm ci --force && npm run build

# Option 2: Use legacy peer deps
npm install --legacy-peer-deps && npm run build

# Option 3: Skip optional dependencies
npm install --no-optional && npm run build
```

**3. Memory Issues**
- Go to **Settings > Functions**
- Set **"Memory"** to `512 MB` or higher

**4. Timeout Issues**
- Go to **Settings > Functions**  
- Set **"CPU Time"** to `30 seconds`

### Alternative Build Configuration
If the standard build fails, try this simpler configuration:

**Build command**: `npm install && npx next build && npx next-on-pages`
**Build output directory**: `.vercel/output/static`

## 📋 Pre-Deployment Checklist

✅ Repository pushed to GitHub with all Cloudflare config files  
✅ Environment variables ready (API keys)  
✅ Cloudflare account created  
✅ Build command configured: `npm run build`  
✅ Output directory set: `.vercel/output/static`  
✅ Node.js version set to `20`

## 🚀 Expected Result

After successful deployment:
- ✅ Your app will be live at `https://[project-name].pages.dev`
- ✅ Global CDN distribution for fast loading worldwide
- ✅ Automatic HTTPS with SSL certificates
- ✅ API routes running on Cloudflare Workers
- ✅ CI/CD: automatic redeployment on git push

## 🆘 Need Help?

If deployment fails:
1. Check the **"Deployments"** tab for build logs
2. Look for specific error messages
3. Try the alternative build commands above
4. Contact Cloudflare support if needed

**Note**: Your app uses E2B code interpreter which may have limitations on Cloudflare Workers runtime. The main website functionality should work perfectly, but some sandbox features might need adjustments.