#!/bin/bash

# Quick Deploy Script for Open Lovable PWA
# This script provides multiple deployment options

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
APP_NAME="open-lovable"
DOMAIN="open-lovable.vercel.app"

print_header() {
    echo -e "${BLUE}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                    Open Lovable PWA                         ║"
    echo "║                    Quick Deploy Script                       ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

print_menu() {
    echo -e "${YELLOW}Choose deployment method:${NC}"
    echo "1. Docker (Recommended for production)"
    echo "2. Manual server deployment"
    echo "3. Vercel deployment"
    echo "4. Netlify deployment"
    echo "5. Test PWA locally"
    echo "6. Health check"
    echo "7. Exit"
    echo ""
}

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

# Docker deployment
deploy_docker() {
    print_status "Deploying with Docker..."
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        return 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        return 1
    fi
    
    # Create necessary directories
    mkdir -p logs ssl
    
    # Build and start services
    docker-compose up -d --build
    
    print_success "Docker deployment completed!"
    print_status "Your PWA is available at:"
    echo "  - HTTP:  http://localhost"
    echo "  - HTTPS: https://localhost"
    echo ""
    print_status "To stop: docker-compose down"
    print_status "To view logs: docker-compose logs -f"
}

# Manual server deployment
deploy_manual() {
    print_status "Manual server deployment..."
    
    echo ""
    echo "📋 Manual Deployment Steps:"
    echo "1. Upload all files from the 'deploy' directory to your web server"
    echo "2. Ensure your server supports HTTPS"
    echo "3. Configure your web server (Nginx/Apache)"
    echo "4. Set up SSL certificates"
    echo "5. Test PWA functionality"
    echo ""
    
    print_status "Configuration files available:"
    echo "  - nginx-pwa.conf (Nginx configuration)"
    echo "  - apache-pwa.conf (Apache configuration)"
    echo "  - DEPLOYMENT-README.md (Detailed instructions)"
    echo ""
    
    print_warning "Remember to update domain names in configuration files!"
}

# Vercel deployment
deploy_vercel() {
    print_status "Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        print_error "Vercel CLI is not installed. Installing..."
        npm install -g vercel
    fi
    
    # Deploy to Vercel
    vercel --prod
    
    print_success "Vercel deployment completed!"
    print_status "Your PWA is now live on Vercel!"
}

# Netlify deployment
deploy_netlify() {
    print_status "Deploying to Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        print_error "Netlify CLI is not installed. Installing..."
        npm install -g netlify-cli
    fi
    
    # Deploy to Netlify
    netlify deploy --prod --dir=.
    
    print_success "Netlify deployment completed!"
    print_status "Your PWA is now live on Netlify!"
}

# Test PWA locally
test_pwa() {
    print_status "Testing PWA locally..."
    
    # Check if serve is installed
    if ! command -v serve &> /dev/null; then
        print_status "Installing serve..."
        npm install -g serve
    fi
    
    # Start local server
    print_status "Starting local server..."
    print_status "Your PWA is available at: http://localhost:3000"
    print_status "Press Ctrl+C to stop"
    
    serve -s . -l 3000
}

# Health check
health_check() {
    print_status "Running health check..."
    
    if [ -f "health-check.sh" ]; then
        chmod +x health-check.sh
        ./health-check.sh localhost http
    else
        print_error "Health check script not found!"
    fi
}

# Main function
main() {
    print_header
    
    while true; do
        print_menu
        read -p "Enter your choice (1-7): " choice
        
        case $choice in
            1)
                deploy_docker
                ;;
            2)
                deploy_manual
                ;;
            3)
                deploy_vercel
                ;;
            4)
                deploy_netlify
                ;;
            5)
                test_pwa
                ;;
            6)
                health_check
                ;;
            7)
                print_success "Goodbye!"
                exit 0
                ;;
            *)
                print_error "Invalid choice. Please enter a number between 1-7."
                ;;
        esac
        
        echo ""
        read -p "Press Enter to continue..."
        echo ""
    done
}

# Check if script is run from deploy directory
if [ ! -f "nginx-pwa.conf" ]; then
    print_error "Please run this script from the deploy directory!"
    exit 1
fi

# Run main function
main "$@"