
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const Privacy = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Privacy Policy | AIDirectory</title>
        <meta 
          name="description" 
          content="Read the AIDirectory Privacy Policy to understand how we collect, use, and protect your personal information." 
        />
        <meta property="og:title" content="Privacy Policy | AIDirectory" />
        <meta 
          property="og:description" 
          content="Read the AIDirectory Privacy Policy to understand how we collect, use, and protect your personal information."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://www.allaitools.tech/privacy" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy | AIDirectory" />
        <meta 
          name="twitter:description" 
          content="Read the AIDirectory Privacy Policy to understand how we collect, use, and protect your personal information."
        />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="keywords" content="privacy policy, data protection, privacy, personal information, AIDirectory privacy" />
        <link rel="canonical" href="https://www.allaitools.tech/privacy" />
      </Helmet>
      
      <Navbar />
      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
            <div className="prose prose-lg max-w-none">
              <p>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              
              <p>This Privacy Policy describes how AIDirectory ("we", "us", or "our") collects, uses, and shares information about you when you use our website located at https://www.allaitools.tech ("Website"), and any related services or features.</p>
              
              <p>By using our Website, you agree to the collection and use of information in accordance with this Privacy Policy.</p>
              
              <h2>1. Information We Collect</h2>
              
              <h3>1.1 Information You Provide to Us</h3>
              <p>We collect information you provide directly to us, such as:</p>
              <ul>
                <li>Account information: When you create an account, we collect your name, email address, password, and other details you choose to provide.</li>
                <li>Profile information: Information you add to your profile, such as a profile picture, job title, and organization.</li>
                <li>Content you submit: Reviews, ratings, comments, and other content you submit to the Website.</li>
                <li>Communications: Information you provide when you contact us or participate in surveys or promotions.</li>
              </ul>
              
              <h3>1.2 Information We Collect Automatically</h3>
              <p>When you use our Website, we automatically collect certain information, including:</p>
              <ul>
                <li>Usage information: Pages you view, time spent on pages, links you click, and other actions you take on our Website.</li>
                <li>Device information: Device type, operating system, browser type, IP address, and unique device identifiers.</li>
                <li>Location information: General location inferred from your IP address.</li>
                <li>Cookies and similar technologies: Information collected through cookies and similar technologies. See our Cookie Policy section below for more information.</li>
              </ul>
              
              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our Website and services</li>
                <li>Process and complete transactions</li>
                <li>Send you technical notices, updates, security alerts, and support and administrative messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Communicate with you about products, services, offers, promotions, and events</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our Website</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Personalize and improve your experience on our Website</li>
              </ul>
              
              <h2>3. How We Share Your Information</h2>
              <p>We may share your information in the following circumstances:</p>
              <ul>
                <li>With service providers who perform services on our behalf</li>
                <li>With business partners with whom we jointly offer products or services</li>
                <li>When you choose to share information publicly on our Website</li>
                <li>To comply with legal obligations or protect rights</li>
                <li>In connection with a business transaction, such as a merger, sale of assets, or acquisition</li>
              </ul>
              
              <h2>4. Cookie Policy</h2>
              <p>We use cookies and similar technologies to collect information about your activity, browser, and device. Cookies are small data files stored on your device that help us improve our Website and your experience, see which areas and features of our Website are popular, and count visits.</p>
              
              <p>You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. However, some parts of the Website may not function properly without cookies.</p>
              
              <h2>5. Data Security</h2>
              <p>We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
              
              <h2>6. Your Rights and Choices</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information, such as:</p>
              <ul>
                <li>Access: You can request access to the personal information we hold about you.</li>
                <li>Correction: You can request that we correct inaccurate or incomplete information.</li>
                <li>Deletion: You can request that we delete your personal information in certain circumstances.</li>
                <li>Opt-out: You can opt out of receiving promotional communications from us by following the instructions in those communications.</li>
              </ul>
              
              <h2>7. Children's Privacy</h2>
              <p>Our Website is not intended for children under the age of 16, and we do not knowingly collect personal information from children under 16. If we learn that we have collected personal information from a child under 16, we will promptly delete that information.</p>
              
              <h2>8. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. If we make material changes, we will notify you by email (if you have an account) or by posting a notice on our Website prior to the changes becoming effective.</p>
              
              <h2>9. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at info@allaitools.tech.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
