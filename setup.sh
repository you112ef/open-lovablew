#!/bin/bash
# Halifi Cursor Auto Setup – open-lovablew
# كل شيء حقيقي وشغال مباشر مع تحسينات شاملة

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

# دالة لتحديد مدير الحزم
determine_package_manager() {
    if check_command "pnpm"; then
        PACKAGE_MANAGER="pnpm"
        print_status "سيتم استخدام pnpm"
    elif check_command "yarn"; then
        PACKAGE_MANAGER="yarn"
        print_status "سيتم استخدام yarn"
    elif check_command "npm"; then
        PACKAGE_MANAGER="npm"
        print_status "سيتم استخدام npm"
    else
        print_error "لا يوجد مدير حزم متاح! يرجى تثبيت npm أو yarn أو pnpm"
        exit 1
    fi
}

# دالة لاستنساخ المشروع
clone_project() {
    print_step "1️⃣ استنساخ المشروع..."
    
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
    print_step "2️⃣ تثبيت الباكجات..."
    
    print_info "جاري تثبيت الباكجات باستخدام $PACKAGE_MANAGER..."
    
    case $PACKAGE_MANAGER in
        "pnpm")
            pnpm install
            ;;
        "yarn")
            yarn install
            ;;
        "npm")
            npm install
            ;;
    esac
    
    print_success "تم تثبيت جميع الباكجات بنجاح!"
}

# دالة لإعداد المتغيرات البيئية
setup_environment() {
    print_step "3️⃣ إعداد المتغيرات البيئية..."
    
    if [ ! -f ".env.local" ]; then
        if [ -f ".env.example" ]; then
            cp .env.example .env.local
            print_success "تم إنشاء .env.local من .env.example"
        else
            # إنشاء ملف .env.local افتراضي
            cat > .env.local << EOF
# API Keys - أضف مفاتيحك هنا
E2B_API_KEY=your_e2b_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
GROQ_API_KEY=your_groq_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
FIRECRAWL_API_KEY=your_firecrawl_api_key_here

# إعدادات التطبيق
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
            print_success "تم إنشاء .env.local مع القيم الافتراضية"
        fi
        
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
    print_step "5️⃣ بناء المشروع..."
    
    print_info "جاري بناء المشروع..."
    
    case $PACKAGE_MANAGER in
        "pnpm")
            pnpm build
            ;;
        "yarn")
            yarn build
            ;;
        "npm")
            npm run build
            ;;
    esac
    
    print_success "تم بناء المشروع بنجاح!"
}

# دالة لبناء المشروع لـ Cloudflare Pages
build_for_cloudflare() {
    print_step "6️⃣ بناء المشروع لـ Cloudflare Pages..."
    
    print_info "جاري البناء لـ Cloudflare Pages..."
    
    case $PACKAGE_MANAGER in
        "pnpm")
            pnpm run prepare:cloudflare
            ;;
        "yarn")
            yarn prepare:cloudflare
            ;;
        "npm")
            npm run prepare:cloudflare
            ;;
    esac
    
    print_success "تم البناء لـ Cloudflare Pages بنجاح!"
}

# دالة لتشغيل المشروع محلياً
run_dev_server() {
    print_step "7️⃣ تشغيل المشروع محلياً..."
    
    print_info "جاري تشغيل الخادم المحلي على http://localhost:3000"
    print_warning "اضغط Ctrl+C لإيقاف الخادم"
    
    case $PACKAGE_MANAGER in
        "pnpm")
            pnpm dev
            ;;
        "yarn")
            yarn dev
            ;;
        "npm")
            npm run dev
            ;;
    esac
}

# دالة لعرض معلومات النشر
show_deployment_info() {
    print_header "معلومات النشر على Cloudflare Pages"
    
    echo -e "${CYAN}📋 خطوات النشر:${NC}"
    echo "1. اذهب إلى https://dash.cloudflare.com"
    echo "2. اختر Pages > Create a project"
    echo "3. اختر Connect to Git"
    echo "4. اختر مستودع open-lovablew"
    echo "5. إعدادات البناء:"
    echo "   - Framework preset: Next.js"
    echo "   - Build command: $PACKAGE_MANAGER run prepare:cloudflare"
    echo "   - Build output directory: .vercel/output/static"
    echo "   - Root directory: / (فارغ)"
    
    echo -e "\n${YELLOW}🔑 إعداد API Keys:${NC}"
    echo "يمكنك إضافة API Keys من خلال:"
    echo "1. واجهة التطبيق - زر Settings"
    echo "2. متغيرات البيئة في Cloudflare Pages"
    echo "3. ملف .env.local المحلي"
    
    echo -e "\n${GREEN}✅ الميزات المتاحة:${NC}"
    echo "• واجهة Lovable جميلة"
    echo "• إدارة API Keys ديناميكية"
    echo "• جميع الـ routes تعمل مع Node.js runtime"
    echo "• مكتبات native متوافقة"
    echo "• بناء تلقائي مع كل push"
}

# الدالة الرئيسية
main() {
    print_header "بدء الإعداد التلقائي لمشروع open-lovablew"
    
    # التحقق من المتطلبات الأساسية
    check_nodejs
    check_git
    determine_package_manager
    
    # تنفيذ خطوات الإعداد
    clone_project
    install_packages
    setup_environment
    fix_runtime
    build_project
    
    # عرض معلومات النشر
    show_deployment_info
    
    print_success "تم إعداد المشروع بنجاح! 🎉"
    
    # سؤال المستخدم إذا كان يريد تشغيل الخادم المحلي
    echo -e "\n${YELLOW}هل تريد تشغيل الخادم المحلي الآن؟ (y/n)${NC}"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        run_dev_server
    else
        print_info "يمكنك تشغيل الخادم لاحقاً باستخدام: $PACKAGE_MANAGER dev"
    fi
}

# تشغيل الدالة الرئيسية
main "$@"