
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Clock, AlertCircle, BellRing } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ComingSoonProps {
  title: string;
}

const ComingSoon = ({ title }: ComingSoonProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    toast({
      title: "Subscription successful!",
      description: `We'll notify you when ${title} is available.`,
      duration: 3000,
    });
    
    setEmail("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{title} - Coming Soon | AIDirectory</title>
        <meta 
          name="description" 
          content={`${title} is coming soon to AIDirectory. Subscribe to get notified when it's available.`} 
        />
        <meta property="og:title" content={`${title} - Coming Soon | AIDirectory`} />
        <meta property="og:description" content={`${title} is coming soon to AIDirectory. Subscribe to get notified when it's available.`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content={`https://www.allaitools.tech/${title.toLowerCase().replace(/\s+/g, '-')}`} />
        <link rel="canonical" href={`https://www.allaitools.tech/${title.toLowerCase().replace(/\s+/g, '-')}`} />
      </Helmet>
      
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="container px-4 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">{title} Coming Soon</h1>
            <p className="text-lg text-foreground/80 mb-8">
              We're working hard to bring you an amazing {title.toLowerCase()} experience. 
              Sign up to be notified when it launches!
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <div className="flex items-center p-4 rounded-lg bg-secondary/50 max-w-md">
                <AlertCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                <p className="text-sm text-foreground/90">
                  Our team is putting the finishing touches on this feature. It's going to be worth the wait!
                </p>
              </div>
            </div>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <Input
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit">
                <BellRing className="mr-2 h-4 w-4" />
                Notify Me
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ComingSoon;
