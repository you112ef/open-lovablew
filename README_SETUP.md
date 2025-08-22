# 🚀 open-lovablew - دليل الإعداد السريع

## 📋 نظرة عامة

مشروع **open-lovablew** هو تطبيق Next.js متقدم مع واجهة Lovable جميلة، يدعم إدارة API Keys ديناميكية، ويعمل بشكل مثالي على Cloudflare Pages.

## ⚡ الإعداد السريع (30 ثانية)

### الطريقة الأولى: السكربت التلقائي (موصى به)

```bash
# 1. تحميل السكربت
curl -o setup.sh https://raw.githubusercontent.com/you112ef/open-lovablew/main/setup.sh

# 2. جعل السكربت قابل للتنفيذ
chmod +x setup.sh

# 3. تشغيل الإعداد التلقائي
./setup.sh
```

### الطريقة الثانية: الأوامر اليدوية

```bash
# 1. استنساخ المشروع
git clone https://github.com/you112ef/open-lovablew.git
cd open-lovablew

# 2. تثبيت الباكجات
pnpm install

# 3. إصلاح runtime للـ API routes
pnpm run fix:runtime

# 4. بناء المشروع
pnpm build

# 5. تشغيل الخادم المحلي
pnpm dev
```

## 🎯 الميزات الرئيسية

### ✨ واجهة Lovable جميلة
- تصميم عصري وأنيق
- ألوان متناسقة ومريحة للعين
- حركات سلسة مع Framer Motion
- واجهة مستخدم بديهية

### 🔑 إدارة API Keys ديناميكية
- زر Settings في الهيدر
- مودال إعدادات أنيق
- تخزين آمن في localStorage
- تحقق من صحة المفاتيح
- تحذيرات ذكية للمفاتيح المفقودة

### 🚀 توافق كامل مع Cloudflare Pages
- جميع الـ API routes تستخدم Node.js runtime
- مكتبات native متوافقة (@e2b/code-interpreter)
- بناء تلقائي مع كل push
- لا أخطاء "Native module not found"

## 🔧 المتطلبات الأساسية

### إجباري:
- **Node.js** (الإصدار 18 أو أحدث)
- **Git**
- **مدير حزم** (npm, yarn, أو pnpm)

### اختياري:
- **API Keys** (يمكن إضافتها لاحقاً من الواجهة)

## 📦 API Keys المطلوبة

### إجباري:
- **E2B API Key** - للبيئة الافتراضية
  - [احصل عليه من هنا](https://e2b.dev)
- **Anthropic API Key** - لـ Claude AI
  - [احصل عليه من هنا](https://console.anthropic.com)

### اختياري:
- **OpenAI API Key** - لـ GPT models
  - [احصل عليه من هنا](https://platform.openai.com)
- **Groq API Key** - للاستجابة السريعة
  - [احصل عليه من هنا](https://console.groq.com)
- **Google API Key** - لـ Gemini models
  - [احصل عليه من هنا](https://makersuite.google.com)
- **Firecrawl API Key** - لـ web scraping
  - [احصل عليه من هنا](https://firecrawl.dev)

## 🌐 النشر على Cloudflare Pages

### الطريقة السريعة:

1. **ربط المستودع بـ Cloudflare Pages**
   - اذهب إلى [Cloudflare Dashboard](https://dash.cloudflare.com)
   - اختر Pages > Create a project
   - اختر Connect to Git
   - اختر مستودع `open-lovablew`

2. **إعدادات البناء**
   ```
   Framework preset: Next.js
   Build command: pnpm run prepare:cloudflare
   Build output directory: .vercel/output/static
   Root directory: / (فارغ)
   ```

3. **إضافة API Keys** (اختياري)
   - يمكن إضافتها من واجهة التطبيق
   - أو من متغيرات البيئة في Cloudflare Pages

### الطريقة اليدوية:

```bash
# بناء المشروع لـ Cloudflare Pages
pnpm run prepare:cloudflare

# النشر باستخدام Wrangler
pnpm run deploy
```

## 🛠️ أوامر مفيدة

```bash
# تشغيل الخادم المحلي
pnpm dev

# بناء المشروع
pnpm build

# إصلاح runtime للـ API routes
pnpm run fix:runtime

# البناء لـ Cloudflare Pages
pnpm run prepare:cloudflare

# تشغيل الاختبارات
pnpm test:all

# فحص الكود
pnpm lint
```

## 📁 هيكل المشروع

```
open-lovablew/
├── app/
│   ├── api/                 # API routes (21 route)
│   ├── components/          # مكونات React
│   │   ├── SettingsModal.tsx
│   │   ├── SettingsButton.tsx
│   │   └── ApiKeysWarning.tsx
│   ├── globals.css          # الأنماط العامة
│   ├── layout.tsx           # التخطيط الرئيسي
│   └── page.tsx             # الصفحة الرئيسية
├── components/
│   └── ui/                  # مكونات UI الأساسية
├── lib/
│   ├── api-keys.ts          # إدارة API Keys
│   └── hooks/
│       └── useApiKeys.ts    # Hook للـ API Keys
├── scripts/
│   └── fix-runtime.js       # سكربت إصلاح runtime
├── setup.sh                 # سكربت الإعداد التلقائي
└── package.json
```

## 🚨 استكشاف الأخطاء

### مشاكل شائعة:

#### 1. خطأ "Native module not found"
```bash
# الحل: تشغيل سكربت إصلاح runtime
pnpm run fix:runtime
```

#### 2. خطأ في البناء
```bash
# الحل: مسح الكاش وإعادة البناء
rm -rf .next
rm -rf node_modules/.cache
pnpm install
pnpm build
```

#### 3. API Keys لا تعمل
- تأكد من إضافة المفاتيح من واجهة Settings
- تحقق من صحة المفاتيح
- تأكد من وجود اتصال بالإنترنت

#### 4. مشاكل في النشر على Cloudflare Pages
- تأكد من استخدام `pnpm run prepare:cloudflare`
- تحقق من إعدادات البناء
- تأكد من أن جميع الـ routes تستخدم Node.js runtime

## 📚 الوثائق الإضافية

- [دليل النشر على Cloudflare Pages](CLOUDFLARE_DEPLOYMENT.md)
- [دليل إعداد API Keys](API_KEYS_SETUP.md)
- [دليل النشر على Vercel](DEPLOYMENT.md)

## 🤝 المساهمة

نرحب بالمساهمات! يرجى:

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى Branch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT. راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 🆘 الدعم

إذا واجهت أي مشاكل:

1. تحقق من [Issues](https://github.com/you112ef/open-lovablew/issues)
2. ابحث عن حلول في [Discussions](https://github.com/you112ef/open-lovablew/discussions)
3. افتح Issue جديد مع تفاصيل المشكلة

## 🎉 شكراً لك!

شكراً لاستخدام **open-lovablew**! نأمل أن تجد هذا المشروع مفيداً وممتعاً للاستخدام.

---

**⭐ إذا أعجبك المشروع، لا تنس إعطاءه نجمة على GitHub!**