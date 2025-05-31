
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Loader2, Target, Users, TrendingUp, Globe, Zap, Star, CheckCircle, ArrowRight, BarChart3, Eye, MousePointer, DollarSign } from "lucide-react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  contactName: z.string().min(2, {
    message: "Contact name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  website: z.string().url({
    message: "Please enter a valid website URL.",
  }),
  advertisingGoals: z.string({
    required_error: "Please select your advertising goals.",
  }),
  budget: z.string({
    required_error: "Please select your budget range.",
  }),
  campaignType: z.string({
    required_error: "Please select a campaign type.",
  }),
  message: z.string().min(20, {
    message: "Message must be at least 20 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Advertise = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      website: "",
      advertisingGoals: "",
      budget: "",
      campaignType: "",
      message: "",
    },
  });

  const pageTitle = "Advertise With AllAITools.tech - Reach 100K+ AI Enthusiasts Monthly | Premium AI Directory Advertising";
  const pageDescription = "Reach over 100,000 AI enthusiasts, developers, and business professionals monthly through AllAITools.tech advertising. Premium sponsored listings, banner ads, newsletter sponsorships, and targeted campaigns in the world's largest AI tools directory. Drive qualified traffic, increase brand awareness, and connect with decision-makers actively searching for AI solutions.";
  const seoKeywords = "advertise AI tools directory, AI directory advertising, sponsor AI tools listing, AI tools marketing, promote AI software, AI directory sponsorship, AI tools banner ads, AI newsletter advertising, AI community marketing, tech startup advertising, AI tools promotion, artificial intelligence advertising, AI software marketing, sponsored AI listings, AI directory premium placement, AI tools featured listing, AI marketing opportunities, AI enthusiast targeting, AI developer advertising, AI business marketing, reach AI audience, AI tools newsletter sponsor, AI community advertising, AI directory marketing, AllAITools advertising, AI tools promotional campaigns, AI software visibility, AI startup marketing, AI tools brand awareness, AI directory ads, AI newsletter sponsorship, targeted AI advertising, AI tools lead generation, AI industry marketing, AI professional network advertising, AI tools discovery marketing, AI solution advertising, AI innovation marketing, AI technology advertising, premium AI directory listing, AI tools audience targeting, AI marketing platform, AI tools advertising ROI, AI directory traffic monetization, AI tools sponsored content, AI newsletter marketing, AI community outreach, AI tools brand promotion, AI advertising partnerships, AI directory premium ads, AI tools influencer marketing, AI startup visibility, AI software promotion strategies, AI tools market reach, AI directory advertising rates, AI tools marketing campaigns, AI advertising solutions, AI tools brand recognition, AI directory marketing opportunities, AI tools sponsored placements, AI industry advertising trends, AI tools promotional strategies, AI marketing effectiveness, AI tools advertising metrics, AI directory advertising benefits, AI tools marketing ROI, AI advertising best practices, AI tools promotion tactics, AI directory sponsored listings, AI tools marketing solutions, AI advertising campaign management, AI tools brand positioning, AI directory advertising strategy";

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      // Here you would typically send to your backend
      console.log("Advertising inquiry:", values);
      
      toast({
        title: "Thank you for your interest!",
        description: "We'll review your advertising request and contact you within 24 hours with a customized proposal.",
      });

      navigate("/");
    } catch (error) {
      console.error("Error submitting advertising inquiry:", error);
      toast({
        title: "Error submitting inquiry",
        description: "There was a problem submitting your request. Please try again or contact us directly.",
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
        <meta property="og:url" content="https://www.allaitools.tech/advertise" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:site_name" content="All AI Tools Directory" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="twitter:site" content="@AIToolsDirectory" />
        
        <meta name="keywords" content={seoKeywords} />
        <link rel="canonical" href="https://www.allaitools.tech/advertise" />
        
        <meta name="robots" content="index, follow" />
        <meta name="author" content="AllAITools.tech Marketing Team" />
        <meta name="language" content="English" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="coverage" content="worldwide" />
        <meta name="target" content="AI companies, tech startups, marketing professionals, advertising agencies" />
        
        {/* Schema.org Organization markup for advertising */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "${pageTitle}",
              "description": "${pageDescription}",
              "url": "https://www.allaitools.tech/advertise",
              "mainEntity": {
                "@type": "Service",
                "name": "AI Directory Advertising Services",
                "provider": {
                  "@type": "Organization",
                  "name": "AllAITools.tech",
                  "url": "https://www.allaitools.tech"
                },
                "serviceType": "Digital Advertising",
                "areaServed": "Worldwide",
                "audience": {
                  "@type": "Audience",
                  "audienceType": "AI Enthusiasts, Developers, Business Professionals"
                }
              },
              "potentialAction": {
                "@type": "ContactAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.allaitools.tech/advertise",
                  "actionPlatform": [
                    "http://schema.org/DesktopWebPlatform",
                    "http://schema.org/MobileWebPlatform"
                  ]
                }
              }
            }
          `}
        </script>

        {/* Business Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "AllAITools.tech Advertising Services",
              "description": "Premium advertising solutions for AI companies and tech startups in the world's largest AI tools directory",
              "url": "https://www.allaitools.tech/advertise",
              "serviceArea": {
                "@type": "Place",
                "name": "Worldwide"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AI Directory Advertising Options",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Sponsored Tool Listings",
                      "description": "Premium placement for AI tools in search results and category pages"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Banner Advertising",
                      "description": "High-visibility banner ads across the AI tools directory"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Newsletter Sponsorship",
                      "description": "Exclusive sponsorship opportunities in our AI tools newsletter"
                    }
                  }
                ]
              }
            }
          `}
        </script>

        {/* FAQ Schema for advertising */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How much does advertising on AllAITools.tech cost?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our advertising rates vary based on campaign type, duration, and placement. We offer flexible packages starting from $500/month for sponsored listings up to $5000/month for premium banner placements. Contact us for a customized quote."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What kind of audience does AllAITools.tech reach?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We reach over 100,000 monthly visitors including AI enthusiasts, developers, business professionals, startup founders, and decision-makers actively searching for AI solutions. Our audience is highly engaged and conversion-focused."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What advertising formats are available?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We offer sponsored tool listings, banner ads, newsletter sponsorships, featured placements, homepage promotions, and custom advertising solutions tailored to your marketing goals."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I track the performance of my advertising campaign?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We provide detailed analytics including impressions, clicks, click-through rates, and conversions. You'll receive monthly reports with campaign performance metrics and insights."
                  }
                }
              ]
            }
          `}
        </script>
      </Helmet>
      
      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                <Target className="w-4 h-4 mr-2" />
                Premium Advertising Opportunities
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Reach 100K+ AI Enthusiasts Monthly
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Connect with the world's most engaged AI community through AllAITools.tech - the premier destination for AI tool discovery. Drive qualified traffic, boost brand awareness, and accelerate your growth.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <div className="flex items-center gap-2 bg-background/50 backdrop-blur px-4 py-2 rounded-full border">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="font-semibold">100K+ Monthly Visitors</span>
                </div>
                <div className="flex items-center gap-2 bg-background/50 backdrop-blur px-4 py-2 rounded-full border">
                  <Globe className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Global Reach</span>
                </div>
                <div className="flex items-center gap-2 bg-background/50 backdrop-blur px-4 py-2 rounded-full border">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="font-semibold">High Conversion Rates</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100K+</div>
                <div className="text-sm text-muted-foreground">Monthly Visitors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">3000+</div>
                <div className="text-sm text-muted-foreground">AI Tools Listed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Tool Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Qualified Traffic</div>
              </div>
            </div>
          </div>
        </section>

        {/* Advertising Options */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Advertising Solutions That Drive Results</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Choose from our premium advertising options designed to maximize your reach and ROI in the AI tools market.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Sponsored Listings</CardTitle>
                  <CardDescription>
                    Get premium placement in search results and category pages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Top search results placement</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Featured badge display</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Enhanced tool profiles</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Category page priority</span>
                    </li>
                  </ul>
                  <div className="mt-6 text-2xl font-bold text-primary">From $500/month</div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden hover:shadow-lg transition-shadow border-primary/20">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold">
                  POPULAR
                </div>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Banner Advertising</CardTitle>
                  <CardDescription>
                    High-visibility banner ads across our platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Homepage banner placement</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Category page banners</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Mobile-responsive designs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">A/B testing support</span>
                    </li>
                  </ul>
                  <div className="mt-6 text-2xl font-bold text-primary">From $1,500/month</div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Newsletter Sponsorship</CardTitle>
                  <CardDescription>
                    Exclusive sponsorship in our weekly AI tools newsletter
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">50K+ engaged subscribers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Dedicated sponsor section</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Custom content creation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Performance analytics</span>
                    </li>
                  </ul>
                  <div className="mt-6 text-2xl font-bold text-primary">From $2,000/month</div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Featured Placements</CardTitle>
                  <CardDescription>
                    Prime real estate on our homepage and category pages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Homepage hero section</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Featured tools carousel</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Category highlights</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Maximum visibility</span>
                    </li>
                  </ul>
                  <div className="mt-6 text-2xl font-bold text-primary">From $3,000/month</div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <MousePointer className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Content Marketing</CardTitle>
                  <CardDescription>
                    Sponsored articles and thought leadership content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Sponsored blog posts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Expert interviews</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">SEO optimization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Social media promotion</span>
                    </li>
                  </ul>
                  <div className="mt-6 text-2xl font-bold text-primary">From $1,000/month</div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Custom Packages</CardTitle>
                  <CardDescription>
                    Tailored advertising solutions for enterprise clients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Multi-channel campaigns</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Dedicated account manager</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Custom reporting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Flexible terms</span>
                    </li>
                  </ul>
                  <div className="mt-6 text-2xl font-bold text-primary">Custom Pricing</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Advertise With AllAITools.tech?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Join leading AI companies who trust us to deliver exceptional advertising results.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Highly Targeted Audience</h3>
                <p className="text-muted-foreground">
                  Reach decision-makers, developers, and AI enthusiasts actively searching for solutions.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Proven Results</h3>
                <p className="text-muted-foreground">
                  Our advertising partners see average CTRs 300% higher than industry standards.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Engaged Community</h3>
                <p className="text-muted-foreground">
                  Our users spend 5+ minutes per session actively exploring and comparing tools.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Global Reach</h3>
                <p className="text-muted-foreground">
                  Connect with AI enthusiasts from over 150 countries worldwide.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Detailed Analytics</h3>
                <p className="text-muted-foreground">
                  Track performance with comprehensive reporting and real-time insights.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Fast Setup</h3>
                <p className="text-muted-foreground">
                  Get your campaigns live within 48 hours with our streamlined process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Accelerate Your Growth?</h2>
                <p className="text-xl text-muted-foreground">
                  Let's discuss how our advertising solutions can help you reach your target audience and achieve your marketing goals.
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 bg-card border rounded-lg p-8"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., OpenAI" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., John Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., marketing@company.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., +1 (555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Website*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., https://company.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="advertisingGoals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Advertising Goals*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select goals" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="brand-awareness">Brand Awareness</SelectItem>
                              <SelectItem value="lead-generation">Lead Generation</SelectItem>
                              <SelectItem value="user-acquisition">User Acquisition</SelectItem>
                              <SelectItem value="product-launch">Product Launch</SelectItem>
                              <SelectItem value="traffic-growth">Traffic Growth</SelectItem>
                              <SelectItem value="conversion-optimization">Conversion Optimization</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Budget*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select budget" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                              <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                              <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                              <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                              <SelectItem value="10000+">$10,000+</SelectItem>
                              <SelectItem value="custom">Custom Budget</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="campaignType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Campaign Type*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="sponsored-listings">Sponsored Listings</SelectItem>
                              <SelectItem value="banner-ads">Banner Advertising</SelectItem>
                              <SelectItem value="newsletter-sponsorship">Newsletter Sponsorship</SelectItem>
                              <SelectItem value="featured-placement">Featured Placement</SelectItem>
                              <SelectItem value="content-marketing">Content Marketing</SelectItem>
                              <SelectItem value="custom-package">Custom Package</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tell us about your advertising goals and requirements*</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your target audience, campaign objectives, timeline, and any specific requirements..."
                            {...field}
                            className="min-h-[150px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending Request...
                      </>
                    ) : (
                      <>
                        Get Custom Advertising Proposal
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    We'll respond within 24 hours with a customized advertising proposal.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Connect with Your Next 10,000 Customers?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Join leading AI companies who are already growing their business with AllAITools.tech advertising.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                View Case Studies
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Schedule a Call
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Advertise;
