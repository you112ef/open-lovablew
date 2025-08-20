# ✅ فحص شامل لإعدادات Cloudflare Pages - حل الشاشة البيضاء

## 🎯 دليل الفحص المفصل (اتبع هذا الترتيب)

### الخطوة 1: فحص إعدادات Build الأساسية

#### اذهب إلى: Cloudflare Dashboard ← Pages ← [اسم مشروعك] ← Settings ← Builds & deployments

##### ✅ الإعدادات الصحيحة:
```
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Build output directory: out
Root directory: (اتركه فارغ أو ضع /)
Node.js version: 18 أو 20
```

##### ❌ الإعدادات الخطأ (تجنبها):
```
❌ Framework preset: Next.js (Full Stack) 
❌ Build command: next build && next-on-pages
❌ Build output directory: .vercel/output/static
❌ Node.js version: 16 أو أقدم
```

---

### الخطوة 2: فحص Environment Variables

#### اذهب إلى: Settings ← Environment variables

##### ✅ المتغيرات المطلوبة:
```
NODE_ENV = production
NEXT_TELEMETRY_DISABLED = 1
SKIP_ENV_VALIDATION = true

# API Keys (أضف مفاتيحك الفعلية)
GROQ_API_KEY = your_actual_key
ANTHROPIC_API_KEY = your_actual_key  
OPENAI_API_KEY = your_actual_key
E2B_API_KEY = your_actual_key
```

##### ⚠️ تأكد من:
- [ ] لا توجد مسافات إضافية في القيم
- [ ] المفاتيح صحيحة وغير منتهية الصلاحية
- [ ] Environment scope = Production AND Preview

---

### الخطوة 3: فحص Functions Settings

#### اذهب إلى: Settings ← Functions

##### ✅ الإعدادات الصحيحة:
```
Compatibility date: 2024-08-20
Compatibility flags: nodejs_compat
Memory: 128 MB (أو أعلى)
CPU time: 10 seconds (أو أعلى)
```

---

### الخطوة 4: فحص Build Logs بالتفصيل

#### اذهب إلى: Deployments ← [آخر deployment] ← View details

##### ✅ ما يجب أن تراه في Build Logs:

```bash
# 1. تثبيت المشاريع بنجاح
npm install
✓ Dependencies installed

# 2. Build ناجح
npm run build
✓ Build completed successfully

# 3. إنشاء مجلد out بالملفات
Creating output directory: out/
✓ Static HTML export completed

# 4. نشر الملفات
Deploying files from: out/
✓ Deployment successful
```

##### ❌ علامات الخطأ في Logs:
```bash
❌ "No such file or directory: out"
❌ "Build failed with exit code 1"  
❌ "Module not found" errors
❌ "Cannot resolve" webpack errors
❌ "_next/static files not found"
```

---

### الخطوة 5: فحص ملفات الإخراج

#### في Build Logs، ابحث عن:

##### ✅ يجب أن ترى:
```
out/
├── index.html (ملف HTML رئيسي)
├── _next/static/ (ملفات JavaScript و CSS)
├── api/ (اختياري - إذا كانت تعمل كـ static)
└── [other-pages].html
```

##### ❌ مشاكل شائعة:
- مجلد `out` فارغ أو غير موجود
- ملف `index.html` مفقود
- مجلد `_next/static` مفقود
- أحجام ملفات صغيرة جداً (أقل من 1KB)

---

### الخطوة 6: اختبار الموقع المنشور

#### افتح الرابط المنشور واضغط F12 (Developer Tools)

##### في Console tab:
✅ **لا يجب أن ترى:**
- أخطاء JavaScript حمراء
- "Failed to fetch" errors
- "Module not found" errors

##### في Network tab:
✅ **يجب أن ترى:**
- `index.html` يحمل بنجاح (200 OK)
- `_next/static/css/` ملفات تحمل (200 OK)  
- `_next/static/chunks/` ملفات تحمل (200 OK)

❌ **إذا رأيت:**
- 404 errors للملفات الثابتة
- Loading failures للـ CSS/JS
- "net::ERR_ABORTED" errors

---

### الخطوة 7: فحص المحتوى HTML

#### في Developer Tools ← Elements/Sources:

##### ✅ يجب أن ترى:
```html
<html>
<head>
  <title>معرف المشروع</title>
  <link href="_next/static/css/..." rel="stylesheet">
</head>
<body>
  <div id="__next">
    <!-- محتوى React هنا -->
  </div>
  <script src="_next/static/chunks/..."></script>
</body>
</html>
```

##### ❌ مشاكل:
- `<div id="__next"></div>` فارغ
- لا توجد ملفات CSS محملة
- لا توجد ملفات JavaScript محملة

---

## 🔧 الحلول السريعة للمشاكل الشائعة

### مشكلة 1: Build يفشل
**الحل:**
```
# جرب هذا Build command بدلاً من npm run build:
npm install --force && npm run build
```

### مشكلة 2: مجلد out فارغ
**الحل:**
1. تأكد من `output: 'export'` في next.config.ts
2. غير Build output directory إلى `.next/out` أو `dist`

### مشكلة 3: CSS لا يحمل
**الحل:**
1. تأكد من `trailingSlash: true` في next.config.ts
2. أضف `assetPrefix: undefined` في التكوين

### مشكلة 4: JavaScript errors
**الحل:**
1. أضف هذا Environment Variable:
   `NEXT_TELEMETRY_DISABLED=1`
2. جرب Node.js version 18 بدلاً من 20

---

## 📋 Checklist النهائي

اطبع هذه القائمة وتأكد من كل نقطة:

### إعدادات Build:
- [ ] Framework: Next.js (Static HTML Export) ✅
- [ ] Build command: npm run build ✅  
- [ ] Output directory: out ✅
- [ ] Node.js: 18 أو 20 ✅

### Environment Variables:
- [ ] NODE_ENV=production ✅
- [ ] NEXT_TELEMETRY_DISABLED=1 ✅
- [ ] API keys صحيحة ✅

### Functions:
- [ ] Compatibility date: 2024-08-20 ✅
- [ ] Compatibility flags: nodejs_compat ✅

### Build Output:
- [ ] Build logs لا تظهر أخطاء ✅
- [ ] مجلد out موجود وليس فارغ ✅
- [ ] ملف index.html موجود ✅
- [ ] مجلد _next/static موجود ✅

### اختبار الموقع:
- [ ] لا توجد أخطاء في Console ✅
- [ ] ملفات CSS/JS تحمل بنجاح ✅
- [ ] HTML يحتوي على محتوى ✅

---

## 🆘 إذا لم تحل المشكلة

### شارك هذه المعلومات:
1. **رابط الموقع المنشور**
2. **لقطة شاشة من Build Logs** (آخر deployment)
3. **لقطة شاشة من Console Errors** (F12 في المتصفح)
4. **لقطة شاشة من إعدادات Build** في Cloudflare
5. **أي رسائل خطأ محددة** تظهر

مع هذه المعلومات يمكن تشخيص المشكلة بدقة 100% وإصلاحها فوراً! 🎯