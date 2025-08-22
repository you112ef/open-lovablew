#!/bin/bash
# ⚡ Cursor Auto Setup – Open-LovableW
# كل شيء حقيقي وشغال مباشر على Cloudflare Pages

set -e  # إيقاف السكربت عند حدوث خطأ

# ألوان للطباعة
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# دالة للطباعة الملونة
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}🎉 $1${NC}"
}

print_header() {
    echo -e "${PURPLE}🚀 $1${NC}"
}

print_step() {
    echo -e "${CYAN}📋 $1${NC}"
}

print_command() {
    echo -e "${YELLOW}💻 $1${NC}"
}

# دالة للتحقق من وجود الأمر
check_command() {
    if command -v "$1" &> /dev/null; then
        return 0
    else
        return 1
    fi
}

# دالة للتحقق من وجود Node.js
check_nodejs() {
    if check_command "node"; then
        NODE_VERSION=$(node --version)
        print_status "Node.js موجود: $NODE_VERSION"
        return 0
    else
        print_error "Node.js غير موجود! يرجى تثبيته أولاً."
        print_info "يمكنك تحميله من: https://nodejs.org/"
        exit 1
    fi
}

# دالة للتحقق من وجود Git
check_git() {
    if check_command "git"; then
        GIT_VERSION=$(git --version)
        print_status "Git موجود: $GIT_VERSION"
        return 0
    else
        print_error "Git غير موجود! يرجى تثبيته أولاً."
        exit 1
    fi
}

# دالة للتحقق من وجود Wrangler
check_wrangler() {
    if check_command "wrangler"; then
        print_status "Wrangler موجود"
        return 0
    else
        print_warning "Wrangler غير موجود. جاري التثبيت..."
        npm install -g wrangler
        print_success "تم تثبيت Wrangler"
        return 0
    fi
}

# دالة لاستنساخ المشروع
clone_project() {
    print_step "1️⃣ ربط المشروع تلقائيًا..."
    
    if [ ! -d "open-lovablew" ]; then
        print_info "جاري استنساخ المشروع من GitHub..."
        git clone https://github.com/you112ef/open-lovablew.git
        print_success "تم استنساخ المشروع بنجاح!"
    else
        print_warning "المجلد موجود بالفعل. جاري التحديث..."
        cd open-lovablew
        git pull origin main
        print_success "تم تحديث المشروع!"
        return
    fi
    
    cd open-lovablew || exit
}

# دالة لتثبيت الباكجات
install_packages() {
    print_step "2️⃣ تثبيت الحزم المطلوبة..."
    
    print_info "جاري تثبيت الباكجات..."
    npm install
    
    print_success "تم تثبيت جميع الباكجات بنجاح!"
}

# دالة لإعداد المتغيرات البيئية
setup_environment() {
    print_step "3️⃣ إعداد المتغيرات البيئية..."
    
    if [ ! -f ".env.local" ]; then
        print_info "جاري إنشاء ملف .env.local..."
        
        cat > .env.local << 'EOF'
# API Keys - أضف مفاتيحك هنا
E2B_API_KEY=ضع_مفتاح_e2b_هنا
ANTHROPIC_API_KEY=ضع_مفتاح_anthropic_هنا
OPENAI_API_KEY=ضع_مفتاح_openai_هنا
GROQ_API_KEY=ضع_مفتاح_groq_هنا
GOOGLE_API_KEY=ضع_مفتاح_google_هنا
FIRECRAWL_API_KEY=ضع_مفتاح_firecrawl_هنا

# إعدادات التطبيق
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
        
        print_success "تم إنشاء ملف .env.local"
        print_warning "⚠️  يرجى تعديل ملف .env.local وإضافة مفاتيح API الخاصة بك"
        print_info "يمكنك الحصول على المفاتيح من:"
        print_info "  - E2B: https://e2b.dev"
        print_info "  - Anthropic: https://console.anthropic.com"
        print_info "  - OpenAI: https://platform.openai.com"
        print_info "  - Groq: https://console.groq.com"
        print_info "  - Google: https://makersuite.google.com"
        print_info "  - Firecrawl: https://firecrawl.dev"
    else
        print_status "ملف .env.local موجود بالفعل"
    fi
}

# دالة لإصلاح runtime للـ API routes
fix_runtime() {
    print_step "4️⃣ إصلاح runtime للـ API routes..."
    
    if [ -f "scripts/fix-runtime.js" ]; then
        print_info "جاري تشغيل سكربت إصلاح runtime..."
        node scripts/fix-runtime.js
        print_success "تم إصلاح runtime لجميع الـ API routes!"
    else
        print_warning "سكربت إصلاح runtime غير موجود"
    fi
}

# دالة لبناء المشروع
build_project() {
    print_step "5️⃣ البناء والتشغيل محليًا..."
    
    print_info "جاري بناء المشروع..."
    npm run build
    
    print_success "تم بناء المشروع بنجاح!"
}

# دالة لتشغيل المشروع محلياً
run_dev_server() {
    print_step "6️⃣ تشغيل المشروع محلياً..."
    
    print_info "جاري تشغيل الخادم المحلي على http://localhost:3000"
    print_warning "اضغط Ctrl+C لإيقاف الخادم"
    
    npm run dev
}

# دالة لإعداد Cloudflare Pages
setup_cloudflare() {
    print_step "7️⃣ إعداد Cloudflare Pages..."
    
    print_info "جاري التحقق من Wrangler..."
    check_wrangler
    
    print_info "جاري تسجيل الدخول إلى Cloudflare..."
    print_warning "سيطلب منك تسجيل الدخول إلى حساب Cloudflare"
    wrangler login
    
    print_info "جاري إنشاء مشروع Cloudflare Pages..."
    wrangler pages project create open-lovablew --yes
    
    print_success "تم إعداد Cloudflare Pages بنجاح!"
}

# دالة لنشر المشروع
deploy_project() {
    print_step "8️⃣ نشر على Cloudflare Pages..."
    
    print_info "جاري البناء لـ Cloudflare Pages..."
    npm run prepare:cloudflare
    
    print_info "جاري النشر التلقائي..."
    wrangler pages publish . --branch main --yes
    
    print_success "تم النشر بنجاح على Cloudflare Pages!"
}

# دالة لعرض معلومات النشر
show_deployment_info() {
    print_header "معلومات النشر والاستخدام"
    
    echo -e "${CYAN}🌐 الروابط:${NC}"
    echo "• المحلي: http://localhost:3000"
    echo "• Cloudflare Pages: سيظهر بعد النشر"
    
    echo -e "\n${YELLOW}🔑 إعداد API Keys:${NC}"
    echo "1. عدّل ملف .env.local"
    echo "2. أضف مفاتيح API الخاصة بك"
    echo "3. أعد النشر: npm run build && wrangler pages publish ."
    
    echo -e "\n${GREEN}✅ الميزات المتاحة:${NC}"
    echo "• واجهة Lovable جميلة"
    echo "• إدارة API Keys ديناميكية"
    echo "• جميع الـ routes تعمل مع Node.js runtime"
    echo "• مكتبات native متوافقة"
    echo "• نشر تلقائي مع كل push"
    
    echo -e "\n${BLUE}📋 أوامر مفيدة:${NC}"
    echo "• تشغيل محلي: npm run dev"
    echo "• بناء المشروع: npm run build"
    echo "• إصلاح runtime: npm run fix:runtime"
    echo "• نشر: wrangler pages publish ."
    echo "• تحديث: git pull && npm install"
}

# دالة لعرض قائمة الخيارات
show_menu() {
    echo -e "\n${PURPLE}🎯 اختر ما تريد القيام به:${NC}"
    echo "1) إعداد كامل (استنساخ + تثبيت + بناء + نشر)"
    echo "2) إعداد بدون نشر (محلي فقط)"
    echo "3) تشغيل الخادم المحلي"
    echo "4) نشر على Cloudflare Pages"
    echo "5) إصلاح runtime فقط"
    echo "6) عرض معلومات النشر"
    echo "7) خروج"
    
    echo -e "\n${YELLOW}اختر رقم (1-7):${NC}"
    read -r choice
    
    case $choice in
        1)
            full_setup
            ;;
        2)
            local_setup
            ;;
        3)
            run_dev_server
            ;;
        4)
            deploy_project
            ;;
        5)
            fix_runtime
            ;;
        6)
            show_deployment_info
            ;;
        7)
            print_success "شكراً لاستخدام السكربت! 👋"
            exit 0
            ;;
        *)
            print_error "اختيار غير صحيح. يرجى المحاولة مرة أخرى."
            show_menu
            ;;
    esac
}

# دالة الإعداد الكامل
full_setup() {
    print_header "بدء الإعداد الكامل"
    
    # التحقق من المتطلبات الأساسية
    check_nodejs
    check_git
    
    # تنفيذ خطوات الإعداد
    clone_project
    install_packages
    setup_environment
    fix_runtime
    build_project
    setup_cloudflare
    deploy_project
    
    # عرض معلومات النشر
    show_deployment_info
    
    print_success "تم الإعداد الكامل بنجاح! 🎉"
}

# دالة الإعداد المحلي
local_setup() {
    print_header "بدء الإعداد المحلي"
    
    # التحقق من المتطلبات الأساسية
    check_nodejs
    check_git
    
    # تنفيذ خطوات الإعداد
    clone_project
    install_packages
    setup_environment
    fix_runtime
    build_project
    
    # عرض معلومات النشر
    show_deployment_info
    
    print_success "تم الإعداد المحلي بنجاح! 🎉"
    
    # سؤال المستخدم إذا كان يريد تشغيل الخادم المحلي
    echo -e "\n${YELLOW}هل تريد تشغيل الخادم المحلي الآن؟ (y/n)${NC}"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        run_dev_server
    else
        print_info "يمكنك تشغيل الخادم لاحقاً باستخدام: npm run dev"
    fi
}

# الدالة الرئيسية
main() {
    print_header "⚡ Cursor Auto Setup – Open-LovableW"
    print_info "كل شيء حقيقي وشغال مباشر على Cloudflare Pages"
    
    # التحقق من المتطلبات الأساسية
    check_nodejs
    check_git
    
    # عرض القائمة
    show_menu
}

# تشغيل الدالة الرئيسية
main "$@"