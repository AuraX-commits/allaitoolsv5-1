
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Bot, Loader2 } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requirements: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setRecommendations([]);

    try {
      const { data, error } = await supabase.functions.invoke("recommend-tools", {
        body: { requirements: values.requirements },
      });

      if (error) {
        console.error("Error getting recommendations:", error);
        throw new Error(error.message || "Failed to get recommendations");
      }

      console.log("Recommendations response:", data);

      if (data && data.recommendations && Array.isArray(data.recommendations)) {
        setRecommendations(data.recommendations);
      } else {
        console.error("Invalid recommendations format:", data);
        throw new Error("Received invalid recommendation data");
      }
    } catch (error) {
      console.error("Error in recommendation process:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get recommendations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>AI Tool Recommender | AllAITools.tech</title>
        <meta 
          name="description" 
          content="Get personalized AI tool recommendations based on your specific requirements. Our AI analyzes your needs and suggests the best tools for your use case." 
        />
        <meta property="og:title" content="AI Tool Recommender | AllAITools.tech" />
        <meta property="og:description" content="Get personalized AI tool recommendations based on your specific requirements." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://www.allaitools.tech/recommend" />
        <link rel="canonical" href="https://www.allaitools.tech/recommend" />
        
        {/* Schema.org markup for AI Tool Recommender */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "AI Tool Recommender",
            "url": "https://www.allaitools.tech/recommend",
            "description": "Get personalized AI tool recommendations based on your specific requirements.",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "operatingSystem": "All",
            "provider": {
              "@type": "Organization",
              "name": "AllAITools.tech",
              "url": "https://www.allaitools.tech"
            }
          })}
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

          {recommendations.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Recommended Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <CardFooter className="pt-0">
                      <Button asChild className="w-full">
                        <a href={tool.url} target="_blank" rel="noopener noreferrer">Visit Tool</a>
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
