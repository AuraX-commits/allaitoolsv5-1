
import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Star, Zap, Check } from "lucide-react";
import Badge from "../common/Badge";
import { cn } from "@/lib/utils";
import { AITool } from "@/utils/toolsData";

interface ToolCardProps {
  tool: AITool;
  selected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  showSelection?: boolean;
}

const ToolCard = ({ tool, selected = false, onClick, showSelection = false }: ToolCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Create descriptive alt text for the tool
  const getAltText = () => {
    return `${tool.name} logo - AI tool for ${tool.category.join(', ')}`;
  };

  return (
    <div 
      className={cn(
        "group rounded-xl overflow-hidden bg-card border border-border/60 transition-all duration-300 h-full",
        showSelection && selected ? "ring-2 ring-primary shadow-lg shadow-primary/20" : "",
        isHovered ? "shadow-lg dark:shadow-2xl dark:shadow-black/20 translate-y-[-4px] border-border" : "shadow-subtle"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="p-6 relative h-full flex flex-col">
        {/* Tool Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary/30 flex items-center justify-center">
              <img 
                src={tool.logo} 
                alt={getAltText()}
                className="w-10 h-10 object-contain"
                loading="lazy"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-card-foreground">{tool.name}</h3>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" aria-hidden="true" />
                  <span className="ml-1 text-sm font-medium text-card-foreground">{tool.rating}</span>
                </div>
                <span className="mx-2 text-muted-foreground text-sm">•</span>
                <span className="text-sm text-muted-foreground">{tool.reviewCount} reviews</span>
              </div>
            </div>
          </div>
          {showSelection && (
            <div className={cn(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
              selected 
                ? "bg-primary border-primary text-primary-foreground scale-110" 
                : "border-muted-foreground/30 group-hover:border-primary/50 group-hover:scale-105"
            )}>
              {selected && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
            </div>
          )}
        </div>

        {/* Tool Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {tool.shortDescription}
        </p>

        {/* Tool Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.category.slice(0, 2).map((cat) => (
            <Badge key={cat} variant="muted">
              {cat}
            </Badge>
          ))}
          {tool.category.length > 2 && (
            <Badge variant="muted">+{tool.category.length - 2} more</Badge>
          )}
        </div>

        {/* Tool Features */}
        <div className="space-y-2 mb-5 flex-grow">
          {tool.features.slice(0, 3).map((feature) => (
            <div key={feature} className="flex items-start">
              <div className="mt-0.5 mr-2 text-primary">
                <Check className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>

        {/* Pricing & API Info */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center space-x-2">
            <Badge variant={tool.pricing === "Free" || tool.pricing === "Freemium" ? "default" : "outline"}>
              {tool.pricing}
            </Badge>
            {tool.apiAccess && (
              <Badge variant="outline" className="flex items-center">
                <Zap className="w-3 h-3 mr-1" aria-hidden="true" />
                API
              </Badge>
            )}
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              window.open(tool.url, '_blank', 'noopener,noreferrer');
            }}
            className="text-xs flex items-center text-primary hover:text-primary/80 transition-colors duration-200"
            aria-label={`Visit ${tool.name} website`}
          >
            Visit <ExternalLink className="w-3 h-3 ml-1" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
