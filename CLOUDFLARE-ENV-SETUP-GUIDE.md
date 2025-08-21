# دليل إعداد متغيرات البيئة - Cloudflare Pages

## 🔑 المتغيرات المطلوبة والاختيارية

### ✅ **متغيرات مطلوبة (REQUIRED)**

#### 1. **E2B_API_KEY** - للبيئات التطويرية
```
المصدر: https://e2b.dev
الوصف: يستخدم لإنشاء بيئات تطوير معزولة لتشغيل الكود
الأهمية: أساسي لتشغيل وتطبيق الكود المُولد من AI
```

#### 2. **FIRECRAWL_API_KEY** - لاستخراج المواقع
```
المصدر: https://firecrawl.dev  
الوصف: يستخدم لاستخراج محتوى المواقع عند النسخ
الأهمية: مطلوب لميزة نسخ المواقع
```

### 🤖 **AI Providers (مطلوب واحد على الأقل)**

#### 3. **GROQ_API_KEY** - أسرع معالجة
```
المصدر: https://console.groq.com
الوصف: معالج AI سريع جداً للردود الفورية
التكلفة: مجاني (حدود معقولة)
الأولوية: مُوصى به كخيار أول
```

#### 4. **ANTHROPIC_API_KEY** - الأفضل في الكود
```
المصدر: https://console.anthropic.com
الوصف: Claude - ممتاز في كتابة الكود وفهم السياق
التكلفة: مدفوع (عالي الجودة)
الأولوية: للمشاريع المتقدمة
```

#### 5. **OPENAI_API_KEY** - الأكثر شهرة  
```
المصدر: https://platform.openai.com
الوصف: GPT-4/GPT-5 - متعدد الاستخدامات
التكلفة: مدفوع (متوسط)
الأولوية: خيار جيد ومألوف
```

#### 6. **GEMINI_API_KEY** - من Google
```
المصدر: https://aistudio.google.com/app/apikey
الوصف: نموذج Google Gemini
التكلفة: مجاني/مدفوع
الأولوية: بديل جيد
```

### ⚙️ **متغيرات اختيارية**

#### 7. **ANTHROPIC_BASE_URL** - خادم مخصص
```
القيمة الافتراضية: https://api.anthropic.com/v1
الاستخدام: لاستخدام خادم Anthropic مخصص
```

#### 8. **OPENAI_BASE_URL** - خادم مخصص
```
القيمة الافتراضية: https://api.openai.com/v1
الاستخدام: لاستخدام خادم OpenAI مخصص أو Azure
```

#### 9. **NEXT_PUBLIC_APP_URL** - رابط التطبيق
```
القيمة المطلوبة: https://your-app-name.pages.dev
الاستخدام: للAPI calls داخلياً (سيتم تحديده تلقائياً)
```

---

## 🚀 خطوات الإعداد في Cloudflare Pages

### الطريقة 1: من لوحة التحكم (Dashboard)

1. **ادخل إلى Cloudflare Pages**
   - اذهب إلى https://pages.cloudflare.com
   - اختر مشروعك

2. **اذهب إلى الإعدادات**
   - اضغط على **Settings** 
   - اختر **Environment Variables**

3. **أضف المتغيرات**
   - اضغط **Add variable**
   - أدخل اسم المتغير والقيمة
   - اختر البيئة: **Production** و **Preview**

### الطريقة 2: من wrangler CLI

```bash
# تثبيت wrangler
npm install -g @cloudflare/wrangler

# تسجيل الدخول
wrangler login

# إضافة متغير واحد
wrangler pages secret put E2B_API_KEY

# إضافة عدة متغيرات من ملف
wrangler pages secret bulk --file .env.production
```

---

## 🔐 كيفية الحصول على كل API Key

### 1. **E2B API Key**
```
1. اذهب إلى: https://e2b.dev
2. أنشئ حساب مجاني  
3. في Dashboard > API Keys
4. اضغط "Generate New Key"
5. انسخ المفتاح (يبدأ بـ e2b_)
```

### 2. **Firecrawl API Key** 
```
1. اذهب إلى: https://firecrawl.dev
2. سجل دخول/أنشئ حساب
3. في Dashboard > API Keys  
4. انسخ Default API Key
5. (يبدأ بـ fc-)
```

### 3. **Groq API Key** (مُوصى)
```
1. اذهب إلى: https://console.groq.com
2. أنشئ حساب مجاني
3. اذهب إلى API Keys
4. اضغط "Create API Key" 
5. أدخل اسم واضغط Submit
6. انسخ المفتاح (يبدأ بـ gsk_)
```

### 4. **Anthropic API Key**
```
1. اذهب إلى: https://console.anthropic.com
2. أنشئ حساب (يحتاج بطاقة ائتمان)
3. اذهب إلى API Keys
4. اضغط "Create Key"
5. انسخ المفتاح (يبدأ بـ sk-ant-)
```

### 5. **OpenAI API Key**
```
1. اذهب إلى: https://platform.openai.com
2. سجل دخول لحسابك
3. اذهب إلى API keys
4. اضغط "Create new secret key"
5. أدخل اسم للمفتاح
6. انسخ المفتاح (يبدأ بـ sk-)
```

### 6. **Google Gemini API Key**
```
1. اذهب إلى: https://aistudio.google.com
2. سجل دخول بحساب Google
3. اضغط "Get API Key" 
4. اختر مشروع أو أنشئ جديد
5. انسخ API Key (يبدأ بـ AIza)
```

---

## 📋 قائمة تحقق سريع

### الحد الأدنى للتشغيل:
- [ ] **E2B_API_KEY** ✅ مطلوب
- [ ] **FIRECRAWL_API_KEY** ✅ مطلوب  
- [ ] **GROQ_API_KEY** ✅ مُوصى (مجاني وسريع)

### للمشاريع المتقدمة:
- [ ] **ANTHROPIC_API_KEY** ⭐ أفضل جودة كود
- [ ] **OPENAI_API_KEY** ⭐ متعدد الاستخدامات
- [ ] **GEMINI_API_KEY** ⭐ بديل جيد

---

## ⚡ نصائح مهمة

### 🔒 **الأمان**
- لا تشارك API Keys أبداً في الكود
- استخدم Environment Variables فقط
- احذف المفاتيح غير المستخدمة

### 💰 **التكلفة**
- **مجاني**: E2B, Groq, Google Gemini (حدود)
- **مدفوع**: Anthropic, OpenAI, Firecrawl 
- ابدأ بالخيارات المجانية للاختبار

### 🎯 **الأداء**
- **أسرع**: Groq → يستحسن للتطوير
- **أذكى**: Anthropic → للمشاريع المتقدمة  
- **متوازن**: OpenAI → لمعظم الحالات

### 🔄 **النشر**
```bash
# بعد إضافة المتغيرات، أعد النشر
wrangler pages deploy out
# أو من Dashboard: اضغط "Retry deployment"
```

---

## 🎉 جاهز للنشر!

بمجرد إضافة المتغيرات المطلوبة، ستكون جاهز لنشر تطبيقك على Cloudflare Pages بنجاح! 

استخدم الحد الأدنى (E2B + Firecrawl + Groq) للبداية، ثم أضف المزيد حسب الحاجة.