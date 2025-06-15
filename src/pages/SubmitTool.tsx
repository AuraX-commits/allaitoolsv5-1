<script type='text/javascript' src='//pl26834204.profitableratecpm.com/69/0c/99/690c991e5276410fb941b547108da734.js'></script>
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
  }),
  founderName: z.string().min(2, {
    message: "Founder name must be at least 2 characters.",
  }),
  founderEmail: z.string().email({
    message: "Please enter a valid founder email address.",
  }),

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

  const pageTitle = "Submit Your AI Tool for Free - Get Listed in Top AI Directory | AllAITools.tech";
  const pageDescription = "Submit your AI tool for FREE inclusion in AllAITools.tech - the internet's most comprehensive AI tool directory with 100K+ monthly visitors. Increase visibility, attract new users, and join 3000+ innovative AI solutions. Simple submission process, expert review, and instant exposure to AI enthusiasts, developers, and business professionals worldwide.";

  const seoKeywords = "submit AI tool free, list AI software free, free AI directory submission, add AI tool listing free, promote AI application free, AI tool directory inclusion free, get AI tool listed free, AI product submission free, AI software directory listing free, AI tool promotion free, artificial intelligence tool submission free, submit new AI tool free, AI directory application free, list AI product free, AI marketplace submission free, add to AI directory free, AI tool exposure free, AI directory listing form free, register AI tool free, AI software promotion free, AI tool visibility free, AI listing service free, AI product directory free, AI tool registration free, AI directory inclusion free, add AI solution free, AI company listing free, submit AI software free, AI developer directory free, AI tool submission guidelines free, submit ai tool, list ai tool, add ai tool, free ai tool listing, ai tool directory, ai tools submission, ai software listing, submit artificial intelligence tool, ai tool promotion, ai directory submission, ai tool registration, list my ai tool, add my ai tool, ai tool marketplace, ai tool visibility, ai software directory, ai tool exposure, ai product listing, ai startup listing, new ai tool submission, ai innovation listing, ai tool discovery, submit ai application, ai tool catalog, ai directory listing, ai tool database, submit ai product, ai tool showcase, ai software catalog, ai tool platform, ai development listing, ai solution submission, ai tool repository, submit chatgpt alternative, submit ai writing tool, submit ai image generator, submit ai code assistant, submit ai video tool, submit ai voice tool, submit ai marketing tool, submit ai productivity tool, submit ai design tool, submit ai data tool, submit ai research tool, submit ai automation tool, submit ai business tool, submit ai education tool, submit ai health tool, submit ai finance tool, submit ai gaming tool, submit ai music tool, submit ai photo tool, submit ai translation tool, submit ai transcription tool, submit ai analytics tool, submit ai security tool, submit ai hr tool, submit ai legal tool, submit ai real estate tool, submit ai ecommerce tool, submit ai social media tool, submit ai content tool, submit ai seo tool, submit ai email tool, submit ai crm tool, submit ai project management tool, submit ai collaboration tool, submit ai communication tool, submit ai video editing tool, submit ai audio editing tool, submit ai photo editing tool, submit ai graphic design tool, submit ai ui design tool, submit ai ux design tool, submit ai logo design tool, submit ai presentation tool, submit ai document tool, submit ai spreadsheet tool, submit ai database tool, submit ai cloud tool, submit ai mobile app, submit ai web app, submit ai chrome extension, submit ai browser tool, submit ai desktop app, submit ai api tool, submit ai developer tool, submit ai no code tool, submit ai low code tool, submit ai workflow tool, submit ai integration tool, submit ai plugin tool, submit ai widget tool, submit ai saas tool, submit ai enterprise tool, submit ai startup tool, submit ai indie tool, submit ai open source tool, submit ai free tool, submit ai freemium tool, submit ai paid tool, submit ai subscription tool, submit ai one time purchase tool";

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
        
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="AllAITools.tech Team" />
        <meta name="language" content="English" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="coverage" content="worldwide" />
        <meta name="target" content="AI developers, startup founders, product managers, AI companies, tech entrepreneurs" />
        <meta name="subject" content="AI Tool Submission - Free AI Directory Listing" />
        <meta name="copyright" content="AllAITools.tech" />
        <meta name="designer" content="AllAITools.tech Team" />
        <meta name="owner" content="AllAITools.tech" />
        <meta name="url" content="https://www.allaitools.tech/submit-tool" />
        <meta name="identifier-URL" content="https://www.allaitools.tech/submit-tool" />
        <meta name="category" content="Technology, Artificial Intelligence, Software Directory, AI Tool Submission" />
        <meta name="classification" content="AI Tools Directory Submission Form" />
        <meta name="revisit-after" content="1 days" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow" />
        
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
                "@type": "WebApplication",
                "name": "AI Tool Submission Form",
                "description": "Free submission form for adding AI tools to the AllAITools.tech directory",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web Browser",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD",
                  "description": "Free AI tool listing submission"
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
                "cssSelector": ["h1", ".submission-guidelines", ".form-description"]
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
              "name": "How to Submit Your AI Tool to AllAITools.tech Directory for Free",
              "description": "Step-by-step guide to submit your AI tool for free inclusion in the world's largest AI tools directory with 100K+ monthly visitors.",
              "image": "/og-image.png",
              "totalTime": "PT5M",
              "estimatedCost": {
                "@type": "MonetaryAmount",
                "currency": "USD",
                "value": "0"
              },
              "supply": [
                {
                  "@type": "HowToSupply",
                  "name": "AI tool information"
                },
                {
                  "@type": "HowToSupply", 
                  "name": "Tool logo or icon"
                },
                {
                  "@type": "HowToSupply",
                  "name": "Contact information"
                }
              ],
              "tool": [
                {
                  "@type": "HowToTool",
                  "name": "Web browser"
                },
                {
                  "@type": "HowToTool",
                  "name": "Internet connection"
                }
              ],
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Prepare Your AI Tool Information",
                  "text": "Gather your AI tool's name, website URL, category, pricing model, and detailed description highlighting its unique features and benefits.",
                  "image": "/og-image.png"
                },
                {
                  "@type": "HowToStep",
                  "name": "Fill Out the Submission Form",
                  "text": "Complete our comprehensive submission form with accurate information about your AI tool, including technical details and use cases.",
                  "image": "/og-image.png"
                },
                {
                  "@type": "HowToStep",
                  "name": "Add Creator and Contact Details",
                  "text": "Provide founder/creator information and contact details to enhance credibility and enable our team to reach you if needed.",
                  "image": "/og-image.png"
                },
                {
                  "@type": "HowToStep",
                  "name": "Submit for Expert Review",
                  "text": "Submit your completed form for review by our expert team who will evaluate your tool for inclusion in our curated directory.",
                  "image": "/og-image.png"
                },
                {
                  "@type": "HowToStep",
                  "name": "Get Listed and Gain Visibility",
                  "text": "Once approved, your AI tool will be listed in our directory and exposed to 100K+ monthly visitors actively searching for AI solutions.",
                  "image": "/og-image.png"
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
                  "name": "Is it completely free to submit my AI tool to AllAITools.tech?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, submitting your AI tool to AllAITools.tech is completely free. Basic listings in our directory are at no cost. We also offer premium listing options with additional visibility features for enhanced promotion."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long does the AI tool review process take?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our expert team typically reviews AI tool submissions within 2-5 business days. After review, you'll receive an email notification about your submission status and next steps."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What are the criteria for accepting AI tools in the directory?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We accept AI tools that demonstrate genuine AI capabilities, provide clear value to users, are functional and operational, and solve real problems. We prioritize tools with unique features, innovative approaches, or specialized use cases."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I update my AI tool information after submission?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, you can request updates to your tool listing anytime by contacting our team. We encourage keeping information current, especially for pricing changes, new features, or major updates."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What types of AI tools do you accept in the directory?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We accept all types of AI tools including text generation, image creation, code assistants, chatbots, data analysis, productivity tools, marketing automation, content creation, design tools, and specialized AI solutions across 50+ categories."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How many people will see my AI tool listing?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "AllAITools.tech receives over 100,000 monthly visitors including AI enthusiasts, developers, business professionals, and decision-makers actively searching for AI solutions. Your tool will gain significant exposure in our highly engaged community."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need to provide a logo for my AI tool submission?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "While not required, providing a logo or icon significantly improves your tool's visibility and professional appearance in our directory. We recommend including a high-quality logo URL for best results."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I submit AI tools that are still in beta or development?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we accept AI tools in beta or early development stages as long as they are functional and accessible to users. Please clearly indicate the development stage in your submission description."
                  }
                }
              ]
            }
          `}
        </script>

        {/* Service Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Free AI Tool Directory Submission",
              "description": "Free submission service for adding AI tools to the world's largest AI tools directory",
              "provider": {
                "@type": "Organization",
                "name": "AllAITools.tech",
                "url": "https://www.allaitools.tech"
              },
              "serviceType": "Directory Listing Service",
              "areaServed": "Worldwide",
              "audience": {
                "@type": "Audience",
                "audienceType": "AI Developers, Startup Founders, Tech Companies"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Free AI tool listing in comprehensive directory"
              }
            }
          `}
        </script>

        {/* BreadcrumbList Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.allaitools.tech"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Submit AI Tool",
                  "item": "https://www.allaitools.tech/submit-tool"
                }
              ]
            }
          `}
        </script>
      </Helmet>
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Submit Your AI Tool for Free
            </h1>
            <p className="text-xl text-muted-foreground mb-4 form-description">
              Get your AI tool listed in the world's largest AI directory with 100K+ monthly visitors. 
              Completely free submission with expert review and instant exposure to AI enthusiasts worldwide.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">✅ Completely Free</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">🚀 100K+ Monthly Visitors</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">⚡ Fast Review Process</span>
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">🎯 Targeted Audience</span>
            </div>
          </div>

          <div className="submission-guidelines bg-muted/50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Why Submit to AllAITools.tech?</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div>🌟 <strong>Massive Exposure:</strong> Reach 100K+ monthly visitors</div>
                <div>🎯 <strong>Targeted Audience:</strong> AI enthusiasts & professionals</div>
                <div>📈 <strong>SEO Benefits:</strong> High-quality backlinks & visibility</div>
                <div>💼 <strong>Business Growth:</strong> Connect with potential customers</div>
              </div>
              <div className="space-y-2">
                <div>⚡ <strong>Fast Processing:</strong> 2-5 day review process</div>
                <div>🆓 <strong>Completely Free:</strong> No hidden costs or fees</div>
                <div>🏆 <strong>Expert Curation:</strong> Quality-focused directory</div>
                <div>📊 <strong>Analytics Ready:</strong> Track your tool's performance</div>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 bg-card border rounded-lg p-6"
            >
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">AI Tool Information</h2>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>AI Tool Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., ChatGPT, Midjourney, GitHub Copilot" {...field} />
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
                          placeholder="e.g., https://your-ai-tool.com"
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
                        <FormLabel>AI Tool Category*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Text Generation">Text Generation & Writing</SelectItem>
                            <SelectItem value="Image Generation">Image Generation & Art</SelectItem>
                            <SelectItem value="Code Assistant">Code Assistant & Development</SelectItem>
                            <SelectItem value="Video Generation">Video Generation & Editing</SelectItem>
                            <SelectItem value="Audio Generation">Audio Generation & Music</SelectItem>
                            <SelectItem value="Chatbot">Chatbots & Conversational AI</SelectItem>
                            <SelectItem value="Data Analysis">Data Analysis & Research</SelectItem>
                            <SelectItem value="Productivity">Productivity & Automation</SelectItem>
                            <SelectItem value="Marketing">Marketing & Social Media</SelectItem>
                            <SelectItem value="Design">Design & Creative Tools</SelectItem>
                            <SelectItem value="Business">Business & Enterprise</SelectItem>
                            <SelectItem value="Education">Education & Learning</SelectItem>
                            <SelectItem value="Healthcare">Healthcare & Medical</SelectItem>
                            <SelectItem value="Finance">Finance & Trading</SelectItem>
                            <SelectItem value="E-commerce">E-commerce & Retail</SelectItem>
                            <SelectItem value="Other">Other AI Tools</SelectItem>
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
                            <SelectItem value="Free">Free - No Cost</SelectItem>
                            <SelectItem value="Freemium">Freemium - Free + Paid Plans</SelectItem>
                            <SelectItem value="Free Trial">Free Trial Available</SelectItem>
                            <SelectItem value="Paid">Paid - Subscription/One-time</SelectItem>
                            <SelectItem value="Contact for Pricing">Contact for Pricing</SelectItem>
                            <SelectItem value="Open Source">Open Source</SelectItem>
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
                      <FormLabel>Short Description* (200 characters max)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A compelling brief description highlighting your AI tool's main purpose and key benefits..."
                          {...field}
                          className="resize-none"
                          maxLength={200}
                        />
                      </FormControl>
                      <div className="text-xs text-muted-foreground">
                        {field.value?.length || 0}/200 characters
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detailed Description*</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide a comprehensive description of your AI tool including: key features, use cases, target audience, unique value proposition, technical capabilities, integration options, and what makes it special..."
                          {...field}
                          className="min-h-[200px]"
                        />
                      </FormControl>
                      <div className="text-xs text-muted-foreground">
                        Include keywords like: AI, artificial intelligence, machine learning, automation, productivity, [your industry], [your use case]
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="logoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo/Icon URL (Recommended)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., https://your-domain.com/logo.png (recommended for better visibility)"
                          {...field}
                        />
                      </FormControl>
                      <div className="text-xs text-muted-foreground">
                        High-quality logos improve click-through rates by 40%. Recommended size: 256x256px or higher.
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6 pt-4 border-t">
                <h2 className="text-xl font-semibold">Founder/Creator Information (Optional but Recommended)</h2>
                <p className="text-sm text-muted-foreground">
                  Adding founder information increases credibility and trust, leading to higher engagement rates.
                </p>
                
                <FormField
                  control={form.control}
                  name="founderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Founder/Creator Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., John Smith, Jane Doe" {...field} />
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
                        <Input placeholder="e.g., founder@your-ai-tool.com" {...field} />
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
                        <Input placeholder="e.g., Marketing Manager, Product Manager" {...field} />
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
                      <FormLabel>Your Role/Position</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Marketing Manager, CEO, Developer" {...field} />
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
                          placeholder="e.g., contact@your-ai-tool.com (for updates and communication)"
                          {...field}
                        />
                      </FormControl>
                      <div className="text-xs text-muted-foreground">
                        We'll use this email to notify you about your submission status and any questions.
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">🚀 What happens after submission?</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>✅ Expert review within 2-5 business days</li>
                  <li>📧 Email notification about approval status</li>
                  <li>🌟 Featured in our directory with 100K+ monthly visitors</li>
                  <li>📈 Exposure to AI enthusiasts, developers, and businesses</li>
                  <li>🔗 High-quality backlinks for SEO benefits</li>
                </ul>
              </div>

              <Button type="submit" className="w-full text-lg py-6" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting Your AI Tool...
                  </>
                ) : (
                  "🚀 Submit My AI Tool for Free Review"
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                By submitting, you agree to our{" "}
                <a href="/terms" className="underline hover:text-primary">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="underline hover:text-primary">
                  Privacy Policy
                </a>
                . Your tool will be reviewed for quality and relevance.
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
