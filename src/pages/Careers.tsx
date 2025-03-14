
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Clock, Check, ArrowRight } from "lucide-react";

const Careers = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                      <Button>Apply Now</Button>
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
                    <Button variant="ghost" className="mt-4 text-primary">
                      Learn More <ArrowRight className="ml-1 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* No Positions Right Now */}
          <div className="bg-secondary/30 rounded-xl p-8 text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-3">Don't see the right position?</h3>
            <p className="text-foreground/80 mb-6">
              We're always looking for talented individuals to join our team. Send us your resume and tell us how you can contribute.
            </p>
            <Button>
              Send Open Application
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
