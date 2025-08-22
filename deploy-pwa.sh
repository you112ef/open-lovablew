#!/bin/bash

# PWA Deployment Script for Open Lovable
# This script deploys the PWA to a production environment with HTTPS

set -e  # Exit on any error

echo "🚀 Starting PWA Deployment for Open Lovable..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="open-lovable"
BUILD_DIR="out"
DEPLOY_DIR="deploy"
DOMAIN="open-lovable.vercel.app"  # Change this to your domain

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    # Check if git is installed
    if ! command -v git &> /dev/null; then
        print_error "git is not installed. Please install git first."
        exit 1
    fi
    
    print_success "All prerequisites are met!"
}

# Clean previous builds
clean_build() {
    print_status "Cleaning previous builds..."
    
    if [ -d "$BUILD_DIR" ]; then
        rm -rf "$BUILD_DIR"
        print_success "Cleaned previous build directory"
    fi
    
    if [ -d "$DEPLOY_DIR" ]; then
        rm -rf "$DEPLOY_DIR"
        print_success "Cleaned previous deploy directory"
    fi
    
    if [ -d ".next" ]; then
        rm -rf ".next"
        print_success "Cleaned Next.js cache"
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    if [ ! -d "node_modules" ]; then
        npm ci --silent
        print_success "Dependencies installed"
    else
        npm install --silent
        print_success "Dependencies updated"
    fi
}

# Build the application
build_app() {
    print_status "Building PWA application..."
    
    # Run the build
    npm run build
    
    if [ $? -eq 0 ]; then
        print_success "Application built successfully!"
    else
        print_error "Build failed!"
        exit 1
    fi
}

# Validate PWA files
validate_pwa() {
    print_status "Validating PWA files..."
    
    # Check if manifest.json exists
    if [ ! -f "$BUILD_DIR/manifest.json" ]; then
        print_error "manifest.json not found in build directory!"
        exit 1
    fi
    
    # Check if service worker exists
    if [ ! -f "$BUILD_DIR/sw.js" ]; then
        print_error "Service worker (sw.js) not found in build directory!"
        exit 1
    fi
    
    # Check if offline.html exists
    if [ ! -f "$BUILD_DIR/offline.html" ]; then
        print_error "Offline page (offline.html) not found in build directory!"
        exit 1
    fi
    
    # Check if icons directory exists
    if [ ! -d "$BUILD_DIR/icons" ]; then
        print_error "Icons directory not found in build directory!"
        exit 1
    fi
    
    # Check for required icon sizes
    required_icons=("192x192" "512x512")
    for icon_size in "${required_icons[@]}"; do
        if [ ! -f "$BUILD_DIR/icons/icon-${icon_size}.png" ] && [ ! -f "$BUILD_DIR/icons/icon-${icon_size}.svg" ]; then
            print_warning "Icon ${icon_size} not found (PNG or SVG)"
        fi
    done
    
    print_success "PWA files validation completed!"
}

# Create deployment package
create_deployment_package() {
    print_status "Creating deployment package..."
    
    # Create deploy directory
    mkdir -p "$DEPLOY_DIR"
    
    # Copy build files
    cp -r "$BUILD_DIR"/* "$DEPLOY_DIR/"
    
    # Create deployment configuration
    cat > "$DEPLOY_DIR/deploy-config.json" << EOF
{
  "app": "$APP_NAME",
  "version": "$(node -p "require('./package.json').version")",
  "buildTime": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "pwa": {
    "manifest": "manifest.json",
    "serviceWorker": "sw.js",
    "offlinePage": "offline.html",
    "icons": "icons/"
  },
  "deployment": {
    "target": "production",
    "https": true,
    "domain": "$DOMAIN"
  }
}
EOF
    
    print_success "Deployment package created!"
}

# Create deployment instructions
create_deployment_instructions() {
    print_status "Creating deployment instructions..."
    
    cat > "$DEPLOY_DIR/DEPLOYMENT-README.md" << EOF
# 🚀 PWA Deployment Instructions

## 📋 Pre-deployment Checklist

- [ ] HTTPS certificate is configured
- [ ] Domain is pointing to the server
- [ ] Server supports static file hosting
- [ ] CORS headers are configured (if needed)

## 🌐 Server Configuration

### Nginx Configuration Example
\`\`\`nginx
server {
    listen 443 ssl http2;
    server_name $DOMAIN;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    root /var/www/$APP_NAME;
    index index.html;
    
    # PWA specific headers
    location /manifest.json {
        add_header Content-Type application/manifest+json;
        add_header Cache-Control "public, max-age=3600";
    }
    
    location /sw.js {
        add_header Cache-Control "public, max-age=0, must-revalidate";
        add_header Service-Worker-Allowed "/";
    }
    
    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    
    # PWA headers
    add_header X-Web-App-Capable "yes";
    add_header X-Web-App-Status-Bar-Style "default";
}
\`\`\`

### Apache Configuration Example
\`\`\`apache
<VirtualHost *:443>
    ServerName $DOMAIN
    DocumentRoot /var/www/$APP_NAME
    
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    
    # PWA headers
    Header always set X-Web-App-Capable "yes"
    Header always set X-Web-App-Status-Bar-Style "default"
    
    # Security headers
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</VirtualHost>
\`\`\`

## 📁 File Structure
\`\`\`
/var/www/$APP_NAME/
├── index.html
├── manifest.json
├── sw.js
├── offline.html
├── icons/
│   ├── icon-192x192.png
│   ├── icon-512x512.png
│   └── ...
└── _next/
    └── ...
\`\`\`

## 🔧 Post-deployment Steps

1. **Test PWA Installation**
   - Open the app in Chrome
   - Check if install prompt appears
   - Test installation on mobile devices

2. **Verify Service Worker**
   - Open DevTools → Application → Service Workers
   - Ensure service worker is registered and active

3. **Test Offline Functionality**
   - Go offline in DevTools
   - Refresh the page
   - Should show offline page

4. **Lighthouse Audit**
   - Run Lighthouse audit
   - Ensure PWA score is 100/100

## 🚨 Troubleshooting

### Common Issues
- **Service Worker not working**: Check HTTPS and file paths
- **Install prompt not showing**: Verify manifest.json is accessible
- **Offline not working**: Check service worker registration

### Debug Commands
\`\`\`bash
# Check service worker status
curl -I https://$DOMAIN/sw.js

# Validate manifest
curl -I https://$DOMAIN/manifest.json

# Check HTTPS
openssl s_client -connect $DOMAIN:443
\`\`\`

## 📊 Monitoring

### PWA Metrics to Track
- Install conversion rate
- Offline usage
- Service worker performance
- Cache hit rates

### Tools
- Google Analytics
- Lighthouse CI
- Web Vitals
- PWA Builder

---

**Deployment completed at**: $(date)
**Build version**: $(node -p "require('../package.json').version")
**PWA Status**: ✅ Ready for Production
EOF
    
    print_success "Deployment instructions created!"
}

# Create deployment script for different platforms
create_platform_scripts() {
    print_status "Creating platform-specific deployment scripts..."
    
    # Vercel deployment
    cat > "$DEPLOY_DIR/deploy-vercel.sh" << 'EOF'
#!/bin/bash
echo "🚀 Deploying to Vercel..."
vercel --prod
echo "✅ Deployment to Vercel completed!"
EOF
    
    # Netlify deployment
    cat > "$DEPLOY_DIR/deploy-netlify.sh" << 'EOF'
#!/bin/bash
echo "🚀 Deploying to Netlify..."
netlify deploy --prod --dir=.
echo "✅ Deployment to Netlify completed!"
EOF
    
    # Manual deployment
    cat > "$DEPLOY_DIR/deploy-manual.sh" << 'EOF'
#!/bin/bash
echo "🚀 Manual deployment instructions:"
echo "1. Upload all files to your web server"
echo "2. Ensure HTTPS is configured"
echo "3. Test PWA functionality"
echo "4. Run Lighthouse audit"
EOF
    
    # Make scripts executable
    chmod +x "$DEPLOY_DIR"/deploy-*.sh
    
    print_success "Platform-specific scripts created!"
}

# Create health check script
create_health_check() {
    print_status "Creating health check script..."
    
    cat > "$DEPLOY_DIR/health-check.sh" << 'EOF'
#!/bin/bash

DOMAIN="${1:-localhost}"
PROTOCOL="${2:-http}"

echo "🔍 Health check for $PROTOCOL://$DOMAIN"

# Check if domain is accessible
echo "📡 Testing connectivity..."
if curl -s -o /dev/null -w "%{http_code}" "$PROTOCOL://$DOMAIN" | grep -q "200"; then
    echo "✅ Domain is accessible"
else
    echo "❌ Domain is not accessible"
    exit 1
fi

# Check HTTPS (if applicable)
if [ "$PROTOCOL" = "https" ]; then
    echo "🔒 Testing HTTPS..."
    if curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN" | grep -q "200"; then
        echo "✅ HTTPS is working"
    else
        echo "❌ HTTPS is not working"
        exit 1
    fi
fi

# Check PWA files
echo "📱 Testing PWA files..."

# Check manifest
if curl -s -o /dev/null -w "%{http_code}" "$PROTOCOL://$DOMAIN/manifest.json" | grep -q "200"; then
    echo "✅ Manifest is accessible"
else
    echo "❌ Manifest is not accessible"
fi

# Check service worker
if curl -s -o /dev/null -w "%{http_code}" "$PROTOCOL://$DOMAIN/sw.js" | grep -q "200"; then
    echo "✅ Service worker is accessible"
else
    echo "❌ Service worker is not accessible"
fi

# Check offline page
if curl -s -o /dev/null -w "%{http_code}" "$PROTOCOL://$DOMAIN/offline.html" | grep -q "200"; then
    echo "✅ Offline page is accessible"
else
    echo "❌ Offline page is not accessible"
fi

echo "🎉 Health check completed!"
EOF
    
    chmod +x "$DEPLOY_DIR/health-check.sh"
    print_success "Health check script created!"
}

# Main deployment process
main() {
    echo "🎯 Starting PWA deployment process..."
    
    check_prerequisites
    clean_build
    install_dependencies
    build_app
    validate_pwa
    create_deployment_package
    create_deployment_instructions
    create_platform_scripts
    create_health_check
    
    echo ""
    echo "🎉 PWA Deployment Package Created Successfully!"
    echo ""
    echo "📁 Deployment files are in: $DEPLOY_DIR/"
    echo "📋 Read: $DEPLOY_DIR/DEPLOYMENT-README.md"
    echo "🔍 Health check: $DEPLOY_DIR/health-check.sh"
    echo ""
    echo "🚀 Next steps:"
    echo "1. Upload files to your HTTPS server"
    echo "2. Configure server headers"
    echo "3. Test PWA functionality"
    echo "4. Run Lighthouse audit"
    echo ""
    echo "📱 Your PWA is ready for production!"
}

# Run main function
main "$@"