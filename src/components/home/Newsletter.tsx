
import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setEmail("");
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
  };

  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block p-2 bg-primary/10 rounded-full mb-4">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated with AI Trends
          </h2>
          <p className="text-foreground/80 mb-8">
            Subscribe to our newsletter to receive the latest updates on AI tools, industry trends, 
            and exclusive content straight to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email address"
                className={cn(
                  "pr-32 h-12 border-2 shadow-sm",
                  error ? "border-destructive" : "border-input"
                )}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isSubmitted}
              />
              <button
                type="submit"
                className={cn(
                  "absolute right-1.5 top-1.5 inline-flex items-center h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  isSubmitted 
                    ? "bg-green-500 text-white" 
                    : "bg-primary text-white hover:bg-primary/90",
                  (isLoading || isSubmitted) ? "opacity-90 cursor-not-allowed" : ""
                )}
                disabled={isLoading || isSubmitted}
              >
                {isLoading ? (
                  "Subscribing..."
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="mr-1 h-4 w-4" />
                    Subscribed
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-destructive">{error}</p>
            )}
            <p className="mt-3 text-xs text-muted-foreground">
              By subscribing, you agree to our privacy policy. We'll never spam you.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
