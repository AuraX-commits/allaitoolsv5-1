
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, ExternalLink, MessageSquare, Share2, Bookmark, ChevronRight } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { AITool, aiTools } from "@/utils/toolsData";
import Badge from "../components/common/Badge";
import { Helmet } from "react-helmet-async";
import ToolCard from "../components/home/ToolCard";
import { cn } from "@/lib/utils";

const ToolDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [tool, setTool] = useState<AITool | null>(null);
  const [relatedTools, setRelatedTools] = useState<AITool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      const foundTool = aiTools.find(t => t.id === id);
      if (foundTool) {
        setTool(foundTool);
        
        // Find related tools in the same category
        const related = aiTools
          .filter(t => 
            t.id !== id && 
            t.category.some(cat => foundTool.category.includes(cat))
          )
          .slice(0, 3);
          
        setRelatedTools(related);
      }
    }
    
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center py-20">
              <div className="animate-pulse text-xl">Loading...</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="py-20 text-center">
              <h1 className="text-2xl font-bold mb-4">Tool Not Found</h1>
              <p className="mb-6">The AI tool you're looking for doesn't exist or has been removed.</p>
              <Link to="/" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Directory
              </Link>
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
        <title>{tool.name} | AI Directory - The Ultimate AI Tools Database</title>
        <meta name="description" content={tool.shortDescription} />
        <meta property="og:title" content={`${tool.name} | AI Directory`} />
        <meta property="og:description" content={tool.shortDescription} />
        <meta property="og:image" content={tool.logo} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${tool.name} | AI Directory`} />
        <meta name="twitter:description" content={tool.shortDescription} />
        <meta name="twitter:image" content={tool.logo} />
        <meta name="keywords" content={`${tool.name}, AI tool, ${tool.category.join(', ')}, AI directory`} />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="text-sm font-medium text-foreground/70 hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-foreground/50" />
                    <Link to="/#tools-directory" className="ml-1 text-sm font-medium text-foreground/70 hover:text-primary md:ml-2">
                      Tools
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-foreground/50" />
                    <span className="ml-1 text-sm font-medium text-foreground md:ml-2">
                      {tool.name}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-subtle border border-border/60 p-6 sm:p-8 mb-8">
                {/* Tool Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary/30 flex items-center justify-center">
                      <img 
                        src={tool.logo} 
                        alt={`${tool.name} logo`} 
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">{tool.name}</h1>
                      <div className="flex items-center mt-2">
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                          <span className="ml-1 font-medium">{tool.rating}</span>
                        </div>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{tool.reviewCount} reviews</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a 
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
                    >
                      Visit Website
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                    <button className="inline-flex items-center px-4 py-2 bg-secondary hover:bg-secondary/70 text-foreground rounded-lg transition-colors text-sm">
                      <Share2 className="w-4 h-4 mr-2" /> Share
                    </button>
                    <button className="inline-flex items-center px-4 py-2 bg-secondary hover:bg-secondary/70 text-foreground rounded-lg transition-colors text-sm">
                      <Bookmark className="w-4 h-4 mr-2" /> Save
                    </button>
                  </div>
                </div>

                {/* Tool Categories */}
                <div className="mb-6">
                  <h2 className="text-sm font-medium text-muted-foreground mb-2">Categories</h2>
                  <div className="flex flex-wrap gap-2">
                    {tool.category.map((cat) => (
                      <Badge key={cat} variant="muted">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">About {tool.name}</h2>
                  <p className="text-foreground/80 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tool.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <div className="mt-1 mr-3 text-primary">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pros and Cons */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Pros & Cons</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-green-600 mb-3">Pros</h3>
                      <ul className="space-y-2">
                        {tool.pros?.map(pro => (
                          <li key={pro} className="flex items-start">
                            <div className="mt-1 mr-2 text-green-600">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-green-900">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-red-600 mb-3">Cons</h3>
                      <ul className="space-y-2">
                        {tool.cons?.map(con => (
                          <li key={con} className="flex items-start">
                            <div className="mt-1 mr-2 text-red-600">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </div>
                            <span className="text-red-900">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Reviews Section Placeholder */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">User Reviews</h2>
                    <button className="text-primary hover:text-primary/80 text-sm font-medium">
                      Write a Review
                    </button>
                  </div>
                  <div className="border border-border/60 rounded-lg p-8 text-center bg-secondary/10">
                    <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                    <h3 className="text-lg font-medium mb-2">No Reviews Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Be the first to share your experience with {tool.name}
                    </p>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                      Write a Review
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-subtle border border-border/60 p-6 sticky top-24 mb-6">
                <h2 className="text-lg font-semibold mb-4">Tool Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Pricing</h3>
                    <Badge 
                      variant={tool.pricing === "Free" || tool.pricing === "Freemium" ? "default" : "outline"}
                      className="text-base font-medium"
                    >
                      {tool.pricing}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">API Access</h3>
                    <span className={cn(
                      "text-base",
                      tool.apiAccess ? "text-green-600" : "text-red-500"
                    )}>
                      {tool.apiAccess ? "Available" : "Not Available"}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Rating</h3>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <span className="ml-1 text-base font-medium">{tool.rating}</span>
                      <span className="mx-1 text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{tool.reviewCount} reviews</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border/60">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 text-center bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
              
              {/* Related Tools */}
              {relatedTools.length > 0 && (
                <div className="bg-white rounded-xl shadow-subtle border border-border/60 p-6">
                  <h2 className="text-lg font-semibold mb-4">Related Tools</h2>
                  <div className="space-y-4">
                    {relatedTools.map(relatedTool => (
                      <Link 
                        key={relatedTool.id} 
                        to={`/tool/${relatedTool.id}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-secondary/30 flex items-center justify-center">
                          <img 
                            src={relatedTool.logo} 
                            alt={`${relatedTool.name} logo`} 
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{relatedTool.name}</h3>
                          <div className="flex items-center mt-1">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span className="ml-1 text-xs">{relatedTool.rating}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/60">
                    <Link 
                      to="/#tools-directory"
                      className="text-primary hover:text-primary/80 text-sm font-medium flex items-center justify-center"
                    >
                      View All Tools
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ToolDetail;
