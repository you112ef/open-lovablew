import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable SSR/Pages Functions on Cloudflare Pages
  // Remove static export and allow default Next rendering

  // External packages for Node.js compatibility
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

    // Completely disable minification to fix WebpackError issue
    if (config.optimization) {
      config.optimization.minimize = false;
      config.optimization.minimizer = [];
    }

    // Disable any plugins that might cause issues
    if (config.plugins) {
      config.plugins = config.plugins.filter((plugin: any) => {
        const pluginName = plugin.constructor.name;
        return !pluginName.includes('Terser') && 
               !pluginName.includes('Minify') && 
               !pluginName.includes('Optimize');
      });
    }

    return config;
  }
};

export default nextConfig;