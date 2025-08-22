# ⚡ Cursor Quick Start – Open-LovableW

## 🚀 **نسخ وتشغيل فوري (30 ثانية)**

### **الطريقة الأولى: سكربت تلقائي (موصى به)**

```bash
# 1. تحميل السكربت
curl -o cursor-setup.sh https://raw.githubusercontent.com/you112ef/open-lovablew/main/cursor-setup.sh

# 2. جعل السكربت قابل للتنفيذ
chmod +x cursor-setup.sh

# 3. تشغيل الإعداد التلقائي
./cursor-setup.sh
```

### **الطريقة الثانية: أوامر سريعة**

```bash
# 1. استنساخ المشروع
git clone https://github.com/you112ef/open-lovablew.git
cd open-lovablew

# 2. تثبيت الباكجات
npm install

# 3. إصلاح runtime
npm run fix:runtime

# 4. بناء المشروع
npm run build

# 5. تشغيل محلي
npm run dev
```

## 🎯 **الخيارات المتاحة في السكربت**

عند تشغيل `./cursor-setup.sh` ستظهر لك قائمة:

```
🎯 اختر ما تريد القيام به:
1) إعداد كامل (استنساخ + تثبيت + بناء + نشر)
2) إعداد بدون نشر (محلي فقط)
3) تشغيل الخادم المحلي
4) نشر على Cloudflare Pages
5) إصلاح runtime فقط
6) عرض معلومات النشر
7) خروج
```

## 🔑 **إعداد API Keys**

### **الطريقة الأولى: من الواجهة (موصى به)**
1. شغل التطبيق: `npm run dev`
2. افتح http://localhost:3000
3. اضغط على زر **Settings** في الهيدر
4. أضف مفاتيح API الخاصة بك
5. اضغط **Save**

### **الطريقة الثانية: من الملف**
```bash
# تعديل ملف .env.local
nano .env.local

# أضف مفاتيحك:
E2B_API_KEY=your_e2b_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here
OPENAI_API_KEY=your_openai_key_here
GROQ_API_KEY=your_groq_key_here
GOOGLE_API_KEY=your_google_key_here
FIRECRAWL_API_KEY=your_firecrawl_key_here
```

## 🌐 **النشر على Cloudflare Pages**

### **الطريقة الأولى: من السكربت**
```bash
./cursor-setup.sh
# اختر الخيار 1 (إعداد كامل)
```

### **الطريقة الثانية: يدوياً**
```bash
# 1. تسجيل الدخول
npx wrangler login

# 2. إنشاء مشروع
npx wrangler pages project create open-lovablew

# 3. النشر
npm run prepare:cloudflare
npx wrangler pages publish . --branch main
```

## 📦 **API Keys المطلوبة**

### **إجباري:**
- **E2B API Key** - [احصل عليه](https://e2b.dev)
- **Anthropic API Key** - [احصل عليه](https://console.anthropic.com)

### **اختياري:**
- **OpenAI API Key** - [احصل عليه](https://platform.openai.com)
- **Groq API Key** - [احصل عليه](https://console.groq.com)
- **Google API Key** - [احصل عليه](https://makersuite.google.com)
- **Firecrawl API Key** - [احصل عليه](https://firecrawl.dev)

## 🛠️ **أوامر مفيدة**

```bash
# تشغيل محلي
npm run dev

# بناء المشروع
npm run build

# إصلاح runtime
npm run fix:runtime

# البناء لـ Cloudflare
npm run prepare:cloudflare

# نشر
npx wrangler pages publish .

# تحديث المشروع
git pull && npm install
```

## 🚨 **استكشاف الأخطاء**

### **مشكلة: "Native module not found"**
```bash
npm run fix:runtime
```

### **مشكلة: خطأ في البناء**
```bash
rm -rf .next
rm -rf node_modules/.cache
npm install
npm run build
```

### **مشكلة: API Keys لا تعمل**
1. تأكد من إضافة المفاتيح من واجهة Settings
2. تحقق من صحة المفاتيح
3. تأكد من وجود اتصال بالإنترنت

## 🎉 **النتيجة النهائية**

بعد تشغيل السكربت ستحصل على:

✅ **مشروع يعمل محلياً** على http://localhost:3000
✅ **نشر تلقائي** على Cloudflare Pages
✅ **واجهة Lovable جميلة**
✅ **إدارة API Keys ديناميكية**
✅ **جميع الميزات تعمل** بدون أخطاء

## 📞 **الدعم**

إذا واجهت أي مشاكل:

1. تحقق من [Issues](https://github.com/you112ef/open-lovablew/issues)
2. ابحث في [Discussions](https://github.com/you112ef/open-lovablew/discussions)
3. افتح Issue جديد

---

**⭐ إذا أعجبك المشروع، لا تنس إعطاءه نجمة على GitHub!**