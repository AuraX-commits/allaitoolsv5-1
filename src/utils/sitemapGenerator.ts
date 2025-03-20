
import { aiTools } from "./toolsData";
import { blogPosts } from "./blogData";

// Define base URL for the site
const baseUrl = "https://www.allaitools.tech";

// Get current date in YYYY-MM-DD format for lastmod
const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

// Generate sitemap XML string
export const generateSitemap = (): string => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Add static pages
  const staticPages = [
    "/",
    "/compare",
    "/categories",
    "/pricing",
    "/about",
    "/blog",
    "/careers",
    "/terms",
    "/privacy",
    "/contact",
    "/submit-tool",
    "/login",
    "/signup",
    "/dashboard"
  ];

  staticPages.forEach(page => {
    sitemap += `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>${page === "/" ? "daily" : "weekly"}</changefreq>
    <priority>${page === "/" ? "1.0" : "0.8"}</priority>
  </url>
`;
  });

  // Add tool detail pages
  aiTools.forEach(tool => {
    const slug = tool.name.toLowerCase().replace(/\s+/g, '-');
    sitemap += `  <url>
    <loc>${baseUrl}/tool/${tool.id}/${slug}</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  });

  // Add category pages
  // Extract unique categories
  const categories = [...new Set(aiTools.flatMap(tool => tool.category))];
  categories.forEach(category => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    sitemap += `  <url>
    <loc>${baseUrl}/categories/${encodeURIComponent(category)}</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
`;
  });

  // Add blog post pages
  blogPosts.forEach(post => {
    sitemap += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
  });

  // Close urlset tag
  sitemap += `</urlset>`;

  return sitemap;
};

// Export function to generate sitemap and save it to a file
export default generateSitemap;
