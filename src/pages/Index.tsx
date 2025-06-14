import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import ToolsDirectory from "../components/home/ToolsDirectory";
import ComparisonSection from "../components/home/ComparisonSection";
import CategoryGrid from "../components/home/CategoryGrid";
import Newsletter from "../components/home/Newsletter";
import RecommendationPromo from "../components/home/RecommendationPromo";
import { ScrollToTop } from "../components/common/ScrollToTop";
import { Helmet } from "react-helmet-async";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const seoDescription = "Discover, compare, and select from 3000+ AI tools in the world's most comprehensive directory. AllAITools.tech offers expert reviews, pricing, and comparisons for solutions in content creation, marketing, coding, and business automation. Find the perfect free or premium AI tool for your needs.";
  
  const seoKeywords = `AI tools directory, artificial intelligence tools, compare AI tools, best AI tools 2025, free AI tools, AI software, generative AI, AI for business, AI writing assistant, AI image generator, AI code assistant, AI marketing, AI video creation, AI for developers, AI productivity, futurepedia alternative, find AI tools, AI tool recommender, AllAITools.tech, All AI Tools`;

  const pageTitle = "AllAITools.tech: The #1 AI Tools Directory to Find, Compare & Choose";

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta 
          name="description" 
          content={seoDescription} 
        />
        <meta property="og:title" content={pageTitle} />
        <meta 
          property="og:description" 
          content={seoDescription}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.allaitools.tech/og-image.png" />
        <meta property="og:url" content="https://www.allaitools.tech" />
        <meta property="og:site_name" content="AllAITools AI Tools Directory" />
        <meta property="og:locale" content="en_US" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta 
          name="twitter:description" 
          content={seoDescription}
        />
        <meta name="twitter:image" content="https://www.allaitools.tech/og-image.png" />
        <meta name="twitter:site" content="@AIToolsDirectory" />
        
        <meta name="keywords" content={seoKeywords} />
        <link rel="canonical" href="https://www.allaitools.tech" />
        
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        <meta name="author" content="AllAITools AI Tools Directory Team" />
        <meta name="generator" content="AllAITools AI Tools Directory Platform" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Enhanced Schema.org markup for search engines */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "AllAITools.tech - The AI Tools Directory",
              "alternateName": ["AllAITools.tech", "AI Tools Directory", "Best AI Tools Directory", "AllAITools Directory"],
              "url": "https://www.allaitools.tech",
              "description": "${seoDescription}",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.allaitools.tech/?search={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "sameAs": [
                "https://twitter.com/AIToolsDirectory",
                "https://www.linkedin.com/company/ai-tools-directory",
                "https://github.com/allaitools"
              ],
              "creator": {
                "@type": "Organization",
                "@id": "https://www.allaitools.tech/#organization"
              }
            }
          `}
        </script>

        {/* Organization Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.allaitools.tech/#organization",
              "name": "AllAITools.tech - AI Tools Directory",
              "url": "https://www.allaitools.tech",
              "logo": "https://www.allaitools.tech/og-image.png",
              "description": "The world's most comprehensive AI tools directory featuring 3000+ artificial intelligence solutions.",
              "foundingDate": "2024",
              "knowsAbout": [
                "Artificial Intelligence",
                "Machine Learning",
                "AI Tools Directory",
                "AI Software Directory",
                "Technology Comparison",
                "AI Applications",
                "Business Automation",
                "Content Creation",
                "Data Analysis"
              ],
              "areaServed": "Worldwide",
              "serviceType": [
                "AI Tools Directory",
                "AI Tool Discovery",
                "AI Software Comparison",
                "Technology Reviews",
                "AI Recommendations"
              ]
            }
          `}
        </script>

        {/* Service Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "AllAITools AI Tools Directory Service",
              "provider": {
                "@type": "Organization",
                "name": "AllAITools.tech"
              },
              "serviceType": "AI Tools Directory",
              "description": "Comprehensive AI tools directory and comparison platform for artificial intelligence tools and software solutions.",
              "areaServed": "Worldwide",
              "availableLanguage": "English",
              "category": "Technology Directory",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AI Tools Directory Catalog",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "AI Tool Discovery"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "AI Tool Comparison"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "AI Tool Reviews"
                    }
                  }
                ]
              }
            }
          `}
        </script>

        {/* ItemList Schema for AI Tools */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Best AI Tools Directory 2025",
              "description": "Comprehensive AI tools directory list of the best artificial intelligence tools across all categories.",
              "numberOfItems": "3000+",
              "itemListOrder": "https://schema.org/ItemListOrderDescending",
              "itemListElement": [
                {
                  "@type": "SoftwareApplication",
                  "position": 1,
                  "name": "ChatGPT",
                  "description": "Advanced conversational AI for text generation and assistance",
                  "applicationCategory": "AI Assistant"
                },
                {
                  "@type": "SoftwareApplication", 
                  "position": 2,
                  "name": "Midjourney",
                  "description": "AI-powered image generation and artistic creation tool",
                  "applicationCategory": "Image Generation"
                },
                {
                  "@type": "SoftwareApplication",
                  "position": 3, 
                  "name": "GitHub Copilot",
                  "description": "AI-powered code completion and programming assistant",
                  "applicationCategory": "Code Assistant"
                }
              ]
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
                  "name": "What is the best AI tools directory available in 2025?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "AllAITools.tech is the most comprehensive AI tools directory in 2025, featuring 3000+ verified AI tools across 50+ categories. Our AI tools directory includes ChatGPT for conversational AI, Midjourney for image generation, GitHub Copilot for coding assistance, and thousands more AI solutions with detailed comparisons and reviews."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I find the right AI tool using an AI tools directory?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Use our AllAITools AI tools directory AI Tool Recommender to get personalized suggestions based on your specific needs, budget, and use case. Our AI tools directory analyzes 3000+ tools to find the perfect matches for your business requirements."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are there free AI tools in the AI tools directory?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! Our AllAITools AI tools directory includes hundreds of free AI tools across all categories. Many premium tools in our AI tools directory also offer free tiers or trials. Filter by 'Free' pricing in our AI tools directory to discover powerful AI solutions that don't require any payment."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How often is the AllAITools AI tools directory updated?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our AllAITools AI tools directory is updated daily with new tools, feature updates, pricing changes, and user reviews. We continuously monitor the AI landscape to ensure our AI tools directory has access to the latest and most innovative solutions."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I compare different AI tools in the AI tools directory?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! Our AllAITools AI tools directory comparison feature allows you to compare up to 4 AI tools side-by-side, analyzing features, pricing, pros, cons, and user ratings. This helps you make informed decisions based on detailed comparisons within our AI tools directory."
                  }
                }
              ]
            }
          `}
        </script>

        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "AllAITools.tech AI Tools Directory",
                  "item": "https://www.allaitools.tech/"
                }
              ]
            }
          `}
        </script>

        {/* Additional SEO Meta Tags */}
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
        
        {/* Publisher Information */}
        <meta name="publisher" content="AllAITools.tech AI Tools Directory" />
        <meta name="copyright" content="AllAITools.tech" />
        
        {/* Content Classification */}
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="coverage" content="worldwide" />
        
        {/* Cache control for better performance */}
        <meta httpEquiv="cache-control" content="public, max-age=86400" />
      </Helmet>
      
      <Navbar />
      <main>
        {/* SEO Content Section - Hidden for UI but visible to search engines */}
        <section className="sr-only" aria-hidden="true">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-foreground mb-6">
                AllAITools - The Ultimate AI Tools Directory for 2025
              </h1>
              
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-lg mb-4">
                  Welcome to AllAITools.tech, the world's most comprehensive AI tools directory featuring artificial intelligence solutions. 
                  Our AI tools directory platform helps you discover, compare, and choose from over 3000+ AI tools across 50+ categories. 
                  Whether you're looking for AI content creation tools, coding assistants, or business automation solutions in our AI tools directory, 
                  AllAITools has everything you need to find the perfect AI tool for your requirements in our curated AI tools directory.
                </p>
                
                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  Why Choose AllAITools AI Tools Directory for Your AI Tool Discovery?
                </h2>
                
                <p className="mb-4">
                  AllAITools.tech stands out as the premier AI tools directory destination for AI tool discovery and comparison. Our expert team 
                  curates and reviews every tool in our AI tools directory, ensuring you get accurate information about features, 
                  pricing, and user experiences. From free AI tools to enterprise solutions in our comprehensive AI tools directory, we cover the entire spectrum 
                  of artificial intelligence applications available in the best AI tools directory online.
                </p>
                
                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                  Featured Categories in AllAITools AI Tools Directory Platform
                </h3>
                
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Text Generation and AI Writing Tools in our AI tools directory</li>
                  <li>Image Generation and Design AI available in our AI tools directory</li>
                  <li>Code Generation and Developer Tools featured in our AI tools directory</li>
                  <li>Conversational AI and Chatbots listed in our AI tools directory</li>
                  <li>Marketing and Business Automation tools in our AI tools directory</li>
                  <li>Data Analysis and Research Tools available in our AI tools directory</li>
                  <li>Video Creation and Editing AI featured in our AI tools directory</li>
                  <li>Voice and Audio Processing tools in our comprehensive AI tools directory</li>
                </ul>
                
                <p className="mb-4">
                  Start exploring our AllAITools AI tools directory today and discover how artificial intelligence can transform your workflow, 
                  boost productivity, and unlock new creative possibilities. Our AI-powered recommendation engine in the AI tools directory helps 
                  you find tools that match your specific needs and budget constraints from our extensive AI tools directory database.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                  How Our AI Tools Directory Works
                </h3>
                
                <p className="mb-4">
                  Our AI tools directory uses advanced filtering and categorization to help you navigate through thousands of AI solutions efficiently. 
                  The AI tools directory features detailed comparison tools, user reviews, and expert ratings to ensure you make informed decisions. 
                  Whether you're a startup looking for budget-friendly options or an enterprise seeking comprehensive AI solutions, 
                  our AI tools directory has the perfect match for your requirements.
                </p>

                <p className="mb-4">
                  Browse our AI tools directory by category, pricing model, or specific use case to find exactly what you need. 
                  Our AI tools directory is constantly updated with the latest AI innovations, ensuring you always have access to 
                  cutting-edge artificial intelligence solutions through our comprehensive AI tools directory platform.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <Hero />
        <RecommendationPromo />
        <ToolsDirectory />
        <CategoryGrid />
        <ComparisonSection />
        <Newsletter />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
