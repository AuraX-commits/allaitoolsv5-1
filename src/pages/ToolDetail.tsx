import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ExternalLink, Star, Check, ChevronRight, ChevronLeft } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { type AITool, mapRowToAITool } from "@/utils/toolsData";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SaveToolButton from "@/components/tool/SaveToolButton";
import ReviewsList from "@/components/reviews/ReviewsList";
import CommentsList from "@/components/reviews/CommentsList";

const ToolDetail = () => {
  const { id, name } = useParams();
  const navigate = useNavigate();
  const [tool, setTool] = useState<AITool | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [nextTool, setNextTool] = useState<AITool | null>(null);
  const [prevTool, setPrevTool] = useState<AITool | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchTool = async () => {
      setIsLoading(true);
      try {
        // Get the tool from Supabase
        const { data, error } = await supabase
          .from('ai_tools')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error("Error fetching from Supabase:", error);
          // If there's an error with Supabase, handle the error
          setTool(null);
        } else {
          // If we successfully got the tool from Supabase
          const mappedTool = mapRowToAITool(data);
          setTool(mappedTool);
          
          // Get next and previous tools for navigation
          const { data: allTools } = await supabase
            .from('ai_tools')
            .select('*')
            .order('name', { ascending: true });
          
          if (allTools) {
            const allMappedTools = allTools.map(mapRowToAITool);
            const currentIndex = allMappedTools.findIndex(t => t.id === id);
            setNextTool(allMappedTools[currentIndex + 1] || null);
            setPrevTool(allMappedTools[currentIndex - 1] || null);
          }
        }
      } catch (error) {
        console.error("Error fetching tool:", error);
        setTool(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchTool();
    }
  }, [id]);

  const navigateToTool = (toolId: string, toolName: string) => {
    const slug = toolName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/tool/${toolId}/${slug}`);
  };

  // Fixed function to navigate to the compare page
  const navigateToCompare = () => {
    if (tool?.id) {
      // Ensure we're encoding the tool ID properly in the URL
      navigate(`/compare?tools=${encodeURIComponent(tool.id)}`);
    }
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ));
  };

  const renderFeatureList = (features: string[]) => {
    return features.map((feature, index) => (
      <li key={index} className="flex items-start mb-2">
        <Check className="h-5 w-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
        <span>{feature}</span>
      </li>
    ));
  };

  const getAdvancedPageTitle = () => {
    if (!tool) return 'AI Tool Details | AllAITools.tech';
    
    const categoryKeywords = tool.category.slice(0, 2).join(' & ');
    const pricingKeyword = tool.pricing === 'Free' ? 'Free' : tool.pricing === 'Freemium' ? 'Free & Premium' : 'Premium';
    
    return `${tool.name} Review 2025: ${pricingKeyword} ${categoryKeywords} AI Tool | Features, Pricing, Alternatives & User Reviews | AllAITools.tech Directory`;
  };

  const getAdvancedPageDescription = () => {
    if (!tool) return 'Comprehensive AI tool review with features, pricing, and alternatives.';
    
    const mainFeatures = tool.features.slice(0, 4).join(', ');
    const categoryList = tool.category.join(', ');
    const ratingText = `${tool.rating}/5 stars from ${tool.reviewCount} reviews`;
    
    return `In-depth ${tool.name} review 2025: ${tool.shortDescription} Comprehensive analysis of features including ${mainFeatures}. ${pricingKeyword} pricing model with ${tool.pricing} plans. Expert review reveals pros, cons, use cases, and best alternatives. ${ratingText}. Perfect for ${categoryList} needs. Compare with similar AI tools, read user feedback, and discover if ${tool.name} is worth it for your business. Find free trials, API access details, and honest evaluation of this ${categoryList} solution. Make informed decisions with our detailed feature comparison, pricing analysis, and real-world testing results.`;
  };

  const getAdvancedKeywords = () => {
    if (!tool) return '';
    
    const baseKeywords = [
      `${tool.name} review`, `${tool.name} pricing`, `${tool.name} features`, `${tool.name} alternatives`,
      `${tool.name} vs competitors`, `is ${tool.name} worth it`, `${tool.name} free trial`,
      `${tool.name} API`, `${tool.name} tutorial`, `how to use ${tool.name}`,
      `${tool.name} coupon`, `${tool.name} discount`, `${tool.name} login`,
      `${tool.name} affiliate`, `${tool.name} use cases`, `${tool.name} credits`,
      `best ${tool.name} alternative`, `${tool.name} comparison`, `${tool.name} honest review`
    ];
    
    const categoryKeywords = tool.category.flatMap(cat => [
      `best ${cat} AI tools`, `${cat} AI software`, `${cat} artificial intelligence`,
      `top ${cat} tools 2025`, `free ${cat} AI tools`, `${cat} AI solutions`,
      `${cat} AI for business`, `${cat} AI automation`, `${cat} machine learning tools`
    ]);
    
    const featureKeywords = tool.features.slice(0, 8).map(feature => 
      `AI ${feature.toLowerCase()}`
    );
    
    const pricingKeywords = [
      `${tool.pricing.toLowerCase()} AI tools`, `${tool.pricing.toLowerCase()} ${tool.category[0]}`,
      `affordable AI tools`, `budget AI solutions`, `enterprise AI pricing`
    ];
    
    const competitorKeywords = [
      'chatgpt alternative', 'notion ai alternative', 'jasper ai alternative',
      'copy ai alternative', 'grammarly ai alternative', 'canva ai alternative',
      'midjourney alternative', 'stable diffusion alternative', 'openai alternative'
    ];
    
    const generalAIKeywords = [
      'allaitools', 'all ai tools', 'best ai tools 2025', 'ai tools directory',
      'free ai tools', 'productivity ai tools', 'no code ai tools',
      'ai for beginners', 'ai tool finder', 'compare ai tools',
      'ai tools review', 'artificial intelligence tools', 'machine learning tools',
      'generative ai tools', 'ai automation tools', 'business ai tools'
    ];
    
    return [...baseKeywords, ...categoryKeywords, ...featureKeywords, ...pricingKeywords, ...competitorKeywords, ...generalAIKeywords].slice(0, 80).join(', ');
  };

  const getStructuredData = () => {
    if (!tool) return {};
    
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": tool.name,
      "description": tool.description,
      "applicationCategory": "AIApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": tool.pricing === "Free" ? "0" : "varies",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": tool.rating,
        "reviewCount": tool.reviewCount,
        "bestRating": "5",
        "worstRating": "1"
      },
      "creator": {
        "@type": "Organization",
        "name": "AI Tool Developer"
      },
      "datePublished": "2024-01-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "image": tool.logo,
      "url": tool.url,
      "sameAs": [tool.url],
      "featureList": tool.features,
      "applicationSubCategory": tool.category,
      "softwareVersion": "Latest",
      "downloadUrl": tool.url,
      "screenshot": tool.logo,
      "video": {
        "@type": "VideoObject",
        "name": `${tool.name} Demo Video`,
        "description": `Learn how to use ${tool.name} effectively`
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": tool.rating,
          "bestRating": "5"
        },
        "author": {
          "@type": "Organization",
          "name": "AllAITools.tech"
        },
        "reviewBody": `Comprehensive review of ${tool.name}: ${tool.shortDescription}`
      }
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-20">
          <div className="container px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8 mb-12">
                <div className="w-full md:w-2/3">
                  <Skeleton className="h-12 w-3/4 mb-4" />
                  <Skeleton className="h-6 w-1/2 mb-8" />
                  <div className="space-y-2 mb-8">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/6" />
                  </div>
                  
                  <Skeleton className="h-8 w-40 mb-4" />
                  <div className="space-y-2 mb-8">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-4/5" />
                  </div>
                </div>
                
                <div className="w-full md:w-1/3">
                  <Card>
                    <CardHeader>
                      <Skeleton className="h-24 w-24 rounded-md mx-auto mb-4" />
                      <Skeleton className="h-6 w-2/3 mx-auto" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-20">
          <div className="container px-4">
            <div className="max-w-5xl mx-auto text-center py-12">
              <h1 className="text-3xl font-bold mb-4">Tool Not Found</h1>
              <p className="text-lg text-foreground/70 mb-8">
                The AI tool you're looking for doesn't seem to exist.
              </p>
              <Button onClick={() => navigate("/")}>
                Return to Directory
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{getAdvancedPageTitle()}</title>
        <meta name="description" content={getAdvancedPageDescription()} />
        <meta name="keywords" content={getAdvancedKeywords()} />
        
        {/* Advanced SEO Meta Tags */}
        <meta name="author" content="AllAITools.tech Expert Review Team" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="3 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="coverage" content="worldwide" />
        
        {/* Open Graph Enhanced */}
        <meta property="og:title" content={getAdvancedPageTitle()} />
        <meta property="og:description" content={getAdvancedPageDescription()} />
        <meta property="og:image" content={tool?.logo || '/og-image.png'} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${tool?.name} AI Tool Logo and Interface`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.allaitools.tech/tool/${id}/${name}`} />
        <meta property="og:site_name" content="AllAITools.tech - Best AI Tools Directory 2025" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:author" content="AllAITools.tech" />
        <meta property="article:published_time" content="2024-01-01T00:00:00Z" />
        <meta property="article:modified_time" content={new Date().toISOString()} />
        <meta property="article:section" content="AI Tools Review" />
        <meta property="article:tag" content={tool?.category.join(', ') || 'AI Tools'} />
        
        {/* Twitter Enhanced */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getAdvancedPageTitle()} />
        <meta name="twitter:description" content={getAdvancedPageDescription()} />
        <meta name="twitter:image" content={tool?.logo || '/og-image.png'} />
        <meta name="twitter:image:alt" content={`${tool?.name} AI Tool Review and Features`} />
        <meta name="twitter:site" content="@AIToolsDirectory" />
        <meta name="twitter:creator" content="@AIToolsDirectory" />
        <meta name="twitter:label1" content="Rating" />
        <meta name="twitter:data1" content={`${tool?.rating}/5 stars`} />
        <meta name="twitter:label2" content="Price" />
        <meta name="twitter:data2" content={tool?.pricing || 'Varies'} />
        
        {/* Additional SEO Tags */}
        <meta name="theme-color" content="#667eea" />
        <meta name="msapplication-TileColor" content="#667eea" />
        <meta name="application-name" content="AllAITools.tech" />
        <meta name="apple-mobile-web-app-title" content={`${tool?.name} Review | AllAITools`} />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Canonical and Alternatives */}
        <link rel="canonical" href={`https://www.allaitools.tech/tool/${id}/${name}`} />
        <link rel="alternate" hrefLang="en" href={`https://www.allaitools.tech/tool/${id}/${name}`} />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href={new URL(tool?.url || 'https://example.com').origin} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(getStructuredData())}
        </script>
        
        {/* Additional Structured Data for Breadcrumbs */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.allaitools.tech"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "AI Tools",
                "item": "https://www.allaitools.tech/categories"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": tool?.category[0] || "AI Tool",
                "item": `https://www.allaitools.tech/categories/${encodeURIComponent(tool?.category[0] || 'AI')}`
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": tool?.name || "Tool",
                "item": `https://www.allaitools.tech/tool/${id}/${name}`
              }
            ]
          })}
        </script>
        
        {/* FAQ Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `What is ${tool?.name}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": tool?.description || `${tool?.name} is an AI tool for ${tool?.category[0]}`
                }
              },
              {
                "@type": "Question",
                "name": `How much does ${tool?.name} cost?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `${tool?.name} offers ${tool?.pricing} pricing model. Check the official website for detailed pricing information.`
                }
              },
              {
                "@type": "Question",
                "name": `What are the main features of ${tool?.name}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `${tool?.name} key features include: ${tool?.features.slice(0, 5).join(', ')}.`
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            {/* Navigation between tools */}
            <div className="flex justify-between mb-6">
              {prevTool ? (
                <Button
                  variant="ghost"
                  onClick={() => navigateToTool(prevTool.id, prevTool.name)}
                  className="flex items-center"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous Tool
                </Button>
              ) : (
                <div></div>
              )}

              {nextTool ? (
                <Button
                  variant="ghost"
                  onClick={() => navigateToTool(nextTool.id, nextTool.name)}
                  className="flex items-center"
                >
                  Next Tool
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <div></div>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-8 mb-12">
              <div className="w-full md:w-2/3">
                <h1 className="text-4xl font-bold mb-2">{tool?.name}</h1>
                <div className="flex items-center text-foreground/70 mb-6">
                  <span className="flex items-center">
                    {tool && renderStars(tool.rating)}
                    <span className="ml-2">
                      {tool?.rating.toFixed(1)} ({tool?.reviewCount} reviews)
                    </span>
                  </span>
                  <span className="mx-3">•</span>
                  <span>{tool?.pricing}</span>
                </div>

                <p className="text-lg mb-8">{tool?.description}</p>

                <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                <ul className="mb-8">
                  {tool && renderFeatureList(tool.features)}
                </ul>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Categories</h2>
                  <div className="flex flex-wrap gap-2">
                    {tool?.category.map((cat) => (
                      <Badge key={cat} variant="secondary">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Tabs defaultValue="pros" className="mb-8">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="pros">Pros</TabsTrigger>
                    <TabsTrigger value="cons">Cons</TabsTrigger>
                    <TabsTrigger value="usecases">Use Cases</TabsTrigger>
                  </TabsList>
                  <TabsContent value="pros" className="mt-4">
                    <ul className="space-y-2">
                      {tool?.pros?.map((pro, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{pro}</span>
                        </li>
                      )) || <p>No pros information available.</p>}
                    </ul>
                  </TabsContent>
                  <TabsContent value="cons" className="mt-4">
                    <ul className="space-y-2">
                      {tool?.cons?.map((con, index) => (
                        <li key={index} className="flex items-start">
                          <ChevronRight className="h-5 w-5 mr-2 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>{con}</span>
                        </li>
                      )) || <p>No cons information available.</p>}
                    </ul>
                  </TabsContent>
                  <TabsContent value="usecases" className="mt-4">
                    <ul className="space-y-2">
                      {tool?.useCases?.map((useCase, index) => (
                        <li key={index} className="flex items-start">
                          <ChevronRight className="h-5 w-5 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{useCase}</span>
                        </li>
                      )) || <p>No use case information available.</p>}
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="w-full md:w-1/3">
                <Card className="sticky top-24">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <img
                        src={tool?.logo}
                        alt={`${tool?.name} logo`}
                        className="h-24 w-24 object-contain"
                      />
                    </div>
                    <CardTitle className="text-center">{tool?.name}</CardTitle>
                    <CardDescription className="text-center">
                      {tool?.pricing}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Add to Toolkit button - replaced Save button */}
                    {tool && <SaveToolButton toolId={tool.id} />}
                    
                    <Button asChild className="w-full">
                      <a href={tool?.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </Button>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-2">API Access</h3>
                      <div className="flex items-center">
                        {tool?.apiAccess ? (
                          <>
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            <span>Available</span>
                          </>
                        ) : (
                          <>
                            <ChevronRight className="h-5 w-5 text-muted-foreground mr-2" />
                            <span>Not available</span>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      onClick={navigateToCompare} 
                      className="w-full"
                    >
                      Compare with other tools
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>

            {/* Reviews and Comments Section */}
            <div className="space-y-12">
              <Separator />
              <ReviewsList toolId={id!} toolName={tool.name} />
              <Separator />
              <CommentsList toolId={id!} />
            </div>
          </div>
        </div>
        <ScrollToTop />
      </main>

      <Footer />
    </div>
  );
};

export default ToolDetail;
