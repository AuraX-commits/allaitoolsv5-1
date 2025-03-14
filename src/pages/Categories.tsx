
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { aiTools } from "@/utils/toolsData";
import ToolCard from "../components/home/ToolCard";
import { ArrowLeft, Search, X } from "lucide-react";
import { Helmet } from "react-helmet-async";
import AdvancedFilters, { FilterOptions } from "@/components/common/AdvancedFilters";

const Categories = () => {
  const { category } = useParams<{ category: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTools, setFilteredTools] = useState(aiTools);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    category: "All",
    pricing: "All",
    rating: null,
    features: [],
    sortBy: "rating"
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    let decodedCategory = category ? decodeURIComponent(category) : null;
    setCurrentCategory(decodedCategory);
    
    // Update filters if category changes from URL
    if (decodedCategory && decodedCategory !== "All") {
      setFilters(prev => ({
        ...prev,
        category: decodedCategory || "All"
      }));
    }
  }, [category]);

  // Apply filters whenever they change
  useEffect(() => {
    let filtered = [...aiTools];
    
    // Filter by category (from URL or filter selection)
    const categoryToUse = currentCategory || filters.category;
    if (categoryToUse && categoryToUse !== "All") {
      filtered = filtered.filter(tool => 
        tool.category.some(cat => cat === categoryToUse)
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        tool => 
          tool.name.toLowerCase().includes(term) || 
          tool.description.toLowerCase().includes(term) ||
          tool.category.some(cat => cat.toLowerCase().includes(term))
      );
    }
    
    // Filter by pricing
    if (filters.pricing !== "All") {
      filtered = filtered.filter(tool => tool.pricing === filters.pricing);
    }
    
    // Filter by rating
    if (filters.rating !== null) {
      filtered = filtered.filter(tool => tool.rating >= filters.rating!);
    }
    
    // Filter by features
    if (filters.features.length > 0) {
      filtered = filtered.filter(tool => 
        filters.features.every(feature => 
          tool.features?.includes(feature)
        )
      );
    }
    
    // Sort by selected criteria
    if (filters.sortBy === "newest") {
      filtered.sort((a, b) => ((b.createdAt || 0) - (a.createdAt || 0)));
    } else {
      filtered.sort((a, b) => b[filters.sortBy] - a[filters.sortBy]);
    }
    
    setFilteredTools(filtered);
  }, [searchTerm, filters, currentCategory]);

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const resetAllFilters = () => {
    setSearchTerm("");
    setFilters({
      category: currentCategory || "All",
      pricing: "All",
      rating: null,
      features: [],
      sortBy: "rating"
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

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getPageDescription()} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.allaitools.tech/categories${currentCategory ? `/${encodeURIComponent(currentCategory)}` : ''}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getPageDescription()} />
        <meta name="keywords" content={`AI tools, ${currentCategory || 'artificial intelligence'}, AI directory, AI software, AI solutions`} />
        <link rel="canonical" href={`https://www.allaitools.tech/categories${currentCategory ? `/${encodeURIComponent(currentCategory)}` : ''}`} />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
            {filteredTools.length > 0 ? (
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
            ) : (
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
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
