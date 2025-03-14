
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Upload, Link } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
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

const formSchema = z.object({
  name: z.string().min(2, "Tool name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  website: z.string().url("Please enter a valid URL"),
  logoUrl: z.string().url("Please enter a valid URL for the logo").optional(),
  category: z.string().min(1, "Please select a category"),
  pricing: z.string().min(1, "Please select a pricing tier"),
  email: z.string().email("Please enter a valid email address"),
});

const SubmitTool = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      website: "",
      logoUrl: "",
      category: "",
      pricing: "",
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Tool submitted successfully!",
      description: "We'll review your submission and get back to you soon.",
    });
    form.reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Submit an AI Tool | AIDirectory</title>
        <meta 
          name="description" 
          content="Submit your AI tool to AIDirectory and reach thousands of potential users. Get featured in our comprehensive library of AI tools." 
        />
        <meta property="og:title" content="Submit an AI Tool | AIDirectory" />
        <meta property="og:description" content="Submit your AI tool to AIDirectory and reach thousands of potential users." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://www.allaitools.tech/submit-tool" />
        <link rel="canonical" href="https://www.allaitools.tech/submit-tool" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow">
        <div className="container px-4 py-12 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Submit Your AI Tool</h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Get your AI tool featured in our comprehensive directory and reach thousands of potential users.
            </p>
          </div>
          
          <div className="bg-card rounded-lg border shadow-sm p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tool Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the name of your AI tool" {...field} />
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe what your tool does and its key features" 
                          className="min-h-32"
                          {...field} 
                        />
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
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.yourtool.com" {...field} />
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
                      <FormLabel>Logo URL</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Link className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <Input 
                            placeholder="https://www.example.com/your-logo.png" 
                            className="pl-10"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Enter a direct URL to your tool's logo image (PNG or JPG recommended)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="writing">Writing & Content</SelectItem>
                            <SelectItem value="image">Image & Design</SelectItem>
                            <SelectItem value="audio">Audio & Music</SelectItem>
                            <SelectItem value="video">Video & Animation</SelectItem>
                            <SelectItem value="chatbot">Chatbots & Assistants</SelectItem>
                            <SelectItem value="productivity">Productivity</SelectItem>
                            <SelectItem value="developer">Developer Tools</SelectItem>
                            <SelectItem value="business">Business & Marketing</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
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
                        <FormLabel>Pricing Model</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select pricing model" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="free">Free</SelectItem>
                            <SelectItem value="freemium">Freemium</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="subscription">Subscription</SelectItem>
                            <SelectItem value="enterprise">Enterprise</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        We'll use this to contact you about your submission.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="border border-dashed border-border rounded-lg p-4">
                  <div className="flex flex-col items-center justify-center py-4">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Drag & drop your logo here</p>
                    <p className="text-xs text-muted-foreground mb-3">PNG, JPG up to 2MB</p>
                    <Button variant="outline" size="sm" type="button">
                      Select File
                    </Button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Submit Tool
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SubmitTool;
