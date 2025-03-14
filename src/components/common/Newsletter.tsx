
import React, { useState } from "react";
import { Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmail("");
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
    }, 1000);
  };

  return (
    <div className="w-full bg-primary/5 dark:bg-primary/10 rounded-xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="h-6 w-6 text-primary dark:text-primary" />
        <h3 className="text-xl font-bold">Subscribe to our Newsletter</h3>
      </div>
      <p className="text-foreground/80 dark:text-foreground/70 mb-4">
        Get the latest AI tools and updates delivered directly to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-grow">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            "Subscribing..."
          ) : (
            <>
              Subscribe <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
