
import { useState, useEffect } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { aiTools } from "@/utils/toolsData";
import { additionalTools } from "@/utils/additionalTools";
import ToolCard from "./ToolCard";

// Combine original tools with additional tools
const allTools = [...aiTools, ...additionalTools];

const ComparisonSection = () => {
  const [selectedTools, setSelectedTools] = useState(allTools.slice(0, 3).map(tool => tool.id));
  const [searchTerm, setSearchTerm] = useState("");
  const [displayTools, setDisplayTools] = useState(allTools.slice(0, 6));

  useEffect(() => {
    if (searchTerm) {
      const filtered = allTools.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.category.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
      ).slice(0, 6);
      setDisplayTools(filtered);
    } else {
      setDisplayTools(allTools.slice(0, 6));
    }
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
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Compare AI Tools</h2>
          <p className="text-foreground/80 dark:text-gray-300">
            Not sure which tool is right for you? Select tools to see a side-by-side comparison of features, pricing, and user reviews.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground dark:text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for tools to compare..."
              className="block w-full pl-10 pr-10 py-3 border border-input rounded-lg bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-white"
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayTools.length > 0 ? (
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
              <h3 className="text-xl font-medium mb-2 dark:text-white">No tools found</h3>
              <p className="text-muted-foreground dark:text-gray-400 mb-4">
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
            Compare Selected Tools <ArrowRight className="ml-2 w-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
