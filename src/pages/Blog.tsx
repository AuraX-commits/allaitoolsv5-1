
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/utils/blogData";
import { Clock, Tag, ChevronRight } from "lucide-react";

const Blog = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>AI Tools Blog | Latest Insights & Tutorials | AIDirectory</title>
        <meta 
          name="description" 
          content="Explore the latest articles, insights, and tutorials about AI tools, machine learning advances, and how to leverage artificial intelligence in your projects." 
        />
        <meta property="og:title" content="AI Tools Blog | Latest Insights & Tutorials | AIDirectory" />
        <meta 
          property="og:description" 
          content="Explore the latest articles, insights, and tutorials about AI tools, machine learning advances, and how to leverage artificial intelligence in your projects."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://www.allaitools.tech/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Tools Blog | Latest Insights & Tutorials | AIDirectory" />
        <meta 
          name="twitter:description" 
          content="Explore the latest articles, insights, and tutorials about AI tools, machine learning advances, and how to leverage artificial intelligence in your projects."
        />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="keywords" content="AI blog, artificial intelligence articles, machine learning insights, AI tool tutorials, technology blog" />
        <link rel="canonical" href="https://www.allaitools.tech/blog" />
      </Helmet>
      
      <Navbar />
      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">AI Tools Blog</h1>
            <p className="text-lg text-foreground/80">
              Discover insights, tutorials, and the latest news about AI tools and technologies.
            </p>
          </div>

          {/* Featured Post */}
          <div className="mb-16">
            <Link to={`/blog/${blogPosts[0].slug}`} className="block">
              <div className="grid md:grid-cols-5 gap-8 bg-white rounded-2xl overflow-hidden shadow-subtle hover:shadow-lg transition-shadow p-6">
                <div className="md:col-span-2">
                  <img 
                    src={blogPosts[0].coverImage} 
                    alt={`Featured image for article: ${blogPosts[0].title}`} 
                    className="w-full h-60 md:h-full object-cover rounded-xl"
                  />
                </div>
                <div className="md:col-span-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-3">
                      <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                        {blogPosts[0].category}
                      </span>
                      <span className="ml-3 text-muted-foreground text-sm flex items-center">
                        <Clock className="w-4 h-4 mr-1" /> {blogPosts[0].readingTime}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-foreground/80 mb-4">
                      {blogPosts[0].excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={blogPosts[0].author.avatar} 
                        alt={`Profile photo of ${blogPosts[0].author.name}, ${blogPosts[0].author.title}`} 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium">{blogPosts[0].author.name}</p>
                        <p className="text-sm text-muted-foreground">{blogPosts[0].date}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Read Article <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Blog Post Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-subtle hover:shadow-md transition-shadow h-full flex flex-col">
                  <img 
                    src={post.coverImage} 
                    alt={`Cover image for article: ${post.title}`} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center mb-3">
                      <span className="text-xs font-medium px-2.5 py-0.5 bg-primary/10 text-primary rounded-full">
                        {post.category}
                      </span>
                      <span className="ml-2 text-muted-foreground text-xs flex items-center">
                        <Clock className="w-3 h-3 mr-1" /> {post.readingTime}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-foreground/80 text-sm mb-4 line-clamp-2 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center">
                        <img 
                          src={post.author.avatar} 
                          alt={`Profile photo of ${post.author.name}, ${post.author.title}`} 
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div>
                          <p className="text-sm font-medium">{post.author.name}</p>
                          <p className="text-xs text-muted-foreground">{post.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Tags Section */}
          <div className="mt-16">
            <h3 className="text-xl font-bold mb-4">Popular Topics</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(blogPosts.flatMap(post => post.tags))).map((tag) => (
                <div key={tag} className="flex items-center px-3 py-1.5 bg-secondary rounded-full">
                  <Tag className="w-3.5 h-3.5 mr-1.5 text-primary" />
                  <span className="text-sm">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
