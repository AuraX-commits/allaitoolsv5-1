
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Check, X, Info } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { aiTools, AITool } from "@/utils/toolsData";
import Badge from "../components/common/Badge";

const Compare = () => {
  const location = useLocation();
  const [tools, setTools] = useState<AITool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const params = new URLSearchParams(location.search);
    const toolIds = params.get("tools")?.split(",") || [];
    
    if (toolIds.length >= 2) {
      const selectedTools = aiTools.filter(tool => toolIds.includes(tool.id));
      setTools(selectedTools);
    } else {
      // Default to first two tools if no valid selection
      setTools(aiTools.slice(0, 2));
    }
    
    setIsLoading(false);
  }, [location.search]);

  // Combined set of all features across compared tools
  const allFeatures = [...new Set(tools.flatMap(tool => tool.features))];
  
  // Combined set of all categories across compared tools
  const allCategories = [...new Set(tools.flatMap(tool => tool.category))];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <Link to="/" className="inline-flex items-center text-foreground/70 hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Directory
              </Link>
              <h1 className="text-3xl font-bold mt-4 mb-2">AI Tool Comparison</h1>
              <p className="text-foreground/70">
                Side-by-side comparison of {tools.length} AI tools
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-pulse text-xl">Loading comparison...</div>
              </div>
            ) : (
              <div className="bg-white border border-border rounded-xl shadow-subtle overflow-hidden">
                {/* Tool Headers */}
                <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-border">
                  <div className="p-6 font-medium text-muted-foreground">
                    Tool
                  </div>
                  {tools.map(tool => (
                    <div key={tool.id} className="p-4 border-l border-border">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-secondary/30 flex items-center justify-center">
                          <img 
                            src={tool.logo} 
                            alt={`${tool.name} logo`} 
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{tool.name}</h3>
                          <div className="flex items-center mt-1">
                            <span className="text-amber-500 font-medium text-sm">{tool.rating}</span>
                            <span className="mx-1 text-muted-foreground text-xs">•</span>
                            <span className="text-xs text-muted-foreground">{tool.reviewCount} reviews</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-border">
                  <div className="p-6 font-medium text-muted-foreground bg-secondary/20">
                    Description
                  </div>
                  {tools.map(tool => (
                    <div key={`${tool.id}-desc`} className="p-4 border-l border-border text-sm">
                      {tool.shortDescription}
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-border">
                  <div className="p-6 font-medium text-muted-foreground">
                    Pricing
                  </div>
                  {tools.map(tool => (
                    <div key={`${tool.id}-pricing`} className="p-4 border-l border-border">
                      <Badge 
                        variant={tool.pricing === "Free" || tool.pricing === "Freemium" ? "default" : "outline"}
                      >
                        {tool.pricing}
                      </Badge>
                    </div>
                  ))}
                </div>

                {/* API Access */}
                <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-border">
                  <div className="p-6 font-medium text-muted-foreground bg-secondary/20">
                    API Access
                  </div>
                  {tools.map(tool => (
                    <div key={`${tool.id}-api`} className="p-4 border-l border-border">
                      {tool.apiAccess ? (
                        <div className="flex items-center text-green-600">
                          <Check className="w-5 h-5 mr-2" />
                          <span>Available</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-muted-foreground">
                          <X className="w-5 h-5 mr-2" />
                          <span>Not available</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Categories */}
                <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-border">
                  <div className="p-6 font-medium text-muted-foreground">
                    Categories
                  </div>
                  {tools.map(tool => (
                    <div key={`${tool.id}-categories`} className="p-4 border-l border-border">
                      <div className="flex flex-wrap gap-2">
                        {tool.category.map(cat => (
                          <Badge key={cat} variant="muted">{cat}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-border">
                  <div className="p-6 font-medium text-muted-foreground bg-secondary/20">
                    Features
                  </div>
                  {tools.map(tool => (
                    <div key={`${tool.id}-features`} className="p-4 border-l border-border">
                      <ul className="space-y-2">
                        {tool.features.map(feature => (
                          <li key={feature} className="flex items-start">
                            <div className="mt-0.5 mr-2 text-green-600">
                              <Check className="w-4 h-4" />
                            </div>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-border">
                  <div className="p-6 font-medium text-muted-foreground">
                    Pros & Cons
                  </div>
                  {tools.map(tool => (
                    <div key={`${tool.id}-pros-cons`} className="p-4 border-l border-border">
                      <h4 className="font-medium text-green-600 mb-2">Pros</h4>
                      <ul className="space-y-1 mb-4">
                        {tool.pros?.map(pro => (
                          <li key={pro} className="flex items-start">
                            <div className="mt-0.5 mr-2 text-green-600">
                              <Check className="w-4 h-4" />
                            </div>
                            <span className="text-sm">{pro}</span>
                          </li>
                        ))}
                      </ul>

                      <h4 className="font-medium text-red-500 mb-2">Cons</h4>
                      <ul className="space-y-1">
                        {tool.cons?.map(con => (
                          <li key={con} className="flex items-start">
                            <div className="mt-0.5 mr-2 text-red-500">
                              <Info className="w-4 h-4" />
                            </div>
                            <span className="text-sm">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Visit Links */}
                <div className="grid grid-cols-[200px_1fr_1fr_1fr]">
                  <div className="p-6 font-medium text-muted-foreground bg-secondary/20">
                    Visit Tool
                  </div>
                  {tools.map(tool => (
                    <div key={`${tool.id}-visit`} className="p-4 border-l border-border">
                      <a 
                        href={tool.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
                      >
                        Visit {tool.name}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Compare;
