# Lovable - بناء التطبيقات بالذكاء الاصطناعي

تطبيق Lovable هو منصة ذكية لبناء تطبيقات الويب باستخدام الذكاء الاصطناعي. يمكنك التحدث مع AI وإنشاء تطبيقات كاملة خطوة بخطوة.

## ✨ المميزات

- 🤖 **ذكاء اصطناعي متقدم**: دعم لـ OpenAI GPT-4، Anthropic Claude، و Groq
- 🎨 **واجهة جميلة**: تصميم عصري ومتجاوب مع دعم كامل للغة العربية
- ⚡ **سرعة عالية**: مبني على Next.js و Cloudflare Pages للأداء الأمثل
- 🔧 **معاينة مباشرة**: معاينة فورية للتطبيقات المُنشأة
- 📱 **متجاوب**: يعمل على جميع الأجهزة والمتصفحات
- 🌐 **نشر سهل**: نشر مباشر على Cloudflare Pages

## 🚀 النشر السريع

### 1. استنساخ المشروع

```bash
git clone https://github.com/your-username/lovable-app.git
cd lovable-app
```

### 2. تثبيت التبعيات

```bash
npm install
```

### 3. إعداد متغيرات البيئة

انسخ ملف `.dev.vars.example` إلى `.dev.vars` واملأ قيم API:

```bash
cp .dev.vars.example .dev.vars
```

أضف مفاتيح API الخاصة بك:

```env
# OpenAI API (مطلوب واحد على الأقل)
OPENAI_API_KEY=your_openai_api_key_here

# Anthropic API (اختياري)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Groq API (اختياري)
GROQ_API_KEY=your_groq_api_key_here
```

### 4. تشغيل التطبيق محلياً

```bash
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

## 🌐 النشر على Cloudflare Pages

### 1. إعداد Cloudflare Pages

1. اذهب إلى [Cloudflare Dashboard](https://dash.cloudflare.com)
2. اختر "Pages" من القائمة الجانبية
3. اضغط "Create a project"
4. اختر "Connect to Git"
5. اختر مستودع GitHub الخاص بك

### 2. إعدادات البناء

```
Framework preset: Next.js
Build command: npm run build
Build output directory: out
Node.js version: 18
```

### 3. متغيرات البيئة

في إعدادات المشروع، أضف متغيرات البيئة التالية:

| المتغير | القيمة | الوصف |
|---------|--------|-------|
| `OPENAI_API_KEY` | `your_key_here` | مفتاح OpenAI API |
| `ANTHROPIC_API_KEY` | `your_key_here` | مفتاح Anthropic API |
| `GROQ_API_KEY` | `your_key_here` | مفتاح Groq API |

### 4. النشر

اضغط "Save and Deploy" وسيتم نشر التطبيق تلقائياً.

## 🔧 الحصول على مفاتيح API

### OpenAI API
1. اذهب إلى [OpenAI Platform](https://platform.openai.com/api-keys)
2. سجل دخول أو أنشئ حساب جديد
3. اضغط "Create new secret key"
4. انسخ المفتاح وأضفه إلى متغيرات البيئة

### Anthropic API
1. اذهب إلى [Anthropic Console](https://console.anthropic.com/)
2. سجل دخول أو أنشئ حساب جديد
3. اضغط "Create Key"
4. انسخ المفتاح وأضفه إلى متغيرات البيئة

### Groq API
1. اذهب إلى [Groq Console](https://console.groq.com/)
2. سجل دخول أو أنشئ حساب جديد
3. اضغط "Create API Key"
4. انسخ المفتاح وأضفه إلى متغيرات البيئة

## 🛠️ التطوير

### هيكل المشروع

```
lovable-app/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── components/        # React components
│   └── globals.css        # Global styles
├── components/            # Shared components
├── lib/                   # Utility functions
├── config/                # Configuration files
└── public/                # Static assets
```

### الأوامر المتاحة

```bash
# تشغيل التطبيق في وضع التطوير
npm run dev

# بناء التطبيق للإنتاج
npm run build

# تشغيل التطبيق المُبني
npm run start

# فحص الأنواع
npm run type-check

# فحص الكود
npm run lint
```

## 🐛 استكشاف الأخطاء

### مشاكل شائعة

1. **خطأ في API Keys**
   - تأكد من صحة مفاتيح API
   - تحقق من رصيد الحساب
   - تأكد من إعداد متغيرات البيئة

2. **خطأ في البناء**
   - تأكد من تثبيت جميع التبعيات
   - تحقق من إصدار Node.js (18+)
   - راجع سجلات البناء

3. **خطأ في التشغيل**
   - تحقق من إعدادات الشبكة
   - راجع سجلات الخادم
   - تأكد من صحة التكوين

### الحصول على المساعدة

- 📖 [التوثيق](https://docs.lovable.ai)
- 💬 [Discord](https://discord.gg/lovable)
- 🐛 [GitHub Issues](https://github.com/your-username/lovable-app/issues)

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT. راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 🤝 المساهمة

نرحب بالمساهمات! يرجى قراءة [دليل المساهمة](CONTRIBUTING.md) قبل البدء.

## 📞 الدعم

للدعم الفني أو الأسئلة:
- 📧 البريد الإلكتروني: support@lovable.ai
- 💬 Discord: [Lovable Community](https://discord.gg/lovable)
- 🐛 GitHub Issues: [Report a bug](https://github.com/your-username/lovable-app/issues)

---

**صنع بـ ❤️ بواسطة فريق Lovable**