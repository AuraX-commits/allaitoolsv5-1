
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Compare", href: "/compare" },
  { 
    label: "Categories", 
    href: "/categories", 
    subItems: [
      { label: "Text Generation", href: "/categories/Text Generation" },
      { label: "Image Generation", href: "/categories/Image Generation" },
      { label: "Conversational AI", href: "/categories/Conversational AI" },
      { label: "Code Generation", href: "/categories/Code Generation" },
    ] 
  },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const toggleDropdown = (label: string) => {
    if (openDropdown === label) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(label);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-subtle py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary transition-transform hover:scale-105"
          >
            AIDirectory
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.subItems ? (
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="flex items-center space-x-1 text-sm text-foreground/80 hover:text-foreground transition-colors duration-200"
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "text-sm transition-colors duration-200",
                      location.pathname === item.href
                        ? "text-primary font-medium"
                        : "text-foreground/80 hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                {item.subItems && (
                  <div
                    className={cn(
                      "absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 glass transition-all duration-200 ease-in-out origin-top-left",
                      openDropdown === item.label ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    )}
                  >
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.label}
                        to={subItem.href}
                        className="block px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-primary/5 transition-colors duration-150"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:block">
            <button className="px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors duration-200">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg md:hidden transition-transform duration-300 ease-in-out transform",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <nav className="container mx-auto px-4 py-5 space-y-5">
          {navItems.map((item) => (
            <div key={item.label} className="py-1">
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="flex items-center justify-between w-full text-base font-medium text-foreground"
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  <div
                    className={cn(
                      "mt-2 space-y-2 pl-4 border-l-2 border-primary/20 transition-all duration-300",
                      openDropdown === item.label ? "max-h-60 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    )}
                  >
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.label}
                        to={subItem.href}
                        className="block py-2 text-sm text-foreground/80 hover:text-foreground transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={item.href}
                  className={cn(
                    "block text-base font-medium transition-colors",
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <div className="pt-2">
            <button className="w-full py-2.5 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors">
              Sign Up
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
