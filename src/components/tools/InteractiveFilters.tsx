
import { useState, useEffect } from "react";
import { Filter, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { AITool } from "@/utils/toolsData";
import { cn } from "@/lib/utils";

interface FilterProps {
  tools: AITool[];
  onFiltersChange: (filteredTools: AITool[]) => void;
}

const InteractiveFilters = ({ tools, onFiltersChange }: FilterProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [minReviews, setMinReviews] = useState(0);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [showApiOnly, setShowApiOnly] = useState(false);

  // Calculate max values from the data
  const maxRating = 5;
  const maxReviews = Math.max(...tools.map(tool => tool.reviewCount));

  useEffect(() => {
    let filtered = [...tools];
    
    // Apply rating filter
    filtered = filtered.filter(tool => tool.rating >= minRating);
    
    // Apply review count filter
    filtered = filtered.filter(tool => tool.reviewCount >= minReviews);
    
    // Apply pricing filter
    if (showFreeOnly) {
      filtered = filtered.filter(tool => 
        tool.pricing === "Free" || tool.pricing === "Freemium"
      );
    }
    
    // Apply API filter
    if (showApiOnly) {
      filtered = filtered.filter(tool => tool.apiAccess);
    }
    
    onFiltersChange(filtered);
  }, [minRating, minReviews, showFreeOnly, showApiOnly, tools, onFiltersChange]);

  const resetFilters = () => {
    setMinRating(0);
    setMinReviews(0);
    setShowFreeOnly(false);
    setShowApiOnly(false);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
        >
          <Filter className="h-4 w-4" />
          Advanced Filters
        </button>
        {showFilters && (
          <button 
            onClick={resetFilters}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <X className="h-4 w-4" />
            Reset
          </button>
        )}
      </div>
      
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 bg-white dark:bg-gray-800 rounded-lg border border-border/60 dark:border-gray-700",
          showFilters ? "max-h-96 opacity-100 p-6" : "max-h-0 opacity-0 p-0 border-0"
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Minimum Rating</label>
                <span className="text-sm">{minRating.toFixed(1)}/5</span>
              </div>
              <Slider
                value={[minRating]}
                min={0}
                max={maxRating}
                step={0.1}
                onValueChange={(values) => setMinRating(values[0])}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Minimum Reviews</label>
                <span className="text-sm">{minReviews}</span>
              </div>
              <Slider
                value={[minReviews]}
                min={0}
                max={maxReviews}
                step={1}
                onValueChange={(values) => setMinReviews(values[0])}
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Free/Freemium Only</label>
              <Switch
                checked={showFreeOnly}
                onCheckedChange={setShowFreeOnly}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">API Access</label>
              <Switch
                checked={showApiOnly}
                onCheckedChange={setShowApiOnly}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveFilters;
