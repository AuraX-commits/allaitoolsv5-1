
import { useRef, useEffect } from "react";
import { ArrowDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../layout/ThemeToggle";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !textRef.current) return;
      
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      const scrollPercentage = Math.min(scrollY / heroHeight, 1);
      
      // Parallax for text
      textRef.current.style.transform = `translateY(${scrollPercentage * 50}px)`;
      
      // Opacity effect
      textRef.current.style.opacity = `${1 - scrollPercentage * 1.5}`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools-directory');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCompare = () => {
    const compareSection = document.getElementById('compare-section');
    if (compareSection) {
      compareSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={heroRef}
      className="min-h-screen relative flex items-center justify-center overflow-hidden bg-background"
    >
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      ></div>
      
      {/* Floating shapes */}
      <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-1/3 right-1/6 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-2/3 left-1/3 w-48 h-48 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob" style={{animationDelay: '4s'}}></div>
      
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <div 
        ref={textRef}
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-200"
      >
        <div className="inline-block mb-4 animate-fade-in">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            Find The Perfect AI Tool
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up text-balance max-w-4xl mx-auto leading-[1.1]">
          Discover & Compare <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            AI-Powered Tools
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Your curated directory of cutting-edge AI tools with detailed comparisons, 
          reviews, and insights to help you find the perfect solution.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button 
            onClick={scrollToTools}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-1"
          >
            Explore Tools
          </button>
          <button
            onClick={scrollToCompare}
            className="px-8 py-3 bg-transparent text-foreground rounded-full font-medium border border-border hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center gap-2"
          >
            Compare Tools <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 flex justify-center items-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Link to="/submit-tool" className="text-foreground/70 hover:text-primary transition-colors underline underline-offset-4">
            Submit Your Tool
          </Link>
        </div>
        
        <div className="mt-16 md:mt-24 animate-pulse">
          <button 
            onClick={scrollToTools}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-foreground/20 hover:border-primary/40 transition-colors group"
          >
            <ArrowDown className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>
      
      {/* Gradient overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;
