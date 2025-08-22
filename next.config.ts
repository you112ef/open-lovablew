import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable SSR/Pages Functions on Cloudflare Pages
  // Remove static export and allow default Next rendering

  // External packages for Cloudflare Pages compatibility
  serverExternalPackages: ['@e2b/code-interpreter'],

  // Configure webpack for better compatibility
  webpack: (config: any, { dev, isServer }: any) => {
    // Handle external packages for Node.js runtime
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        '@e2b/code-interpreter': 'commonjs @e2b/code-interpreter'
      });
    }
    
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

    // Enable production optimization for better performance
    if (config.optimization && !dev) {
      config.optimization.minimize = true;
      // Keep minimizer configuration for production builds
    }

    // Keep optimization plugins for production builds
    if (config.plugins && !dev) {
      // Allow optimization plugins in production
    }

    // Suppress warnings
    config.stats = {
      warnings: false
    };
    
    return config;
  }
};

export default nextConfig;