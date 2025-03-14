
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { aiTools, categories } from "@/utils/toolsData";
import ToolCard from "../components/home/ToolCard";
import { ArrowLeft, Search } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Categories = () => {
  const { category } = useParams<{ category: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTools, setFilteredTools] = useState(aiTools);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    let decodedCategory = category ? decodeURIComponent(category) : null;
    setCurrentCategory(decodedCategory);
    
    let filtered = [...aiTools];
    
    // Filter by category
    if (decodedCategory && decodedCategory !== "All") {
      filtered = filtered.filter(tool => 
        tool.category.some(cat => cat === decodedCategory)
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        tool => 
          tool.name.toLowerCase().includes(term) || 
          tool.description.toLowerCase().includes(term) ||
          tool.category.some(cat => cat.toLowerCase().includes(term))
      );
    }
    
    setFilteredTools(filtered);
  }, [category, searchTerm]);

  // Get the proper SEO title based on selected category
  const getPageTitle = () => {
    if (!currentCategory) return "All AI Tools Categories | All AI Tools";
    return `${currentCategory} AI Tools | All AI Tools`;
  };

  // Get the proper SEO description based on selected category
  const getPageDescription = () => {
    if (!currentCategory || currentCategory === "All") 
      return "Explore our comprehensive directory of AI tools across all categories. Find the perfect solution for your needs.";
    return `Discover the best ${currentCategory} AI tools in our directory. Compare features, pricing, and user reviews.`;
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getPageDescription()} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.allaitools.tech/categories${currentCategory ? `/${encodeURIComponent(currentCategory)}` : ''}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getPageDescription()} />
        <meta name="keywords" content={`AI tools, ${currentCategory || 'artificial intelligence'}, AI directory, AI software, AI solutions`} />
        <link rel="canonical" href={`https://www.allaitools.tech/categories${currentCategory ? `/${encodeURIComponent(currentCategory)}` : ''}`} />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-foreground/70 hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold mt-4 mb-2">
              {currentCategory ? `${currentCategory} AI Tools` : 'All AI Categories'}
            </h1>
            <p className="text-foreground/70">
              {currentCategory 
                ? `Explore the best ${currentCategory} AI tools in our directory` 
                : 'Browse our comprehensive AI tools directory by category'}
            </p>
          </div>

          {/* Category Pills */}
          <div className="mb-8 overflow-x-auto pb-2">
            <div className="flex space-x-2">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={cat === "All" ? "/categories" : `/categories/${encodeURIComponent(cat)}`}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    currentCategory === cat
                      ? "bg-primary text-white"
                      : "bg-white hover:bg-secondary border border-input text-foreground"
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-10">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search AI tools..."
                className="block w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.length > 0 ? (
              filteredTools.map((tool) => (
                <div 
                  key={tool.id} 
                  onClick={() => window.location.href = `/tool/${tool.id}`}
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
                  Try adjusting your search or category to find what you're looking for.
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
