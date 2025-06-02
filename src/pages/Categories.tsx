import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ToolCard from "../components/home/ToolCard";
import { ArrowLeft, Search, X } from "lucide-react";
import { Helmet } from "react-helmet-async";
import AdvancedFilters, { FilterOptions } from "@/components/common/AdvancedFilters";
import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { AITool, mapRowToAITool } from "@/utils/toolsData";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { useToast } from "@/hooks/use-toast";
import BreadcrumbNav from "@/components/common/BreadcrumbNav";
import { generateLocalSeoKeywords, generateLocalSeoDescription } from "@/utils/localSeoHelper";

const Categories = () => {
  const { category } = useParams<{ category: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTools, setFilteredTools] = useState<AITool[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    category: "All",
    pricing: "All",
    rating: null,
    features: [],
    sortBy: "rating"
  });
  const { toast } = useToast();

  // Update current category from URL params
  useEffect(() => {
    const decodedCategory = category ? decodeURIComponent(category) : null;
    console.log("URL category param changed to:", decodedCategory);
    
    setCurrentCategory(decodedCategory);
    
    // Update filters when category changes from URL
    if (decodedCategory && decodedCategory !== "All") {
      setFilters(prev => ({
        ...prev,
        category: decodedCategory
      }));
    }
  }, [category]);

  // Fetch tools from Supabase - use currentCategory in queryKey to trigger refetch
  const { data: aiTools = [], isLoading, error } = useQuery({
    queryKey: ['aiTools', currentCategory],
    queryFn: async () => {
      console.log("Fetching tools with category:", currentCategory);
      // Get all tools from the database
      const { data, error } = await supabase.from('ai_tools').select('*');
      
      if (error) {
        console.error('Error fetching tools:', error);
        throw new Error(error.message);
      }
      
      console.log(`Fetched ${data.length} tools from database`);
      // Map database rows to AITool objects
      return data.map(mapRowToAITool);
    }
  });

  // Apply filters whenever they change or data loads
  useEffect(() => {
    if (!aiTools.length) {
      console.log("No tools to filter");
      return;
    }
    
    console.log("Applying filters:", filters);
    console.log("Search term:", searchTerm);
    
    let filtered = [...aiTools];
    
    // Filter by category (from URL or filter selection)
    if (filters.category && filters.category !== "All") {
      console.log("Filtering by category:", filters.category);
      filtered = filtered.filter(tool => 
        tool.category.some(cat => cat === filters.category)
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      console.log("Filtering by search term:", term);
      filtered = filtered.filter(
        tool => 
          tool.name.toLowerCase().includes(term) || 
          tool.description.toLowerCase().includes(term) ||
          tool.category.some(cat => cat.toLowerCase().includes(term))
      );
    }
    
    // Filter by pricing
    if (filters.pricing !== "All") {
      console.log("Filtering by pricing:", filters.pricing);
      filtered = filtered.filter(tool => tool.pricing === filters.pricing);
    }
    
    // Filter by rating
    if (filters.rating !== null) {
      console.log("Filtering by minimum rating:", filters.rating);
      filtered = filtered.filter(tool => tool.rating >= filters.rating!);
    }
    
    // Filter by features
    if (filters.features.length > 0) {
      console.log("Filtering by features:", filters.features);
      filtered = filtered.filter(tool => 
        filters.features.every(feature => 
          tool.features?.includes(feature)
        )
      );
    }
    
    // Sort by selected criteria
    if (filters.sortBy === "newest") {
      console.log("Sorting by newest");
      filtered.sort((a, b) => ((b.createdAt || 0) - (a.createdAt || 0)));
    } else {
      console.log("Sorting by", filters.sortBy);
      filtered.sort((a, b) => b[filters.sortBy] - a[filters.sortBy]);
    }
    
    console.log(`Filtered tools: ${filtered.length} of ${aiTools.length}`);
    setFilteredTools(filtered);
  }, [searchTerm, filters, aiTools]);

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    console.log("Filter changed:", newFilters);
    setFilters(newFilters);
  };

  const resetAllFilters = () => {
    console.log("Resetting all filters");
    setSearchTerm("");
    setFilters({
      category: currentCategory || "All",
      pricing: "All",
      rating: null,
      features: [],
      sortBy: "rating"
    });
    
    toast({
      title: "Filters reset",
      description: "All filters have been reset to default values."
    });
  };

  // Get the proper SEO title based on selected category
  const getPageTitle = () => {
    if (!currentCategory) return "All AI Tools Categories | All AI Tools";
    return `${currentCategory} AI Tools | All AI Tools`;
  };

  // Get the proper SEO description based on selected category
  const getPageDescription = () => {
    if (!currentCategory || currentCategory === "All") 
      return "Explore our comprehensive directory of AI tools across all categories. Find the perfect solution for your needs.";
    return `Discover the best ${currentCategory} AI tools in our directory. Compare features, pricing, and user reviews.`;
  };

  const getAdvancedPageTitle = () => {
    if (!currentCategory || currentCategory === "All") {
      return "All AI Tools Categories 2025: Complete Directory of 3000+ Best AI Tools | Browse by Category | AllAITools.tech";
    }
    
    const categoryDisplayName = currentCategory;
    const toolCount = filteredTools.length || '50+';
    return `Best ${categoryDisplayName} AI Tools 2025: Top ${toolCount} ${categoryDisplayName} Solutions | Reviews, Pricing & Alternatives | AllAITools.tech`;
  };

  const getAdvancedPageDescription = () => {
    if (!currentCategory || currentCategory === "All") {
      return "Explore our comprehensive directory of AI tools organized by categories. Browse 3000+ AI solutions across 50+ categories including text generation, image creation, coding assistants, marketing automation, voice assistants, data analysis, and business tools. Find free AI tools, premium solutions, and specialized software for every industry. Compare features, pricing, and user reviews. Discover chatgpt alternatives, notion ai competitors, productivity tools, and emerging AI technologies. Perfect for businesses, developers, marketers, and AI enthusiasts.";
    }
    
    const categoryDisplayName = currentCategory;
    const toolCount = filteredTools.length || 'dozens of';
    const avgRating = filteredTools.length > 0 ? (filteredTools.reduce((sum, tool) => sum + tool.rating, 0) / filteredTools.length).toFixed(1) : '4.5';
    const freeToolsCount = filteredTools.filter(tool => tool.pricing === 'Free' || tool.pricing === 'Freemium').length;
    
    return `Discover the best ${categoryDisplayName} AI tools in 2025. Our curated directory features ${toolCount} top-rated ${categoryDisplayName} solutions with an average rating of ${avgRating}/5 stars. ${freeToolsCount > 0 ? `Including ${freeToolsCount} free and freemium options. ` : ''}Compare features, pricing, pros and cons of leading ${categoryDisplayName} tools. Expert reviews cover use cases, alternatives, API access, and integration capabilities. Find the perfect ${categoryDisplayName} AI solution for your business, creative projects, or development needs. Browse free trials, discount codes, and honest user feedback. Stay updated with the latest ${categoryDisplayName} AI innovations and emerging technologies.`;
  };

  const getAdvancedKeywords = () => {
    const baseKeywords = [
      'ai tools directory', 'all ai tools', 'allaitools', 'best ai tools 2025',
      'ai tools categories', 'artificial intelligence tools', 'ai software directory',
      'free ai tools', 'premium ai tools', 'ai tools comparison'
    ];
    
    const categorySpecificKeywords = currentCategory && currentCategory !== "All" ? [
      `${currentCategory} ai tools`, `best ${currentCategory} ai`, `${currentCategory} artificial intelligence`,
      `${currentCategory} ai software`, `${currentCategory} automation tools`, `${currentCategory} ai solutions`,
      `top ${currentCategory} tools 2025`, `${currentCategory} ai apps`, `${currentCategory} machine learning`,
      `${currentCategory} ai platforms`, `free ${currentCategory} ai tools`, `${currentCategory} ai for business`,
      `${currentCategory} ai pricing`, `${currentCategory} ai reviews`, `${currentCategory} ai alternatives`,
      `${currentCategory} ai comparison`, `${currentCategory} ai guide`, `${currentCategory} ai tutorial`,
      `how to use ${currentCategory} ai`, `${currentCategory} ai features`, `${currentCategory} ai benefits`
    ] : [];
    
    const toolTypeKeywords = [
      'chatgpt alternative', 'notion ai alternative', 'jasper ai alternative',
      'copy ai tools', 'grammarly ai alternative', 'canva ai tools',
      'midjourney alternative', 'stable diffusion tools', 'openai tools',
      'anthropic claude', 'google bard alternative', 'bing ai tools'
    ];
    
    const useKeywords = [
      'productivity ai tools', 'business ai tools', 'coding ai tools',
      'marketing ai tools', 'design ai tools', 'writing ai tools',
      'image generation ai', 'video ai tools', 'voice ai tools',
      'data analysis ai', 'research ai tools', 'automation ai tools'
    ];
    
    const competitorKeywords = [
      'futurepedia alternative', 'topaitools alternative', 'there\'s an ai for that',
      'aitoolbazaar', 'aibazaar', 'ai tools newsletter', 'ai news',
      'best ai directory', 'find ai tools', 'discover ai tools'
    ];
    
    const intentKeywords = [
      'find best ai tool', 'ai tool finder', 'ai tool search',
      'compare ai tools', 'ai tool reviews', 'ai tool ratings',
      'free ai tool alternatives', 'ai tools near me', 'ai tools for beginners'
    ];
    
    const pricingKeywords = [
      'free ai tools', 'cheap ai tools', 'affordable ai tools',
      'enterprise ai tools', 'ai tools pricing', 'ai tools cost',
      'free trials ai tools', 'ai tools discount', 'ai tools coupon'
    ];
    
    // Add local SEO keywords
    const localKeywords = currentCategory && currentCategory !== "All" 
      ? generateLocalSeoKeywords('AI Tools', currentCategory, 'Mixed')
      : generateLocalSeoKeywords('AI Tools Directory', 'General', 'Mixed');
    
    return [...baseKeywords, ...categorySpecificKeywords, ...toolTypeKeywords, 
            ...useKeywords, ...competitorKeywords, ...intentKeywords, ...pricingKeywords, ...localKeywords]
           .slice(0, 180).join(', ');
  };

  const getCategoryStructuredData = () => {
    const categoryName = currentCategory || "All AI Tools";
    
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": `${categoryName} AI Tools Directory`,
      "description": getAdvancedPageDescription(),
      "url": `https://www.allaitools.tech/categories${currentCategory ? `/${encodeURIComponent(currentCategory)}` : ''}`,
      "mainEntity": {
        "@type": "ItemList",
        "name": `${categoryName} AI Tools`,
        "description": `Curated list of the best ${categoryName} AI tools`,
        "numberOfItems": filteredTools.length,
        "itemListElement": filteredTools.slice(0, 20).map((tool, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "SoftwareApplication",
            "name": tool.name,
            "description": tool.shortDescription,
            "url": tool.url,
            "applicationCategory": "AIApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": tool.pricing === "Free" ? "0" : "varies",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": tool.rating,
              "reviewCount": tool.reviewCount
            },
            "image": tool.logo,
            "featureList": tool.features.slice(0, 5)
          }
        }))
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.allaitools.tech"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Categories",
            "item": "https://www.allaitools.tech/categories"
          },
          ...(currentCategory && currentCategory !== "All" ? [{
            "@type": "ListItem",
            "position": 3,
            "name": currentCategory,
            "item": `https://www.allaitools.tech/categories/${encodeURIComponent(currentCategory)}`
          }] : [])
        ]
      },
      "author": {
        "@type": "Organization",
        "name": "AllAITools.tech Curation Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "AllAITools.tech",
        "logo": "https://www.allaitools.tech/og-image.png"
      }
    };
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-8 w-64 bg-gray-300 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card rounded-lg shadow-sm overflow-hidden border border-border">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-5">
                    <Skeleton className="h-6 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <h1 className="text-2xl font-bold text-red-600 mb-2">Error Loading Data</h1>
              <p className="text-foreground/70 mb-4">
                We encountered a problem loading the AI tools data. Please try again later.
              </p>
              <p className="text-sm text-foreground/50">
                Error details: {error instanceof Error ? error.message : 'Unknown error'}
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{getAdvancedPageTitle()}</title>
        <meta name="description" content={getAdvancedPageDescription()} />
        <meta name="keywords" content={getAdvancedKeywords()} />
        
        {/* Advanced SEO Meta Tags */}
        <meta name="author" content="AllAITools.tech Curation Team" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 day" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="coverage" content="worldwide" />
        <meta name="target" content={`${currentCategory || 'AI'} professionals, developers, businesses`} />
        
        {/* Enhanced Open Graph */}
        <meta property="og:title" content={getAdvancedPageTitle()} />
        <meta property="og:description" content={getAdvancedPageDescription()} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.allaitools.tech/categories${currentCategory ? `/${encodeURIComponent(currentCategory)}` : ''}`} />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${currentCategory || 'All'} AI Tools Directory`} />
        <meta property="og:site_name" content="AllAITools.tech - Best AI Tools Directory 2025" />
        <meta property="og:locale" content="en_US" />
        
        {/* Enhanced Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getAdvancedPageTitle()} />
        <meta name="twitter:description" content={getAdvancedPageDescription()} />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="twitter:site" content="@AIToolsDirectory" />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#667eea" />
        <meta name="application-name" content={`${currentCategory || 'All'} AI Tools`} />
        
        {/* Canonical */}
        <link rel="canonical" href={`https://www.allaitools.tech/categories${currentCategory ? `/${encodeURIComponent(currentCategory)}` : ''}`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(getCategoryStructuredData())}
        </script>
        
        {/* FAQ Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `What are the best ${currentCategory || 'AI'} tools?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `The best ${currentCategory || 'AI'} tools include ${filteredTools.slice(0, 3).map(t => t.name).join(', ')} and many others. Each tool offers unique features and pricing models to suit different needs.`
                }
              },
              {
                "@type": "Question",
                "name": `Are there free ${currentCategory || 'AI'} tools available?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Yes, many ${currentCategory || 'AI'} tools offer free plans or trials. Our directory includes both free and premium options with detailed pricing information.`
                }
              },
              {
                "@type": "Question",
                "name": `How do I choose the right ${currentCategory || 'AI'} tool?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Consider your budget, required features, team size, and specific use cases. Read reviews, try free trials, and compare features using our detailed comparison tools.`
                }
              }
            ]
          })}
        </script>
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <BreadcrumbNav 
            category={currentCategory || undefined}
            customItems={currentCategory ? undefined : [
              { label: 'Categories', href: '/categories' }
            ]}
          />

          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-foreground/70 hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold mt-4 mb-2">
              {currentCategory ? `${currentCategory} AI Tools` : 'All AI Categories'}
            </h1>
            <p className="text-foreground/70">
              {currentCategory 
                ? `Explore the best ${currentCategory} AI tools in our directory` 
                : 'Browse our comprehensive AI tools directory by category'}
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search AI tools..."
                className="block w-full pl-10 pr-10 py-3 border border-input rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Advanced Filters */}
          <AdvancedFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
            showExpandedByDefault={true}
          />

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!isLoading && filteredTools.length > 0 ? (
              filteredTools.map((tool) => (
                <Link 
                  key={tool.id} 
                  to={`/tool/${tool.id}/${encodeURIComponent(tool.name.toLowerCase().replace(/\s+/g, '-'))}`}
                  className="block group"
                >
                  <ToolCard 
                    tool={tool} 
                    showSelection={false}
                  />
                </Link>
              ))
            ) : (!isLoading && (
              <div className="col-span-3 py-16 text-center">
                <h3 className="text-xl font-medium mb-2">No tools found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Categories;
