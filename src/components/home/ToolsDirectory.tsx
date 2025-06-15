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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const TOOLS_PER_PAGE = 18;

const ToolsDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    category: "All",
    pricing: "All",
    rating: null,
    features: [],
    sortBy: "newest"
  });
  const [filteredTools, setFilteredTools] = useState<AITool[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  
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
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filters, aiTools]);

  // Calculate pagination values
  const totalPages = Math.ceil(filteredTools.length / TOOLS_PER_PAGE);
  const startIndex = (currentPage - 1) * TOOLS_PER_PAGE;
  const endIndex = startIndex + TOOLS_PER_PAGE;
  const currentTools = filteredTools.slice(startIndex, endIndex);

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

  // Generate array of page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // If we have less than or equal to maxVisiblePages, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Calculate start and end of middle pages
      let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 2);
      let endPage = startPage + maxVisiblePages - 3; // -3 because we always show first and last page, plus one ellipsis
      
      // Adjust if endPage exceeds totalPages
      if (endPage >= totalPages) {
        endPage = totalPages - 1;
        startPage = Math.max(endPage - (maxVisiblePages - 3) + 1, 2);
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push('ellipsis-start');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push('ellipsis-end');
      }
      
      // Always include last page if more than 1 page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-secondary/30 to-background" id="tools-directory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Discover AI Tools
            </h2>
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
      <section className="py-16 bg-gradient-to-b from-secondary/30 to-background" id="tools-directory">
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
    <section className="py-16 bg-gradient-to-b from-secondary/30 to-background" id="tools-directory">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-2 inline-block">
            Cutting-Edge Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Discover AI Tools
          </h2>
          <p className="text-foreground/80 text-lg">
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
              className="block w-full pl-10 pr-10 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 dark:bg-background dark:border-border dark:text-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
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

        {/* Results with fixed grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {currentTools.length > 0 ? (
            currentTools.map((tool) => (
              <Link 
                key={tool.id} 
                to={`/tool/${tool.id}/${generateSlug(tool.name)}`}
                className="block group relative transform transition-all duration-300"
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

        {/* Pagination */}
        {filteredTools.length > 0 && totalPages > 1 && (
          <div className="mt-12">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(curr => Math.max(curr - 1, 1))}
                    className={`cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                  />
                </PaginationItem>

                {getPageNumbers().map((page, index) => (
                  page === 'ellipsis-start' || page === 'ellipsis-end' ? (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={`page-${page}`}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page as number)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                ))}

                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(curr => Math.min(curr + 1, totalPages))}
                    className={`cursor-pointer ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* View More Link */}
        <div className="text-center mt-12">
          <Link 
            to="/categories" 
            className="inline-flex items-center px-6 py-3 text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
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
