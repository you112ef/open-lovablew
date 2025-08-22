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
