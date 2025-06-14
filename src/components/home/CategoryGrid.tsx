
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "@/utils/toolsData";

const categoryIcons = {
  "Text Generation": "text",
  "Image Generation": "image",
  "Conversational AI": "message-circle",
  "Code Generation": "code",
  "Search": "search",
  "Marketing": "megaphone",
  "Design": "paintbrush",
  "Developer Tools": "tool",
  "Open Source": "github",
  "Productivity": "zap",
  "Content Creation": "file-text",
  "Video Editing": "video",
  "Transcription": "mic",
  "Translation": "globe",
  "Automation": "repeat",
  "Collaboration": "users",
  "Presentation": "presentation",
  "Voice Generation": "volume-2",
  "Customer Service": "headphones",
  "Data Analysis": "bar-chart",
  "Research": "search",
  "Education": "graduation-cap"
};

const CategoryGrid = () => {
  // Filter out "All" category and ensure we only show categories that are in the list
  const displayCategories = categories.filter(cat => cat !== "All");
  
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore by Category</h2>
          <p className="text-muted-foreground text-lg">
            Find the perfect AI tool by browsing our curated categories.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayCategories.map((category) => (
            <Link
              key={category}
              to={`/categories/${encodeURIComponent(category)}`}
              className="flex items-center justify-between bg-card p-4 rounded-lg border border-transparent hover:border-primary hover:shadow-lg hover:-translate-y-1 transform transition-all group"
            >
              <span className="font-medium">{category}</span>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/categories" 
            className="inline-flex items-center px-6 py-3 bg-card text-foreground rounded-lg font-medium hover:bg-accent transition-colors border"
          >
            View All Categories <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
