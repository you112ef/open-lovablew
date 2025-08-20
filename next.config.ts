import type { NextConfig } from "next";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration for Cloudflare Pages deployment
  output: 'export',
  trailingSlash: true,
  
  // Fix for Cloudflare Pages static export
  assetPrefix: undefined,
  basePath: '',
  
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
    
    return config;
  },
  
  // Experimental features for better compatibility
  experimental: {
    esmExternals: 'loose'
  }
};

export default nextConfig;