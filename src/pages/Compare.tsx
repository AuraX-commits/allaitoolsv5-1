import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Check, X, Info, ChevronRight, ChevronLeft } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/lib/supabaseClient";
import { AITool, mapRowToAITool } from "@/utils/toolsData";
import Badge from "../components/common/Badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ReplaceToolButton } from "@/components/comparison/ReplaceToolButton";

const Compare = () => {
  const location = useLocation();
  const [tools, setTools] = useState<AITool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleToolIndexes, setVisibleToolIndexes] = useState<number[]>([0, 1]);
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchTools = async () => {
      setIsLoading(true);
      
      try {
        const params = new URLSearchParams(location.search);
        const toolIdParam = params.get("tools");
        
        let toolIds: string[] = [];
        if (toolIdParam) {
          toolIds = toolIdParam.includes(",") 
            ? toolIdParam.split(",") 
            : [toolIdParam];
          
          toolIds = toolIds.filter(id => id.trim() !== "");
        }
        
        if (toolIds.length > 0) {
          console.log("Fetching tools with IDs:", toolIds);
          
          const { data, error } = await supabase
            .from('ai_tools')
            .select('*')
            .in('id', toolIds);
          
          if (error) {
            console.error('Error fetching tools:', error);
            setIsLoading(false);
            return;
          }
          
          const mappedTools = data.map(row => mapRowToAITool(row));
          console.log("Fetched tools:", mappedTools);
          
          if (mappedTools.length === 1) {
            const singleTool = mappedTools[0];
            const { data: relatedToolsData, error: relatedError } = await supabase
              .from('ai_tools')
              .select('*')
              .in('category', singleTool.category)
              .neq('id', singleTool.id)
              .limit(3);
              
            if (!relatedError && relatedToolsData && relatedToolsData.length > 0) {
              const relatedTools = relatedToolsData.slice(0, 2).map(mapRowToAITool);
              mappedTools.push(...relatedTools);
            }
          }
          
          setTools(mappedTools);
          
          if (isMobile && mappedTools.length > 2) {
            setVisibleToolIndexes([0, 1]);
          }
        } else {
          const { data, error } = await supabase
            .from('ai_tools')
            .select('*')
            .limit(3);
            
          if (error) {
            console.error('Error fetching default tools:', error);
            setIsLoading(false);
            return;
          }
          
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
  }, [location.search, isMobile]);

  const handleReplaceTool = async (oldToolId: string, newToolId: string) => {
    try {
      const { data: newToolData, error } = await supabase
        .from('ai_tools')
        .select('*')
        .eq('id', newToolId)
        .single();
        
      if (error) {
        console.error('Error fetching replacement tool:', error);
        return;
      }
      
      const newTool = mapRowToAITool(newToolData);
      setTools(prevTools => 
        prevTools.map(tool => 
          tool.id === oldToolId ? newTool : tool
        )
      );
      
      const params = new URLSearchParams(location.search);
      const toolIds = params.get("tools")?.split(",") || [];
      const updatedToolIds = toolIds.map(id => 
        id === oldToolId ? newToolId : id
      );
      const newSearch = `?tools=${updatedToolIds.join(",")}`;
      window.history.replaceState({}, "", `/compare${newSearch}`);
      
    } catch (err) {
      console.error('Error in handleReplaceTool:', err);
    }
  };

  const allFeatures = [...new Set(tools.flatMap(tool => tool.features))];
  
  const allCategories = [...new Set(tools.flatMap(tool => tool.category))];

  const getPageTitle = () => {
    if (tools.length >= 2) {
      return `Compare ${tools.map(t => t.name).join(' vs ')} | Best AI Tools Side-by-Side Comparison | AllAITools.tech`;
    }
    return 'AI Tools Comparison | Feature & Price Analysis | Side-by-Side Tool Evaluation | AllAITools.tech';
  };

  const getPageDescription = () => {
    if (tools.length >= 2) {
      const toolNames = tools.map(t => t.name).join(', ');
      const baseDescription = `Comprehensive side-by-side comparison of ${tools.map(t => t.name).join(' vs ')}. Evaluate features, pricing, API access, pros and cons to find the perfect AI tool for your needs.`;
      
      const additionalDetails = tools.map(tool => 
        `${tool.name} is ${tool.shortDescription.toLowerCase()} It offers features like ${tool.features.slice(0, 3).join(', ')}.`
      ).join(' ');
      
      const categoryInfo = `These tools fall under categories such as ${allCategories.slice(0, 5).join(', ')}.`;
      
      return `${baseDescription} ${additionalDetails} ${categoryInfo} Our detailed comparison helps you evaluate these solutions based on pricing models, API access, feature sets, and user feedback. Make an informed decision by analyzing the strengths and limitations of each tool to determine which solution best aligns with your specific requirements and use cases. Compare ${toolNames} today to choose the right AI solution for your business, creative projects, or development needs.`;
    }
    
    return 'Compare AI tools side-by-side with our advanced comparison tool. Evaluate features, pricing, pros and cons across leading AI solutions including text generators, image creators, code assistants, chatbots, and more. Our detailed comparison matrix helps you identify the perfect AI tool by analyzing feature sets, pricing models, API capabilities, and real user feedback. Whether you need AI for business automation, creative work, or software development, our comparison platform enables data-driven decisions to select the right AI tool for your specific use case, budget, and technical requirements.';
  };

  const getKeywords = () => {
    const baseKeywords = [
      'AI tools comparison', 'compare AI tools', 'AI software comparison', 'AI directory',
      'best AI tools', 'AI tool features comparison', 'AI pricing comparison', 'AI tools side by side',
      'AI tool evaluation', 'AI software alternatives', 'AI tool matrix', 'compare AI capabilities',
      'AI functional comparison', 'AI tools pros cons', 'AI tool decision matrix', 'AI software selection',
      'AI comparison chart', 'AI tools feature analysis', 'AI pricing plans comparison', 'top AI tools compared'
    ];
    
    const toolKeywords = tools.flatMap(tool => [
      `${tool.name} review`, 
      `${tool.name} features`, 
      `${tool.name} pricing`, 
      `${tool.name} alternatives`,
      `${tool.name} vs competitors`,
      `is ${tool.name} worth it`
    ]);
    
    const categoryKeywords = allCategories.map(cat => `best ${cat} tools comparison`);
    
    const comparisonKeywords = [];
    if (tools.length >= 2) {
      for (let i = 0; i < tools.length; i++) {
        for (let j = i + 1; j < tools.length; j++) {
          comparisonKeywords.push(`${tools[i].name} vs ${tools[j].name}`);
          comparisonKeywords.push(`${tools[j].name} vs ${tools[i].name}`);
          comparisonKeywords.push(`compare ${tools[i].name} and ${tools[j].name}`);
          comparisonKeywords.push(`${tools[i].name} or ${tools[j].name} which is better`);
        }
      }
    }
    
    const featureKeywords = ['AI tool features matrix', 'AI pricing comparison chart', 'AI pros and cons analysis', 'AI tool selection guide', 'AI tool recommendation system'];
    
    return [...baseKeywords, ...toolKeywords, ...categoryKeywords, ...comparisonKeywords, ...featureKeywords].slice(0, 50).join(', ');
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

  const handlePreviousTool = () => {
    if (visibleToolIndexes[0] > 0) {
      setVisibleToolIndexes([
        visibleToolIndexes[0] - 1,
        visibleToolIndexes[1] - 1
      ]);
    }
  };

  const handleNextTool = () => {
    if (visibleToolIndexes[1] < tools.length - 1) {
      setVisibleToolIndexes([
        visibleToolIndexes[0] + 1,
        visibleToolIndexes[1] + 1
      ]);
    }
  };

  const getVisibleTools = () => {
    if (!isMobile || tools.length <= 2) {
      return tools;
    }
    return tools.filter((_, index) => 
      visibleToolIndexes.includes(index)
    );
  };

  const visibleTools = getVisibleTools();
  const hasMorePrevious = isMobile && visibleToolIndexes[0] > 0;
  const hasMoreNext = isMobile && tools.length > 2 && visibleToolIndexes[1] < tools.length - 1;

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getPageDescription()} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.allaitools.tech/compare${location.search}`} />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:site_name" content="All AI Tools Directory" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getPageDescription()} />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="twitter:site" content="@AIToolsDirectory" />
        
        <meta name="keywords" content={getKeywords()} />
        <link rel="canonical" href={`https://www.allaitools.tech/compare${location.search}`} />
        
        <meta name="robots" content="index, follow" />
        <meta name="author" content="AI Tools Directory Team" />
        
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "${getPageTitle()}",
              "description": "${getPageDescription()}",
              "url": "https://www.allaitools.tech/compare${location.search}",
              "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["h1", ".comparison-summary"]
              },
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": ${JSON.stringify(tools.map((tool, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "item": {
                    "@type": "SoftwareApplication",
                    "name": tool.name,
                    "description": tool.shortDescription,
                    "applicationCategory": "AIApplication",
                    "offers": {
                      "@type": "Offer",
                      "price": tool.pricing === "Free" ? "0" : "varies",
                      "priceCurrency": "USD"
                    },
                    "aggregateRating": {
                      "@type": "AggregateRating",
                      "ratingValue": tool.rating || "4.5",
                      "reviewCount": tool.reviewCount || "10"
                    }
                  }
                })))}
              }
            }
          `}
        </script>
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

            {isMobile && tools.length > 2 && (
              <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={handlePreviousTool}
                  disabled={!hasMorePrevious}
                  className={`p-2 rounded-full ${hasMorePrevious ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'}`}
                  aria-label="Previous tools"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <span className="text-sm text-muted-foreground">
                  Viewing {visibleToolIndexes[0] + 1}-{visibleToolIndexes[1] + 1} of {tools.length} tools
                </span>
                
                <button 
                  onClick={handleNextTool}
                  disabled={!hasMoreNext}
                  className={`p-2 rounded-full ${hasMoreNext ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'}`}
                  aria-label="Next tools"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {isLoading ? (
              renderLoadingSkeleton()
            ) : tools.length >= 2 ? (
              <div className="bg-white border border-border rounded-xl shadow-subtle overflow-x-auto">
                <div className="min-w-[768px]">
                  <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-border">
                    <div className="p-6 font-medium text-muted-foreground">
                      Tool
                    </div>
                    {visibleTools.map(tool => (
                      <div key={tool.id} className="p-4 border-l border-border">
                        <div className="flex items-center justify-between">
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
                          <ReplaceToolButton
                            toolId={tool.id}
                            onReplace={handleReplaceTool}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-border">
                    <div className="p-6 font-medium text-muted-foreground bg-secondary/20">
                      Description
                    </div>
                    {visibleTools.map(tool => (
                      <div key={`${tool.id}-desc`} className="p-4 border-l border-border text-sm">
                        {tool.shortDescription}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-border">
                    <div className="p-6 font-medium text-muted-foreground">
                      Pricing
                    </div>
                    {visibleTools.map(tool => (
                      <div key={`${tool.id}-pricing`} className="p-4 border-l border-border">
                        <Badge 
                          variant={tool.pricing === "Free" || tool.pricing === "Freemium" ? "default" : "outline"}
                        >
                          {tool.pricing}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-border">
                    <div className="p-6 font-medium text-muted-foreground bg-secondary/20">
                      API Access
                    </div>
                    {visibleTools.map(tool => (
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

                  <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-border">
                    <div className="p-6 font-medium text-muted-foreground">
                      Categories
                    </div>
                    {visibleTools.map(tool => (
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

                  <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-border">
                    <div className="p-6 font-medium text-muted-foreground bg-secondary/20">
                      Features
                    </div>
                    {visibleTools.map(tool => (
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

                  <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-border">
                    <div className="p-6 font-medium text-muted-foreground">
                      Pros & Cons
                    </div>
                    {visibleTools.map(tool => (
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

                  <div className="grid grid-cols-[200px_1fr_1fr_1fr]">
                    <div className="p-6 font-medium text-muted-foreground bg-secondary/20">
                      Visit Tool
                    </div>
                    {visibleTools.map(tool => (
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
