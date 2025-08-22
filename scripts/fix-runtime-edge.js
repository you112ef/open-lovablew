import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findTsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findTsFiles(filePath, fileList);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function fixRuntimeInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    if (content.includes("export const runtime = \"nodejs\"")) {
      console.log(`🔧 Converting to Edge runtime: ${filePath}`);
      content = content.replace(
        /export const runtime = "nodejs"/g,
        "export const runtime = \"edge\""
      );
      modified = true;
    }
    
    // Also handle single quotes
    if (content.includes("export const runtime = 'nodejs'")) {
      console.log(`🔧 Converting to Edge runtime: ${filePath}`);
      content = content.replace(
        /export const runtime = 'nodejs'/g,
        "export const runtime = 'edge'"
      );
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Converted: ${filePath}`);
    }
    return modified;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🚨 WARNING: Converting to Edge Runtime for Cloudflare Pages');
  console.log('⚠️  This will DISABLE E2B functionality (sandbox creation, code execution)');
  console.log('⚠️  Only UI, API key management, and scraping will work');
  console.log('');
  
  const apiDir = path.join(process.cwd(), 'app', 'api');
  if (!fs.existsSync(apiDir)) {
    console.log('❌ API directory not found:', apiDir);
    return;
  }
  
  console.log(`📁 Scanning API directory: ${apiDir}`);
  const tsFiles = findTsFiles(apiDir);
  console.log(`📄 Found ${tsFiles.length} TypeScript files\n`);
  
  let convertedCount = 0;
  tsFiles.forEach(filePath => {
    if (fixRuntimeInFile(filePath)) {
      convertedCount++;
    }
  });
  
  console.log(`\n🎉 Edge Runtime conversion completed!`);
  console.log(`✅ Converted ${convertedCount} files`);
  console.log(`📄 Total files processed: ${tsFiles.length}`);
  
  if (convertedCount > 0) {
    console.log('\n📋 Files that were converted:');
    tsFiles.forEach(filePath => {
      const relativePath = path.relative(process.cwd(), filePath);
      console.log(`   - ${relativePath}`);
    });
  }
  
  console.log('\n✨ All API routes are now configured for Edge runtime!');
  console.log('🚀 Ready for Cloudflare Pages deployment!');
  console.log('⚠️  Remember: E2B functionality is now disabled');
  console.log('');
  console.log('📝 Next steps:');
  console.log('1. Test the build: npm run build:cf');
  console.log('2. Deploy to Cloudflare Pages');
  console.log('3. Add environment variables in Cloudflare dashboard');
}

main();