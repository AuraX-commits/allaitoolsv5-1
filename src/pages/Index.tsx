
import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import ToolsDirectory from "../components/home/ToolsDirectory";
import ComparisonSection from "../components/home/ComparisonSection";
import CategoryGrid from "../components/home/CategoryGrid";
import Newsletter from "../components/home/Newsletter";
import RecommendationPromo from "../components/home/RecommendationPromo";
import { Helmet } from "react-helmet-async";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const seoDescription = "Discover the best AI tools with our comprehensive directory of 3000+ artificial intelligence solutions. Compare top AI tools for content creation, coding, marketing, design, data analysis, and business automation. Find free AI tools, premium alternatives, and specialized solutions for every industry. Our expert-curated platform features detailed reviews, pricing comparisons, and user ratings for ChatGPT, Midjourney, GitHub Copilot, and thousands more. Whether you need AI writing assistants, image generators, voice tools, or no-code automation platforms, we help you discover the perfect AI solution for your specific needs and budget.";
  
  const enhancedSeoKeywords = "AI tools, artificial intelligence tools, AI software directory, AI tool comparison, text generation AI, image AI tools, AI coding assistants, AI chatbots, AI writing tools, best AI tools 2025, free AI tools, AI for business, AI productivity tools, AI content creation, AI design tools, AI data analysis, AI marketing tools, AI for developers, AI research tools, generative AI tools, AI image generators, AI video creators, AI code generators, language model tools, AI transcription services, AI translation tools, AI customer service, AI for education, AI decision support, AI analytics tools, multimodal AI models, enterprise AI solutions, AI recommendation engines, no-code AI tools, large language models, AI automation, ChatGPT alternatives, Midjourney alternatives, DALL-E alternatives, AI voice generators, AI audio tools, AI SEO tools, AI copywriting tools, AI personal assistants, AI project management, AI meeting assistants, GPT-powered tools, enterprise AI software, AI browser extensions, AI APIs, AI-powered search, AI document analysis, AI legal tools, AI healthcare solutions, AI email assistants, AI presentation creators, AI summarization tools, AI grammar checkers, AI trend analysis, AI sentiment analysis, AI photo editors, AI music generators, AI video editors, AI competitive analysis, AI personalization tools, AI-powered CRM, allaitools, all ai tools, free ai tools, best ai tools, ai tools directory, tools directory, marketing tools, ai marketing, ai marketing tools, ai tools newsletter, ai news, ai newsletter, best ai directory, how to use ai tools, find ai tools, futurepedia, topaitools, indian ai tools, usa ai tools, ai tools near me, productivity ai tools, porn ai tools, nsfw ai tools, compare ai tools, ai girlfriend, ai girlfriend tools, ai boyfriend, ai sex, ai nsfw, nsfw tools, face swapping tools, notion ai, free chatgpt, pricing ai tools, recommend ai tools, compare tools, compare all ai tools, there's an ai for that, futurepedia alternative, alternative ai tool directory, aitoolbazaar, aibazaar, best ai tool for, best ai tool, deepseek free, manus im, manus free, manus credits, manus ai, lovable ai, no code ai tools, marketing ai tools, coding ai tools, image generation ai tools, voice assistant ai tools, research ai tools, language ai tools, 3d ai tools, car ai tools, automation ai tools, designing ai tools, photography ai tools, data ai tools, data analysis ai tool, customer service ai tool, find my ai tool, how to find best ai tool, search for new ai tools, new ai tools, new ai news, discover ai tools, conversational ai tools, text ai tools, ai resume, career ai tools, ai sales, sales ai tool, sales ai tools, content creation ai tools, vidnoz, vidnoz free, free vidnoz, vidnoz credits free, vidnoz credits, vidnoz login, vidnoz affiliate, vidnoz use cases, free vidnoz credits";

  // Additional long-tail keywords for deeper topical coverage
  const longTailKeywords = `
    best artificial intelligence tools for small business productivity 2025,
    top AI-powered content creation tools for marketing professionals,
    advanced machine learning software for data analysis and visualization,
    compare enterprise-grade AI solutions for customer experience automation,
    affordable AI tools for independent content creators and freelancers,
    specialized artificial intelligence applications for healthcare diagnostics,
    comprehensive directory of AI coding assistants for software development,
    innovative natural language processing tools for automated writing assistance,
    cutting-edge computer vision AI tools for image recognition and processing,
    multimodal AI platforms combining text image and audio generation capabilities,
    AI-powered decision support systems for business intelligence and analytics,
    real-time AI translation and transcription services for global communication,
    generative AI models for creating realistic 3D assets and animations,
    no-code AI automation tools for workflow optimization and business processes,
    personalized AI recommendation engines for e-commerce and content platforms,
    AI tools compatible with popular productivity suites and business software,
    semantic search and knowledge discovery AI tools for research professionals,
    AI voice and speech synthesis tools for natural-sounding audio content,
    proprietary vs open-source AI solutions comparison and feature analysis,
    AI technologies transforming creative industries and digital content creation,
    find best AI tool for my specific needs and requirements,
    how to choose right AI software for business automation,
    comprehensive comparison of leading AI platforms and services,
    discover new AI tools and emerging artificial intelligence technologies,
    AI tool recommendations based on industry and use case analysis
  `;
  
  // Adding 20 three-word keyword phrases for more targeted SEO
  const threeWordKeywords = `
    AI content creation,
    machine learning tools,
    deep learning software,
    natural language processing,
    computer vision applications,
    data science platforms,
    AI workflow automation,
    enterprise AI solutions,
    prompt engineering tools,
    text generation APIs,
    AI image generators,
    multimodal AI models,
    AI code assistants,
    conversational AI chatbots,
    AI marketing automation,
    video creation tools,
    audio synthesis software,
    AI business intelligence,
    no-code AI platforms,
    generative AI applications,
    AI productivity suite,
    intelligent automation tools,
    AI analytics dashboard,
    voice AI technology,
    AI recommendation system
  `;

  const pageTitle = "All AI Tools Directory - Discover & Compare 3000+ Best AI Tools 2025 | AllAITools.tech";

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
        <meta property="og:site_name" content="All AI Tools Directory" />
        <meta property="og:locale" content="en_US" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta 
          name="twitter:description" 
          content={seoDescription}
        />
        <meta name="twitter:image" content="https://www.allaitools.tech/og-image.png" />
        <meta name="twitter:site" content="@AIToolsDirectory" />
        
        <meta name="keywords" content={`${enhancedSeoKeywords}, ${longTailKeywords}, ${threeWordKeywords}`} />
        <link rel="canonical" href="https://www.allaitools.tech" />
        
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        <meta name="author" content="AI Tools Directory Team" />
        <meta name="generator" content="AI Tools Directory Platform" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Enhanced Schema.org markup for search engines */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "All AI Tools Directory",
              "alternateName": ["AllAITools.tech", "AI Tools Directory", "Best AI Tools"],
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
              "name": "AllAITools.tech",
              "url": "https://www.allaitools.tech",
              "logo": "https://www.allaitools.tech/og-image.png",
              "description": "The world's most comprehensive AI tools directory featuring 3000+ artificial intelligence solutions.",
              "foundingDate": "2024",
              "knowsAbout": [
                "Artificial Intelligence",
                "Machine Learning",
                "AI Tools",
                "Software Directory",
                "Technology Comparison",
                "AI Applications",
                "Business Automation",
                "Content Creation",
                "Data Analysis"
              ],
              "areaServed": "Worldwide",
              "serviceType": [
                "AI Tool Discovery",
                "Software Comparison",
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
              "name": "AI Tools Directory Service",
              "provider": {
                "@type": "Organization",
                "name": "AllAITools.tech"
              },
              "serviceType": "Technology Directory",
              "description": "Comprehensive directory and comparison platform for artificial intelligence tools and software solutions.",
              "areaServed": "Worldwide",
              "availableLanguage": "English",
              "category": "Technology",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AI Tools Catalog",
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
              "name": "Best AI Tools 2025",
              "description": "Comprehensive list of the best artificial intelligence tools across all categories.",
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
                  "name": "What are the best AI tools available in 2025?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The best AI tools in 2025 include ChatGPT for conversational AI, Midjourney for image generation, GitHub Copilot for coding assistance, Notion AI for productivity, and Claude for advanced reasoning. Our directory features 3000+ verified AI tools across 50+ categories."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I find the right AI tool for my business?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Use our AI Tool Recommender to get personalized suggestions based on your specific needs, budget, and use case. Simply describe your requirements and our AI will analyze 3000+ tools to find the perfect matches for your business."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are there free AI tools available?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! Our directory includes hundreds of free AI tools across all categories. Many premium tools also offer free tiers or trials. Filter by 'Free' pricing to discover powerful AI solutions that don't require any payment."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How often is the AI tools directory updated?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our AI tools directory is updated daily with new tools, feature updates, pricing changes, and user reviews. We continuously monitor the AI landscape to ensure you have access to the latest and most innovative solutions."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I compare different AI tools on your platform?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! Our comparison feature allows you to compare up to 4 AI tools side-by-side, analyzing features, pricing, pros, cons, and user ratings. This helps you make informed decisions based on detailed comparisons."
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
                  "name": "AI Tools Directory",
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
        <meta name="publisher" content="AllAITools.tech" />
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
        <Hero />
        <RecommendationPromo />
        <ToolsDirectory />
        <CategoryGrid />
        <ComparisonSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
