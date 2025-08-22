# 🚀 **دليل نشر Open-LovableW على Cloudflare Pages** 

## ⚠️ **مشكلة هامة: Native Node.js Modules**

يستخدم هذا التطبيق مكتبة `@e2b/code-interpreter` التي تتطلب **Node.js runtime**، لكن Cloudflare Pages يتطلب **Edge runtime** لـ API routes. هذا يخلق تعارض أساسي.

## 🔧 **الحلول المتاحة:**

### ✅ **الحل 1: Vercel (الموصى به)**
```bash
# النشر على Vercel (يدعم Node.js runtime كاملاً)
npm install -g vercel
vercel login
vercel --prod
```

### ✅ **الحل 2: Cloudflare Pages مع تعديلات**

إذا كنت مصراً على استخدام Cloudflare Pages، يجب تعديل التطبيق:

#### 🚨 **الخطوة 1: تغيير جميع API routes إلى Edge Runtime**
```bash
# تشغيل سكربت التحويل للـ edge runtime
node scripts/fix-runtime-edge.js
```

#### 🚨 **الخطوة 2: إزالة أو استبدال مكتبات Node.js**
يجب إزالة أو استبدال هذه المكتبات:
- `@e2b/code-interpreter` ➜ حل بديل أو API خارجي
- أي مكتبات أخرى تتطلب Node.js runtime

#### 🚨 **الخطوة 3: إعادة كتابة وظائف E2B**
الوظائف التي تستخدم E2B تحتاج إعادة كتابة:
- `create-ai-sandbox`
- `run-command` 
- `get-sandbox-files`
- `install-packages`
- وجميع الوظائف المتعلقة بإدارة Sandbox

### ✅ **الحل 3: Hybrid Approach**

1. **Frontend**: نشر على Cloudflare Pages
2. **API**: نشر على Vercel أو خدمة أخرى تدعم Node.js
3. **تعديل API URLs**: تحديث التطبيق ليستخدم API مختلف

## 📋 **خطوات النشر على Cloudflare Pages (مع القيود)**

### 1️⃣ **إعداد Repository**
```bash
git remote -v  # تأكد من أن الـ repository مربوط
```

### 2️⃣ **إعداد Cloudflare Pages**
1. اذهب إلى [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. اختر **Pages** 
3. **Create a project**
4. **Connect to Git** واختر repository
5. **Configure builds and deployments**:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build && npx @cloudflare/next-on-pages@latest`
   - **Build output directory**: `.vercel/output/static`

### 3️⃣ **Environment Variables**
أضف هذه المتغيرات في Cloudflare Pages:
```
E2B_API_KEY=your_e2b_key_here
FIRECRAWL_API_KEY=your_firecrawl_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here
OPENAI_API_KEY=your_openai_key_here
GEMINI_API_KEY=your_gemini_key_here
GROQ_API_KEY=your_groq_key_here
```

### 4️⃣ **Settings إضافية**
- **Node.js version**: 22
- **Compatibility flags**: `nodejs_compat`

## ⚠️ **القيود مع Cloudflare Pages:**

1. **🚫 وظائف E2B لن تعمل** - تتطلب Node.js runtime
2. **🚫 إنشاء Sandbox لن يعمل** - يعتمد على مكتبات native
3. **🚫 تشغيل الكود لن يعمل** - يحتاج E2B API
4. **✅ واجهة المستخدم ستعمل** - HTML/CSS/JS
5. **✅ إدارة API Keys ستعمل** - localStorage
6. **✅ Scraping ستعمل** - Firecrawl API متوافق مع Edge

## 🎯 **التوصية النهائية:**

**استخدم Vercel للحصول على جميع الوظائف كاملة:**

```bash
# نشر فوري على Vercel
npm install -g vercel
vercel login
vercel --prod
```

أو

**قم بتطوير نسخة محدودة للـ Cloudflare Pages** بدون وظائف E2B.

## 📞 **الدعم**

إذا واجهت مشاكل، تواصل معنا أو راجع:
- [Next.js Edge Runtime Docs](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/)
- [E2B Alternatives](https://e2b.dev/docs)