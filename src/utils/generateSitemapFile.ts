
import fs from 'fs';
import path from 'path';
import { generateSitemap } from './sitemapGenerator';

// Generate sitemap content
const sitemap = generateSitemap();

// Ensure the public directory exists
const publicDir = path.resolve(__dirname, '../../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write sitemap to file
const sitemapPath = path.resolve(publicDir, 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap);

console.log(`Sitemap generated at ${sitemapPath}`);
