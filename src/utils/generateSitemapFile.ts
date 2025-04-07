
import fs from 'fs';
import path from 'path';
import { 
  generateSitemap, 
  generateImageSitemap,
  generateToolSitemap,
  generateCategorySitemap
} from './sitemapGenerator';

// This function needs to be async since generateSitemap returns a Promise
const generateSitemapFiles = async () => {
  // Ensure the public directory exists
  const publicDir = path.resolve(__dirname, '../../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  try {
    // Generate main sitemap content
    const sitemap = await generateSitemap();
    const sitemapPath = path.resolve(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap);
    console.log(`Main sitemap generated at ${sitemapPath}`);
    
    // Generate image sitemap
    const imageSitemap = await generateImageSitemap();
    const imageSitemapPath = path.resolve(publicDir, 'image-sitemap.xml');
    fs.writeFileSync(imageSitemapPath, imageSitemap);
    console.log(`Image sitemap generated at ${imageSitemapPath}`);
    
    // Generate tool-specific sitemap
    const toolSitemap = await generateToolSitemap();
    const toolSitemapPath = path.resolve(publicDir, 'tool-sitemap.xml');
    fs.writeFileSync(toolSitemapPath, toolSitemap);
    console.log(`Tool sitemap generated at ${toolSitemapPath}`);
    
    // Generate category sitemap
    const categorySitemap = await generateCategorySitemap();
    const categorySitemapPath = path.resolve(publicDir, 'category-sitemap.xml');
    fs.writeFileSync(categorySitemapPath, categorySitemap);
    console.log(`Category sitemap generated at ${categorySitemapPath}`);
    
    // Generate sitemap index to link all sitemaps
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.allaitools.tech/sitemap.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.allaitools.tech/image-sitemap.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.allaitools.tech/tool-sitemap.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.allaitools.tech/category-sitemap.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
</sitemapindex>`;
    
    const sitemapIndexPath = path.resolve(publicDir, 'sitemap-index.xml');
    fs.writeFileSync(sitemapIndexPath, sitemapIndex);
    console.log(`Sitemap index generated at ${sitemapIndexPath}`);
    
  } catch (error) {
    console.error('Error generating sitemaps:', error);
  }
};

// Export the async function
export default generateSitemapFiles;
