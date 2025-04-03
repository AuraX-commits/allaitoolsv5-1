
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email }]);

      if (error) {
        if (error.code === "23505") {
          // Unique violation - email already exists
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter.",
          });
        } else {
          throw error;
        }
      } else {
        setIsSubscribed(true);
        toast({
          title: "Subscription successful",
          description: "Thank you for subscribing to our newsletter!",
        });
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast({
        title: "Subscription failed",
        description: "There was a problem subscribing to our newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-secondary py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated With AI Trends</h2>
          <p className="text-foreground/80 mb-8">
            Join our newsletter to receive weekly updates about the newest AI tools, exclusive guides, and industry insights.
          </p>
          
          <div className="flex items-center gap-2 justify-center mb-8">
            <Sparkles className="text-primary h-5 w-5" />
            <p className="text-sm font-medium">
              Newsletter subscribers occasionally receive free credits for our partner AI tools!
            </p>
          </div>
          
          {isSubscribed ? (
            <div className="flex flex-col items-center bg-background/50 rounded-lg p-6">
              <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
              <h3 className="text-xl font-bold">Thank You for Subscribing!</h3>
              <p className="text-foreground/80 mt-2">
                You're now on the list! Check your inbox for a confirmation and stay tuned for AI updates and exclusive offers.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <div className="flex-grow">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full h-12 bg-background"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="h-12 px-8"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          )}
          <p className="text-xs text-foreground/60 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
