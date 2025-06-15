
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SearchBar } from "../comparison/SearchBar";
import { ToolGrid } from "../comparison/ToolGrid";
import { useToolComparison } from "@/hooks/use-tool-comparison";

const ComparisonSection = () => {
  const {
    selectedTools,
    searchTerm,
    setSearchTerm,
    displayTools,
    isLoading,
    handleToolSelect,
  } = useToolComparison();

  return (
    <section id="compare-section" className="py-20 bg-background border-t border-b border-border transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Compare AI Tools</h2>
          <p className="text-foreground/80">
            Not sure which tool is right for you? Select tools to see a side-by-side comparison of features, pricing, and user reviews.
          </p>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClear={() => setSearchTerm("")}
        />

        <ToolGrid
          tools={displayTools}
          selectedTools={selectedTools}
          isLoading={isLoading}
          onToolSelect={handleToolSelect}
        />

        <div className="text-center">
          <Link
            to={`/compare?tools=${selectedTools.join(',')}`}
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20 transform hover:-translate-y-1"
          >
            Compare Selected Tools <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
