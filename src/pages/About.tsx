
import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Helmet } from "react-helmet-async";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>About Us | AI Directory - Discover the Best AI Tools</title>
        <meta 
          name="description" 
          content="Learn about AI Directory - your go-to resource for discovering, comparing, and evaluating the best AI tools and software across various categories." 
        />
        <meta property="og:title" content="About Us | AI Directory" />
        <meta 
          property="og:description" 
          content="Learn about AI Directory - your go-to resource for discovering, comparing, and evaluating the best AI tools and software across various categories."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | AI Directory" />
        <meta 
          name="twitter:description" 
          content="Learn about AI Directory - your go-to resource for discovering, comparing, and evaluating the best AI tools and software across various categories."
        />
        <meta name="keywords" content="about AI Directory, AI tools database, artificial intelligence directory, AI software catalog" />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold mb-6">About AI Directory</h1>
            <p className="text-xl text-foreground/80 leading-relaxed">
              Your ultimate resource for discovering and comparing the best AI-powered tools across all categories.
            </p>
          </div>
          
          {/* Mission Section */}
          <div className="max-w-3xl mx-auto mb-20">
            <div className="bg-white p-8 rounded-xl shadow-subtle border border-border/60">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                AI Directory was created with a simple mission: to help individuals and businesses navigate the rapidly evolving landscape 
                of artificial intelligence tools. We believe in the transformative power of AI and aim to make these powerful technologies 
                more accessible to everyone.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Through comprehensive listings, honest reviews, and side-by-side comparisons, we empower our users to make informed decisions 
                about which AI tools best meet their specific needs and budget constraints.
              </p>
            </div>
          </div>
          
          {/* What We Offer */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-center mb-10">What We Offer</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-subtle border border-border/60 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Comprehensive Directory</h3>
                <p className="text-foreground/80">
                  A curated collection of the best AI tools across all categories, from text generation to image creation, voice assistants, and more.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-subtle border border-border/60 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Detailed Comparisons</h3>
                <p className="text-foreground/80">
                  Side-by-side tool comparisons highlighting key features, pricing differences, and user experiences to help you make informed decisions.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-subtle border border-border/60 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">User Reviews & Insights</h3>
                <p className="text-foreground/80">
                  Authentic user reviews and expert analysis to provide real-world perspectives on how these tools perform in practice.
                </p>
              </div>
            </div>
          </div>
          
          {/* Team Section */}
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-2xl font-bold text-center mb-10">Our Team</h2>
            
            <div className="bg-white p-8 rounded-xl shadow-subtle border border-border/60">
              <p className="text-foreground/80 leading-relaxed mb-6">
                AI Directory is run by a passionate team of AI enthusiasts, technologists, and industry experts who are committed to 
                staying at the forefront of AI innovation. Our diverse backgrounds in software development, product design, and 
                user experience allow us to evaluate AI tools from multiple perspectives.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                We're dedicated to maintaining an objective, unbiased platform that serves the needs of our community. 
                Our goal is to demystify AI technology and help everyone benefit from these powerful tools, regardless of 
                their technical expertise.
              </p>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Get in Touch</h2>
            <p className="text-center text-foreground/80 mb-8">
              Have questions, suggestions, or interested in listing your AI tool in our directory? We'd love to hear from you!
            </p>
            
            <div className="flex justify-center">
              <a 
                href="mailto:contact@aidirectory.com" 
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
