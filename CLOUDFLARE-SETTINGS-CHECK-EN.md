# 🔍 Cloudflare Pages Settings Verification Guide

## Step-by-Step Settings Check for White Screen Fix

### STEP 1: Build Settings Verification

**Go to:** Cloudflare Dashboard → Pages → [Your Project] → Settings → Builds & deployments

#### ✅ CORRECT Settings:
```
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Build output directory: out
Root directory: (leave empty or /)
Node.js version: 18 or 20
```

#### ❌ WRONG Settings (Avoid These):
```
❌ Framework preset: Next.js (Full Stack)
❌ Build command: next build && next-on-pages
❌ Build output directory: .vercel/output/static
❌ Node.js version: 16 or lower
```

---

### STEP 2: Environment Variables Check

**Go to:** Settings → Environment variables

#### Required Variables:
```
NODE_ENV = production
NEXT_TELEMETRY_DISABLED = 1
SKIP_ENV_VALIDATION = true

# Your actual API keys
GROQ_API_KEY = your_actual_key
ANTHROPIC_API_KEY = your_actual_key
OPENAI_API_KEY = your_actual_key
E2B_API_KEY = your_actual_key
```

#### ⚠️ Make sure:
- No extra spaces in values
- Keys are valid and not expired
- Environment scope = Production AND Preview

---

### STEP 3: Functions Settings

**Go to:** Settings → Functions

#### Correct Settings:
```
Compatibility date: 2024-08-20
Compatibility flags: nodejs_compat
Memory: 128 MB (or higher)
CPU time: 10 seconds (or higher)
```

---

### STEP 4: Build Logs Analysis

**Go to:** Deployments → [Latest deployment] → View details

#### ✅ What you SHOULD see in Build Logs:
```bash
npm install
✓ Dependencies installed successfully

npm run build
✓ Build completed successfully
✓ Creating output directory: out/
✓ Static HTML export completed
✓ Deployment successful
```

#### ❌ Error Signs to Watch For:
```bash
❌ "Build failed with exit code 1"
❌ "No such file or directory: out"
❌ "Module not found" errors
❌ "_next/static files not found"
❌ Webpack compilation errors
```

---

### STEP 5: Deployed Site Testing

**Open your deployed site:** `https://[project-name].pages.dev`

#### Browser Console Check (Press F12):
**Console tab:**
- ✅ No red JavaScript errors
- ✅ No "Failed to fetch" errors
- ✅ No "Module not found" errors

**Network tab:**
- ✅ `index.html` loads successfully (200 OK)
- ✅ `_next/static/css/` files load (200 OK)
- ✅ `_next/static/chunks/` files load (200 OK)

#### HTML Content Check:
**Elements tab should show:**
```html
<div id="__next">
  <!-- Your React content here -->
</div>
```

---

## 🚀 Quick Fixes for Common Issues

### Issue 1: Build Fails
**Solution:** Try this build command:
```
npm install --force && npm run build
```

### Issue 2: Empty `out` Directory
**Solutions:**
1. Ensure `output: 'export'` in next.config.ts
2. Try output directory: `dist` or `.next/out`

### Issue 3: CSS Not Loading
**Solutions:**
1. Ensure `trailingSlash: true` in next.config.ts
2. Add `assetPrefix: undefined` in config

### Issue 4: JavaScript Errors
**Solutions:**
1. Add environment variable: `NEXT_TELEMETRY_DISABLED=1`
2. Try Node.js version 18 instead of 20

---

## 📋 Final Verification Checklist

### Build Configuration:
- [ ] Framework: Next.js (Static HTML Export) ✅
- [ ] Build command: npm run build ✅
- [ ] Output directory: out ✅
- [ ] Node.js version: 18 or 20 ✅

### Environment Variables:
- [ ] NODE_ENV=production ✅
- [ ] NEXT_TELEMETRY_DISABLED=1 ✅
- [ ] All API keys added correctly ✅

### Build Output:
- [ ] Build logs show no errors ✅
- [ ] `out` directory exists and is not empty ✅
- [ ] `index.html` file exists ✅
- [ ] `_next/static` directory exists ✅

### Live Site Test:
- [ ] No console errors in browser ✅
- [ ] CSS/JS files load successfully ✅
- [ ] HTML contains content (not empty) ✅
- [ ] Site functions properly ✅

---

## 🆘 If Issues Persist

### Share These Details:
1. **Deployed site URL**
2. **Build logs screenshot** (latest deployment)
3. **Browser console errors** (F12 Developer Tools)
4. **Build settings screenshot** from Cloudflare
5. **Any specific error messages**

With this information, the issue can be diagnosed and fixed with 100% accuracy! 🎯

---

## 📞 Support Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next.js Static Export Guide](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Repository Issues](https://github.com/you112ef/open-lovablew/issues)