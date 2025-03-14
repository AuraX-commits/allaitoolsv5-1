
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { blogPosts } from "@/utils/blogData";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Tag, ArrowLeft, MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [comment, setComment] = useState("");
  
  const post = blogPosts.find(post => post.slug === slug);
  
  useEffect(() => {
    if (!post) {
      navigate("/blog", { replace: true });
      return;
    }
    
    window.scrollTo(0, 0);
  }, [post, navigate]);
  
  if (!post) return null;
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) return;
    
    toast({
      title: "Comment submitted",
      description: "Your comment is awaiting moderation. Thank you!",
      duration: 3000,
    });
    
    setComment("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{post.title} | AIDirectory Blog</title>
        <meta 
          name="description" 
          content={post.excerpt} 
        />
        <meta property="og:title" content={`${post.title} | AIDirectory Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.coverImage} />
        <meta property="og:url" content={`https://www.allaitools.tech/blog/${post.slug}`} />
        <meta property="article:published_time" content={new Date(post.date).toISOString()} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | AIDirectory Blog`} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.coverImage} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <link rel="canonical" href={`https://www.allaitools.tech/blog/${post.slug}`} />
      </Helmet>
      
      <Navbar />
      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Articles
            </Link>
            
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                  {post.category}
                </span>
                <span className="ml-3 text-muted-foreground text-sm flex items-center">
                  <Clock className="w-4 h-4 mr-1" /> {post.readingTime}
                </span>
                <span className="ml-3 text-muted-foreground text-sm flex items-center">
                  <Calendar className="w-4 h-4 mr-1" /> {post.date}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>
              <p className="text-lg text-foreground/80 mb-6">{post.excerpt}</p>
              
              <div className="flex items-center">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">{post.author.title}</p>
                </div>
              </div>
            </div>
            
            {/* Featured Image */}
            <div className="mb-8">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-auto rounded-xl"
              />
            </div>
            
            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-12">
              {post.tags.map((tag) => (
                <div key={tag} className="flex items-center px-3 py-1.5 bg-secondary rounded-full">
                  <Tag className="w-3.5 h-3.5 mr-1.5 text-primary" />
                  <span className="text-sm">{tag}</span>
                </div>
              ))}
            </div>
            
            {/* Comment Section */}
            <div className="border-t pt-8">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Leave a Comment
              </h3>
              
              <form onSubmit={handleCommentSubmit}>
                <Textarea 
                  className="mb-4" 
                  placeholder="Share your thoughts..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={5}
                />
                <div className="flex justify-end">
                  <Button type="submit">Submit Comment</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
