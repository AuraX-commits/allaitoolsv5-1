
import fs from 'fs';
import path from 'path';
import { generateSitemap, generateImageSitemap } from './sitemapGenerator';

// This function needs to be async since generateSitemap returns a Promise
const generateSitemapFiles = async () => {
  // Ensure the public directory exists
  const publicDir = path.resolve(__dirname, '../../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  try {
    // Generate sitemap content - await the Promise
    const sitemap = await generateSitemap();
    
    // Write sitemap to file
    const sitemapPath = path.resolve(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap);
    
    console.log(`Sitemap generated at ${sitemapPath}`);
    
    // Generate image sitemap
    const imageSitemap = await generateImageSitemap();
    
    // Write image sitemap to file
    const imageSitemapPath = path.resolve(publicDir, 'image-sitemap.xml');
    fs.writeFileSync(imageSitemapPath, imageSitemap);
    
    console.log(`Image sitemap generated at ${imageSitemapPath}`);
  } catch (error) {
    console.error('Error generating sitemaps:', error);
  }
};

// Export the async function
export default generateSitemapFiles;
