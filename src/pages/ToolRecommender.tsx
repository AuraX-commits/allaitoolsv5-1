
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Bot, Loader2, ExternalLink, Check, ArrowRight, AlertCircle } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  requirements: z.string().min(10, "Requirements must be at least 10 characters long"),
});

type Recommendation = {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string[];
  url: string;
  reasoning: string;
};

const ToolRecommender = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requirements: "",
    },
  });

  const pageTitle = "AI Tool Recommender | Personalized AI Solution Finder | AllAITools.tech";
  const pageDescription = "Get personalized AI tool recommendations based on your specific requirements. Our advanced AI matching system analyzes your needs across use cases, budget, features, and technical requirements to suggest the perfect AI tools for your unique situation. Save hours of research with custom AI tool recommendations tailored to your business, creative, or development projects.";
  
  const seoKeywords = "AI tool recommender, personalized AI recommendations, find right AI tool, AI solution matcher, AI tool finder, best AI for my needs, custom AI recommendations, AI selection assistant, AI software recommendation engine, which AI tool should I use, AI advisor, AI tool selector, personalized technology recommendations, AI solution consultant, intelligent software recommendations, AI use case matcher, recommended AI tools, AI product matchmaker, AI requirements analyzer, tailored AI suggestions, AI recommendation algorithm, find best AI software, AI tool compatibility, AI feature matcher, which AI is best for me, AI decision assistant, suggested AI tools, AI requirements evaluation, personal AI consultant, AI comparison helper";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setRecommendations([]);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke("recommend-tools", {
        body: { requirements: values.requirements },
      });

      if (error) {
        console.error("Error getting recommendations:", error);
        throw new Error(error.message || "Failed to get recommendations");
      }

      console.log("Recommendations response:", data);

      if (data && data.error) {
        throw new Error(data.error);
      }

      if (data && data.recommendations && Array.isArray(data.recommendations)) {
        if (data.recommendations.length === 0) {
          setError("No matching tools found for your requirements. Try being more specific or explore our tools directory.");
        } else {
          // Limit to showing only 4 recommendations maximum
          setRecommendations(data.recommendations.slice(0, 4));
        }
      } else {
        console.error("Invalid recommendations format:", data);
        throw new Error("Received invalid recommendation data");
      }
    } catch (error) {
      console.error("Error in recommendation process:", error);
      setError(error instanceof Error ? error.message : "Failed to get recommendations");
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get recommendations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToToolPage = (toolId: string, toolName: string) => {
    const slug = toolName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    navigate(`/tool/${toolId}/${slug}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://www.allaitools.tech/recommend" />
        <meta property="og:site_name" content="All AI Tools Directory" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="twitter:site" content="@AIToolsDirectory" />
        
        <meta name="keywords" content={seoKeywords} />
        <link rel="canonical" href="https://www.allaitools.tech/recommend" />
        
        <meta name="robots" content="index, follow" />
        <meta name="author" content="AI Tools Directory Team" />
        
        {/* Schema.org WebApplication markup */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "AI Tool Recommender",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "${pageDescription}",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "156",
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5",
                  "worstRating": "1"
                },
                "author": {
                  "@type": "Person",
                  "name": "AI Technology Expert"
                },
                "datePublished": "2025-03-15",
                "reviewBody": "The AI Tool Recommender saved me hours of research by instantly suggesting the perfect AI solutions for my specific needs. Highly recommended for anyone overwhelmed by the number of AI tools available today."
              },
              "potentialAction": {
                "@type": "UseAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.allaitools.tech/recommend",
                  "actionPlatform": [
                    "http://schema.org/DesktopWebPlatform",
                    "http://schema.org/MobileWebPlatform"
                  ]
                },
                "expectsAcceptanceOf": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                }
              }
            }
          `}
        </script>
        
        {/* HowTo Schema for using the recommender */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to Get Personalized AI Tool Recommendations",
              "description": "Follow these steps to receive custom AI tool recommendations based on your specific requirements.",
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Describe Your Requirements",
                  "text": "Enter your specific needs, use cases, budget constraints, and desired features in the text field provided."
                },
                {
                  "@type": "HowToStep",
                  "name": "Submit Your Request",
                  "text": "Click the 'Get AI Tool Recommendations' button to submit your request for analysis."
                },
                {
                  "@type": "HowToStep",
                  "name": "Review Recommendations",
                  "text": "Review the personalized AI tool recommendations that match your specific requirements."
                },
                {
                  "@type": "HowToStep",
                  "name": "Explore Tool Details",
                  "text": "Click on the recommended tools to learn more about their features, pricing, and benefits."
                }
              ]
            }
          `}
        </script>
        
        {/* FAQ Schema for common questions */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How does the AI Tool Recommender work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our AI Tool Recommender analyzes your specific requirements and matches them against our database of hundreds of AI tools. The recommendation engine considers factors like use case, budget, technical requirements, and features to suggest the most suitable AI tools for your needs."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are the AI tool recommendations free?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, our AI Tool Recommender service is completely free to use. We provide unbiased recommendations to help you find the right AI solutions for your specific requirements."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How accurate are the recommendations?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our recommendation engine is continuously improved based on user feedback and the latest AI tool data. While we strive for high accuracy, the quality of recommendations depends on how detailed your requirements are. The more specific you are about your needs, the better recommendations you'll receive."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I get recommendations for specific industries?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! Our AI Tool Recommender can provide industry-specific recommendations. Simply mention your industry and specific use cases in your requirements to receive the most relevant suggestions for your field."
                  }
                }
              ]
            }
          `}
        </script>
      </Helmet>

      <Navbar />

      <main className="flex-grow container max-w-6xl px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          AI Tool Recommender
        </h1>
        <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
          Describe your needs, use cases, or problems you're trying to solve, and our AI will recommend the best tools tailored to your requirements.
        </p>

        <div className="grid grid-cols-1 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="mr-2 h-6 w-6" />
                What are you looking for?
              </CardTitle>
              <CardDescription>
                Be specific about your needs, budget constraints, and desired features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="requirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Requirements</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Example: I need an AI tool that can help me generate marketing content for social media, with an affordable pricing plan for a small business. It should be easy to use and integrate with Canva."
                            className="min-h-[150px] resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The more detail you provide, the better recommendations you'll receive.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Finding the best tools...
                      </>
                    ) : (
                      "Get AI Tool Recommendations"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}

          {recommendations.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Recommended Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.map((tool) => (
                  <Card key={tool.id} className="overflow-hidden flex flex-col h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3 mb-2">
                        {tool.logo && (
                          <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={tool.logo} 
                              alt={`${tool.name} logo`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <CardTitle className="text-xl">{tool.name}</CardTitle>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tool.category?.map((cat, i) => (
                          <span 
                            key={i}
                            className="px-2 py-1 bg-muted text-xs rounded-full"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4 flex-grow">
                      <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                      <div className="mt-2">
                        <h4 className="text-sm font-semibold mb-1">Why this tool?</h4>
                        <p className="text-sm">{tool.reasoning}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 flex flex-col sm:flex-row gap-2 w-full">
                      <Button 
                        variant="default" 
                        className="w-full"
                        onClick={() => navigateToToolPage(tool.id, tool.name)}
                      >
                        View Tool Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                     
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ToolRecommender;
