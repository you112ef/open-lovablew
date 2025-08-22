import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Configuration for Cloudflare Pages with @cloudflare/next-on-pages
  experimental: {
    serverComponentsExternalPackages: ['@e2b/code-interpreter']
  },
  // Image optimization disabled for Cloudflare Pages
  images: {
    unoptimized: true
  },
  // Ensure API routes work with Cloudflare Workers runtime
  webpack: (config: any, { isServer }: any) => {
    // Handle external packages for Edge runtime
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
    
    return config;
  }
};

export default nextConfig;