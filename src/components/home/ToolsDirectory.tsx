
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { AITool, mapRowToAITool } from "@/utils/toolsData";
import ToolCard from "./ToolCard";
import { Link } from "react-router-dom";
import AdvancedFilters, { FilterOptions } from "../common/AdvancedFilters";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Skeleton } from "../ui/skeleton";
import { ScrollToTop } from "@/components/common/ScrollToTop";

const ToolsDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    category: "All",
    pricing: "All",
    rating: null,
    features: [],
    sortBy: "rating"
  });
  const [filteredTools, setFilteredTools] = useState<AITool[]>([]);
  
  // Fetch tools from Supabase
  const { data: aiTools = [], isLoading, error } = useQuery({
    queryKey: ['aiTools'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*');
      
      if (error) {
        console.error('Error fetching tools:', error);
        throw new Error(error.message);
      }
      
      // Map database rows to AITool objects
      return data.map(mapRowToAITool);
    }
  });

  // Filter and sort tools whenever filters change
  useEffect(() => {
    if (!aiTools.length) return;
    
    let result = [...aiTools];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        tool => 
          tool.name.toLowerCase().includes(term) || 
          tool.description.toLowerCase().includes(term) ||
          tool.category.some(cat => cat.toLowerCase().includes(term))
      );
    }
    
    // Filter by category
    if (filters.category !== "All") {
      result = result.filter(tool => 
        tool.category.some(cat => cat === filters.category)
      );
    }
    
    // Filter by pricing
    if (filters.pricing !== "All") {
      result = result.filter(tool => tool.pricing === filters.pricing);
    }
    
    // Filter by rating
    if (filters.rating !== null) {
      result = result.filter(tool => tool.rating >= filters.rating!);
    }
    
    // Filter by features
    if (filters.features.length > 0) {
      result = result.filter(tool => 
        filters.features.every(feature => 
          tool.features?.includes(feature)
        )
      );
    }
    
    // Sort by selected criteria
    if (filters.sortBy === "newest") {
      result.sort((a, b) => ((b.createdAt || 0) - (a.createdAt || 0)));
    } else {
      result.sort((a, b) => b[filters.sortBy] - a[filters.sortBy]);
    }
    
    setFilteredTools(result);
  }, [searchTerm, filters, aiTools]);

  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      category: "All",
      pricing: "All",
      rating: null,
      features: [],
      sortBy: "rating"
    });
  };
  
  // Function to generate URL-friendly slug from tool name
  const generateSlug = (name: string): string => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  };

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-16 bg-secondary/30" id="tools-directory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Discover AI Tools</h2>
            <p className="text-foreground/80">
              Browse our curated collection of AI-powered tools and find the perfect solution for your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="py-16 bg-secondary/30" id="tools-directory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Oops! Something went wrong</h2>
            <p className="text-foreground/80">
              We're having trouble loading the tools. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-secondary/30" id="tools-directory">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Discover AI Tools</h2>
          <p className="text-foreground/80">
            Browse our curated collection of AI-powered tools and find the perfect solution for your needs.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-5xl mx-auto mb-10">
          <div className="relative flex-grow mb-6">
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
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          <AdvancedFilters 
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>

        {/* Results - Fixed grid layout with containment for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <Link 
                key={tool.id} 
                to={`/tool/${tool.id}/${generateSlug(tool.name)}`}
                className="block group relative"
              >
                <ToolCard tool={tool} showSelection={false} />
              </Link>
            ))
          ) : (
            <div className="col-span-full py-16 text-center">
              <h3 className="text-xl font-medium mb-2">No tools found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* View More Link */}
        <div className="text-center mt-12">
          <Link 
            to="/categories" 
            className="inline-flex items-center px-6 py-3 text-primary hover:bg-primary hover:text-white border border-primary rounded-lg transition-colors duration-200"
          >
            View All Categories
          </Link>
        </div>
      </div>
      <ScrollToTop />
    </section>
  );
};

export default ToolsDirectory;
