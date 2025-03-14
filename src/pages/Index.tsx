
import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import ToolsDirectory from "../components/home/ToolsDirectory";
import ComparisonSection from "../components/home/ComparisonSection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <Helmet>
        <title>AI Directory - Discover & Compare the Best AI Tools</title>
        <meta 
          name="description" 
          content="Explore our comprehensive AI tools directory. Find, compare, and choose the best AI software for text generation, image creation, code assistance, and more." 
        />
        <meta property="og:title" content="AI Directory - Discover & Compare the Best AI Tools" />
        <meta 
          property="og:description" 
          content="Explore our comprehensive AI tools directory. Find, compare, and choose the best AI software for text generation, image creation, code assistance, and more."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://www.allaitools.tech" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Directory - Discover & Compare the Best AI Tools" />
        <meta 
          name="twitter:description" 
          content="Explore our comprehensive AI tools directory. Find, compare, and choose the best AI software for text generation, image creation, code assistance, and more."
        />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="keywords" content="AI tools, artificial intelligence, chatbots, text generation, image generation, AI directory, AI software" />
        <link rel="canonical" href="https://www.allaitools.tech" />
      </Helmet>
      
      <Navbar />
      <main>
        <Hero />
        <ToolsDirectory />
        <ComparisonSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
