
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";
import { Lightbulb, Send, Loader2 } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabaseClient";
import { mapRowToAITool } from "@/utils/toolsData";
import { Link } from "react-router-dom";

interface Recommendation {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string[];
  url: string;
  reasoning: string;
}

const ToolRecommender = () => {
  const [requirements, setRequirements] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!requirements.trim()) {
      toast({
        title: "Missing information",
        description: "Please describe your requirements first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("recommend-tools", {
        body: { requirements },
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      setRecommendations(data.recommendations || []);
      
      if ((data.recommendations || []).length === 0) {
        toast({
          title: "No matches found",
          description: "Try providing more specific requirements or using different keywords.",
        });
      }
    } catch (error) {
      console.error("Error getting recommendations:", error);
      toast({
        title: "Error",
        description: "Failed to get tool recommendations. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Tool Recommender | Find the Perfect AI Tools for Your Needs | AllAITools.tech</title>
        <meta
          name="description"
          content="Get personalized AI tool recommendations based on your specific requirements. Our AI analyzes your needs and suggests the best tools from our curated database of top AI solutions."
        />
        <meta name="keywords" content="AI tool recommender, personalized AI recommendations, best AI tools, AI solutions, AI software recommendations" />
        <meta property="og:title" content="AI Tool Recommender | Find the Perfect AI Tools for Your Needs | AllAITools.tech" />
        <meta property="og:description" content="Get personalized AI tool recommendations based on your specific requirements. Our AI analyzes your needs and suggests the best tools from our curated database." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.allaitools.tech/recommend" />
        <meta property="og:site_name" content="AllAITools.tech" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Tool Recommender | Find the Perfect AI Tools for Your Needs | AllAITools.tech" />
        <meta name="twitter:description" content="Get personalized AI tool recommendations based on your specific requirements. Our AI analyzes your needs and suggests the best tools from our curated database." />
        <link rel="canonical" href="https://www.allaitools.tech/recommend" />
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI Tool Recommender</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Tell us your specific needs and requirements, and our AI will recommend the best tools for you from our curated database.
          </p>
        </div>
        
        <Card className="mb-10">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="requirements" className="block text-lg font-medium mb-2">
                  What kind of AI tool are you looking for?
                </label>
                <Textarea
                  id="requirements"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Describe your requirements in detail. For example: 'I need an AI tool that can help me write marketing copy for social media posts and analyze their performance.'"
                  className="min-h-[150px]"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  <Lightbulb className="inline w-4 h-4 mr-1" />
                  The more details you provide, the better recommendations you'll get.
                </p>
              </div>
              
              <div className="text-center">
                <Button type="submit" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Finding the perfect tools...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Get Recommendations
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {recommendations.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Recommended Tools for You</h2>
            
            {recommendations.map((tool) => (
              <Card key={tool.id} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 bg-secondary flex items-center justify-center">
                      <img 
                        src={tool.logo} 
                        alt={`${tool.name} logo`} 
                        className="h-full w-full object-contain" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{tool.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {tool.category.slice(0, 3).map((cat) => (
                          <span 
                            key={cat} 
                            className="inline-block px-2 py-1 bg-secondary text-xs rounded-full"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-muted/40 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Why we recommend this:</h4>
                    <p className="text-muted-foreground">{tool.reasoning}</p>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Link 
                      to={`/tool/${tool.id}`}
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </>
  );
};

export default ToolRecommender;
