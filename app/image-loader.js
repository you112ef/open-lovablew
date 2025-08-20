// Custom image loader for Cloudflare Pages static export
export default function cloudflareLoader({ src, width, quality }) {
  // For external images, return as-is
  if (src.startsWith('http')) {
    return src;
  }
  
  // For local images in static export, ensure proper path
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  
  return normalizedSrc;
}