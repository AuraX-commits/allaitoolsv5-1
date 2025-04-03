
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, MapPin, Clock, Check, ArrowRight, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { supabase } from "@/lib/supabaseClient";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const resumeFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.string().min(2, "Role must be at least 2 characters"),
  message: z.string().optional(),
  resumeFile: z.any().optional(),
});

const Careers = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const form = useForm<z.infer<typeof resumeFormSchema>>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      message: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof resumeFormSchema>) => {
    setIsSubmitting(true);

    try {
      // First, insert the application record
      const { data: application, error: insertError } = await supabase
        .from('career_applications')
        .insert({
          name: values.name,
          email: values.email,
          role: values.role,
          message: values.message || null,
        })
        .select('id')
        .single();

      if (insertError) throw insertError;

      // If there's a resume file, upload it
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${application.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `resumes/${fileName}`;

        // Upload the file to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('careers')
          .upload(filePath, selectedFile);

        if (uploadError) throw uploadError;

        // Update the record with the resume URL
        const { error: updateError } = await supabase
          .from('career_applications')
          .update({ resume_url: filePath })
          .eq('id', application.id);

        if (updateError) throw updateError;
      }

      setIsSuccess(true);
      form.reset();
      setSelectedFile(null);
      toast({
        title: "Application submitted!",
        description: "We've received your application and will get back to you soon.",
      });
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error submitting application",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openPositions = [
    {
      title: "Frontend Developer",
      location: "Remote",
      type: "Full-time",
      description: "Join our team to build the next generation of AI tool interfaces using React and modern frontend technologies.",
      responsibilities: [
        "Develop responsive user interfaces using React and Tailwind CSS",
        "Collaborate with designers to implement pixel-perfect designs",
        "Optimize application performance and ensure cross-browser compatibility",
        "Write clean, maintainable code with comprehensive test coverage"
      ]
    },
    {
      title: "AI Research Associate",
      location: "New York, NY",
      type: "Full-time",
      description: "Help us research and evaluate the latest AI tools to ensure our directory provides the most accurate and useful information.",
      responsibilities: [
        "Evaluate new AI tools and technologies",
        "Write detailed analysis and reviews of AI platforms",
        "Stay updated on the latest developments in AI and machine learning",
        "Collaborate with the content team to create informative articles"
      ]
    },
    {
      title: "Content Marketing Specialist",
      location: "Remote",
      type: "Part-time",
      description: "Create engaging content about AI tools and technologies to help our users make informed decisions.",
      responsibilities: [
        "Develop content strategy for blog and social media channels",
        "Write in-depth articles, reviews, and tutorials about AI tools",
        "Collaborate with the SEO team to optimize content for search engines",
        "Analyze content performance and adjust strategy accordingly"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Careers at AIDirectory | Join Our Team</title>
        <meta 
          name="description" 
          content="Join the AIDirectory team and help build the future of AI tools discovery. Explore open positions and career opportunities in technology, AI research, and more." 
        />
        <meta property="og:title" content="Careers at AIDirectory | Join Our Team" />
        <meta 
          property="og:description" 
          content="Join the AIDirectory team and help build the future of AI tools discovery. Explore open positions and career opportunities in technology, AI research, and more."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://www.allaitools.tech/careers" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Careers at AIDirectory | Join Our Team" />
        <meta 
          name="twitter:description" 
          content="Join the AIDirectory team and help build the future of AI tools discovery. Explore open positions and career opportunities in technology, AI research, and more."
        />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="keywords" content="careers, jobs, hiring, AI jobs, technology careers, remote work, tech jobs" />
        <link rel="canonical" href="https://www.allaitools.tech/careers" />
      </Helmet>
      
      <Navbar />
      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
            <p className="text-lg text-foreground/80">
              Help us build the future of AI tools discovery and connect users with the technologies that will transform their work.
            </p>
          </div>
          
          {/* Why Join Us */}
          <div className="bg-white rounded-2xl shadow-subtle p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6">Why Join AIDirectory?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-secondary/30 p-6 rounded-xl">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Meaningful Work</h3>
                <p className="text-foreground/80">
                  Help users discover the AI tools that will transform their work and creativity.
                </p>
              </div>
              <div className="bg-secondary/30 p-6 rounded-xl">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Remote-First</h3>
                <p className="text-foreground/80">
                  Work from anywhere with flexible hours and a focus on results, not location.
                </p>
              </div>
              <div className="bg-secondary/30 p-6 rounded-xl">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Growth Opportunities</h3>
                <p className="text-foreground/80">
                  Join an early-stage company with abundant opportunities to learn and advance.
                </p>
              </div>
            </div>
          </div>
          
          {/* Open Positions */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Open Positions</h2>
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <div key={index} className="bg-white rounded-xl shadow-subtle overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{position.title}</h3>
                        <div className="flex flex-wrap gap-3">
                          <span className="inline-flex items-center text-sm text-foreground/70">
                            <MapPin className="w-4 h-4 mr-1" /> {position.location}
                          </span>
                          <span className="inline-flex items-center text-sm text-foreground/70">
                            <Clock className="w-4 h-4 mr-1" /> {position.type}
                          </span>
                        </div>
                      </div>
                      <Button asChild>
                        <a href="#apply">Apply Now</a>
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-foreground/80 mb-4">{position.description}</p>
                    <h4 className="font-semibold mb-3">Responsibilities:</h4>
                    <ul className="space-y-2">
                      {position.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Application Form */}
          <div id="apply" className="bg-white rounded-xl shadow-subtle p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Apply Now</h2>
            <p className="text-foreground/80 mb-8">
              Upload your resume and our team will get back to you if your skills match our current openings.
            </p>
            
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Application Received!</h3>
                <p className="text-foreground/80 mb-6">
                  Thank you for your interest in joining our team. We'll review your application and reach out if there's a good match.
                </p>
                <Button onClick={() => setIsSuccess(false)}>Submit Another Application</Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role You're Applying For</FormLabel>
                        <FormControl>
                          <Input placeholder="Job title or position" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Letter (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us a bit about yourself and why you're interested in this position"
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-2">
                    <FormLabel>Resume</FormLabel>
                    <div className="border border-dashed border-border rounded-lg p-4">
                      <div className="flex flex-col items-center justify-center py-4">
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-1">
                          {selectedFile ? selectedFile.name : "Upload your resume"}
                        </p>
                        <p className="text-xs text-muted-foreground mb-3">PDF or Word document up to 5MB</p>
                        <div className="relative">
                          <Input 
                            id="resumeFile"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0 z-10 cursor-pointer"
                          />
                          <Button variant="outline" size="sm" type="button">
                            Browse Files
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
