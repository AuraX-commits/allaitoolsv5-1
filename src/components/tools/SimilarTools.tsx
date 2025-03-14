
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";
import { AITool } from "@/utils/toolsData";

interface SimilarToolsProps {
  currentToolId: string;
  currentToolCategories: string[];
  allTools: AITool[];
  limit?: number;
}

const SimilarTools = ({ 
  currentToolId, 
  currentToolCategories, 
  allTools, 
  limit = 3 
}: SimilarToolsProps) => {
  // Find tools with similar categories, excluding the current tool
  const similarTools = allTools
    .filter(tool => 
      tool.id !== currentToolId && 
      tool.category.some(cat => currentToolCategories.includes(cat))
    )
    .slice(0, limit);

  if (similarTools.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-subtle border border-border/60 p-6">
      <h2 className="text-lg font-semibold mb-4">Alternative Tools</h2>
      <div className="space-y-4">
        {similarTools.map(tool => (
          <Link 
            key={tool.id} 
            to={`/tool/${tool.id}/${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/20 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-secondary/30 dark:bg-gray-700 flex items-center justify-center">
              <img 
                src={tool.logo} 
                alt={`${tool.name} logo`} 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h3 className="font-medium">{tool.name}</h3>
              <div className="flex items-center mt-1">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="ml-1 text-xs">{tool.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border/60 dark:border-gray-700">
        <Link 
          to="/#tools-directory"
          className="text-primary hover:text-primary/80 text-sm font-medium flex items-center justify-center"
        >
          View All Tools
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default SimilarTools;
