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
        <title>{tool.name} | AI Tools Directory</title>
        <meta
          name="description"
          content={tool.shortDescription}
        />
        <meta property="og:title" content={`${tool.name} | AI Tools Directory`} />
        <meta property="og:description" content={tool.shortDescription} />
        <meta property="og:image" content={tool.logo} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://www.allaitools.tech/tool/${id}`} />
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
                <h1 className="text-4xl font-bold mb-2">{tool.name}</h1>
                <div className="flex items-center text-foreground/70 mb-6">
                  <span className="flex items-center">
                    {renderStars(tool.rating)}
                    <span className="ml-2">
                      {tool.rating.toFixed(1)} ({tool.reviewCount} reviews)
                    </span>
                  </span>
                  <span className="mx-3">•</span>
                  <span>{tool.pricing}</span>
                </div>

                <p className="text-lg mb-8">{tool.description}</p>

                <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                <ul className="mb-8">
                  {renderFeatureList(tool.features)}
                </ul>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Categories</h2>
                  <div className="flex flex-wrap gap-2">
                    {tool.category.map((cat) => (
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
                      {tool.pros?.map((pro, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{pro}</span>
                        </li>
                      )) || <p>No pros information available.</p>}
                    </ul>
                  </TabsContent>
                  <TabsContent value="cons" className="mt-4">
                    <ul className="space-y-2">
                      {tool.cons?.map((con, index) => (
                        <li key={index} className="flex items-start">
                          <ChevronRight className="h-5 w-5 mr-2 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>{con}</span>
                        </li>
                      )) || <p>No cons information available.</p>}
                    </ul>
                  </TabsContent>
                  <TabsContent value="usecases" className="mt-4">
                    <ul className="space-y-2">
                      {tool.useCases?.map((useCase, index) => (
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
                <Card>
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <img
                        src={tool.logo}
                        alt={`${tool.name} logo`}
                        className="h-24 w-24 object-contain"
                      />
                    </div>
                    <CardTitle className="text-center">{tool.name}</CardTitle>
                    <CardDescription className="text-center">
                      {tool.pricing}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button asChild className="w-full">
                      <a href={tool.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </Button>
                    
                    <SaveToolButton toolId={tool.id} />
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-2">API Access</h3>
                      <div className="flex items-center">
                        {tool.apiAccess ? (
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
                    <Button variant="outline" onClick={() => navigate(`/compare?tools=${tool.id}`)} className="w-full">
                      Compare with other tools
                    </Button>
                  </CardFooter>
                </Card>
              </div>
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
