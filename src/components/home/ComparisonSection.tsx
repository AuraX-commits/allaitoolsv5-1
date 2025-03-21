
import { useState, useEffect } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { mapRowToAITool } from "@/utils/toolsData";
import ToolCard from "./ToolCard";
import { AITool } from "@/utils/toolsData";

const ComparisonSection = () => {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayTools, setDisplayTools] = useState<AITool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial tools
  useEffect(() => {
    const fetchInitialTools = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('ai_tools')
          .select('*')
          .limit(6);
        
        if (error) {
          console.error('Error fetching initial tools:', error);
          return;
        }
        
        // Map the data to AITool format
        const tools = data.map(row => mapRowToAITool(row));
        setDisplayTools(tools);
        
        // Set initial selected tools (first 3)
        if (tools.length > 0 && selectedTools.length === 0) {
          setSelectedTools(tools.slice(0, 3).map(tool => tool.id));
        }
      } catch (err) {
        console.error('Error in fetchInitialTools:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialTools();
  }, []);

  // Search functionality using Supabase
  useEffect(() => {
    const searchTools = async () => {
      if (!searchTerm) {
        // If search is cleared, fetch initial tools
        const { data, error } = await supabase
          .from('ai_tools')
          .select('*')
          .limit(6);
          
        if (error) {
          console.error('Error fetching tools:', error);
          return;
        }
        
        setDisplayTools(data.map(row => mapRowToAITool(row)));
        return;
      }
      
      try {
        setIsLoading(true);
        
        // Search in multiple columns
        const { data, error } = await supabase
          .from('ai_tools')
          .select('*')
          .or(`name.ilike.%${searchTerm}%,shortdescription.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
          .limit(6);
        
        if (error) {
          console.error('Error searching tools:', error);
          return;
        }
        
        setDisplayTools(data.map(row => mapRowToAITool(row)));
      } catch (err) {
        console.error('Error in searchTools:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Add debounce to avoid too many requests
    const debounce = setTimeout(() => {
      searchTools();
    }, 300);
    
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const handleToolSelect = (id: string) => {
    setSelectedTools(prev => {
      if (prev.includes(id)) {
        // Don't allow deselecting if we're down to 2 tools
        if (prev.length <= 2) return prev;
        return prev.filter(toolId => toolId !== id);
      } else {
        if (prev.length >= 3) {
          return [...prev.slice(1), id];
        }
        return [...prev, id];
      }
    });
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Compare AI Tools</h2>
          <p className="text-foreground/80">
            Not sure which tool is right for you? Select tools to see a side-by-side comparison of features, pricing, and user reviews.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search for tools to compare..."
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {isLoading ? (
            // Loading placeholders
            Array.from({ length: 3 }).map((_, index) => (
              <div key={`loading-${index}`} className="rounded-xl bg-gray-100 animate-pulse h-72"></div>
            ))
          ) : displayTools.length > 0 ? (
            displayTools.map(tool => (
              <div key={tool.id} className="group">
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  showSelection={true}
                  selected={selectedTools.includes(tool.id)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleToolSelect(tool.id);
                  }}
                />
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <h3 className="text-xl font-medium mb-2">No tools found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search to find what you're looking for.
              </p>
              <button
                onClick={handleClearSearch}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        <div className="text-center">
          <Link
            to={`/compare?tools=${selectedTools.join(',')}`}
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl hover:shadow-primary/20 transform hover:-translate-y-1 duration-200"
          >
            Compare Selected Tools <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
