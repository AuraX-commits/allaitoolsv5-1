
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { aiTools } from "@/utils/toolsData";
import ToolCard from "./ToolCard";

const ComparisonSection = () => {
  const [selectedTools, setSelectedTools] = useState(aiTools.slice(0, 3).map(tool => tool.id));

  // Display only the first 6 tools for selection
  const displayTools = aiTools.slice(0, 6);

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

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Compare AI Tools</h2>
          <p className="text-foreground/80">
            Not sure which tool is right for you? Select tools to see a side-by-side comparison of features, pricing, and user reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayTools.map(tool => (
            <ToolCard
              key={tool.id}
              tool={tool}
              showSelection={true}
              selected={selectedTools.includes(tool.id)}
              onClick={() => handleToolSelect(tool.id)}
            />
          ))}
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
