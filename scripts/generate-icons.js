import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Icon sizes needed for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Simple SVG icon template
const createSVGIcon = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background Circle -->
  <circle cx="256" cy="256" r="240" fill="#36322F" stroke="#FFA500" stroke-width="8"/>
  
  <!-- Fire Icon -->
  <path d="M256 120c-20 0-36 16-36 36 0 12 6 22 14 28-8-4-14-12-14-22 0-16 12-28 28-28 8 0 14 4 18 10 4-6 10-10 18-10 16 0 28 12 28 28 0 10-6 18-14 22 8-6 14-16 14-28 0-20-16-36-36-36z" fill="#FF6B35"/>
  
  <!-- Code Brackets -->
  <path d="M180 200 L140 240 L180 280" stroke="#FFA500" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M332 200 L372 240 L332 280" stroke="#FFA500" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  
  <!-- AI Pattern -->
  <circle cx="220" cy="240" r="8" fill="#FFA500"/>
  <circle cx="256" cy="220" r="8" fill="#FFA500"/>
  <circle cx="292" cy="240" r="8" fill="#FFA500"/>
  <circle cx="256" cy="260" r="8" fill="#FFA500"/>
  
  <!-- Connecting Lines -->
  <line x1="220" y1="240" x2="248" y2="228" stroke="#FFA500" stroke-width="3"/>
  <line x1="264" y1="228" x2="292" y2="240" stroke="#FFA500" stroke-width="3"/>
  <line x1="248" y1="252" x2="220" y2="240" stroke="#FFA500" stroke-width="3"/>
  <line x1="292" y1="240" x2="264" y2="252" stroke="#FFA500" stroke-width="3"/>
  
  <!-- Sandbox -->
  <rect x="200" y="320" width="112" height="80" rx="8" stroke="#FFA500" stroke-width="4" fill="none"/>
  <rect x="210" y="330" width="20" height="20" rx="4" fill="#FF6B35"/>
  <rect x="240" y="330" width="20" height="20" rx="4" fill="#FF6B35"/>
  <rect x="270" y="330" width="20" height="20" rx="4" fill="#FF6B35"/>
  
  <!-- Text -->
  <text x="256" y="440" text-anchor="middle" fill="#FFA500" font-family="Arial, sans-serif" font-size="24" font-weight="bold">OL</text>
</svg>`;

// Create shortcut icons
const createShortcutIcon = (type, size = 96) => {
  const icons = {
    new: `<svg width="${size}" height="${size}" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="96" height="96" rx="16" fill="#36322F"/>
      <path d="M48 24v48M24 48h48" stroke="#FFA500" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
    settings: `<svg width="${size}" height="${size}" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="96" height="96" rx="16" fill="#36322F"/>
      <circle cx="48" cy="48" r="8" fill="#FFA500"/>
      <path d="M48 32v4M48 60v4M32 48h4M60 48h4M38.1 38.1l2.8 2.8M55.1 55.1l2.8 2.8M38.1 57.9l2.8-2.8M55.1 40.9l2.8-2.8" stroke="#FFA500" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  };
  return icons[type] || icons.new;
};

// Ensure directories exist
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

console.log('Generating PWA icons...');

// Generate main app icons
sizes.forEach(size => {
  const svgContent = createSVGIcon(size);
  const filename = `icon-${size}x${size}.svg`;
  fs.writeFileSync(path.join(iconsDir, filename), svgContent);
  console.log(`Generated ${filename}`);
});

// Generate shortcut icons
fs.writeFileSync(path.join(iconsDir, 'shortcut-new.svg'), createShortcutIcon('new'));
fs.writeFileSync(path.join(iconsDir, 'shortcut-settings.svg'), createShortcutIcon('settings'));

console.log('Generated shortcut-new.svg');
console.log('Generated shortcut-settings.svg');

// Create PNG placeholders (in a real scenario, you'd use a proper image conversion library)
// For now, we'll create simple data URLs that browsers can use
const createPNGPlaceholder = (size) => {
  // This creates a simple base64 encoded PNG placeholder
  // In production, you'd want to use proper PNG generation
  return `data:image/svg+xml;base64,${Buffer.from(createSVGIcon(size)).toString('base64')}`;
};

// Generate a simple HTML file to convert SVGs to PNGs
const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <title>Icon Generator</title>
    <style>
        canvas { border: 1px solid #ccc; margin: 10px; }
        .icon-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; padding: 20px; }
    </style>
</head>
<body>
    <h1>PWA Icons</h1>
    <div class="icon-grid">
        ${sizes.map(size => `
            <div>
                <h3>${size}x${size}</h3>
                <img src="./icons/icon-${size}x${size}.svg" width="${size}" height="${size}" alt="Icon ${size}x${size}">
                <canvas id="canvas-${size}" width="${size}" height="${size}"></canvas>
            </div>
        `).join('')}
    </div>
    
    <script>
        // Convert SVG to PNG for each size
        ${sizes.map(size => `
            const img${size} = new Image();
            img${size}.onload = function() {
                const canvas = document.getElementById('canvas-${size}');
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img${size}, 0, 0, ${size}, ${size});
                
                // Convert to blob and create download link
                canvas.toBlob(function(blob) {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'icon-${size}x${size}.png';
                    a.textContent = 'Download PNG';
                    canvas.parentNode.appendChild(a);
                });
            };
            img${size}.src = './icons/icon-${size}x${size}.svg';
        `).join('')}
    </script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, '../public/icon-generator.html'), htmlContent);

console.log('Icon generation complete!');
console.log('Open public/icon-generator.html in your browser to download PNG versions.');
console.log('');
console.log('Generated files:');
sizes.forEach(size => {
  console.log(`- icon-${size}x${size}.svg`);
});
console.log('- shortcut-new.svg');
console.log('- shortcut-settings.svg');
console.log('- icon-generator.html');