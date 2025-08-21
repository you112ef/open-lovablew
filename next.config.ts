import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable image optimization for Cloudflare Pages
  images: {
    unoptimized: true
  },
  
  // External packages for Cloudflare Workers compatibility
  experimental: {
    serverComponentsExternalPackages: ['@e2b/code-interpreter']
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
    
    return config;
  }
};

export default nextConfig;