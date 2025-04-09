
import { supabase } from "@/lib/supabaseClient";
import { blogPosts } from "./blogData";
import { mapRowToAITool } from "./toolsData";

// Define base URL for the site
const baseUrl = "https://www.allaitools.tech";

// Get current date in YYYY-MM-DD format for lastmod
const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

// Generate sitemap XML string
export const generateSitemap = async (): Promise<string> => {
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
    "/dashboard",
    "/recommend"
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

  try {
    // Fetch ALL tools from Supabase - no limit
    const { data: aiTools, error } = await supabase
      .from('ai_tools')
      .select('*');
    
    if (error) {
      console.error('Error fetching tools for sitemap:', error);
      throw error;
    }
    
    console.log(`Adding ${aiTools?.length || 0} tools to sitemap`);
    
    // Add tool detail pages - add ALL tools
    if (aiTools && aiTools.length > 0) {
      aiTools.forEach(toolRow => {
        const tool = mapRowToAITool(toolRow);
        const slug = tool.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        sitemap += `  <url>
    <loc>${baseUrl}/tool/${tool.id}/${slug}</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
      });
    }
    
    // Add category pages - extract unique categories from all tools
    const allCategories = new Set<string>();
    aiTools?.forEach(toolRow => {
      const tool = mapRowToAITool(toolRow);
      tool.category.forEach(cat => allCategories.add(cat));
    });
    
    const categories = Array.from(allCategories);
    console.log(`Adding ${categories.length} categories to sitemap`);
    
    categories.forEach(category => {
      sitemap += `  <url>
    <loc>${baseUrl}/categories/${encodeURIComponent(category)}</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    });

  } catch (error) {
    console.error('Error generating dynamic sitemap content:', error);
    // Fallback to static content if dynamic content fails
  }

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

// Generate a dedicated tool sitemap for easier management in search console
export const generateToolSitemap = async (): Promise<string> => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  try {
    // Fetch ALL tools from Supabase
    const { data: aiTools, error } = await supabase
      .from('ai_tools')
      .select('*');
    
    if (error) {
      console.error('Error fetching tools for tool sitemap:', error);
      throw error;
    }
    
    console.log(`Adding ${aiTools?.length || 0} tools to dedicated tool sitemap`);
    
    // Add tool detail pages
    if (aiTools && aiTools.length > 0) {
      aiTools.forEach(toolRow => {
        const tool = mapRowToAITool(toolRow);
        const slug = tool.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        sitemap += `  <url>
    <loc>${baseUrl}/tool/${tool.id}/${slug}</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
      });
    }
  } catch (error) {
    console.error('Error generating tool sitemap content:', error);
  }

  // Close urlset tag
  sitemap += `</urlset>`;

  return sitemap;
};

// Add image-specific information to the sitemap for images
export const generateImageSitemap = async (): Promise<string> => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  try {
    // Fetch ALL tools from Supabase
    const { data: aiTools, error } = await supabase
      .from('ai_tools')
      .select('*');
    
    if (error) {
      console.error('Error fetching tools for image sitemap:', error);
      throw error;
    }
    
    console.log(`Adding ${aiTools?.length || 0} tool images to sitemap`);
    
    // Add tool pages with logo images - add ALL tools
    if (aiTools && aiTools.length > 0) {
      aiTools.forEach(toolRow => {
        const tool = mapRowToAITool(toolRow);
        const slug = tool.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        sitemap += `  <url>
    <loc>${baseUrl}/tool/${tool.id}/${slug}</loc>
    <image:image>
      <image:loc>${tool.logo}</image:loc>
      <image:title>${tool.name} logo - AI tool for ${tool.category[0]}</image:title>
      <image:caption>Logo of ${tool.name}, a ${tool.shortDescription || 'AI tool'}</image:caption>
    </image:image>
  </url>
`;
      });
    }

  } catch (error) {
    console.error('Error generating image sitemap content:', error);
  }

  // Add blog posts with featured images
  blogPosts.forEach(post => {
    if (post.coverImage) {
      sitemap += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <image:image>
      <image:loc>${post.coverImage}</image:loc>
      <image:title>${post.title}</image:title>
      <image:caption>${post.excerpt}</image:caption>
    </image:image>
  </url>
`;
    }
  });

  // Close urlset tag
  sitemap += `</urlset>`;

  return sitemap;
};

// Generate a category sitemap for improved organization
export const generateCategorySitemap = async (): Promise<string> => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  try {
    // Fetch all tools to extract categories
    const { data: aiTools, error } = await supabase
      .from('ai_tools')
      .select('*');
    
    if (error) {
      console.error('Error fetching tools for category sitemap:', error);
      throw error;
    }
    
    // Extract unique categories
    const allCategories = new Set<string>();
    aiTools?.forEach(toolRow => {
      const tool = mapRowToAITool(toolRow);
      tool.category.forEach(cat => allCategories.add(cat));
    });
    
    const categories = Array.from(allCategories);
    console.log(`Adding ${categories.length} categories to dedicated category sitemap`);
    
    // Add each category page
    categories.forEach(category => {
      sitemap += `  <url>
    <loc>${baseUrl}/categories/${encodeURIComponent(category)}</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    });
  } catch (error) {
    console.error('Error generating category sitemap content:', error);
  }

  // Close urlset tag
  sitemap += `</urlset>`;

  return sitemap;
};

// Export all sitemap generation functions
export default {
  generateSitemap,
  generateImageSitemap,
  generateToolSitemap,
  generateCategorySitemap
};
