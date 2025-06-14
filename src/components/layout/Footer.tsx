import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary py-20 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="text-2xl font-bold text-primary">
              AllAITools.tech
            </Link>
            <p className="mt-4 text-muted-foreground max-w-xs">
              Discover, compare, and find the perfect AI tools for your needs. The world's most comprehensive AI directory with 3000+ tools across 50+ categories.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://twitter.com/AIToolsDirectory" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Follow us on Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Follow us on Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Connect on LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors" aria-label="View our GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Popular AI Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/categories/Text Generation" className="text-foreground/70 hover:text-primary transition-colors">
                  AI Writing Tools
                </Link>
              </li>
              <li>
                <Link to="/categories/Image Generation" className="text-foreground/70 hover:text-primary transition-colors">
                  AI Image Generators
                </Link>
              </li>
              <li>
                <Link to="/categories/Voice Assistants" className="text-foreground/70 hover:text-primary transition-colors">
                  AI Voice Tools
                </Link>
              </li>
              <li>
                <Link to="/categories/Code Assistants" className="text-foreground/70 hover:text-primary transition-colors">
                  AI Coding Assistants
                </Link>
              </li>
              <li>
                <Link to="/categories/Video Generation" className="text-foreground/70 hover:text-primary transition-colors">
                  AI Video Creators
                </Link>
              </li>
              <li>
                <Link to="/categories/Marketing" className="text-foreground/70 hover:text-primary transition-colors">
                  AI Marketing Tools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">AI Tools & Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/recommend" className="text-foreground/70 hover:text-primary transition-colors">
                  AI Tool Recommender
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-foreground/70 hover:text-primary transition-colors">
                  Compare AI Tools
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-foreground/70 hover:text-primary transition-colors">
                  AI Tools Blog
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-foreground/70 hover:text-primary transition-colors">
                  Latest AI News
                </Link>
              </li>
              <li>
                <Link to="/submit-tool" className="text-foreground/70 hover:text-primary transition-colors">
                  Submit AI Tool
                </Link>
              </li>
              <li>
                <Link to="/api-docs" className="text-foreground/70 hover:text-primary transition-colors">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company & Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-foreground/70 hover:text-primary transition-colors">
                  About AllAITools
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground/70 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-foreground/70 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-foreground/70 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-foreground/70 hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/advertise" className="text-foreground/70 hover:text-primary transition-colors">
                  Advertise With Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center md:text-left text-foreground/60 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} AllAITools.tech. All rights reserved. Find the best AI tools for your needs.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-xs text-foreground/60">
              <span>🤖 AI Directory</span>
              <span>🔍 Tool Finder</span>
              <span>📊 Comparison Engine</span>
              <span>⭐ Expert Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
