#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively find all TypeScript files in a directory
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

// Function to fix runtime in a file
function fixRuntimeInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Check if file contains Edge runtime
    if (content.includes("export const runtime = \"edge\"")) {
      console.log(`🔧 Fixing runtime in: ${filePath}`);
      content = content.replace(
        /export const runtime = "edge"/g,
        "export const runtime = \"nodejs\""
      );
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
    }
    
    return modified;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main function
function main() {
  console.log('🚀 Starting runtime fix for Cloudflare Pages compatibility...\n');
  
  const apiDir = path.join(process.cwd(), 'app', 'api');
  
  if (!fs.existsSync(apiDir)) {
    console.log('❌ API directory not found:', apiDir);
    return;
  }
  
  console.log(`📁 Scanning API directory: ${apiDir}`);
  
  const tsFiles = findTsFiles(apiDir);
  console.log(`📄 Found ${tsFiles.length} TypeScript files\n`);
  
  let fixedCount = 0;
  
  tsFiles.forEach(filePath => {
    if (fixRuntimeInFile(filePath)) {
      fixedCount++;
    }
  });
  
  console.log(`\n🎉 Runtime fix completed!`);
  console.log(`✅ Fixed ${fixedCount} files`);
  console.log(`📄 Total files processed: ${tsFiles.length}`);
  
  if (fixedCount > 0) {
    console.log('\n📋 Files that were modified:');
    tsFiles.forEach(filePath => {
      const relativePath = path.relative(process.cwd(), filePath);
      console.log(`   - ${relativePath}`);
    });
  }
  
  console.log('\n✨ All API routes are now configured for Node.js runtime!');
  console.log('🚀 Ready for Cloudflare Pages deployment!');
}

// Run the script
main();