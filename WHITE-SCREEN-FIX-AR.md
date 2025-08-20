# 🔧 حل مشكلة الشاشة البيضاء - Cloudflare Pages

## المشكلة: الموقع ينشر بنجاح لكن يظهر شاشة بيضاء

### 🔍 التشخيص السريع

#### 1. افحص Console في المتصفح
افتح Developer Tools (F12) واذهب إلى Console tab:
- هل توجد أخطاء JavaScript؟
- هل توجد أخطاء في تحميل الملفات (404 errors)؟

#### 2. افحص Network Tab
في Developer Tools، اذهب إلى Network tab:
- هل يتم تحميل `_next/static/` ملفات بشكل صحيح؟
- هل توجد أخطاء 404 في الملفات؟

#### 3. افحص Sources/Elements
- هل يوجد HTML content؟
- هل JavaScript files محملة؟

---

## ✅ الحلول المرتبة حسب الأولوية

### الحل 1: تحديث إعدادات Cloudflare Pages

#### في Cloudflare Pages Dashboard:
1. اذهب إلى مشروعك → **Settings** → **Builds & deployments**
2. حدث هذه الإعدادات:

```
Build command: npm run build
Build output directory: out
Root directory: (فارغ)
Node.js version: 18 أو 20
```

#### متغيرات البيئة المطلوبة:
```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
SKIP_ENV_VALIDATION=true
```

### الحل 2: استخدم Static Export

#### في Cloudflare Pages Dashboard:
```
Framework preset: Next.js (Static HTML Export)
Build command: npm run build:static
Build output directory: out
```

### الحل 3: تحقق من Build Logs

1. اذهب إلى **Deployments** tab في Cloudflare Pages
2. اضغط على آخر deployment
3. اقرأ Build logs للتأكد من عدم وجود أخطاء
4. تحقق من وجود ملفات في `out/` directory

---

## 🚀 إعادة النشر بالطريقة الصحيحة

### الخطوة 1: حدث الكود
قم بعمل push للكود المحدث:

```bash
git add .
git commit -m "Fix white screen issue - update Next.js config for static export"
git push origin main
```

### الخطوة 2: أعد النشر
1. اذهب إلى Cloudflare Pages Dashboard
2. اذهب إلى مشروعك
3. اضغط **"View deployment"** أو انتظر automatic redeploy

### الخطوة 3: تحقق من الإعدادات الصحيحة

#### في Settings → Functions:
```
Compatibility date: 2024-08-20
Compatibility flags: nodejs_compat
```

#### في Settings → Environment variables:
```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

---

## 🔄 طرق بديلة للنشر

### الطريقة 1: استخدم تكوين مبسط

#### في next.config.ts:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### الطريقة 2: استخدم Manual Deploy

```bash
# Build محلياً
npm run build:static

# Upload الملفات يدوياً
# اذهب إلى Cloudflare Pages Dashboard
# اسحب مجلد out/ إلى Upload assets
```

---

## 🐛 المشاكل الشائعة والحلول

### مشكلة: أخطاء في Console تظهر Module not found

**الحل:**
أضف هذا إلى next.config.ts:
```javascript
webpack: (config, { isServer }) => {
  if (!isServer) {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
    };
  }
  return config;
}
```

### مشكلة: CSS لا يحمل بشكل صحيح

**الحل:**
1. تأكد من أن `output: 'export'` موجود في next.config.ts
2. تأكد من `trailingSlash: true`
3. أعد build المشروع

### مشكلة: API Routes لا تعمل

**تفسير:** Static export لا يدعم API routes
**الحل:** استخدم External APIs أو Cloudflare Workers منفصلة

---

## 📞 إذا لم تحل المشكلة

### تحقق من هذه النقاط:
1. ✅ Build logs لا تظهر أخطاء
2. ✅ `out/` directory يحتوي على ملفات HTML
3. ✅ Console لا يظهر JavaScript errors
4. ✅ Network tab يظهر تحميل ناجح للملفات
5. ✅ Build settings صحيحة في Cloudflare

### معلومات إضافية مطلوبة:
- رابط الموقع المنشور
- Build logs من Cloudflare Pages
- أخطاء Console في المتصفح
- نوع المتصفح والنسخة

---

## 🎯 الخطوات التالية

1. **جرب الحل 1** أولاً (أسهل حل)
2. إذا لم يعمل، **جرب الحل 2** 
3. إذا لم يعمل، **شارك Build logs** والأخطاء
4. سنساعدك في تشخيص المشكلة بدقة أكثر