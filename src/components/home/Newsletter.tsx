
import { useState, useEffect, useRef, useCallback } from "react"; // Added useCallback
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

// --- NewsletterForm Component ---
// Defined outside the Newsletter component to prevent re-creation on parent re-render.
// It receives all necessary data and handlers as props.
const NewsletterFormDisplay = ({ email, onEmailChange, onSubmit, isLoading }) => {
  // This component is now stable and won't be re-created on every keystroke.
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
    >
      <div className="flex-grow">
        <Input
          type="email"
          placeholder="Enter your email address"
          className="w-full h-12 bg-background"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)} // Use the passed-in handler
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
};
// --- End of NewsletterForm Component ---

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();
  const newsletterSectionRef = useRef<HTMLElement>(null);

  // Show dialog automatically after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only show if not already subscribed and not already shown via other means
      if (!localStorage.getItem("newsletter-subscribed") && !isSubscribed) {
        setShowDialog(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isSubscribed]); // Added isSubscribed to dependency array

  const scrollToNewsletter = () => {
    setShowDialog(false); // Close the dialog
    setTimeout(() => {
      newsletterSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start", // Changed to 'start' for better visibility usually
      });
      // Optional: focus the email input after scrolling
      const emailInput = newsletterSectionRef.current?.querySelector('input[type="email"]') as HTMLInputElement | null;
      if (emailInput) {
        emailInput.focus();
      }
    }, 100); // Small delay to ensure dialog is closed
  };

  const handleSubscribe = async (e) => { // Removed type: React.FormEvent<HTMLFormElement> as it's handled by the form
    if (e) e.preventDefault(); // Still good to have if event is passed
    if (!email.trim()) {
      toast({ // Added a toast for empty email
        title: "Email required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email }]); // email is already a string from state

      if (error) {
        if (error.code === "23505") {
          // Unique violation - email already exists
          toast({
            title: "Already subscribed",
            description: "This email is already on our list!",
          });
           setIsSubscribed(true); // Consider them subscribed if already in DB
           localStorage.setItem("newsletter-subscribed", "true");
        } else {
          throw error; // Rethrow other Supabase errors
        }
      } else {
        setIsSubscribed(true);
        setEmail(""); // Clear email field on successful subscription
        localStorage.setItem("newsletter-subscribed", "true");
        toast({
          title: "Subscription successful!",
          description: "Thanks for joining our newsletter!",
        });
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast({
        title: "Subscription failed",
        description:
          "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Using useCallback for onEmailChange to ensure stable reference if NewsletterFormDisplay were memoized.
  // For this simple case, directly passing setEmail is fine, but this is good practice.
  const handleEmailChange = useCallback((newEmail) => {
    setEmail(newEmail);
  }, []);


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
              Get exclusive access to new AI tools, early feature releases, and
              special discounts!
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4"> {/* Added space-y for better spacing */}
            <div className="flex items-center gap-2"> {/* Removed mb-4, using parent space-y */}
              <Sparkles className="text-amber-500 h-5 w-5 flex-shrink-0" /> {/* Added flex-shrink-0 */}
              <p className="text-sm font-medium">
                Be the first to discover breakthrough AI tools
              </p>
            </div>
            <div className="flex items-center gap-2"> {/* Removed mb-4, using parent space-y */}
              <Sparkles className="text-amber-500 h-5 w-5 flex-shrink-0" /> {/* Added flex-shrink-0 */}
              <p className="text-sm font-medium">
                Receive 20% discount codes for premium AI tools
              </p>
            </div>
            <Button
              onClick={scrollToNewsletter}
              className="w-full h-12 px-8 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 transition-all duration-300"
            >
              Subscribe to Newsletter
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main newsletter section */}
      <section
        ref={newsletterSectionRef}
        id="newsletter" // Added an ID for easier targeting if needed
        className="bg-gradient-to-r from-primary/10 to-blue-500/10 py-16 scroll-mt-20" // Added scroll-mt for better scroll positioning with fixed headers
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card className="overflow-hidden shadow-xl border-primary/20">
              <div className="bg-primary/10 p-4 sm:p-6 flex items-center justify-center"> {/* Adjusted padding */}
                <h2 className="text-2xl md:text-3xl font-bold text-center text-primary">
                  Stay Ahead with AI Insights
                </h2>
              </div>
              <CardContent className="p-6 sm:p-8"> {/* Adjusted padding */}
                <div className="text-center"> {/* Removed mb-8, handled by children or form */}
                  <p className="text-foreground/80 mb-8"> {/* Kept mb-8 here as it's specific */}
                    Join 10,000+ AI enthusiasts receiving weekly curated
                    updates on the newest AI tools, exclusive guides, and
                    industry insights you won't find anywhere else.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-background p-4 rounded-lg shadow-sm border border-primary/10 flex flex-col items-center text-center"> {/* Added text-center */}
                      <Sparkles className="text-primary h-8 w-8 mb-2" />
                      <p className="text-sm font-medium">
                        Exclusive Tool Discounts
                      </p>
                    </div>
                    <div className="bg-background p-4 rounded-lg shadow-sm border border-primary/10 flex flex-col items-center text-center"> {/* Added text-center */}
                      <Mail className="text-primary h-8 w-8 mb-2" />
                      <p className="text-sm font-medium">Weekly AI Digest</p>
                    </div>
                    <div className="bg-background p-4 rounded-lg shadow-sm border border-primary/10 flex flex-col items-center text-center"> {/* Added text-center */}
                      <Sparkles className="text-primary h-8 w-8 mb-2" />
                      <p className="text-sm font-medium">
                        Early Access Features
                      </p>
                    </div>
                  </div>

                  {isSubscribed ? (
                    <div className="flex flex-col items-center bg-green-500/10 rounded-lg p-6 text-green-700"> {/* Themed for success */}
                      <CheckCircle className="h-12 w-12 text-current mb-3" /> {/* Use current color */}
                      <h3 className="text-xl font-bold text-current"> {/* Use current color */}
                        Thank You for Subscribing!
                      </h3>
                      <p className="text-current/80 mt-2"> {/* Use current color */}
                        You're now on the list! Check your inbox for a
                        confirmation and stay tuned for AI updates and exclusive
                        offers.
                      </p>
                    </div>
                  ) : (
                    // Use the new external form component and pass props
                    <NewsletterFormDisplay
                      email={email}
                      onEmailChange={handleEmailChange} // Pass the memoized handler
                      onSubmit={handleSubscribe}
                      isLoading={isLoading}
                    />
                  )}
                  <p className="text-xs text-foreground/60 mt-6"> {/* Increased margin top */}
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
