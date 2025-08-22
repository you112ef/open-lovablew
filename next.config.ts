import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration for Cloudflare Pages deployment
  output: 'export',
  trailingSlash: true,
  
  // Fix for Cloudflare Pages static export
  assetPrefix: undefined,
  basePath: '',
  
  // PWA Configuration
  experimental: {
    webpackBuildWorker: true,
  },
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './app/image-loader.js'
  },
  
  // External packages for Cloudflare Workers compatibility  
  serverExternalPackages: ['@e2b/code-interpreter'],
  
  // Ensure proper static export
  distDir: '.next',
  
  // Headers for PWA and security
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  
  // Configure webpack for better compatibility
  webpack: (config: any, { dev, isServer }: any) => {
    // Handle external packages
    config.externals = config.externals || [];
    config.externals.push({
      '@e2b/code-interpreter': '@e2b/code-interpreter'
    });
    
    // Fix for potential module resolution issues
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    // Fix for Tailwind CSS v4 compatibility
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    
    // PWA-specific webpack configuration
    if (!dev && !isServer) {
      // Ensure service worker is properly handled
      config.output.publicPath = '/';
    }
    
    return config;
  }
};

export default nextConfig;