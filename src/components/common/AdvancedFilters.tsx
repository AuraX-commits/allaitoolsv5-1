
import { useState, useEffect } from "react";
import { Filter, X, CheckSquare, Square, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories, pricingOptions } from "@/utils/toolsData";

export type FilterOptions = {
  category: string;
  pricing: string;
  rating: number | null;
  features: string[];
  sortBy: "rating" | "reviewCount" | "newest";
};

type AdvancedFiltersProps = {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  showExpandedByDefault?: boolean;
};

const AdvancedFilters = ({ 
  filters, 
  onFilterChange,
  showExpandedByDefault = false
}: AdvancedFiltersProps) => {
  const [showFilters, setShowFilters] = useState(showExpandedByDefault);
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);
  
  // Synchronize local state with props
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);
  
  const features = [
    "API Access", 
    "Mobile App", 
    "Chrome Extension", 
    "Collaboration", 
    "Export Options",
    "Custom Training"
  ];

  const handleCategoryChange = (category: string) => {
    const updatedFilters = { ...localFilters, category };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handlePricingChange = (pricing: string) => {
    const updatedFilters = { ...localFilters, pricing };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleRatingChange = (rating: number | null) => {
    const updatedFilters = { ...localFilters, rating };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleFeatureToggle = (feature: string) => {
    const updatedFeatures = localFilters.features.includes(feature)
      ? localFilters.features.filter(f => f !== feature)
      : [...localFilters.features, feature];
    
    const updatedFilters = { ...localFilters, features: updatedFeatures };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSortChange = (sortBy: "rating" | "reviewCount" | "newest") => {
    const updatedFilters = { ...localFilters, sortBy };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      category: "All",
      pricing: "All",
      rating: null,
      features: [],
      sortBy: "rating"
    };
    setLocalFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  // Check if there are any active filters
  const hasActiveFilters = () => {
    return localFilters.category !== "All" || 
           localFilters.pricing !== "All" || 
           localFilters.rating !== null || 
           localFilters.features.length > 0 || 
           localFilters.sortBy !== "rating";
  };

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center py-2 px-4 border border-input rounded-lg bg-white hover:bg-secondary transition-colors text-foreground"
        >
          <Filter className="h-4 w-4 mr-2" />
          {showFilters ? "Hide Filters" : "Show Advanced Filters"}
        </button>
        
        {hasActiveFilters() && (
          <button
            onClick={resetFilters}
            className="text-sm text-primary hover:underline"
          >
            Reset All
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 overflow-hidden transition-all duration-300 bg-secondary/20 p-4 rounded-lg border border-border/50",
          showFilters ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 p-0 border-0"
        )}
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm transition-colors",
                    localFilters.category === category
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
            <h3 className="text-sm font-medium mb-2">Pricing Options</h3>
            <div className="flex flex-wrap gap-2">
              {pricingOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handlePricingChange(option)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm transition-colors",
                    localFilters.pricing === option
                      ? "bg-primary text-white"
                      : "bg-white hover:bg-secondary border border-input text-foreground"
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Minimum Rating</h3>
            <div className="flex gap-2">
              {[null, 3, 4, 4.5].map((rating) => (
                <button
                  key={rating === null ? 'any' : rating}
                  onClick={() => handleRatingChange(rating)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm transition-colors",
                    localFilters.rating === rating
                      ? "bg-primary text-white"
                      : "bg-white hover:bg-secondary border border-input text-foreground"
                  )}
                >
                  {rating === null ? 'Any' : (
                    <div className="flex items-center">
                      {rating}+ <Star className="ml-1 h-3 w-3 fill-current" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Features</h3>
            <div className="grid grid-cols-2 gap-2">
              {features.map((feature) => (
                <button
                  key={feature}
                  onClick={() => handleFeatureToggle(feature)}
                  className="flex items-center text-left px-3 py-2 rounded-md text-sm hover:bg-secondary/50 transition-colors"
                >
                  {localFilters.features.includes(feature) ? (
                    <CheckSquare className="h-4 w-4 mr-2 text-primary" />
                  ) : (
                    <Square className="h-4 w-4 mr-2 text-muted-foreground" />
                  )}
                  {feature}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Sort By</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { value: "rating", label: "Highest Rated" },
                { value: "reviewCount", label: "Most Popular" },
                { value: "newest", label: "Newest" }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value as any)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm transition-colors",
                    localFilters.sortBy === option.value
                      ? "bg-primary text-white"
                      : "bg-white hover:bg-secondary border border-input text-foreground"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;
