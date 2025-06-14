
import { useRef, useEffect } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

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
      className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white"
    >
      {/* Abstract background shapes */}
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-purple-200/20 rounded-full filter blur-3xl opacity-50"></div>

      <div
        ref={textRef}
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-200"
      >
        <div className="inline-block mb-4 animate-fade-in">
          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-white border border-input shadow-subtle">
            Find The Perfect AI Tool
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up text-balance max-w-4xl mx-auto leading-tight">
          Discover & Compare <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
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
            className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-2xl hover:shadow-primary/20 transform hover:-translate-y-1.5 duration-300 flex items-center justify-center gap-2 text-base"
          >
            Explore Tools <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={scrollToCompare}
            className="px-8 py-4 bg-white text-foreground rounded-full font-medium border border-input hover:bg-secondary/70 transition-colors flex items-center justify-center gap-2 text-base"
          >
            Compare Tools <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 flex justify-center items-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Link to="/submit-tool" className="text-sm text-foreground/60 hover:text-primary transition-colors underline-offset-4 hover:underline">
            Submit Your Tool
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
