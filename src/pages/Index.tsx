
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

  const seoDescription = "Welcome to the most comprehensive AI Directory - your ultimate resource for discovering, comparing, and choosing the perfect AI tools for your specific needs. Our platform features a curated collection of cutting-edge artificial intelligence solutions across numerous categories including text generation, image creation, code assistance, conversational AI, and many more. Whether you're a creative professional looking for AI-powered design tools, a developer seeking coding assistants, or a business owner aiming to streamline operations with automation, our directory provides detailed information on features, pricing models, user ratings, and direct comparisons between leading AI tools. From popular options like ChatGPT, Midjourney, and GitHub Copilot to specialized AI solutions for specific industries, we help you navigate the rapidly evolving AI landscape with confidence. Each tool listing includes thorough descriptions, key features, pricing information, user reviews, and pros and cons analysis to support your decision-making process. Save time and make informed choices by using our intuitive comparison tool to evaluate multiple AI solutions side-by-side. Stay ahead in the AI revolution with our regularly updated directory of the most innovative and effective artificial intelligence tools available today. Our expert team carefully researches and tests each tool, providing you with objective assessments and practical insights that go beyond marketing claims. We cover the full spectrum of AI applications, from content creation and data analysis to automation and decision support systems. Whether you're looking for free options to get started or enterprise-grade solutions with advanced capabilities, our directory helps you find the right fit for your budget and requirements. Join our community of AI enthusiasts, professionals, and businesses leveraging the power of artificial intelligence to boost productivity, unleash creativity, and gain competitive advantages in today's digital landscape.";
  
  const seoKeywords = "AI tools, artificial intelligence tools, AI software directory, AI tool comparison, text generation AI, image AI tools, AI coding assistants, AI chatbots, AI writing tools, best AI tools 2025, free AI tools, AI for business, AI productivity tools, AI content creation, AI design tools, AI data analysis, AI marketing tools, AI for developers, AI research tools, generative AI tools, AI image generators, AI video creators, AI code generators, language model tools, AI transcription services, AI translation tools, AI customer service, AI for education, AI decision support, AI analytics tools, multimodal AI models, enterprise AI solutions, AI recommendation engines, no-code AI tools, large language models, AI automation, ChatGPT alternatives, Midjourney alternatives, DALL-E alternatives, AI voice generators, AI audio tools, AI SEO tools, AI copywriting tools, AI personal assistants, AI project management, AI meeting assistants, GPT-powered tools, enterprise AI software, AI browser extensions, AI APIs, AI-powered search, AI document analysis, AI legal tools, AI healthcare solutions, AI email assistants, AI presentation creators, AI summarization tools, AI grammar checkers, AI trend analysis, AI sentiment analysis, AI photo editors, AI music generators, AI video editors, AI competitive analysis, AI personalization tools, AI-powered CRM";

  // Additional long-tail SEO keywords for deeper topical coverage
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
    AI technologies transforming creative industries and digital content creation
  `;

  return (
    <div className="min-h-screen overflow-hidden">
      <Helmet>
        <title>AI Directory - Discover & Compare the Best AI Tools in 2025</title>
        <meta 
          name="description" 
          content={seoDescription} 
        />
        <meta property="og:title" content="AI Directory - Discover & Compare the Best AI Tools in 2025" />
        <meta 
          property="og:description" 
          content={seoDescription}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://www.allaitools.tech" />
        <meta property="og:site_name" content="All AI Tools Directory" />
        <meta property="og:locale" content="en_US" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Directory - Discover & Compare the Best AI Tools in 2025" />
        <meta 
          name="twitter:description" 
          content={seoDescription}
        />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="twitter:site" content="@AIToolsDirectory" />
        
        <meta name="keywords" content={`${seoKeywords}, ${longTailKeywords}`} />
        <link rel="canonical" href="https://www.allaitools.tech" />
        
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="AI Tools Directory Team" />
        <meta name="generator" content="AI Tools Directory Platform" />
        
        {/* Schema.org markup for search engines */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "All AI Tools Directory",
              "url": "https://www.allaitools.tech",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.allaitools.tech/?search={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "description": "Comprehensive directory for discovering and comparing AI tools across multiple categories"
            }
          `}
        </script>
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
