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
    <section id="compare-section" className="py-20 bg-background border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Compare AI Tools Side-by-Side</h2>
          <p className="text-muted-foreground text-lg">
            Select up to four tools to compare features, pricing, and more to make an informed decision.
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

        <div className="text-center mt-8">
          <Link
            to={`/compare?tools=${selectedTools.join(',')}`}
            className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl hover:shadow-primary/20 transform hover:-translate-y-1 duration-200"
          >
            Compare {selectedTools.length > 0 ? selectedTools.length : ''} Tools <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
