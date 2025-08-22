# Halifi Cursor Cloudflare Pages Auto Setup

## 🚀 **نظرة عامة**

هذا الدليل يوفر إعداد كامل ومحدث لمشروع **open-lovablew** على Cloudflare Pages مع جميع الميزات والـ APIs.

## 📋 **1️⃣ Repository**

### **GitHub Repository:**
```
https://github.com/you112ef/open-lovablew.git
```

### **خطوات ربط المستودع:**
1. اذهب إلى [Cloudflare Dashboard](https://dash.cloudflare.com)
2. اختر **Pages** → **Create a project**
3. اختر **Connect to Git**
4. اختر مستودع `open-lovablew`
5. اضغط **Begin setup**

## ⚙️ **2️⃣ Environment Variables**

### **الذهاب إلى إعدادات البيئة:**
1. في مشروع Cloudflare Pages
2. اذهب إلى **Settings** → **Environment variables**
3. أضف المتغيرات التالية:

### **API Keys المطلوبة:**

```env
# إجباري (اختر واحد على الأقل)
E2B_API_KEY=your_e2b_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# اختياري (للميزات الإضافية)
FIRECRAWL_API_KEY=your_firecrawl_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here

# إعدادات التطبيق
NEXT_PUBLIC_APP_URL=https://your-project.pages.dev
```

### **روابط الحصول على API Keys:**

| الخدمة | الرابط | الوصف |
|--------|--------|-------|
| **E2B** | https://e2b.dev | للبيئة الافتراضية والكود |
| **Anthropic** | https://console.anthropic.com | لـ Claude AI |
| **OpenAI** | https://platform.openai.com | لـ GPT models |
| **Groq** | https://console.groq.com | للاستجابة السريعة |
| **Google** | https://makersuite.google.com | لـ Gemini models |
| **Firecrawl** | https://firecrawl.dev | لـ web scraping |

## 🏗️ **3️⃣ Build & Output Settings**

### **Build Command:**
```bash
npm install && npm run prepare:cloudflare
```

### **Build Output Directory:**
```
.vercel/output/static
```

### **Root Directory:**
```
/ (فارغ)
```

### **Node.js Version:**
```
18.x (أو أحدث)
```

## 🔧 **4️⃣ إعدادات إضافية**

### **Framework Preset:**
```
Next.js
```

### **Compatibility Flags:**
```
nodejs_compat
```

### **Environment Variables (Production):**
- تأكد من إضافة نفس المتغيرات في **Production** environment
- يمكن إضافة متغيرات مختلفة لـ **Preview** environment للاختبار

## 🚀 **5️⃣ Deployment**

### **النشر التلقائي:**
- Cloudflare Pages سيقوم بالبناء والنشر تلقائياً بعد كل push على GitHub
- كل الـ APIs ستعمل مباشرة من البيئة
- لا حاجة لإعدادات إضافية

### **مراقبة النشر:**
1. اذهب إلى **Deployments** tab
2. راقب عملية البناء
3. تحقق من الـ logs إذا كان هناك أخطاء

## 💻 **6️⃣ Code Integration**

### **قراءة Environment Variables:**

```javascript
// في Next.js API routes
const e2bApiKey = process.env.E2B_API_KEY;
const firecrawlApiKey = process.env.FIRECRAWL_API_KEY;
const openaiApiKey = process.env.OPENAI_API_KEY;
const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
const googleApiKey = process.env.GOOGLE_API_KEY;
const groqApiKey = process.env.GROQ_API_KEY;

// في Client-side (مع NEXT_PUBLIC_)
const appUrl = process.env.NEXT_PUBLIC_APP_URL;
```

### **مثال على الاستخدام:**

```javascript
// في app/api/example/route.ts
export async function GET() {
  const apiKey = process.env.E2B_API_KEY;
  
  if (!apiKey) {
    return new Response('API Key not found', { status: 400 });
  }
  
  // استخدام API Key
  const response = await fetch('https://api.e2b.dev/...', {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  });
  
  return Response.json(await response.json());
}
```

## 🧪 **7️⃣ Testing**

### **بعد النشر:**
1. افتح رابط Cloudflare Pages
2. جرب كل الخدمات المتاحة

### **اختبار الـ APIs:**

#### **E2B API:**
- إنشاء sandbox environment
- تشغيل الكود
- إدارة الملفات

#### **AI Providers:**
- **Anthropic (Claude)**: تحليل النصوص والكود
- **OpenAI (GPT)**: توليد المحتوى
- **Groq**: الاستجابة السريعة
- **Google (Gemini)**: تحليل متقدم

#### **Firecrawl API:**
- استخراج المحتوى من المواقع
- تحليل HTML
- استخراج البيانات

### **مؤشرات النجاح:**
✅ **الواجهة تظهر** بدون أخطاء
✅ **زر Settings يعمل** ويفتح مودال الإعدادات
✅ **API Keys تُحفظ** في localStorage
✅ **الـ APIs تستجيب** بدون أخطاء
✅ **لا أخطاء في Console**

## 🚨 **8️⃣ استكشاف الأخطاء**

### **مشاكل شائعة:**

#### **1. خطأ "Native module not found"**
```bash
# الحل: تأكد من استخدام Build Command الصحيح
npm install && npm run prepare:cloudflare
```

#### **2. خطأ في Environment Variables**
- تأكد من إضافة المتغيرات في **Production** environment
- تحقق من صحة أسماء المتغيرات
- تأكد من عدم وجود مسافات إضافية

#### **3. خطأ في البناء**
- تحقق من **Build logs**
- تأكد من أن **Node.js version** متوافق
- تحقق من **Compatibility flags**

#### **4. خطأ في الـ APIs**
- تحقق من صحة API Keys
- تأكد من وجود رصيد في الحسابات
- تحقق من **Rate limits**

### **أوامر التشخيص:**

```bash
# فحص Environment Variables
echo $E2B_API_KEY

# فحص Node.js version
node --version

# فحص Build logs
npm run build
```

## 📊 **9️⃣ مراقبة الأداء**

### **Cloudflare Analytics:**
- **Web Analytics**: مراقبة الزيارات
- **Performance**: مراقبة سرعة التحميل
- **Errors**: مراقبة الأخطاء

### **Custom Domains:**
- إضافة domain مخصص
- إعداد SSL تلقائي
- إعدادات DNS

## 🔄 **🔟 التحديثات**

### **تحديث تلقائي:**
- كل push على GitHub يحدث البناء والنشر تلقائياً
- لا حاجة لإعدادات إضافية

### **تحديث يدوي:**
```bash
# في المشروع المحلي
git pull origin main
npm install
git push origin main
```

## 🎉 **النتيجة النهائية**

بعد اتباع هذا الدليل ستحصل على:

✅ **مشروع يعمل بالكامل** على Cloudflare Pages
✅ **جميع الـ APIs تعمل** بدون أخطاء
✅ **واجهة Lovable جميلة** ومتجاوبة
✅ **إدارة API Keys ديناميكية** من الواجهة
✅ **نشر تلقائي** مع كل تحديث
✅ **أداء عالي** وسرعة تحميل ممتازة

## 📞 **الدعم**

إذا واجهت أي مشاكل:

1. تحقق من [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
2. راجع [Build logs](https://dash.cloudflare.com) في Cloudflare Dashboard
3. تحقق من [GitHub Issues](https://github.com/you112ef/open-lovablew/issues)
4. افتح Issue جديد مع تفاصيل المشكلة

---

**🚀 كل شيء جاهز للاستخدام الفوري!**