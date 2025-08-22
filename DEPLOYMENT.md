# 🚀 دليل النشر - تطبيق Lovable

دليل شامل لنشر تطبيق Lovable على مختلف المنصات.

## 📋 المتطلبات الأساسية

- ✅ Node.js 18+ مثبت
- ✅ Git مثبت
- ✅ حساب على منصة النشر المطلوبة
- ✅ التطبيق يبني بنجاح (`npm run build`)

## 🏗️ البناء المحلي

قبل النشر، تأكد من أن التطبيق يبني بنجاح:

```bash
# تثبيت التبعيات
npm install

# بناء التطبيق
npm run build

# اختبار التطبيق محلياً
npm run dev
```

## 🌐 النشر على Vercel (مُوصى به)

### الطريقة الأولى: النشر التلقائي
1. اذهب إلى [Vercel](https://vercel.com)
2. اضغط **New Project**
3. اربط مستودع GitHub الخاص بك
4. اختر مستودع `lovable-app`
5. Vercel سيكتشف تلقائياً أنه Next.js
6. اضغط **Deploy**

### الطريقة الثانية: النشر اليدوي
```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel --prod
```

## ☁️ النشر على Netlify

### الطريقة الأولى: النشر التلقائي
1. اذهب إلى [Netlify](https://netlify.com)
2. اضغط **New site from Git**
3. اختر مستودع GitHub
4. إعدادات البناء:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
5. اضغط **Deploy site**

### الطريقة الثانية: النشر اليدوي
```bash
# بناء التطبيق
npm run build

# رفع مجلد out إلى Netlify
# أو استخدام Netlify CLI
```

## 🚀 النشر على Cloudflare Pages

### الطريقة الأولى: النشر التلقائي
1. اذهب إلى [Cloudflare Pages](https://dash.cloudflare.com/pages)
2. اضغط **Create a project**
3. اختر **Connect to Git**
4. اختر مستودع GitHub
5. إعدادات البناء:
   - **Framework preset**: None
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
6. اضغط **Save and Deploy**

### الطريقة الثانية: النشر اليدوي
```bash
# تثبيت Wrangler
npm install -g wrangler

# تسجيل الدخول
wrangler login

# النشر
wrangler pages publish out --project-name=lovable-app
```

## 📱 النشر على GitHub Pages

### الطريقة الأولى: GitHub Actions (مُوصى به)
1. أنشئ ملف `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

2. اذهب إلى **Settings** → **Pages**
3. اختر **Source**: **Deploy from a branch**
4. اختر **Branch**: `gh-pages`
5. اضغط **Save**

### الطريقة الثانية: النشر اليدوي
```bash
# بناء التطبيق
npm run build

# رفع مجلد out إلى فرع gh-pages
git checkout -b gh-pages
git add out
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

## 🐳 النشر باستخدام Docker

### إنشاء Dockerfile
```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### إنشاء nginx.conf
```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;
        
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### بناء وتشغيل Docker
```bash
# بناء الصورة
docker build -t lovable-app .

# تشغيل الحاوية
docker run -p 80:80 lovable-app
```

## 🔧 إعدادات النشر المتقدمة

### متغيرات البيئة
```bash
# .env.local
NEXT_PUBLIC_APP_NAME=Lovable
NEXT_PUBLIC_APP_VERSION=2.0.0
NEXT_PUBLIC_API_URL=https://api.lovable.ai
```

### تحسين الأداء
```bash
# next.config.js
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  // تحسينات إضافية
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
};
```

### تحسين SEO
```html
<!-- public/robots.txt -->
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

```html
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2024-01-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

## 🚨 استكشاف الأخطاء

### مشاكل شائعة وحلولها

#### 1. خطأ في البناء
```bash
# تنظيف Cache
rm -rf .next out node_modules
npm install
npm run build
```

#### 2. مشاكل في التبعيات
```bash
# تحديث التبعيات
npm update
npm audit fix
```

#### 3. مشاكل في النشر
```bash
# التحقق من الإعدادات
npm run build
ls -la out/
```

#### 4. مشاكل في RTL
```html
<!-- تأكد من إعدادات HTML -->
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
```

## 📊 مراقبة الأداء

### أدوات مراقبة الأداء
- **Lighthouse**: لقياس الأداء
- **WebPageTest**: لاختبار السرعة
- **GTmetrix**: لتحليل الأداء
- **PageSpeed Insights**: من Google

### مقاييس الأداء المستهدفة
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔒 الأمان

### إعدادات الأمان
```bash
# إضافة headers أمان
# public/_headers
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### HTTPS
- تأكد من تفعيل HTTPS على جميع المنصات
- استخدم HSTS headers
- تأكد من صحة شهادات SSL

## 📞 الدعم

إذا واجهت أي مشاكل في النشر:

1. **GitHub Issues**: [أبلغ عن مشكلة](https://github.com/your-username/lovable-app/issues)
2. **Discord**: [انضم إلى مجتمعنا](https://discord.gg/lovable)
3. **Email**: hello@lovable.ai

## 🎯 الخلاصة

- ✅ **Vercel**: الأسهل والأسرع
- ✅ **Netlify**: ممتاز للمشاريع الصغيرة
- ✅ **Cloudflare Pages**: ممتاز للأداء
- ✅ **GitHub Pages**: مجاني ومفتوح المصدر
- ✅ **Docker**: للمطورين المتقدمين

اختر المنصة التي تناسب احتياجاتك وابدأ في نشر تطبيق Lovable! 🚀

---

**Lovable - اجعل تطوير التطبيقات ممتعاً وسهلاً!** ✨