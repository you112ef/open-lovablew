# ⚡ Quick Deploy Settings for Cloudflare Pages

## Copy-Paste Configuration

### Build Settings
```
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Build output directory: .vercel/output/static
Root directory: (leave empty)
Node.js version: 20
```

### Environment Variables to Add
```
GROQ_API_KEY=your_groq_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here
OPENAI_API_KEY=your_openai_key_here
E2B_API_KEY=your_e2b_key_here
ANTHROPIC_BASE_URL=https://api.anthropic.com/v1
NODE_ENV=production
```

### If Build Fails - Try This Build Command
```
npm install --legacy-peer-deps && npm run build
```

### Repository to Connect
```
you112ef/open-lovablew
Branch: main
```

## 🔗 Quick Links
- [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
- [Your Repository](https://github.com/you112ef/open-lovablew)

## ✅ Deployment Checklist
- [ ] Go to Cloudflare Pages Dashboard
- [ ] Click "Create a project" 
- [ ] Connect GitHub repository: you112ef/open-lovablew
- [ ] Set build settings (see above)
- [ ] Add environment variables (your API keys)
- [ ] Set Node.js version to 20
- [ ] Click "Save and Deploy"
- [ ] Wait for deployment to complete
- [ ] Visit your live site at `https://[project-name].pages.dev`