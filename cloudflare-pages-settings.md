# Cloudflare Pages Settings Guide

## Required Build Settings

### Build Command
```
pnpm run build:cloudflare
```

### Publish Directory
```
.vercel/output/static
```

### Environment Variables (if needed)
- `NODE_VERSION`: `18`
- `PNPM_VERSION`: `8`

## Build Configuration

### Root Directory
Leave empty (use project root)

### Framework Preset
- Select "None" (we're using custom build)

### Build Output
The build will generate:
- Static files in `.vercel/output/static`
- Functions in `.vercel/output/functions`

## Important Notes

1. **Lockfile**: The `pnpm-lock.yaml` is now updated and compatible
2. **Functions**: API routes will work via Pages Functions
3. **Static Export**: Disabled to enable dynamic functionality
4. **Build Process**: Uses `next-on-pages` for Cloudflare compatibility

## Troubleshooting

If build fails:
1. Check that `pnpm-lock.yaml` is committed
2. Verify build command uses `pnpm run build:cloudflare`
3. Ensure publish directory is `.vercel/output/static`
4. Check that all dependencies are in `package.json`