import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');
const rssPath = path.join(publicDir, 'rss.xml');

// Mapped site structures
const domain = 'https://alltooldeck.netlify.app';

const posts = [
  {
    slug: 'why-browser-based-tools-are-safer',
    title: 'Why Browser-Based Tools are Safer for Your Data',
    description: 'Learn why client-side browser tools are significantly more secure than traditional cloud upload tools. Protect your data privacy and prevent leaks.',
    pubDate: new Date('2026-07-09').toUTCString(),
    author: 'AllToolDeck Security Team'
  }
];

const rssContent = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>AllToolDeck Blog</title>
  <link>${domain}/blog</link>
  <description>Stay updated with expert articles on browser security, client-side WASM performance, and online tool privacy guides.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${domain}/rss.xml" rel="self" type="application/rss+xml" />
  
  ${posts.map(post => `  <item>
    <title>${post.title}</title>
    <link>${domain}/blog/${post.slug}</link>
    <guid>${domain}/blog/${post.slug}</guid>
    <pubDate>${post.pubDate}</pubDate>
    <author>${post.author}</author>
    <description>${post.description}</description>
  </item>`).join('\n')}
</channel>
</rss>`;

try {
  fs.writeFileSync(rssPath, rssContent.trim());
  console.log('RSS Feed successfully compiled programmatically!');
} catch (err) {
  console.error('Failed to write RSS feed:', err);
  process.exit(1);
}
