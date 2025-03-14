
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const Terms = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Terms of Service | AIDirectory</title>
        <meta 
          name="description" 
          content="Read the AIDirectory Terms of Service. By using our website, you agree to these terms and conditions." 
        />
        <meta property="og:title" content="Terms of Service | AIDirectory" />
        <meta 
          property="og:description" 
          content="Read the AIDirectory Terms of Service. By using our website, you agree to these terms and conditions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://www.allaitools.tech/terms" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms of Service | AIDirectory" />
        <meta 
          name="twitter:description" 
          content="Read the AIDirectory Terms of Service. By using our website, you agree to these terms and conditions."
        />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="keywords" content="terms of service, terms and conditions, legal, AIDirectory terms" />
        <link rel="canonical" href="https://www.allaitools.tech/terms" />
      </Helmet>
      
      <Navbar />
      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
            <div className="prose prose-lg max-w-none">
              <p>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              
              <h2>1. Acceptance of Terms</h2>
              <p>By accessing or using the AIDirectory website located at https://www.allaitools.tech ("Website"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Website.</p>
              
              <h2>2. Description of Service</h2>
              <p>AIDirectory provides a platform for discovering, comparing, and reviewing AI tools and technologies ("Service"). The Service includes listings of AI tools, comparison features, user reviews, and related content.</p>
              
              <h2>3. User Accounts</h2>
              <p>Some features of the Service may require you to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
              
              <h2>4. User Conduct</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Use the Service for any illegal purpose or in violation of any laws</li>
                <li>Post or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li>
                <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity</li>
                <li>Post or transmit any unsolicited advertising, promotional materials, "junk mail," "spam," or any other form of solicitation</li>
                <li>Attempt to gain unauthorized access to other computer systems or networks connected to the Service</li>
                <li>Interfere with another user's use and enjoyment of the Service</li>
              </ul>
              
              <h2>5. Intellectual Property</h2>
              <p>The Service and its original content, features, and functionality are owned by AIDirectory and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
              
              <h2>6. User Content</h2>
              <p>By posting content to the Service, you grant us a non-exclusive, worldwide, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform your content in connection with the Service and AIDirectory's business.</p>
              
              <h2>7. Tool Listings and Reviews</h2>
              <p>AIDirectory makes no representations or warranties about the accuracy, reliability, completeness, or timeliness of any tools listed on the Website or reviews posted by users. All tool listings and reviews are for informational purposes only.</p>
              
              <h2>8. Limitation of Liability</h2>
              <p>In no event shall AIDirectory, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
              
              <h2>9. Links to Other Websites</h2>
              <p>The Service may contain links to third-party websites or services that are not owned or controlled by AIDirectory. AIDirectory has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services.</p>
              
              <h2>10. Termination</h2>
              <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>
              
              <h2>11. Changes to Terms</h2>
              <p>We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
              
              <h2>12. Governing Law</h2>
              <p>These Terms shall be governed and construed in accordance with the laws of [Your Country], without regard to its conflict of law provisions.</p>
              
              <h2>13. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at contact@allaitools.tech.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
