
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
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Categories</h2>
          <p className="text-foreground/80 dark:text-gray-300">
            Explore our comprehensive collection of AI tools by category
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayCategories.map((category) => (
            <Link
              key={category}
              to={`/categories/${encodeURIComponent(category)}`}
              className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg border border-input dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-md transition-all group"
            >
              <span className="font-medium dark:text-white">{category}</span>
              <ArrowRight className="w-5 h-5 text-muted-foreground dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            to="/categories" 
            className="inline-flex items-center px-6 py-3 bg-secondary/50 dark:bg-gray-800 text-foreground dark:text-white rounded-lg font-medium hover:bg-secondary dark:hover:bg-gray-700 transition-colors"
          >
            View All Categories <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
