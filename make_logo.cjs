const fs = require('fs');
const sharp = require('sharp');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="200" viewBox="0 0 600 200">
  <!-- Pure White Background -->
  <rect width="600" height="200" fill="#FFFFFF"/>
  
  <!-- Luxury Gold Geometric Emblem -->
  <g transform="translate(300, 42)">
    <path d="M0 -14 L12 0 L0 14 L-12 0 Z" fill="#A8875A"/>
    <circle cx="0" cy="0" r="4" fill="#171717"/>
    <line x1="-120" y1="0" x2="-25" y2="0" stroke="#A8875A" stroke-width="1.5"/>
    <line x1="25" y1="0" x2="120" y2="0" stroke="#A8875A" stroke-width="1.5"/>
  </g>
  
  <!-- Main Title: GALAXY -->
  <text x="300" y="108" font-family="'Cormorant Garamond', 'Georgia', serif" font-size="52" font-weight="bold" fill="#171717" text-anchor="middle" letter-spacing="8">GALAXY</text>
  
  <!-- Subtitle: GRANITES -->
  <text x="300" y="148" font-family="'Manrope', 'Helvetica', sans-serif" font-size="16" font-weight="bold" fill="#A8875A" text-anchor="middle" letter-spacing="14">GRANITES</text>
  
  <!-- Showroom Subtext -->
  <text x="300" y="172" font-family="'Manrope', 'Helvetica', sans-serif" font-size="10" font-weight="600" fill="#777777" text-anchor="middle" letter-spacing="4">MUKKAM • KOZHIKODE</text>
</svg>`;

fs.writeFileSync('public/images/galaxy_granites_logo.svg', svgContent);

sharp(Buffer.from(svgContent))
    .png()
    .toFile('public/images/galaxy_granites_logo.png')
    .then(() => console.log('Successfully created public/images/galaxy_granites_logo.png and SVG!'))
    .catch((err) => console.error(err));
