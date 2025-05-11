
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, CheckCircle, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  // Show dialog automatically after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only show if not already subscribed
      if (!localStorage.getItem("newsletter-subscribed")) {
        setShowDialog(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

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
        // Remember that user subscribed
        localStorage.setItem("newsletter-subscribed", "true");
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

  const NewsletterForm = () => (
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
        className="h-12 px-8 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 transition-all duration-300"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Subscribe"
        )}
      </Button>
    </form>
  );

  return (
    <>
      {/* Newsletter popup dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Mail className="h-6 w-6 text-primary" />
              Join the AI Revolution!
            </DialogTitle>
            <DialogDescription className="text-base">
              Get exclusive access to new AI tools, early feature releases, and special discounts!
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-amber-500 h-5 w-5" />
              <p className="text-sm font-medium">
                Be the first to discover breakthrough AI tools
              </p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-amber-500 h-5 w-5" />
              <p className="text-sm font-medium">
                Receive 20% discount codes for premium AI tools
              </p>
            </div>
            {!isSubscribed ? <NewsletterForm /> : (
              <div className="flex flex-col items-center bg-background/50 rounded-lg p-6">
                <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
                <h3 className="text-xl font-bold">Thank You for Subscribing!</h3>
                <p className="text-muted-foreground mt-2">
                  Your first AI tools newsletter is on its way!
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Main newsletter section */}
      <section className="bg-gradient-to-r from-primary/10 to-blue-500/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card className="overflow-hidden shadow-xl border-primary/20">
              <div className="bg-primary/10 p-4 flex items-center justify-center">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-primary">
                  Stay Ahead with AI Insights
                </h2>
              </div>
              <CardContent className="p-6">
                <div className="text-center mb-8">
                  <p className="text-foreground/80 mb-8">
                    Join 10,000+ AI enthusiasts receiving weekly curated updates on the newest AI tools, 
                    exclusive guides, and industry insights you won't find anywhere else.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-background p-4 rounded-lg shadow-sm border border-primary/10 flex flex-col items-center">
                      <Sparkles className="text-primary h-8 w-8 mb-2" />
                      <p className="text-sm font-medium">
                        Exclusive Tool Discounts
                      </p>
                    </div>
                    <div className="bg-background p-4 rounded-lg shadow-sm border border-primary/10 flex flex-col items-center">
                      <Mail className="text-primary h-8 w-8 mb-2" />
                      <p className="text-sm font-medium">
                        Weekly AI Digest
                      </p>
                    </div>
                    <div className="bg-background p-4 rounded-lg shadow-sm border border-primary/10 flex flex-col items-center">
                      <Sparkles className="text-primary h-8 w-8 mb-2" />
                      <p className="text-sm font-medium">
                        Early Access Features
                      </p>
                    </div>
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
                    <NewsletterForm />
                  )}
                  <p className="text-xs text-foreground/60 mt-4">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;
