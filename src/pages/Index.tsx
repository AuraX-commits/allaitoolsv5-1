
import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import ToolsDirectory from "../components/home/ToolsDirectory";
import ComparisonSection from "../components/home/ComparisonSection";
import CategoryGrid from "../components/home/CategoryGrid";
import Newsletter from "../components/common/Newsletter";
import { Helmet } from "react-helmet-async";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Check for dark mode preference
    const isDarkMode = localStorage.getItem("theme") === "dark" || 
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="min-h-screen overflow-hidden dark:bg-gray-900">
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
      <main className="dark:text-white">
        <Hero />
        <ToolsDirectory disableComparison={true} />
        <CategoryGrid />
        <ComparisonSection />
        
        {/* Newsletter Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <Newsletter />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
