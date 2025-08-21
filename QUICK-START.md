# ⚡ بدء سريع - نشر open-lovable22

## 🎯 اختر طريقة النشر:

### الطريقة الأولى: النشر اليدوي (الأسرع)
```
1. اذهب إلى: https://dash.cloudflare.com/pages
2. Create a Project → Connect to Git
3. اختر مستودع: open-lovable22
4. إعدادات البناء:
   - Framework preset: Next.js
   - Build command: npm run build
   - Build output directory: out
5. Save and Deploy
```

### الطريقة الثانية: النشر التلقائي (الأفضل)
```
1. أضف Secrets في GitHub:
   - CLOUDFLARE_API_TOKEN
   - CLOUDFLARE_ACCOUNT_ID
2. ادفع الكود: git push origin main
3. GitHub Actions ينشر تلقائياً
```

## 📋 قائمة التحقق السريعة:

- [ ] `next.config.ts` يحتوي على `output: 'export'`
- [ ] `package.json` يحتوي على `"build": "next build"`
- [ ] جميع الملفات في `public/` موجودة
- [ ] GitHub Secrets مُضافة (للنشر التلقائي)

## 🔗 الروابط المفيدة:

- 📖 [الدليل الشامل](DEPLOY.md)
- 🚀 [Cloudflare Pages](https://dash.cloudflare.com/pages)
- 🔑 [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
- ⚙️ [GitHub Secrets](https://github.com/username/open-lovable22/settings/secrets/actions)

## 🎉 النتيجة:
```
https://open-lovable22.pages.dev
```

---
**💡 نصيحة**: ابدأ بالنشر اليدوي للتعرف على النظام، ثم انتقل للنشر التلقائي!