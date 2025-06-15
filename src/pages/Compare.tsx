import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, ExternalLink, Plus, X, Filter } from 'lucide-react';
import { AITool, mapRowToAITool } from '@/utils/toolsData';
import { ReplaceToolButton } from '@/components/comparison/ReplaceToolButton';
import BreadcrumbNav from '@/components/common/BreadcrumbNav';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Helmet } from 'react-helmet-async';
import { generateLocalSeoKeywords, generateLocalSeoDescription } from '@/utils/localSeoHelper';
import { supabase } from '@/lib/supabaseClient';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchBar } from '@/components/comparison/SearchBar';
import { ToolGrid } from '@/components/comparison/ToolGrid';
import { useToolComparison } from '@/hooks/use-tool-comparison';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Compare: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tools, setTools] = useState<AITool[]>([]);
  const [seoKeywords, setSeoKeywords] = useState<string[]>([]);
  const [seoDescription, setSeoDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [addToolDialogOpen, setAddToolDialogOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [pricingFilter, setPricingFilter] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [pricingOptions] = useState<string[]>(['Free', 'Freemium', 'Paid', 'Free Trial']);
  
  const {
    searchTerm,
    setSearchTerm,
    displayTools,
    isLoading: isSearchLoading,
  } = useToolComparison();

  // Fetch available categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('ai_tools')
          .select('category');
        
        if (error) {
          console.error('Error fetching categories:', error);
          return;
        }
        
        const allCategories = data.reduce((acc: string[], tool) => {
          if (tool.category && Array.isArray(tool.category)) {
            return [...acc, ...tool.category];
          }
          return acc;
        }, []);
        
        const uniqueCategories = [...new Set(allCategories)].sort();
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchTools = async () => {
      const toolsParam = searchParams.get('tools');
      
      if (!toolsParam) {
        setTools([]);
        setIsLoading(false);
        return;
      }

      const toolIds = toolsParam.split(',');
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('ai_tools')
          .select('*')
          .in('id', toolIds);

        if (error) {
          console.error('Error fetching tools:', error);
          setTools([]);
          return;
        }

        const selectedTools = data.map(row => mapRowToAITool(row));
        setTools(selectedTools);

        // Enhanced SEO
        if (selectedTools.length > 0) {
          const toolNames = selectedTools.map(tool => tool.name);
          const categories = [...new Set(selectedTools.flatMap(tool => tool.category))];
          const hasFreeTool = selectedTools.some(tool => tool.pricing.toLowerCase().includes('free'));
          
          const keywords = [
            ...toolNames.map(name => `${name} review`),
            ...toolNames.map(name => `${name} alternative`),
            `${toolNames.join(' vs ')} comparison`,
            `compare ${toolNames.join(' and ')}`,
            `best ${categories[0]} AI tools`,
            'AI tool comparison',
            'AI software comparison',
            ...(hasFreeTool ? ['free AI tools comparison'] : []),
            ...categories.map(cat => `${cat} AI tools`),
          ];
          setSeoKeywords(keywords);

          const description = `Compare ${toolNames.join(', ')} - detailed side-by-side comparison of features, pricing, pros & cons. Find the best ${categories[0]} AI tool for your needs with our comprehensive analysis.`;
          setSeoDescription(description);
        }
      } catch (err) {
        console.error('Error in fetchTools:', err);
        setTools([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTools();
  }, [searchParams]);

  const addTool = (newToolId: string) => {
    const currentToolIds = tools.map(tool => tool.id);
    if (!currentToolIds.includes(newToolId)) {
      const updatedToolIds = [...currentToolIds, newToolId];
      setSearchParams({ tools: updatedToolIds.join(',') });
    }
    setAddToolDialogOpen(false);
    setSearchTerm("");
    setCategoryFilter('all');
    setPricingFilter('all');
  };

  const removeTool = (toolId: string) => {
    const updatedTools = tools.filter(tool => tool.id !== toolId);
    const updatedToolIds = updatedTools.map(tool => tool.id);
    
    if (updatedToolIds.length > 0) {
      setSearchParams({ tools: updatedToolIds.join(',') });
    } else {
      setSearchParams({});
    }
  };

  const replaceTool = (oldToolId: string, newToolId: string) => {
    const updatedToolIds = tools.map(tool => 
      tool.id === oldToolId ? newToolId : tool.id
    );
    setSearchParams({ tools: updatedToolIds.join(',') });
  };

  const clearTools = () => {
    setSearchParams({});
  };

  // Filter tools based on selected filters
  const filteredTools = displayTools.filter(tool => {
    const categoryMatch = categoryFilter === 'all' || 
      (tool.category && tool.category.some(cat => cat === categoryFilter));
    const pricingMatch = pricingFilter === 'all' || 
      tool.pricing.toLowerCase().includes(pricingFilter.toLowerCase());
    
    return categoryMatch && pricingMatch;
  });

  const generateStructuredData = () => {
    if (tools.length === 0) return null;
    
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": `AI Tool Comparison: ${tools.map(t => t.name).join(' vs ')}`,
      "description": seoDescription,
      "url": `https://www.allaitools.tech/compare?tools=${tools.map(t => t.id).join(',')}`,
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": tools.map((tool, index) => ({
          "@type": "SoftwareApplication",
          "position": index + 1,
          "name": tool.name,
          "description": tool.description,
          "url": tool.url,
          "applicationCategory": tool.category[0],
          "operatingSystem": "Web",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": tool.rating,
            "reviewCount": tool.reviewCount
          }
        }))
      }
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading comparison...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>
          {tools.length > 0 
            ? `${tools.map(t => t.name).join(' vs ')} - AI Tool Comparison | AllAITools.tech`
            : 'AI Tool Comparison - Compare Best AI Tools | AllAITools.tech'
          }
        </title>
        <meta name="description" content={seoDescription || 'Compare AI tools side-by-side to find the best solution for your needs. Comprehensive comparison of features, pricing, pros & cons.'} />
        <meta name="keywords" content={seoKeywords.join(', ')} />
        
        {/* Open Graph */}
        <meta property="og:title" content={tools.length > 0 ? `${tools.map(t => t.name).join(' vs ')} Comparison` : 'AI Tool Comparison'} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.allaitools.tech/compare${tools.length > 0 ? `?tools=${tools.map(t => t.id).join(',')}` : ''}`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={tools.length > 0 ? `${tools.map(t => t.name).join(' vs ')} Comparison` : 'AI Tool Comparison'} />
        <meta name="twitter:description" content={seoDescription} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://www.allaitools.tech/compare${tools.length > 0 ? `?tools=${tools.map(t => t.id).join(',')}` : ''}`} />
        
        {/* Structured Data */}
        {generateStructuredData() && (
          <script type="application/ld+json">
            {JSON.stringify(generateStructuredData())}
          </script>
        )}
      </Helmet>
      
      <ScrollToTop />
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto py-8 px-4">
          <BreadcrumbNav customItems={[{ label: 'Compare Tools' }]} />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {tools.length > 0 ? `${tools.map(t => t.name).join(' vs ')}` : 'AI Tool Comparison'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Compare AI tools side-by-side to find the perfect solution for your needs. 
              Analyze features, pricing, and user ratings to make informed decisions.
            </p>
          </div>

          {tools.length > 0 ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool, index) => (
                  <Card key={tool.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-card to-card/80 dark:from-card dark:to-card/80">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-bold flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img 
                            src={tool.logo} 
                            alt={`${tool.name} logo`} 
                            className="w-10 h-10 rounded-lg object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder.svg';
                            }}
                          />
                          <span className="text-foreground dark:text-foreground">{tool.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ReplaceToolButton
                            toolId={tool.id}
                            onReplace={replaceTool}
                          />
                          <Button variant="outline" size="icon" onClick={() => removeTool(tool.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardTitle>
                      <CardDescription>
                        <a 
                          href={`/tool/${tool.id}`} 
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline flex items-center font-medium"
                        >
                          Visit Tool Page <ExternalLink className="h-4 w-4 ml-1" />
                        </a>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {tool.category.map((cat, i) => (
                          <Badge key={i} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                            {cat}
                          </Badge>
                        ))}
                        <Badge variant="outline" className="border-green-200 text-green-700 dark:border-green-700 dark:text-green-300">
                          {tool.pricing}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground dark:text-muted-foreground">{tool.description}</p>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-500 fill-current" />
                          <span className="ml-1 font-semibold text-foreground dark:text-foreground">{tool.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground dark:text-muted-foreground">({tool.reviewCount} reviews)</span>
                      </div>
                      
                      <Separator className="dark:bg-border" />
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground dark:text-foreground">Key Features:</h4>
                        <div className="space-y-2">
                          {tool.features && tool.features.slice(0, 5).map((feature: string, i: number) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                              <span className="text-sm text-muted-foreground dark:text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {tools.length < 3 && (
                  <Card className="shadow-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center bg-card dark:bg-card">
                    <CardContent className="flex items-center justify-center p-8">
                      <Dialog open={addToolDialogOpen} onOpenChange={setAddToolDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="flex items-center gap-2 h-auto py-4 px-6">
                            <Plus className="h-5 w-5" />
                            Add Tool to Compare
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">Add Tool to Compare</DialogTitle>
                          </DialogHeader>
                          <div className="py-4 space-y-6">
                            <SearchBar
                              searchTerm={searchTerm}
                              onSearchChange={setSearchTerm}
                              onClear={() => setSearchTerm("")}
                            />
                            
                            <div className="flex flex-wrap gap-4 items-center">
                              <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-medium">Filters:</span>
                              </div>
                              
                              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-48">
                                  <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Categories</SelectItem>
                                  {categories.map(category => (
                                    <SelectItem key={category} value={category}>
                                      {category}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              
                              <Select value={pricingFilter} onValueChange={setPricingFilter}>
                                <SelectTrigger className="w-48">
                                  <SelectValue placeholder="All Pricing" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Pricing</SelectItem>
                                  {pricingOptions.map(pricing => (
                                    <SelectItem key={pricing} value={pricing}>
                                      {pricing}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              
                              {(categoryFilter !== 'all' || pricingFilter !== 'all') && (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    setCategoryFilter('all');
                                    setPricingFilter('all');
                                  }}
                                >
                                  Clear Filters
                                </Button>
                              )}
                            </div>
                            
                            <ToolGrid
                              tools={filteredTools.filter(tool => !tools.some(selectedTool => selectedTool.id === tool.id))}
                              selectedTools={[]}
                              isLoading={isSearchLoading}
                              onToolSelect={addTool}
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="flex justify-center">
                <Button variant="destructive" onClick={clearTools} className="px-8">
                  Clear All Tools
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Plus className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Start Your Comparison</h2>
                <p className="text-muted-foreground mb-6">
                  Select AI tools to compare their features, pricing, and capabilities side-by-side.
                </p>
                <Dialog open={addToolDialogOpen} onOpenChange={setAddToolDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="px-8">
                      <Plus className="h-5 w-5 mr-2" />
                      Add Tools to Compare
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">Add Tools to Compare</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-6">
                      <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        onClear={() => setSearchTerm("")}
                      />
                      
                      <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">Filters:</span>
                        </div>
                        
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="All Categories" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map(category => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <Select value={pricingFilter} onValueChange={setPricingFilter}>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="All Pricing" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Pricing</SelectItem>
                            {pricingOptions.map(pricing => (
                              <SelectItem key={pricing} value={pricing}>
                                {pricing}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        {(categoryFilter !== 'all' || pricingFilter !== 'all') && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setCategoryFilter('all');
                              setPricingFilter('all');
                            }}
                          >
                            Clear Filters
                          </Button>
                        )}
                      </div>
                      
                      <ToolGrid
                        tools={filteredTools}
                        selectedTools={[]}
                        isLoading={isSearchLoading}
                        onToolSelect={addTool}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Compare;
