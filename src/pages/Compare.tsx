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

  const getAdvancedPageTitle = () => {
    if (tools.length >= 2) {
      const toolNames = tools.map(t => t.name).join(' vs ');
      const categories = [...new Set(tools.flatMap(t => t.category))].slice(0, 2).join(' & ');
      return `${toolNames} Comparison 2025: In-Depth ${categories} AI Tools Analysis | Features, Pricing, Pros & Cons | Which is Better? | AllAITools.tech`;
    }
    return 'Compare Best AI Tools 2025: Side-by-Side Feature Analysis, Pricing Comparison & Expert Reviews | Find Your Perfect AI Solution | AllAITools.tech';
  };

  const getAdvancedPageDescription = () => {
    if (tools.length >= 2) {
      const toolNames = tools.map(t => t.name).join(', ');
      const mainCategories = [...new Set(tools.flatMap(t => t.category))].slice(0, 3).join(', ');
      const pricingInfo = tools.map(t => `${t.name} (${t.pricing})`).join(', ');
      const avgRating = (tools.reduce((sum, t) => sum + t.rating, 0) / tools.length).toFixed(1);
      
      return `Comprehensive ${tools.map(t => t.name).join(' vs ')} comparison 2025. Expert analysis comparing ${toolNames} across features, pricing, performance, and user experience. Detailed breakdown: ${pricingInfo}. Average rating: ${avgRating}/5. Compare ${mainCategories} capabilities, API access, integration options, and real-world use cases. Which AI tool offers better value? Read honest pros/cons, pricing analysis, feature comparison matrix, and user reviews. Perfect for businesses choosing between ${toolNames}. Free trials, discount codes, and alternatives included. Make data-driven decisions with our comprehensive AI tool comparison guide covering ${mainCategories} solutions.`;
    }
    
    return 'Compare AI tools side-by-side with our advanced comparison platform. Analyze features, pricing, pros and cons across 3000+ AI solutions including chatgpt alternatives, notion ai competitors, free ai tools, coding assistants, image generators, and business automation tools. Expert reviews, user ratings, and detailed feature matrices help you choose the perfect AI solution. Compare allaitools directory features including free trials, API access, pricing plans, and integration capabilities. Find the best AI tools for your specific needs with our comprehensive comparison engine.';
  };

  const getAdvancedKeywords = () => {
    const baseComparisonKeywords = [
      'compare ai tools', 'ai tools comparison', 'best ai tools comparison', 'ai software comparison',
      'side by side ai tools', 'ai tool vs ai tool', 'which ai tool is better',
      'ai comparison matrix', 'ai tools feature comparison', 'ai pricing comparison'
    ];
    
    const toolSpecificKeywords = tools.length >= 2 ? tools.flatMap((tool, i) => {
      const otherTools = tools.filter((_, j) => j !== i);
      return otherTools.flatMap(otherTool => [
        `${tool.name} vs ${otherTool.name}`,
        `${tool.name} or ${otherTool.name}`,
        `${tool.name} versus ${otherTool.name}`,
        `compare ${tool.name} and ${otherTool.name}`,
        `${tool.name} alternative to ${otherTool.name}`,
        `${tool.name} ${otherTool.name} comparison`,
        `is ${tool.name} better than ${otherTool.name}`,
        `${tool.name} vs ${otherTool.name} 2025`
      ]);
    }) : [];
    
    const categoryKeywords = tools.length > 0 ? [...new Set(tools.flatMap(t => t.category))].flatMap(cat => [
      `best ${cat} ai tools comparison`,
      `compare ${cat} ai software`,
      `${cat} ai tools side by side`,
      `top ${cat} ai solutions comparison`
    ]) : [];
    
    const featureKeywords = [
      'ai api comparison', 'free ai tools comparison', 'premium ai tools comparison',
      'ai tools pricing comparison', 'ai features matrix', 'ai capabilities comparison',
      'business ai tools comparison', 'enterprise ai comparison', 'ai automation comparison'
    ];
    
    const competitorKeywords = [
      'chatgpt vs claude', 'notion ai vs jasper', 'midjourney vs dall-e',
      'grammarly vs copy ai', 'canva vs adobe ai', 'github copilot vs tabnine',
      'openai vs anthropic', 'stable diffusion vs midjourney', 'jasper vs writesonic'
    ];
    
    const brandKeywords = [
      'allaitools', 'all ai tools', 'futurepedia alternative', 'topaitools comparison',
      'there\'s an ai for that comparison', 'aitoolbazaar', 'best ai directory comparison',
      'ai tools newsletter', 'productivity ai tools', 'no code ai tools comparison'
    ];
    
    const intentKeywords = [
      'which ai tool should i choose', 'best ai tool for', 'find my perfect ai tool',
      'ai tool recommendation', 'choose between ai tools', 'ai tool decision',
      'compare all ai tools', 'ai tools pros and cons', 'honest ai comparison'
    ];
    
    return [...baseComparisonKeywords, ...toolSpecificKeywords, ...categoryKeywords, 
            ...featureKeywords, ...competitorKeywords, ...brandKeywords, ...intentKeywords]
           .slice(0, 100).join(', ');
  };

  const getComparisonStructuredData = () => {
    if (tools.length < 2) return {};
    
    return {
      "@context": "https://schema.org",
      "@type": "ComparisonPage",
      "name": `${tools.map(t => t.name).join(' vs ')} Comparison`,
      "description": getAdvancedPageDescription(),
      "url": `https://www.allaitools.tech/compare${location.search}`,
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": tools.length,
        "itemListElement": tools.map((tool, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "SoftwareApplication",
            "name": tool.name,
            "description": tool.shortDescription,
            "url": tool.url,
            "applicationCategory": "AIApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": tool.pricing === "Free" ? "0" : "varies",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": tool.rating,
              "reviewCount": tool.reviewCount
            },
            "featureList": tool.features.slice(0, 10)
          }
        }))
      },
      "author": {
        "@type": "Organization",
        "name": "AllAITools.tech"
      },
      "publisher": {
        "@type": "Organization",
        "name": "AllAITools.tech",
        "logo": "https://www.allaitools.tech/og-image.png"
      },
      "datePublished": "2024-01-01",
      "dateModified": new Date().toISOString().split('T')[0]
    };
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
        <title>{getAdvancedPageTitle()}</title>
        <meta name="description" content={getAdvancedPageDescription()} />
        <meta name="keywords" content={getAdvancedKeywords()} />
        
        {/* Advanced SEO Meta Tags */}
        <meta name="author" content="AllAITools.tech Comparison Team" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="2 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="coverage" content="worldwide" />
        <meta name="target" content="AI tool buyers, business decision makers, developers" />
        
        {/* Enhanced Open Graph */}
        <meta property="og:title" content={getAdvancedPageTitle()} />
        <meta property="og:description" content={getAdvancedPageDescription()} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.allaitools.tech/compare${location.search}`} />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${tools.map(t => t.name).join(' vs ')} AI Tools Comparison`} />
        <meta property="og:site_name" content="AllAITools.tech - Best AI Tools Directory 2025" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:author" content="AllAITools.tech" />
        <meta property="article:section" content="AI Tools Comparison" />
        <meta property="article:tag" content={tools.map(t => t.name).join(', ')} />
        
        {/* Enhanced Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getAdvancedPageTitle()} />
        <meta name="twitter:description" content={getAdvancedPageDescription()} />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="twitter:site" content="@AIToolsDirectory" />
        <meta name="twitter:creator" content="@AIToolsDirectory" />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#667eea" />
        <meta name="application-name" content="AI Tools Comparison" />
        <meta name="apple-mobile-web-app-title" content="AI Tools Compare" />
        
        {/* Canonical */}
        <link rel="canonical" href={`https://www.allaitools.tech/compare${location.search}`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(getComparisonStructuredData())}
        </script>
        
        {/* FAQ Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": tools.length >= 2 ? [
              {
                "@type": "Question",
                "name": `What's the difference between ${tools[0]?.name} and ${tools[1]?.name}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `${tools[0]?.name} is ${tools[0]?.shortDescription} while ${tools[1]?.name} is ${tools[1]?.shortDescription}. Key differences include pricing (${tools[0]?.pricing} vs ${tools[1]?.pricing}) and features.`
                }
              },
              {
                "@type": "Question",
                "name": `Which is better: ${tools[0]?.name} or ${tools[1]?.name}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `The choice between ${tools[0]?.name} and ${tools[1]?.name} depends on your specific needs. ${tools[0]?.name} is rated ${tools[0]?.rating}/5 while ${tools[1]?.name} is rated ${tools[1]?.rating}/5. Consider factors like pricing, features, and use cases.`
                }
              },
              {
                "@type": "Question",
                "name": "How do I choose the right AI tool?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Consider your budget, required features, team size, integration needs, and specific use cases. Try free trials when available and read user reviews to make an informed decision."
                }
              }
            ] : []
          })}
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
