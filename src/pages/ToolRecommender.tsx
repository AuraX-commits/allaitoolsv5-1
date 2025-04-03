
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Search, Lightbulb, Loader2 } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface RecommendedTool {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string[];
  url: string;
  reasoning: string;
}

const formSchema = z.object({
  requirements: z.string().min(10, "Please describe your requirements in at least 10 characters"),
});

const ToolRecommender = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedTools, setRecommendedTools] = useState<RecommendedTool[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requirements: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setRecommendedTools([]);

    try {
      // Fetch AI recommendations
      const response = await fetch('/api/recommend-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requirements: values.requirements }),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();
      setRecommendedTools(data.recommendations);

    } catch (error: any) {
      console.error('Error getting tool recommendations:', error);
      toast({
        title: "Error getting recommendations",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>AI Tool Recommender | AIDirectory</title>
        <meta 
          name="description" 
          content="Get personalized AI tool recommendations based on your specific needs and requirements." 
        />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow">
        <div className="container px-4 py-12 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              AI Tool Recommender
            </h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Describe what you're looking to accomplish, and our AI will recommend the best tools for your needs.
            </p>
          </div>
          
          <div className="bg-card rounded-lg border shadow-sm p-6 md:p-8 mb-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe what you need to accomplish. For example: 'I need a tool to create realistic images from text descriptions' or 'Looking for a chatbot to help with customer support on my website'" 
                          className="min-h-32 text-base"
                          disabled={isLoading}
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        The more details you provide, the better recommendations you'll receive
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
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Get Recommendations
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
          
          {isLoading && (
            <div className="text-center py-16">
              <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
              <p className="text-lg">Analyzing your requirements and searching for the best AI tools...</p>
            </div>
          )}
          
          {!isLoading && recommendedTools.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">Recommended Tools</h2>
              <div className="grid gap-6 md:grid-cols-1">
                {recommendedTools.map((tool) => (
                  <Card key={tool.id} className="overflow-hidden">
                    <CardHeader className="flex flex-row items-start gap-4">
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-secondary/20">
                        <img 
                          src={tool.logo} 
                          alt={`${tool.name} logo`}
                          className="w-full h-full object-contain" 
                        />
                      </div>
                      <div>
                        <CardTitle>{tool.name}</CardTitle>
                        <CardDescription className="mt-1 text-sm">
                          {tool.category.join(", ")}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/80">{tool.description}</p>
                      <div className="mt-4 bg-muted/50 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-sm mb-1">Why this tool matches your needs:</h4>
                            <p className="text-foreground/70">{tool.reasoning}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <a href={tool.url} target="_blank" rel="noopener noreferrer">
                          Visit Website
                        </a>
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
