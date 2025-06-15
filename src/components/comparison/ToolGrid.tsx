
import { Link } from "react-router-dom";
import { AITool } from "@/utils/toolsData";
import ToolCard from "../home/ToolCard";
import { Skeleton } from "../ui/skeleton";

interface ToolGridProps {
  tools: AITool[];
  selectedTools: string[];
  isLoading: boolean;
  onToolSelect: (id: string) => void;
}

export const ToolGrid = ({ tools, selectedTools, isLoading, onToolSelect }: ToolGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={`skeleton-${i}`} className="rounded-xl bg-gray-100 animate-pulse h-72" />
        ))}
      </div>
    );
  }

  if (tools.length === 0) {
    return (
      <div className="col-span-3 text-center py-12">
        <h3 className="text-xl font-medium mb-2">No tools found</h3>
        <p className="text-muted-foreground mb-4">
          Try adjusting your search to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {tools.map(tool => (
        <div key={tool.id} className="group">
          <ToolCard
            tool={tool}
            showSelection={true}
            selected={selectedTools.includes(tool.id)}
            onClick={(e) => {
              e.preventDefault();
              onToolSelect(tool.id);
            }}
          />
        </div>
      ))}
    </div>
  );
};
