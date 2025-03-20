
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Check, X, Info } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/lib/supabaseClient";
import { AITool, mapRowToAITool } from "@/utils/toolsData";
import Badge from "../components/common/Badge";
import { Skeleton } from "@/components/ui/skeleton";

const Compare = () => {
  const location = useLocation();
  const [tools, setTools] = useState<AITool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const params = new URLSearchParams(location.search);
    const toolIds = params.get("tools")?.split(",") || [];
    
    const fetchTools = async () => {
      setIsLoading(true);
      
      try {
        if (toolIds.length >= 2) {
          // Fetch selected tools from Supabase
          const { data, error } = await supabase
            .from('ai_tools')
            .select('*')
            .in('id', toolIds);
          
          if (error) {
            console.error('Error fetching tools:', error);
            setIsLoading(false);
            return;
          }
          
          // Map the data to AITool format
          const mappedTools = data.map(row => mapRowToAITool(row));
          setTools(mappedTools);
        } else {
          // Default to first two tools if no valid selection
          const { data, error } = await supabase
            .from('ai_tools')
            .select('*')
            .limit(2);
            
          if (error) {
            console.error('Error fetching default tools:', error);
            setIsLoading(false);
            return;
          }
          
          // Map the data to AITool format
          const mappedTools = data.map(row => mapRowToAITool(row));
          setTools(mappedTools);
        }
      } catch (err) {
        console.error('Error in fetchTools:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTools();
  }, [location.search]);

  // Combined set of all features across compared tools
  const allFeatures = [...new Set(tools.flatMap(tool => tool.features))];
  
  // Combined set of all categories across compared tools
  const allCategories = [...new Set(tools.flatMap(tool => tool.category))];

  // Generate SEO title based on compared tools
  const getPageTitle = () => {
    if (tools.length >= 2) {
      return `Compare ${tools.map(t => t.name).join(' vs ')} | AI Directory`;
    }
    return 'AI Tools Comparison | AI Directory';
  };

  // Generate SEO description based on compared tools
  const getPageDescription = () => {
    if (tools.length >= 2) {
      return `Side-by-side comparison of ${tools.map(t => t.name).join(' vs ')}. Compare features, pricing, pros and cons to find the best AI tool for your needs.`;
    }
    return 'Compare different AI tools side-by-side. View features, pricing, pros and cons to find the best AI solution for your needs.';
  };

  const renderLoadingSkeleton = () => (
    <div className="bg-white border border-border rounded-xl shadow-subtle overflow-hidden">
      <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-border">
        <div className="p-6 font-medium text-muted-foreground">
          Tool
        </div>
        {[1, 2, 3].map((i) => (
          <div key={`skeleton-header-${i}`} className="p-4 border-l border-border">
            <div className="flex items-center space-x-3">
              <Skeleton className="w-10 h-10 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-20 h-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {['Description', 'Pricing', 'API Access', 'Categories', 'Features', 'Pros & Cons'].map((section, i) => (
        <div key={`skeleton-${section}`} className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-border">
          <div className={`p-6 font-medium text-muted-foreground ${i % 2 === 1 ? 'bg-secondary/20' : ''}`}>
            {section}
          </div>
          {[1, 2, 3].map((j) => (
            <div key={`skeleton-${section}-${j}`} className="p-4 border-l border-border">
              <div className="space-y-2">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-3/4 h-4" />
                {section === 'Features' && (
                  <>
                    <Skeleton className="w-2/3 h-4" />
                    <Skeleton className="w-1/2 h-4" />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getPageDescription()} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getPageDescription()} />
        <meta name="keywords" content={`AI tools comparison, ${tools.map(t => t.name).join(', ')}, AI tools features, compare AI tools`} />
      </Helmet>
      
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
              renderLoadingSkeleton()
            ) : tools.length >= 2 ? (
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
                          <h3 className="font-semibold">
                            <Link to={`/tool/${tool.id}`} className="hover:text-primary transition-colors">
                              {tool.name}
                            </Link>
                          </h3>
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
                          <Link key={cat} to={`/categories/${encodeURIComponent(cat)}`}>
                            <Badge variant="muted" className="hover:bg-primary/10 transition-colors">
                              {cat}
                            </Badge>
                          </Link>
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
                      <div className="flex space-x-2">
                        <a 
                          href={tool.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
                        >
                          Visit Website
                        </a>
                        <Link 
                          to={`/tool/${tool.id}`}
                          className="inline-block px-4 py-2 bg-white border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors text-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-border rounded-xl shadow-subtle p-8 text-center">
                <h3 className="text-xl font-medium mb-2">No tools selected for comparison</h3>
                <p className="text-muted-foreground mb-4">
                  Please go back to the directory and select tools to compare.
                </p>
                <Link
                  to="/"
                  className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Back to Directory
                </Link>
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
