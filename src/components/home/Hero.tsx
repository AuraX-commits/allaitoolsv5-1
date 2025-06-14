import { ArrowDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
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
      className="min-h-screen relative flex items-center justify-center overflow-hidden bg-background text-foreground"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-background to-secondary/30 dark:to-secondary/10" />
      <div 
        className="absolute inset-0 z-0 opacity-20 dark:opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--primary)/0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      ></div>
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-background to-transparent z-10" />

      <div 
        className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="inline-block mb-4 animate-fade-in">
          <Link to="/categories" className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors">
            Over 3000+ AI Tools
          </Link>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up text-balance max-w-4xl mx-auto leading-tight">
          The Ultimate Directory
          <br className="hidden sm:block" />
          for <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-fuchsia-500 to-amber-500 animate-background-pan bg-[200%_auto]">
            Artificial Intelligence
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Discover, compare, and master the best AI tools. Your curated guide to the future of technology, updated daily.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button 
            onClick={scrollToTools}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-glow-primary transform hover:-translate-y-1"
          >
            Explore All Tools
          </button>
          <button
            onClick={scrollToCompare}
            className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold text-lg hover:bg-secondary/80 flex items-center justify-center gap-2"
          >
            Compare Tools <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-8 flex justify-center items-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Link to="/submit-tool" className="text-muted-foreground hover:text-primary transition-colors underline-offset-4 text-sm hover:underline">
            Submit Your Tool
          </Link>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 mt-16 md:mt-24 animate-pulse">
          <button 
            onClick={scrollToTools}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-foreground/20 hover:border-primary/40 transition-colors group"
          >
            <ArrowDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
