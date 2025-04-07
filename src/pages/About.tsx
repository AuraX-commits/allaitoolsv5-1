
import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Helmet } from "react-helmet-async";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pageTitle = "About Our AI Directory | Expert AI Tool Reviews & Comparisons | AllAITools.tech";
  const pageDescription = "Learn about AllAITools.tech - the leading authority on AI tool discovery, evaluation, and comparison. Our expert team tests and reviews hundreds of AI tools across 20+ categories to help individuals and businesses find the perfect AI solutions for their unique needs. Discover our mission to democratize access to cutting-edge artificial intelligence technologies through comprehensive, unbiased reviews and detailed comparisons.";
  
  const seoKeywords = "about AI directory, AI tools experts, AI software reviewers, artificial intelligence tool curators, AI tool testing team, AI directory mission, AI tools comparison specialists, trustworthy AI reviews, AI tool discovery platform, AI software recommendation service, AI technology consultants, AI tool evaluation metrics, AI directory methodology, AI software rating system, AI tool features analysis, AI price comparison website, AI industry experts, AI product reviews, AI marketplace curators, AI tool database maintainers, AI solution advisors, AI software decision support, AI technology analysts, artificial intelligence advisory, AI tool selection assistance, unbiased AI reviews";
  
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.allaitools.tech/about" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:site_name" content="All AI Tools Directory" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="twitter:site" content="@AIToolsDirectory" />
        
        <meta name="keywords" content={seoKeywords} />
        <link rel="canonical" href="https://www.allaitools.tech/about" />
        
        <meta name="robots" content="index, follow" />
        <meta name="author" content="AI Tools Directory Team" />
        
        {/* Schema.org Organization markup */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AllAITools.tech",
              "url": "https://www.allaitools.tech",
              "logo": "https://www.allaitools.tech/logo.png",
              "description": "${pageDescription}",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "contact@allaitools.tech",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://twitter.com/AIToolsDirectory",
                "https://www.linkedin.com/company/allaitools",
                "https://www.youtube.com/c/allaitools"
              ]
            }
          `}
        </script>
        
        {/* Schema.org AboutPage markup */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "name": "About AllAITools.tech",
              "description": "${pageDescription}",
              "publisher": {
                "@type": "Organization",
                "name": "AllAITools.tech",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.allaitools.tech/logo.png"
                }
              },
              "isPartOf": {
                "@type": "WebSite",
                "name": "AllAITools.tech",
                "url": "https://www.allaitools.tech"
              }
            }
          `}
        </script>
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
