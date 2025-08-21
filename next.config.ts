import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable SSR/Pages Functions on Cloudflare Pages
  // Remove static export and allow default Next rendering

  // External packages for Cloudflare Workers compatibility
  serverExternalPackages: ['@e2b/code-interpreter'],

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
    
    // Client-side fallbacks
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }

    return config;
  }
};

export default nextConfig;