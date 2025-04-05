
import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { pricingOptions, AITool, mapRowToAITool } from "@/utils/toolsData";
import ToolCard from "../components/home/ToolCard";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Skeleton } from "@/components/ui/skeleton";

const Pricing = () => {
  const [selectedPricing, setSelectedPricing] = useState<string>("All");
  const [filteredTools, setFilteredTools] = useState<AITool[]>([]);

  // Fetch tools from Supabase
  const { data: aiTools = [], isLoading, error } = useQuery({
    queryKey: ['aiTools'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*');
      
      if (error) {
        console.error('Error fetching tools:', error);
        throw new Error(error.message);
      }
      
      // Map database rows to AITool objects
      return data.map(mapRowToAITool);
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (selectedPricing !== "All") {
      setFilteredTools(aiTools.filter(tool => tool.pricing === selectedPricing));
    } else {
      setFilteredTools(aiTools);
    }
  }, [selectedPricing, aiTools]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-3xl font-bold mb-4">AI Tools by Pricing</h1>
              <p className="text-foreground/80">
                Browse our collection of AI tools by pricing model to find the perfect solution that fits your budget and needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card rounded-lg shadow-sm overflow-hidden border border-border">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-5">
                    <Skeleton className="h-6 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong</h1>
              <p className="text-foreground/80">
                We're having trouble loading the tools. Please try again later.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>AI Tools by Pricing | All AI Tools</title>
        <meta 
          name="description" 
          content="Browse AI tools by pricing models - free, freemium, subscription, and more. Find the AI solution that fits your budget." 
        />
        <meta property="og:title" content="AI Tools by Pricing | All AI Tools" />
        <meta 
          property="og:description" 
          content="Browse AI tools by pricing models - free, freemium, subscription, and more. Find the AI solution that fits your budget."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.allaitools.tech/pricing" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Tools by Pricing | All AI Tools" />
        <meta 
          name="twitter:description" 
          content="Browse AI tools by pricing models - free, freemium, subscription, and more. Find the AI solution that fits your budget."
        />
        <meta name="keywords" content="AI tools pricing, free AI tools, freemium AI tools, subscription AI tools, AI tools cost, AI pricing models" />
        <link rel="canonical" href="https://www.allaitools.tech/pricing" />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">AI Tools by Pricing</h1>
            <p className="text-foreground/80">
              Browse our collection of AI tools by pricing model to find the perfect solution that fits your budget and needs.
            </p>
          </div>
          
          {/* Pricing Filters */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {pricingOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedPricing(option)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedPricing === option
                      ? "bg-primary text-white"
                      : "bg-white hover:bg-secondary border border-input text-foreground"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          
          {/* Pricing Sections */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              {selectedPricing === "All" 
                ? "All Pricing Options" 
                : `${selectedPricing} AI Tools`}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => (
                  <div 
                    key={tool.id} 
                    onClick={() => window.location.href = `/tool/${tool.id}/${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="cursor-pointer"
                  >
                    <ToolCard 
                      tool={tool} 
                      showSelection={false}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-3 py-16 text-center">
                  <h3 className="text-xl font-medium mb-2">No tools found</h3>
                  <p className="text-muted-foreground mb-4">
                    There are currently no tools available with the selected pricing model.
                  </p>
                  <button
                    onClick={() => setSelectedPricing("All")}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    View All Tools
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Pricing FAQ */}
          <div className="max-w-3xl mx-auto mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-subtle border border-border/60">
                <h3 className="text-lg font-semibold mb-2">What does "Freemium" mean?</h3>
                <p className="text-foreground/80">
                  Freemium AI tools offer a basic version for free, with additional features available through paid plans. 
                  This pricing model allows you to try the tool before committing to a paid subscription.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-subtle border border-border/60">
                <h3 className="text-lg font-semibold mb-2">What is a "Credit-based" pricing model?</h3>
                <p className="text-foreground/80">
                  Credit-based tools charge based on usage. You purchase credits that are consumed as you use the tool's features,
                  allowing for flexible usage patterns without a recurring subscription.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-subtle border border-border/60">
                <h3 className="text-lg font-semibold mb-2">What does "Self-hosted" mean?</h3>
                <p className="text-foreground/80">
                  Self-hosted tools are typically open-source solutions that you can install and run on your own servers or hardware. 
                  While the software itself may be free, you'll need to cover hosting and maintenance costs.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-subtle border border-border/60">
                <h3 className="text-lg font-semibold mb-2">How do subscription models typically work?</h3>
                <p className="text-foreground/80">
                  Subscription-based AI tools charge a recurring fee, usually monthly or annually. These plans often come in tiers
                  (like Basic, Pro, Enterprise) with different feature sets and usage limits for each tier.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
