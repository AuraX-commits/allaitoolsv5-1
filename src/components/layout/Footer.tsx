import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="text-2xl font-bold text-primary">
              AIDirectory
            </Link>
            <p className="mt-4 text-muted-foreground max-w-xs">
              Discover, compare, and test AI-powered software with our modern and intuitive directory.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/categories/Text Generation" className="text-foreground/70 hover:text-primary transition-colors">
                  Text Generation
                </Link>
              </li>
              <li>
                <Link to="/categories/Image Generation" className="text-foreground/70 hover:text-primary transition-colors">
                  Image Generation
                </Link>
              </li>
              <li>
                <Link to="/categories/Voice Assistants" className="text-foreground/70 hover:text-primary transition-colors">
                  Voice Assistants
                </Link>
              </li>
              <li>
                <Link to="/categories/Code Assistants" className="text-foreground/70 hover:text-primary transition-colors">
                  Code Assistants
                </Link>
              </li>
              <li>
                <Link to="/categories/Video Generation" className="text-foreground/70 hover:text-primary transition-colors">
                  Video Generation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-foreground/70 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-foreground/70 hover:text-primary transition-colors">
                  AI News
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-foreground/70 hover:text-primary transition-colors">
                  Tool Comparisons
                </Link>
              </li>
              <li>
                <Link to="/api-docs" className="text-foreground/70 hover:text-primary transition-colors">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-foreground/70 hover:text-primary transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-foreground/70 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-foreground/70 hover:text-primary transition-colors">
                  Careers
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
                <Link to="/contact" className="text-foreground/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-foreground/60 text-sm">
            © {new Date().getFullYear()} AIDirectory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
