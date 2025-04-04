
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
  
  const seoKeywords = "AI tools, artificial intelligence, chatbots, text generation, image generation, AI directory, AI software, machine learning tools, language models, ChatGPT, Midjourney, DALL-E, GitHub Copilot, AI comparison, AI for business, AI for developers, AI for designers, conversational AI, code generation, productivity tools, AI assistants, creative AI tools, automation tools, free AI tools, AI writing assistants, AI image generators, best AI solutions, enterprise AI software, AI for marketing, natural language processing, computer vision, AI art creation, AI decision support, AI analytics, AI SEO tools, AI video generation, AI music creation, AI transcription services, AI translation tools, AI for education, AI for healthcare, AI voice generation, AI data analysis, AI research tools, AI for startups, AI testing tools, no-code AI, generative AI, multimodal AI models, AI recommendation engines, AI personalization, AI customer service, AI project management, AI sales tools, AI email assistants, AI presentation tools";

  return (
    <div className="min-h-screen overflow-hidden">
      <Helmet>
        <title>AI Directory - Discover & Compare the Best AI Tools</title>
        <meta 
          name="description" 
          content={seoDescription} 
        />
        <meta property="og:title" content="AI Directory - Discover & Compare the Best AI Tools" />
        <meta 
          property="og:description" 
          content={seoDescription}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://www.allaitools.tech" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Directory - Discover & Compare the Best AI Tools" />
        <meta 
          name="twitter:description" 
          content={seoDescription}
        />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="keywords" content={seoKeywords} />
        <link rel="canonical" href="https://www.allaitools.tech" />
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
