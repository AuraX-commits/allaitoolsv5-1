
import { useState, useEffect } from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { aiTools, categories, pricingOptions, AITool } from "@/utils/toolsData";
import ToolCard from "./ToolCard";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const ToolsDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPricing, setSelectedPricing] = useState("All");
  const [sortBy, setSortBy] = useState<"rating" | "reviewCount">("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [filteredTools, setFilteredTools] = useState<AITool[]>(aiTools);

  // Filter and sort tools whenever filters change
  useEffect(() => {
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
    if (selectedCategory !== "All") {
      result = result.filter(tool => 
        tool.category.some(cat => cat === selectedCategory)
      );
    }
    
    // Filter by pricing
    if (selectedPricing !== "All") {
      result = result.filter(tool => tool.pricing === selectedPricing);
    }
    
    // Sort by selected criteria
    result.sort((a, b) => b[sortBy] - a[sortBy]);
    
    setFilteredTools(result);
  }, [searchTerm, selectedCategory, selectedPricing, sortBy]);

  const handleToolSelect = (id: string) => {
    setCompareList(prev => {
      if (prev.includes(id)) {
        return prev.filter(toolId => toolId !== id);
      } else {
        if (prev.length >= 3) {
          return [...prev.slice(1), id];
        }
        return [...prev, id];
      }
    });
  };

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
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search AI tools..."
                className="block w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto w-full inline-flex items-center justify-center py-3 px-6 border border-input rounded-lg bg-white hover:bg-secondary transition-colors text-foreground"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
            <button
              onClick={() => setSortBy(sortBy === "rating" ? "reviewCount" : "rating")}
              className="md:w-auto w-full inline-flex items-center justify-center py-3 px-6 border border-input rounded-lg bg-white hover:bg-secondary transition-colors text-foreground"
            >
              <ArrowUpDown className="h-5 w-5 mr-2" />
              {sortBy === "rating" ? "Sort by Popularity" : "Sort by Rating"}
            </button>
          </div>

          {/* Expanded Filters */}
          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 overflow-hidden transition-all duration-300",
              showFilters ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div>
              <label className="block text-sm font-medium mb-2">Categories</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm transition-colors",
                      selectedCategory === category
                        ? "bg-primary text-white"
                        : "bg-white hover:bg-secondary border border-input text-foreground"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pricing Options</label>
              <div className="flex flex-wrap gap-2">
                {pricingOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedPricing(option)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm transition-colors",
                      selectedPricing === option
                        ? "bg-primary text-white"
                        : "bg-white hover:bg-secondary border border-input text-foreground"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Compare Tools Bar */}
          {compareList.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg mb-6 animate-fade-in">
              <div className="flex items-center">
                <span className="text-sm font-medium mr-3">
                  {compareList.length} {compareList.length === 1 ? "tool" : "tools"} selected
                </span>
                <div className="flex -space-x-2">
                  {compareList.map(id => {
                    const tool = aiTools.find(t => t.id === id);
                    return tool ? (
                      <div key={id} className="w-8 h-8 rounded-full bg-white p-0.5 border border-white">
                        <img 
                          src={tool.logo} 
                          alt={tool.name} 
                          className="w-full h-full object-contain rounded-full"
                        />
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
              <Link
                to={`/compare?tools=${compareList.join(',')}`}
                className={cn(
                  "px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors text-sm",
                  compareList.length < 2 ? "opacity-50 pointer-events-none" : ""
                )}
              >
                Compare Tools
              </Link>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                showSelection={true}
                selected={compareList.includes(tool.id)}
                onClick={() => handleToolSelect(tool.id)}
              />
            ))
          ) : (
            <div className="col-span-3 py-16 text-center">
              <h3 className="text-xl font-medium mb-2">No tools found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedPricing("All");
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ToolsDirectory;
