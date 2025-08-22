# ⚡ Quick Copy-Paste Setup for Cloudflare Pages

## 📋 **Repository**
```
https://github.com/you112ef/open-lovablew.git
```

## ⚙️ **Environment Variables**
أضف هذه المتغيرات في **Settings → Environment Variables**:

```env
E2B_API_KEY=your_e2b_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
FIRECRAWL_API_KEY=your_firecrawl_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here
NEXT_PUBLIC_APP_URL=https://your-project.pages.dev
```

## 🏗️ **Build Settings**

### **Build Command:**
```bash
npm install && npm run prepare:cloudflare
```

### **Build Output Directory:**
```
.vercel/output/static
```

### **Framework Preset:**
```
Next.js
```

### **Node.js Version:**
```
18.x
```

## 🔗 **API Keys Links**

| Service | URL |
|---------|-----|
| **E2B** | https://e2b.dev |
| **Anthropic** | https://console.anthropic.com |
| **OpenAI** | https://platform.openai.com |
| **Groq** | https://console.groq.com |
| **Google** | https://makersuite.google.com |
| **Firecrawl** | https://firecrawl.dev |

## 🚀 **Deployment Steps**

1. **Cloudflare Dashboard** → **Pages** → **Create a project**
2. **Connect to Git** → اختر `open-lovablew`
3. **Build settings** (كما هو أعلاه)
4. **Environment Variables** (كما هو أعلاه)
5. **Deploy**

## ✅ **Testing Checklist**

- [ ] الواجهة تظهر بدون أخطاء
- [ ] زر Settings يعمل
- [ ] API Keys تُحفظ في localStorage
- [ ] الـ APIs تستجيب بدون أخطاء
- [ ] لا أخطاء في Console

## 🚨 **Quick Troubleshooting**

### **Native module error:**
```bash
npm install && npm run prepare:cloudflare
```

### **Environment Variables error:**
- تأكد من إضافة في **Production** environment
- تحقق من صحة أسماء المتغيرات

### **Build error:**
- تحقق من **Build logs**
- تأكد من **Node.js 18.x**

## 🎉 **Result**

✅ **مشروع يعمل بالكامل** على Cloudflare Pages
✅ **جميع الـ APIs تعمل** بدون أخطاء
✅ **واجهة Lovable جميلة** ومتجاوبة
✅ **إدارة API Keys ديناميكية** من الواجهة
✅ **نشر تلقائي** مع كل push

---

**🚀 كل شيء جاهز للنسخ واللصق!**