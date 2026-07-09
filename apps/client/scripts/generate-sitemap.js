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

const urls = [
  // Core routes
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/privacy', changefreq: 'monthly', priority: '0.3' },
  { loc: '/terms', changefreq: 'monthly', priority: '0.3' },
  
  // Category landing pages
  { loc: '/pdf', changefreq: 'weekly', priority: '0.8' },
  { loc: '/image', changefreq: 'weekly', priority: '0.8' },
  { loc: '/text', changefreq: 'weekly', priority: '0.8' },
  { loc: '/security', changefreq: 'weekly', priority: '0.8' },
  { loc: '/developer', changefreq: 'weekly', priority: '0.8' },
  { loc: '/ai', changefreq: 'weekly', priority: '0.8' },
  { loc: '/qr-barcode', changefreq: 'weekly', priority: '0.8' },
  { loc: '/calculators', changefreq: 'weekly', priority: '0.8' },

  // PDF tools
  { loc: '/pdf/merge', changefreq: 'monthly', priority: '0.7' },
  { loc: '/pdf/split', changefreq: 'monthly', priority: '0.7' },
  { loc: '/pdf/compress', changefreq: 'monthly', priority: '0.7' },
  { loc: '/pdf/rotate', changefreq: 'monthly', priority: '0.7' },
  { loc: '/pdf/to-jpg', changefreq: 'monthly', priority: '0.7' },
  { loc: '/pdf/from-jpg', changefreq: 'monthly', priority: '0.7' },
  { loc: '/pdf/protect', changefreq: 'monthly', priority: '0.7' },
  { loc: '/pdf/unlock', changefreq: 'monthly', priority: '0.7' },
  { loc: '/pdf/to-word', changefreq: 'monthly', priority: '0.7' },
  { loc: '/pdf/from-word', changefreq: 'monthly', priority: '0.7' },

  // Image tools
  { loc: '/image/convert', changefreq: 'monthly', priority: '0.7' },
  { loc: '/image/resize', changefreq: 'monthly', priority: '0.7' },
  { loc: '/image/compress', changefreq: 'monthly', priority: '0.7' },
  { loc: '/image/crop', changefreq: 'monthly', priority: '0.7' },
  { loc: '/image/rotate', changefreq: 'monthly', priority: '0.7' },
  { loc: '/image/background-remover', changefreq: 'monthly', priority: '0.7' },
  { loc: '/image/to-pdf', changefreq: 'monthly', priority: '0.7' },

  // Text tools
  { loc: '/text/word-counter', changefreq: 'monthly', priority: '0.7' },
  { loc: '/text/json-formatter', changefreq: 'monthly', priority: '0.7' },
  { loc: '/text/case-converter', changefreq: 'monthly', priority: '0.7' },
  { loc: '/text/remove-spaces', changefreq: 'monthly', priority: '0.7' },
  { loc: '/text/remove-duplicates', changefreq: 'monthly', priority: '0.7' },
  { loc: '/text/reverse', changefreq: 'monthly', priority: '0.7' },
  { loc: '/text/sort', changefreq: 'monthly', priority: '0.7' },
  { loc: '/text/slug-generator', changefreq: 'monthly', priority: '0.7' },
  { loc: '/text/lorem-ipsum', changefreq: 'monthly', priority: '0.7' },
  { loc: '/text/difference', changefreq: 'monthly', priority: '0.7' },

  // Security tools
  { loc: '/security/password-generator', changefreq: 'monthly', priority: '0.7' },
  { loc: '/security/password-strength', changefreq: 'monthly', priority: '0.7' },
  { loc: '/security/base64', changefreq: 'monthly', priority: '0.7' },
  { loc: '/security/sha256', changefreq: 'monthly', priority: '0.7' },
  { loc: '/security/md5', changefreq: 'monthly', priority: '0.7' },
  { loc: '/security/url', changefreq: 'monthly', priority: '0.7' },
  { loc: '/security/jwt', changefreq: 'monthly', priority: '0.7' },
  { loc: '/security/qr-generator', changefreq: 'monthly', priority: '0.7' },
  { loc: '/security/qr-scanner', changefreq: 'monthly', priority: '0.7' },

  // Blog pages
  { loc: '/blog', changefreq: 'weekly', priority: '0.8' },
  { loc: '/blog/why-browser-based-tools-are-safer', changefreq: 'monthly', priority: '0.6' }
];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${domains}${url.loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

try {
  fs.writeFileSync(sitemapPath, sitemapContent.trim());
  console.log('Sitemap successfully compiled programmatically!');
} catch (err) {
  console.error('Failed to write sitemap:', err);
  process.exit(1);
}
