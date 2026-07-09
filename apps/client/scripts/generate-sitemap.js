import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');

// Mapped site structures
const domains = 'https://alltooldeck.netlify.app';
const currentDate = new Date().toISOString().split('T')[0];
const defaultPreviewImage = 'https://res.cloudinary.com/dz0xmodpo/image/upload/v1783541482/logo_kprqro.png';

const urls = [
  // Core routes
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/privacy', changefreq: 'monthly', priority: '0.3' },
  { loc: '/terms', changefreq: 'monthly', priority: '0.3' },
  { loc: '/sitemap', changefreq: 'monthly', priority: '0.4' },
  
  // Category landing pages
  { loc: '/pdf', changefreq: 'weekly', priority: '0.8', isCategory: true },
  { loc: '/image', changefreq: 'weekly', priority: '0.8', isCategory: true },
  { loc: '/text', changefreq: 'weekly', priority: '0.8', isCategory: true },
  { loc: '/security', changefreq: 'weekly', priority: '0.8', isCategory: true },
  { loc: '/developer', changefreq: 'weekly', priority: '0.8', isCategory: true },
  { loc: '/ai', changefreq: 'weekly', priority: '0.8', isCategory: true },
  { loc: '/qr-barcode', changefreq: 'weekly', priority: '0.8', isCategory: true },
  { loc: '/calculators', changefreq: 'weekly', priority: '0.8', isCategory: true },

  // PDF tools
  { loc: '/pdf/merge', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'PDF Merger' },
  { loc: '/pdf/split', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Split PDF' },
  { loc: '/pdf/compress', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Compress PDF' },
  { loc: '/pdf/rotate', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Rotate PDF' },
  { loc: '/pdf/to-jpg', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'PDF to JPG' },
  { loc: '/pdf/from-jpg', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'JPG to PDF' },
  { loc: '/pdf/protect', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Protect PDF' },
  { loc: '/pdf/unlock', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Unlock PDF' },
  { loc: '/pdf/to-word', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'PDF to Word' },
  { loc: '/pdf/from-word', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Word to PDF' },

  // Image tools
  { loc: '/image/convert', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Image Converter' },
  { loc: '/image/resize', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Resize Image' },
  { loc: '/image/compress', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Compress Image' },
  { loc: '/image/crop', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Crop Image' },
  { loc: '/image/rotate', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Rotate Image' },
  { loc: '/image/background-remover', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Background Remover' },
  { loc: '/image/to-pdf', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Image to PDF' },

  // Text tools
  { loc: '/text/word-counter', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Word Counter' },
  { loc: '/text/json-formatter', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'JSON Formatter' },
  { loc: '/text/case-converter', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Case Converter' },
  { loc: '/text/remove-spaces', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Remove Extra Spaces' },
  { loc: '/text/remove-duplicates', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Remove Duplicate Lines' },
  { loc: '/text/reverse', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Reverse Text' },
  { loc: '/text/sort', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Sort Lines' },
  { loc: '/text/slug-generator', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Slug Generator' },
  { loc: '/text/lorem-ipsum', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Lorem Ipsum Generator' },
  { loc: '/text/difference', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Text Difference Checker' },

  // Security tools
  { loc: '/security/password-generator', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Password Generator' },
  { loc: '/security/password-strength', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Password Strength' },
  { loc: '/security/base64', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'Base64 Converter' },
  { loc: '/security/sha256', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'SHA256 Hash' },
  { loc: '/security/md5', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'MD5 Hash' },
  { loc: '/security/url', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'URL Encoder' },
  { loc: '/security/jwt', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'JWT Decoder' },
  { loc: '/security/qr-generator', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'QR Code Generator' },
  { loc: '/security/qr-scanner', changefreq: 'monthly', priority: '0.7', isTool: true, name: 'QR Code Scanner' },

  // Blog pages
  { loc: '/blog', changefreq: 'weekly', priority: '0.8' },
  { loc: '/blog/why-browser-based-tools-are-safer', changefreq: 'monthly', priority: '0.6' }
];

const compileUrlNode = (url) => {
  let node = `  <url>
    <loc>${domains}${url.loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>`;

  // Injects Image Sitemap schema nodes for tools and categories
  if (url.isTool || url.isCategory) {
    node += `\n    <image:image>
      <image:loc>${defaultPreviewImage}</image:loc>
      <image:title>${url.name || 'AllToolDeck workspace interface'}</image:title>
    </image:image>`;
  }

  // Injects Video Sitemap schema node (future-proof) for high-value tools
  if (url.isTool && (url.loc.includes('merge') || url.loc.includes('background-remover') || url.loc.includes('json-formatter'))) {
    node += `\n    <video:video>
      <video:thumbnail_loc>${defaultPreviewImage}</video:thumbnail_loc>
      <video:title>How to use ${url.name} - AllToolDeck Guide</video:title>
      <video:description>Step-by-step video explanation on how to run ${url.name} securely and locally inside your web browser.</video:description>
      <video:content_loc>https://alltooldeck.netlify.app/videos/${url.loc.split('/').pop()}.mp4</video:content_loc>
      <video:publication_date>${currentDate}</video:publication_date>
    </video:video>`;
  }

  node += `\n  </url>`;
  return node;
};

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
${urls.map(compileUrlNode).join('\n')}
</urlset>`;

try {
  fs.writeFileSync(sitemapPath, sitemapContent.trim());
  console.log('Sitemap successfully compiled programmatically with Image and Video nodes!');
} catch (err) {
  console.error('Failed to write sitemap:', err);
  process.exit(1);
}
