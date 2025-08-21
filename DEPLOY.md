# 🚀 دليل النشر الشامل - open-lovable22 على Cloudflare Pages

هذا الدليل يوضح خطوة بخطوة كيف تنشر المشروع **open-lovable22** على Cloudflare Pages بطريقتين:

1. **النشر اليدوي** (Cloudflare Pages Dashboard)
2. **النشر التلقائي 100%** باستخدام GitHub Actions

---

## 📦 المتطلبات الأساسية

- ✅ حساب على Cloudflare
- ✅ مستودع GitHub فيه الكود open-lovable22
- ✅ Node.js إصدار 18 أو أحدث
- ✅ معرفة أساسية بـ Git

---

## 1️⃣ النشر اليدوي (Cloudflare Pages Dashboard)

### الخطوات:

1. **سجّل الدخول إلى Cloudflare Pages**
   - اذهب إلى [Cloudflare Dashboard](https://dash.cloudflare.com)
   - اختر **Pages** من القائمة الجانبية

2. **إنشاء مشروع جديد**
   - اضغط **Create a Project**
   - اختر **Connect to Git**
   - اربط حساب GitHub

3. **اختيار المستودع**
   - اختر المستودع **open-lovable22**
   - اضغط **Begin setup**

4. **إعدادات البناء**
   ```
   Framework preset: Next.js
   Build command: npm run build
   Build output directory: out
   Root directory: / (اتركه فارغاً)
   ```

5. **إعدادات البيئة (Environment Variables)**
   - إذا كان لديك متغيرات بيئية، أضفها في قسم **Environment variables**
   - اضغط **Save and Deploy**

---

## 2️⃣ النشر التلقائي 100% (GitHub Actions)

### الملفات المطلوبة:

#### 1. ملف `wrangler.toml` (في جذر المستودع)

```toml
name = "open-lovable22"
compatibility_date = "2025-01-21"

[build]
command = "npm run build"
output_directory = "out"

[env.production]
name = "open-lovable22"

[env.preview]
name = "open-lovable22-preview"
```

#### 2. ملف `.github/workflows/cloudflare-deploy.yml`

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main
      - master
  pull_request:
    branches:
      - main
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: open-lovable22
          directory: out
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

### إعداد GitHub Secrets:

1. **CLOUDFLARE_API_TOKEN**
   - اذهب إلى [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
   - اضغط **Create Token**
   - اختر **Custom token**
   - الصلاحيات المطلوبة:
     - Account: Cloudflare Pages:Edit
     - Zone: Zone:Read
   - انسخ التوكن وأضفه في GitHub Secrets

2. **CLOUDFLARE_ACCOUNT_ID**
   - اذهب إلى [Cloudflare Dashboard](https://dash.cloudflare.com)
   - انسخ Account ID من الشريط الجانبي الأيمن
   - أضفه في GitHub Secrets

### كيفية إضافة Secrets في GitHub:

1. اذهب إلى مستودع GitHub
2. اختر **Settings** → **Secrets and variables** → **Actions**
3. اضغط **New repository secret**
4. أضف كل من `CLOUDFLARE_API_TOKEN` و `CLOUDFLARE_ACCOUNT_ID`

---

## 3️⃣ إعدادات الملفات المطلوبة

### 1. تحديث `package.json`

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "build:static": "next build && next export",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### 2. تحديث `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration for Cloudflare Pages deployment
  output: 'export',
  trailingSlash: true,
  
  // Fix for Cloudflare Pages static export
  assetPrefix: undefined,
  basePath: '',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './app/image-loader.js'
  },
  
  // External packages for Cloudflare Workers compatibility  
  serverExternalPackages: ['@e2b/code-interpreter'],
  
  // Ensure proper static export
  distDir: '.next',
  
  // Configure webpack for better compatibility
  webpack: (config: any, { dev, isServer }: any) => {
    // Handle external packages
    config.externals = config.externals || [];
    config.externals.push({
      '@e2b/code-interpreter': '@e2b/code-interpreter'
    });
    
    // Fix for potential module resolution issues
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    return config;
  },
  
  // Experimental features for better compatibility
  experimental: {
    esmExternals: 'loose'
  }
};

export default nextConfig;
```

### 3. ملف `app/image-loader.js` (إذا لم يكن موجوداً)

```javascript
export default function imageLoader({ src, width, quality }) {
  return `${src}?w=${width}&q=${quality || 75}`
}
```

### 4. ملف `_headers` (اختياري لتحسين الأداء)

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: same-origin
  Cache-Control: public, max-age=31536000

/*.js
  Cache-Control: public, max-age=31536000

/*.css
  Cache-Control: public, max-age=31536000

/*.png
  Cache-Control: public, max-age=31536000

/*.jpg
  Cache-Control: public, max-age=31536000

/*.svg
  Cache-Control: public, max-age=31536000
```

---

## 4️⃣ النتيجة النهائية

### الطريقة اليدوية:
بمجرد حفظ الإعدادات، Cloudflare Pages راح يبني ويعطيك رابط مثل:
```
https://open-lovable22.pages.dev
```

### الطريقة التلقائية:
كل ما تدفع (push) على فرع main → GitHub Actions يبني التطبيق → Cloudflare Pages ينشره مباشرة بدون أي تدخل منك 🔥

---

## 5️⃣ التحقق النهائي

### ✅ قائمة التحقق:

- [ ] فتح الرابط وتأكد أن التصميم والوظائف مطابقة للمستودع الأصلي
- [ ] تأكد أن جميع الصور، CSS، و JavaScript من مجلد `public/` تظهر بشكل صحيح
- [ ] اختبار جميع الصفحات والروابط
- [ ] التأكد من أن الأداء جيد (PageSpeed Insights)
- [ ] اختبار التطبيق على الأجهزة المحمولة

### 🔧 استكشاف الأخطاء الشائعة:

1. **الشاشة البيضاء**
   - تأكد من إعداد `output: 'export'` في `next.config.ts`
   - تحقق من أن جميع الصور تستخدم `unoptimized: true`

2. **مشاكل في الصور**
   - تأكد من وجود ملف `image-loader.js`
   - تحقق من أن الصور في مجلد `public/`

3. **مشاكل في API Routes**
   - إذا كان لديك API Routes، استخدم Cloudflare Workers + Pages Functions

---

## 6️⃣ الخلاصة

| الطريقة | المميزات | العيوب |
|---------|----------|--------|
| **النشر اليدوي** | سريع وسهل، تحكم كامل | يتطلب تدخل يدوي لكل تحديث |
| **النشر التلقائي** | كامل الأتمتة، تحديثات فورية | إعداد معقد في البداية |

### 🎯 التوصية:
- **للبداية**: استخدم النشر اليدوي للتعرف على النظام
- **للإنتاج**: استخدم النشر التلقائي للراحة والكفاءة

---

## 📞 الدعم

إذا واجهت أي مشاكل:

1. تحقق من [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
2. راجع [Next.js Static Export Guide](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
3. تحقق من GitHub Actions logs في حالة النشر التلقائي

---

**🎉 تهانينا! مشروعك الآن منشور على Cloudflare Pages!**