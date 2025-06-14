import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="text-2xl font-bold text-primary">
              AllAITools.tech
            </Link>
            <p className="mt-4 text-muted-foreground max-w-xs">
              Discover, compare, and find the perfect AI tools for your needs.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://twitter.com/AIToolsDirectory" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Follow us on Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Follow us on Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Connect on LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="View our GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Popular Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/categories/Text Generation" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Writing Tools
                </Link>
              </li>
              <li>
                <Link to="/categories/Image Generation" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Image Generators
                </Link>
              </li>
              <li>
                <Link to="/categories/Voice Assistants" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Voice Tools
                </Link>
              </li>
              <li>
                <Link to="/categories/Code Assistants" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Coding Assistants
                </Link>
              </li>
              <li>
                <Link to="/categories/Video Generation" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Video Creators
                </Link>
              </li>
              <li>
                <Link to="/categories/Marketing" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Marketing Tools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/recommend" className="text-muted-foreground hover:text-primary transition-colors">
                  Recommender
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-muted-foreground hover:text-primary transition-colors">
                  Compare Tools
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-muted-foreground hover:text-primary transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link to="/submit-tool" className="text-muted-foreground hover:text-primary transition-colors">
                  Submit Tool
                </Link>
              </li>
              <li>
                <Link to="/api-docs" className="text-muted-foreground hover:text-primary transition-colors">
                  API
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/advertise" className="text-muted-foreground hover:text-primary transition-colors">
                  Advertise
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center md:text-left text-muted-foreground text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} AllAITools.tech. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
