
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabaseClient";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tool name must be at least 2 characters.",
  }),
  website: z.string().url({
    message: "Please enter a valid URL.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  pricing: z.string({
    required_error: "Please select a pricing option.",
  }),
  shortDescription: z.string().min(20, {
    message: "Short description must be at least 20 characters.",
  }).max(200, {
    message: "Short description cannot exceed 200 characters.",
  }),
  description: z.string().min(100, {
    message: "Description must be at least 100 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  logoUrl: z.string().url({
    message: "Please enter a valid logo URL.",
  }).optional().or(z.literal("")),
  founderName: z.string().optional(),
  founderEmail: z.string().email({
    message: "Please enter a valid email address.",
  }).optional().or(z.literal("")),
  submitterName: z.string().optional(),
  submitterRole: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const SubmitTool = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      website: "",
      category: "",
      pricing: "",
      shortDescription: "",
      description: "",
      email: "",
      logoUrl: "",
      founderName: "",
      founderEmail: "",
      submitterName: "",
      submitterRole: "",
    },
  });

  const pageTitle = "Submit Your AI Tool | Get Listed in the Top AI Directory | AllAITools.tech";
  const pageDescription = "Submit your AI tool for inclusion in the AllAITools.tech directory - the internet's most comprehensive AI tool resource. Increase visibility, attract new users, and join the leading community of innovative AI solutions. Our submission process is simple, and our expert team reviews each tool to ensure quality listings that help users discover the best AI technologies.";

  const seoKeywords = "submit AI tool, list AI software, AI directory submission, add AI tool listing, promote AI application, AI tool directory inclusion, get AI tool listed, AI product submission, AI software directory listing, AI tool promotion, artificial intelligence tool submission, submit new AI tool, AI directory application, list AI product, AI marketplace submission, add to AI directory, AI tool exposure, AI directory listing form, register AI tool, AI software promotion, AI tool visibility, AI listing service, AI product directory, AI tool registration, AI directory inclusion, add AI solution, AI company listing, submit AI software, AI developer directory, AI tool submission guidelines";

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.from("tool_submissions").insert([
        {
          name: values.name,
          website: values.website,
          category: values.category,
          pricing: values.pricing,
          short_description: values.shortDescription,
          description: values.description,
          email: values.email,
          logo_url: values.logoUrl || null,
          founder_name: values.founderName || null,
          founder_email: values.founderEmail || null,
          submitter_name: values.submitterName || null,
          submitter_role: values.submitterRole || null,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Tool submitted successfully!",
        description:
          "Thank you for your submission. We'll review it and get back to you soon.",
      });

      navigate("/");
    } catch (error) {
      console.error("Error submitting tool:", error);
      toast({
        title: "Error submitting tool",
        description: "There was a problem submitting your tool. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.allaitools.tech/submit-tool" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:site_name" content="All AI Tools Directory" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="twitter:site" content="@AIToolsDirectory" />
        
        <meta name="keywords" content={seoKeywords} />
        <link rel="canonical" href="https://www.allaitools.tech/submit-tool" />
        
        <meta name="robots" content="index, follow" />
        <meta name="author" content="AI Tools Directory Team" />
        
        {/* Schema.org Form markup */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "${pageTitle}",
              "description": "${pageDescription}",
              "url": "https://www.allaitools.tech/submit-tool",
              "mainEntity": {
                "@type": "WebContent",
                "headline": "Submit Your AI Tool for Review",
                "about": {
                  "@type": "Thing",
                  "name": "AI Tool Submission Process"
                }
              },
              "potentialAction": {
                "@type": "Action",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.allaitools.tech/submit-tool",
                  "actionPlatform": [
                    "http://schema.org/DesktopWebPlatform",
                    "http://schema.org/MobileWebPlatform"
                  ]
                }
              },
              "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["h1", ".submission-guidelines"]
              }
            }
          `}
        </script>
        
        {/* HowTo Schema for submission process */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to Submit Your AI Tool to AllAITools.tech",
              "description": "Follow these steps to submit your AI tool for inclusion in our comprehensive directory.",
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Fill Your Tool Information",
                  "text": "Provide the name, website URL, category, pricing model, and description of your AI tool."
                },
                {
                  "@type": "HowToStep",
                  "name": "Add Creator Details",
                  "text": "Optionally include founder/creator information to enhance the credibility of your listing."
                },
                {
                  "@type": "HowToStep",
                  "name": "Provide Contact Information",
                  "text": "Enter an email address where our team can reach you regarding your submission."
                },
                {
                  "@type": "HowToStep",
                  "name": "Submit for Review",
                  "text": "Submit your completed form for review by our expert team."
                }
              ]
            }
          `}
        </script>
        
        {/* FAQ Schema for submission questions */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Is it free to submit my AI tool to the directory?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, basic listings in the AllAITools.tech directory are completely free. We offer premium listing options with additional visibility features for those who want to highlight their tools."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long does the review process take?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our team typically reviews submissions within 3-5 business days. After review, you will receive an email notification about the status of your submission."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What are the criteria for accepting AI tools?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We accept AI tools that demonstrate clear value, functionality, and relevance to our users. Tools must be legitimate, operational, and provide genuine AI capabilities. We prioritize tools with unique features or that solve specific problems."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I update my tool information after submission?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, you can request updates to your tool listing at any time by contacting our team. We encourage keeping your information current, especially for pricing changes or new features."
                  }
                }
              ]
            }
          `}
        </script>
      </Helmet>
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Submit an AI Tool</h1>
          <p className="text-muted-foreground mb-8">
            Fill out the form below to submit your AI tool for review. Our team
            will review your submission and get back to you if we need more
            information.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 bg-card border rounded-lg p-6"
            >
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Tool Information</h2>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tool Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., ChatGPT" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., https://chat.openai.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Text Generation">Text Generation</SelectItem>
                            <SelectItem value="Image Generation">Image Generation</SelectItem>
                            <SelectItem value="Code Assistant">Code Assistant</SelectItem>
                            <SelectItem value="Video Generation">Video Generation</SelectItem>
                            <SelectItem value="Audio Generation">Audio Generation</SelectItem>
                            <SelectItem value="Chatbot">Chatbot</SelectItem>
                            <SelectItem value="Data Analysis">Data Analysis</SelectItem>
                            <SelectItem value="Productivity">Productivity</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pricing"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pricing Model*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select pricing" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Free">Free</SelectItem>
                            <SelectItem value="Freemium">Freemium</SelectItem>
                            <SelectItem value="Paid">Paid</SelectItem>
                            <SelectItem value="Free Trial">Free Trial</SelectItem>
                            <SelectItem value="Contact for Pricing">Contact for Pricing</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description* (200 chars max)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A brief description of what your tool does..."
                          {...field}
                          className="resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Description*</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A detailed description of your tool, its features, use cases, etc."
                          {...field}
                          className="min-h-[200px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="logoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo URL (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., https://yourtool.com/logo.png"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6 pt-4 border-t">
                <h2 className="text-xl font-semibold">Founder Information (Optional)</h2>
                
                <FormField
                  control={form.control}
                  name="founderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Founder/Creator Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., John Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="founderEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Founder/Creator Email</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., founder@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6 pt-4 border-t">
                <h2 className="text-xl font-semibold">Submitter Information (Optional)</h2>
                
                <FormField
                  control={form.control}
                  name="submitterName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="submitterRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Role</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Marketing Manager" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6 pt-4 border-t">
                <h2 className="text-xl font-semibold">Contact Information</h2>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., contact@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  "Submit Tool for Review"
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                By submitting, you agree to our{" "}
                <a href="/terms" className="underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="underline">
                  Privacy Policy
                </a>
              </p>
            </form>
          </Form>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default SubmitTool;
