#!/bin/bash

# Cloudflare Pages Setup Script for Open Lovable

echo "🚀 Setting up Cloudflare Pages deployment for Open Lovable..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install required dependencies
echo "📦 Installing Cloudflare dependencies..."
npm install @cloudflare/next-on-pages @cloudflare/workers-types wrangler --save-dev

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Backup current next.config.ts if it exists
if [ -f "next.config.ts" ]; then
    echo "📋 Backing up current next.config.ts to next.config.backup.ts"
    cp next.config.ts next.config.backup.ts
fi

# Use Cloudflare-compatible Next.js config
echo "⚙️ Setting up Next.js configuration for Cloudflare..."
if [ -f "next.config.cloudflare.ts" ]; then
    cp next.config.cloudflare.ts next.config.ts
    echo "✅ Next.js configuration updated for Cloudflare Pages"
else
    echo "❌ next.config.cloudflare.ts not found"
fi

# Create .dev.vars if it doesn't exist
if [ ! -f ".dev.vars" ]; then
    echo "🔑 Creating .dev.vars from template..."
    if [ -f ".dev.vars.example" ]; then
        cp .dev.vars.example .dev.vars
        echo "✅ .dev.vars created. Please fill in your API keys."
    else
        echo "❌ .dev.vars.example not found"
    fi
else
    echo "ℹ️ .dev.vars already exists, skipping..."
fi

# Add .dev.vars to .gitignore if not already there
if [ -f ".gitignore" ]; then
    if ! grep -q ".dev.vars" .gitignore; then
        echo ".dev.vars" >> .gitignore
        echo "✅ Added .dev.vars to .gitignore"
    fi
else
    echo ".dev.vars" > .gitignore
    echo "✅ Created .gitignore with .dev.vars"
fi

echo ""
echo "🎉 Cloudflare Pages setup completed!"
echo ""
echo "Next steps:"
echo "1. Fill in your API keys in .dev.vars"
echo "2. Add the following scripts to your package.json:"
echo "   - \"build:cf\": \"next-on-pages\""
echo "   - \"deploy\": \"wrangler pages deploy .vercel/output/static --compatibility-date=2024-08-20\""
echo "   - \"preview\": \"wrangler pages dev .vercel/output/static --compatibility-date=2024-08-20\""
echo "3. Update your build script to: \"next build && next-on-pages\""
echo "4. Read cloudflare-setup-instructions.md for detailed deployment steps"
echo ""
echo "To test locally: npm run build && npm run preview"
echo "To deploy: npm run build && npm run deploy"