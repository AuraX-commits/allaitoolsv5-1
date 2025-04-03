
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Upload } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabaseClient";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  interest: z.string({
    required_error: "Please select an area of interest.",
  }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const interestAreas = [
  { id: "developer", title: "Developer" },
  { id: "designer", title: "Designer" },
  { id: "marketer", title: "Marketing" },
  { id: "product", title: "Product" },
  { id: "content", title: "Content Creation" },
  { id: "other", title: "Other" },
];

const Careers = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      interest: "",
      message: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a resume smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      
      // Check file type (PDF, DOC, DOCX)
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, DOC, or DOCX file.",
          variant: "destructive",
        });
        return;
      }
      
      setResumeFile(file);
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (!resumeFile) {
      toast({
        title: "Resume required",
        description: "Please upload your resume to apply.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    setUploadProgress(0);
    
    try {
      // Step 1: Upload resume to storage
      const fileName = `${Date.now()}-${resumeFile.name}`;
      const filePath = `${values.email}/${fileName}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('careers')
        .upload(filePath, resumeFile, {
          cacheControl: '3600',
          upsert: false,
        });
      
      if (uploadError) throw uploadError;
      setUploadProgress(50);
      
      // Step 2: Get the public URL
      const { data: publicURLData } = supabase.storage
        .from('careers')
        .getPublicUrl(filePath);
      
      const resumeUrl = publicURLData?.publicUrl;
      setUploadProgress(75);
      
      // Step 3: Save application to database
      const { data, error } = await supabase.from("career_applications").insert([
        {
          name: values.name,
          email: values.email,
          interest: values.interest,
          message: values.message || null,
          resume_url: resumeUrl,
        },
      ]);

      if (error) throw error;
      setUploadProgress(100);

      toast({
        title: "Application submitted successfully!",
        description: "Thank you for your interest. We'll review your application and get back to you soon.",
      });

      // Reset form
      form.reset();
      setResumeFile(null);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Error submitting application",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Careers | All AI Tools</title>
        <meta
          name="description"
          content="Join our team and help build the world's best AI tools directory."
        />
      </Helmet>
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're always looking for talented individuals to join our mission of building the world's most comprehensive AI tools directory.
            </p>
          </div>

          <div className="bg-card border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Submit Your Resume</h2>
            <p className="text-muted-foreground mb-6">
              Even if we don't have any open positions right now, we're always interested in connecting with talented people. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
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
                      <FormLabel>Email Address*</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area of Interest*</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your area of interest" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {interestAreas.map((area) => (
                            <SelectItem key={area.id} value={area.id}>
                              {area.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel htmlFor="resume">Resume/CV*</FormLabel>
                  <div className="mt-1 flex items-center">
                    <label className="block w-full">
                      <span className="sr-only">Choose resume file</span>
                      <Input
                        id="resume"
                        type="file"
                        className="block w-full text-sm text-slate-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-primary file:text-white
                          hover:file:bg-primary/90"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                      />
                    </label>
                  </div>
                  {resumeFile && (
                    <p className="mt-2 text-sm text-muted-foreground flex items-center">
                      <Upload className="h-4 w-4 mr-1" />
                      {resumeFile.name}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    Accepted formats: PDF, DOC, DOCX (max 5MB)
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Letter / Additional Information (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your experience, skills, and why you're interested in joining our team..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Submitting Application... {uploadProgress}%
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  By applying, you agree that we will store and process your data according to our{" "}
                  <a href="/privacy" className="underline">
                    Privacy Policy
                  </a>.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Careers;
