# ✅ قائمة التحقق المرئية - Cloudflare Pages Settings

طباع هذه الصفحة وتابع الخطوات واحدة تلو الأخرى

---

## 🟢 الخطوة 1: إعدادات البناء الأساسية

### اذهب إلى: Cloudflare Dashboard → Pages → [مشروعك] → Settings → Builds & deployments

| الإعداد | القيمة الصحيحة | ✅ |
|---------|-----------------|---|
| Framework preset | `Next.js (Static HTML Export)` | ☐ |
| Build command | `npm run build` | ☐ |
| Build output directory | `out` | ☐ |
| Root directory | (فارغ أو `/`) | ☐ |
| Node.js version | `18` أو `20` | ☐ |

---

## 🟢 الخطوة 2: متغيرات البيئة

### اذهب إلى: Settings → Environment variables

| المتغير | القيمة | النطاق | ✅ |
|---------|--------|---------|---|
| `NODE_ENV` | `production` | Production & Preview | ☐ |
| `NEXT_TELEMETRY_DISABLED` | `1` | Production & Preview | ☐ |
| `SKIP_ENV_VALIDATION` | `true` | Production & Preview | ☐ |
| `GROQ_API_KEY` | `[مفتاحك الفعلي]` | Production & Preview | ☐ |
| `ANTHROPIC_API_KEY` | `[مفتاحك الفعلي]` | Production & Preview | ☐ |
| `OPENAI_API_KEY` | `[مفتاحك الفعلي]` | Production & Preview | ☐ |
| `E2B_API_KEY` | `[مفتاحك الفعلي]` | Production & Preview | ☐ |

---

## 🟢 الخطوة 3: إعدادات Functions

### اذهب إلى: Settings → Functions

| الإعداد | القيمة الصحيحة | ✅ |
|---------|-----------------|---|
| Compatibility date | `2024-08-20` | ☐ |
| Compatibility flags | `nodejs_compat` | ☐ |
| Memory | `128 MB` أو أعلى | ☐ |
| CPU time | `10 seconds` أو أعلى | ☐ |

---

## 🟢 الخطوة 4: فحص Build Logs

### اذهب إلى: Deployments → [آخر deployment] → View details

### ✅ يجب أن ترى في Logs:
- ☐ `npm install` تم بنجاح
- ☐ `npm run build` تم بنجاح  
- ☐ `Creating output directory: out/` ظهرت
- ☐ `Static HTML export completed` ظهرت
- ☐ `Deployment successful` في النهاية

### ❌ أعلامات الخطر (إذا رأيت هذا، هناك مشكلة):
- ☐ `Build failed with exit code 1`
- ☐ `No such file or directory: out`
- ☐ `Module not found` errors
- ☐ `Cannot resolve` webpack errors

---

## 🟢 الخطوة 5: اختبار الموقع النهائي

### افتح رابط الموقع المنشور: `https://[project-name].pages.dev`

| الاختبار | النتيجة | ✅ |
|----------|--------|---|
| الصفحة تحمل (لا توجد شاشة بيضاء) | تحمل بشكل طبيعي | ☐ |
| اضغط F12 → Console | لا توجد أخطاء حمراء | ☐ |
| اضغط F12 → Network | جميع الملفات تحمل (200 OK) | ☐ |
| النصوص والألوان تظهر | تظهر بشكل صحيح | ☐ |
| الأزرار تعمل | تعمل عند الضغط | ☐ |

---

## 🚨 إذا فشل أي اختبار:

### عد إلى الخطوة التي فشلت وراجع الإعدادات
### أو جرب هذه الحلول السريعة:

| المشكلة | الحل السريع |
|---------|-------------|
| Build يفشل | غير Build command إلى: `npm install --force && npm run build` |
| مجلد out فارغ | غير Output directory إلى: `dist` أو `.next/out` |
| شاشة بيضاء + أخطاء Console | أضف: `NEXT_TELEMETRY_DISABLED=1` في Environment variables |
| ملفات CSS لا تحمل | تأكد من Framework preset: `Next.js (Static HTML Export)` |

---

## ✅ النتيجة النهائية المتوقعة:

عندما تكمل جميع الخطوات بنجاح:
- ☐ الموقع يعمل بدون شاشة بيضاء
- ☐ جميع المحتويات تظهر صحيحة  
- ☐ لا توجد أخطاء في Developer Console
- ☐ النشر التلقائي يعمل عند Push جديد إلى GitHub

---

## 📞 للمساعدة الإضافية:

إذا لم تكتمل جميع الخطوات بنجاح، أرسل:
1. ✅ لقطة شاشة من إعدادات Build
2. ✅ لقطة شاشة من آخر Build Logs  
3. ✅ لقطة شاشة من Console Errors
4. ✅ رابط الموقع المنشور

**مع هذه المعلومات سيتم حل المشكلة بنسبة 100%!** 🎯