# دليل النشر على Cloudflare Pages - Lovable

## 🚀 النشر السريع

### 1. إعداد Cloudflare Pages

1. اذهب إلى [Cloudflare Dashboard](https://dash.cloudflare.com)
2. اختر "Pages" من القائمة الجانبية
3. اضغط "Create a project"
4. اختر "Connect to Git"
5. اختر مستودع GitHub الخاص بك: `https://github.com/you112ef/open-lovablew`

### 2. إعدادات البناء

```
Framework preset: None (Custom)
Build command: npm run build
Build output directory: out
Node.js version: 18
```

### 3. متغيرات البيئة (اختيارية)

يمكنك إعداد متغيرات البيئة في Cloudflare Pages dashboard، أو استخدام واجهة التطبيق لإدخال المفاتيح:

| المتغير | الوصف |
|---------|-------|
| `OPENAI_API_KEY` | مفتاح OpenAI API |
| `ANTHROPIC_API_KEY` | مفتاح Anthropic API |
| `GROQ_API_KEY` | مفتاح Groq API |
| `E2B_API_KEY` | مفتاح E2B API |
| `FIRECRAWL_API_KEY` | مفتاح Firecrawl API |
| `GEMINI_API_KEY` | مفتاح Google Gemini API |

### 4. النشر

اضغط "Save and Deploy" وسيتم نشر التطبيق تلقائياً.

## 🔧 إعداد مفاتيح API

### الطريقة الأولى: واجهة التطبيق (مُوصى بها)

1. **افتح التطبيق** بعد النشر
2. **اضغط أيقونة المفتاح** 🔑 في الهيدر
3. **أدخل مفاتيح API** الخاصة بك
4. **اضغط "حفظ المفاتيح"**
5. **ابدأ في استخدام التطبيق!**

### الطريقة الثانية: متغيرات البيئة

1. اذهب إلى إعدادات المشروع في Cloudflare Pages
2. اختر "Environment variables"
3. أضف المتغيرات المطلوبة
4. أعد النشر

## 🎯 المميزات الجديدة

### ✅ واجهة ضبط ديناميكية
- **لا حاجة لملفات .env**
- **حفظ آمن ومشفر** في localStorage
- **واجهة عربية جميلة**
- **اختبار المفاتيح** قبل الحفظ

### ✅ مؤشر حالة API
- **أيقونة WiFi** تظهر حالة الاتصال
- **عدد المفاتيح المُعدة** (مثال: 2/6)
- **Tooltip تفصيلي** عند التمرير
- **تحديث فوري** عند تغيير المفاتيح

### ✅ مطالبة سريعة
- **تنبيه جميل** للمستخدمين الجدد
- **زر سريع** لإعداد المفاتيح
- **إمكانية الإغلاق** أو التأجيل

## 🛠️ هيكل المشروع

```
lovable-app/
├── app/                    # Next.js App Router
├── components/            # React components
│   ├── APISettingsModal.tsx    # واجهة ضبط API
│   ├── APIKeyIndicator.tsx     # مؤشر حالة API
│   └── QuickSetupPrompt.tsx    # مطالبة سريعة
├── functions/             # Cloudflare Pages Functions
│   └── api/ai.js         # API route للذكاء الاصطناعي
├── lib/                   # Utility functions
│   └── ai-service.ts     # خدمة AI
├── out/                   # Static export (مجلد البناء)
└── wrangler.toml         # إعدادات Cloudflare
```

## 🔍 استكشاف الأخطاء

### مشاكل شائعة

1. **خطأ في البناء**
   - تأكد من أن `pages_build_output_dir = "out"`
   - تحقق من إصدار Node.js (18+)
   - راجع سجلات البناء

2. **خطأ في API Functions**
   - تأكد من وجود مجلد `functions/api/`
   - تحقق من صحة ملف `ai.js`
   - راجع سجلات Functions

3. **مفاتيح API لا تعمل**
   - استخدم واجهة التطبيق لإدخال المفاتيح
   - تحقق من صحة المفاتيح
   - اختبر المفاتيح قبل الاستخدام

### سجلات الأخطاء

- **Cloudflare Pages**: اذهب إلى إعدادات المشروع > "Functions" > "Logs"
- **التطبيق**: افتح Developer Tools > Console

## 📞 الدعم

للمساعدة في النشر:
- 📧 البريد الإلكتروني: support@lovable.ai
- 💬 Discord: [Lovable Community](https://discord.gg/lovable)
- 🐛 GitHub Issues: [Report a bug](https://github.com/you112ef/open-lovablew/issues)

## 🎉 النتيجة النهائية

بعد النشر، ستحصل على:
- ✅ تطبيق Lovable يعمل على Cloudflare Pages
- ✅ واجهة ضبط API ديناميكية
- ✅ دعم كامل للذكاء الاصطناعي
- ✅ تجربة مستخدم ممتازة
- ✅ أداء عالي وسرعة فائقة

---

**صنع بـ ❤️ بواسطة فريق Lovable**