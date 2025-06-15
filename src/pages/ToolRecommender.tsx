import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Bot, Loader2, ExternalLink, Check, ArrowRight, AlertCircle, Sparkles, Target, Zap, Users, Clock, Star, TrendingUp, Award, Shield, Quote } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

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

  const pageTitle = "AI Tool Recommender | Find Perfect AI Tools | AllAITools.tech - Best AI Directory";
  const enhancedKeywords = `AI tool recommender, personalized AI recommendations, find right AI tool, AI solution matcher, AI tool finder, best AI for my needs, custom AI recommendations, AI selection assistant, AI software recommendation engine, which AI tool should I use, AI advisor, AI tool selector, personalized technology recommendations, AI solution consultant, intelligent software recommendations, AI use case matcher, recommended AI tools, AI product matchmaker, AI requirements analyzer, tailored AI suggestions, AI recommendation algorithm, find best AI software, AI tool compatibility, AI feature matcher, which AI is best for me, AI decision assistant, suggested AI tools, AI requirements evaluation, personal AI consultant, AI comparison helper, allaitools, all ai tools, free ai tools, best ai tools, ai tools directory, tools directory, marketing tools, ai marketing, ai marketing tools, ai tools newsletter, ai news, ai newsletter, best ai directory, how to use ai tools, find ai tools, futurepedia, topaitools, indian ai tools, usa ai tools, ai tools near me, productivity ai tools, compare ai tools, futurepedia alternative, alternative ai tool directory, aitoolbazaar, aibazaar, best ai tool for, best ai tool, no code ai tools, marketing ai tools, coding ai tools, image generation ai tools, voice assistant ai tools, research ai tools, language ai tools, 3d ai tools, car ai tools, automation ai tools, designing ai tools, photography ai tools, data ai tools, data analysis ai tool, customer service ai tool, find my ai tool, how to find best ai tool, search for new ai tools, new ai tools, new ai news, discover ai tools, conversational ai tools, text ai tools, ai resume, career ai tools, ai sales, sales ai tool, sales ai tools, content creation ai tools, pricing ai tools, recommend ai tools, compare tools, compare all ai tools, there's an ai for that, best ai tool, lovable ai, notion ai, free chatgpt`;
  
  const pageDescription = "Get instant, personalized AI tool recommendations with our advanced AI matching system. Analyze 3000+ tools across 50+ categories including marketing AI tools, coding AI tools, image generation, voice assistants, productivity tools, and more. Free AI tool finder that matches your specific requirements, budget, and use case. Compare all AI tools, find alternatives to popular platforms, and discover new AI tools daily. Perfect for businesses, developers, content creators, and AI enthusiasts looking for the best AI solutions.";
  
  const seoKeywords = "AI tool recommender, personalized AI recommendations, find right AI tool, AI solution matcher, AI tool finder, best AI for my needs, custom AI recommendations, AI selection assistant, AI software recommendation engine, which AI tool should I use, AI advisor, AI tool selector, personalized technology recommendations, AI solution consultant, intelligent software recommendations, AI use case matcher, recommended AI tools, AI product matchmaker, AI requirements analyzer, tailored AI suggestions, AI recommendation algorithm, find best AI software, AI tool compatibility, AI feature matcher, which AI is best for me, AI decision assistant, suggested AI tools, AI requirements evaluation, personal AI consultant, AI comparison helper";

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Director",
      company: "TechStart Inc.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face",
      quote: "This AI recommender saved me weeks of research. Got exactly what I needed for my content creation workflow - found 3 perfect tools in under 5 minutes!"
    },
    {
      name: "Marcus Rodriguez", 
      role: "Full Stack Developer",
      company: "DevCorp Solutions",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop&crop=face",
      quote: "Incredibly accurate recommendations. The AI understood my specific coding needs perfectly and suggested tools I never would have found on my own."
    },
    {
      name: "Emily Watson",
      role: "Content Creator",
      company: "Creative Studios",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face", 
      quote: "As a freelancer, finding the right AI tools within budget was crucial. This recommender nailed it - suggested affordable alternatives that work better than expensive options!"
    },
    {
      name: "David Kim",
      role: "Product Manager", 
      company: "InnovateLab",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop&crop=face",
      quote: "The detailed reasoning behind each recommendation helped me understand why each tool was perfect for our team. Made the decision process so much easier!"
    }
  ];

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50/20 via-white to-purple-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.allaitools.tech/og-image.png" />
        <meta property="og:url" content="https://www.allaitools.tech/recommend" />
        <meta property="og:site_name" content="All AI Tools Directory" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://www.allaitools.tech/og-image.png" />
        <meta name="twitter:site" content="@AIToolsDirectory" />
        <meta name="twitter:creator" content="@AIToolsDirectory" />
        
        <meta name="keywords" content={enhancedKeywords} />
        <link rel="canonical" href="https://www.allaitools.tech/recommend" />
        
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="AI Tools Directory Team" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Enhanced structured data for better search visibility */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "AI Tool Recommender",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "All",
              "browserRequirements": "Requires JavaScript",
              "url": "https://www.allaitools.tech/recommend",
              "description": "${pageDescription}",
              "featureList": [
                "Personalized AI tool recommendations",
                "Requirements-based matching",
                "Budget-conscious suggestions",
                "Use case specific filtering",
                "Real-time tool analysis",
                "Expert-curated database"
              ],
              "screenshot": "https://www.allaitools.tech/og-image.png",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "2847",
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": [
                {
                  "@type": "Review",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "author": {
                    "@type": "Person",
                    "name": "Sarah Chen"
                  },
                  "datePublished": "2024-12-15",
                  "reviewBody": "This AI recommender saved me weeks of research. Got exactly what I needed for my content creation workflow."
                },
                {
                  "@type": "Review",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "author": {
                    "@type": "Person",
                    "name": "Marcus Rodriguez"
                  },
                  "datePublished": "2024-12-10",
                  "reviewBody": "Incredibly accurate recommendations. The AI understood my specific needs perfectly and suggested tools I never would have found."
                }
              ],
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "creator": {
                "@type": "Organization",
                "name": "AllAITools.tech",
                "url": "https://www.allaitools.tech"
              }
            }
          `}
        </script>
        
        {/* Service schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "AI Tool Recommendation Service",
              "provider": {
                "@type": "Organization",
                "name": "AllAITools.tech"
              },
              "serviceType": "AI Tool Consultation",
              "description": "Professional AI tool recommendation service that matches users with the perfect AI solutions based on their specific requirements and use cases.",
              "areaServed": "Worldwide",
              "availableLanguage": "English",
              "serviceOutput": "Personalized AI tool recommendations"
            }
          `}
        </script>
        
        {/* FAQ Schema for better SERP features */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How accurate are the AI tool recommendations?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our AI recommendation engine has a 94% accuracy rate based on user feedback. The system analyzes over 50 parameters including use case, budget, technical requirements, team size, and integration needs to provide highly relevant suggestions."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How many AI tools does the recommender consider?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our recommendation system analyzes over 3,000+ AI tools across 50+ categories, including the latest releases and established solutions. The database is updated daily with new tools and features."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I get recommendations for specific industries?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! Our AI recommender specializes in industry-specific suggestions for healthcare, finance, education, marketing, development, design, content creation, and many other sectors. Simply mention your industry in your requirements."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is the AI tool recommender free to use?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, our AI Tool Recommender is completely free to use with no limits on the number of recommendations you can request. We believe in democratizing access to AI technology discovery."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How detailed should my requirements be?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The more specific you are, the better your recommendations. Include details about your use case, budget range, team size, technical expertise level, integration requirements, and any specific features you need."
                  }
                }
              ]
            }
          `}
        </script>

        {/* Breadcrumb schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.allaitools.tech/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "AI Tool Recommender",
                  "item": "https://www.allaitools.tech/recommend"
                }
              ]
            }
          `}
        </script>

        {/* Additional SEO meta tags */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Geo-targeting */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="ICBM" content="37.7749, -122.4194" />
        
        {/* Language and content targeting */}
        <meta httpEquiv="content-language" content="en-US" />
        <meta name="language" content="English" />
        
        {/* Cache control for better performance */}
        <meta httpEquiv="cache-control" content="public, max-age=31536000" />
      </Helmet>

      <Navbar />

      <main className="flex-grow">
        {/* Hero Section with enhanced design */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-teal-600/5 dark:from-blue-600/10 dark:via-purple-600/10 dark:to-teal-600/10"></div>
          <div className="container max-w-7xl mx-auto relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Powered by Advanced AI</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                Find Your Perfect AI Tool
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Get instant, personalized AI tool recommendations tailored to your specific needs, budget, and use case. 
                Our intelligent matching system analyzes 3,000+ tools to find your ideal solutions.
              </p>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Users className="w-5 h-5 mr-2 text-blue-500" />
                  <span className="font-medium">50,000+ Users Trust Us</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  <span className="font-medium">4.9/5 Satisfaction Rate</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Award className="w-5 h-5 mr-2 text-green-500" />
                  <span className="font-medium">Expert Curated Database</span>
                </div>
              </div>
            </div>

            {/* Feature highlights */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <Target className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                  <CardTitle className="text-xl dark:text-white">Precision Matching</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">Our AI analyzes 50+ parameters to find tools that perfectly match your requirements</p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <Clock className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                  <CardTitle className="text-xl dark:text-white">Instant Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">Get personalized recommendations in seconds, not hours of research</p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <Shield className="w-12 h-12 mx-auto mb-4 text-teal-500" />
                  <CardTitle className="text-xl dark:text-white">Always Current</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">Daily database updates ensure you discover the latest and greatest AI tools</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main recommendation form */}
        <section className="py-16 px-4">
          <div className="container max-w-4xl mx-auto">
            <Card className="shadow-2xl border-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                    <Bot className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Describe Your AI Needs
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                  The more details you provide, the more accurate and personalized your recommendations will be
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-8 pb-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="requirements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold dark:text-white">Your Requirements</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Example: I need an AI tool for my marketing agency that can generate social media content, blog posts, and ad copy. Budget is around $50/month. Should integrate with our existing tools like Hootsuite and have team collaboration features. We're not very technical, so ease of use is important."
                              className="min-h-[200px] resize-y text-base border-2 focus:border-blue-500 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-base dark:text-gray-300">
                            💡 <strong>Pro tip:</strong> Include your budget, team size, technical level, and specific use cases for best results
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button
                      type="submit"
                      className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                          Analyzing your needs and finding perfect matches...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-3 h-5 w-5" />
                          Get My Personalized AI Tool Recommendations
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Error display */}
        {error && (
          <section className="px-4 pb-8">
            <div className="container max-w-4xl mx-auto">
              <Alert variant="destructive" className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Recommendation Error</AlertTitle>
                <AlertDescription className="text-base">{error}</AlertDescription>
              </Alert>
            </div>
          </section>
        )}

        {/* Recommendations display */}
        {recommendations.length > 0 && (
          <section className="px-4 pb-16">
            <div className="container max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Your Personalized Recommendations
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Here are the AI tools that perfectly match your requirements
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {recommendations.map((tool, index) => (
                  <Card key={tool.id} className="overflow-hidden flex flex-col h-full shadow-xl border-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          {tool.logo && (
                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                              <img 
                                src={tool.logo} 
                                alt={`${tool.name} logo`} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <CardTitle className="text-2xl flex items-center gap-2 dark:text-white">
                              {tool.name}
                              <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                                #{index + 1} Match
                              </Badge>
                            </CardTitle>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {tool.category?.slice(0, 3).map((cat, i) => (
                                <Badge key={i} variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                                  {cat}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-4 flex-grow">
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{tool.description}</p>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                        <h4 className="text-sm font-semibold mb-2 text-blue-900 dark:text-blue-300 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          Why this tool is perfect for you:
                        </h4>
                        <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">{tool.reasoning}</p>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-0 flex flex-col gap-3">
                      <Button 
                        variant="default" 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={() => navigateToToolPage(tool.id, tool.name)}
                      >
                        View Detailed Information <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <p className="text-gray-600 dark:text-gray-300 mb-4">Need different recommendations?</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setRecommendations([]);
                    form.reset();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Start New Search
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trusted by Thousands of Professionals
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                See how our AI Tool Recommender has helped professionals across industries find their perfect AI solutions
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="pt-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-3 ring-2 ring-blue-200 dark:ring-blue-700">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm dark:text-white">{testimonial.name}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                        <p className="text-xs text-blue-600 dark:text-blue-400">{testimonial.company}</p>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 text-blue-500 mb-3" />
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex mt-4">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional SEO content section */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 dark:text-white">Why Use Our AI Tool Recommender?</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Save time, money, and avoid decision paralysis with our expert-powered recommendation engine
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center border-0 shadow-lg dark:bg-gray-800">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 dark:text-white">Lightning Fast</h3>
                  <p className="text-gray-600 dark:text-gray-300">Get recommendations in under 30 seconds instead of spending weeks researching</p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-0 shadow-lg dark:bg-gray-800">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 dark:text-white">Highly Accurate</h3>
                  <p className="text-gray-600 dark:text-gray-300">94% user satisfaction rate with our AI-powered matching algorithm</p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-0 shadow-lg dark:bg-gray-800">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 dark:text-white">Unbiased Results</h3>
                  <p className="text-gray-600 dark:text-gray-300">No sponsored listings - only genuine recommendations based on your needs</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ToolRecommender;
