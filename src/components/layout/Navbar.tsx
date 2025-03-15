
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };
  
  // Close mobile menu on navigation
  const handleNavigation = () => {
    if (isMenuOpen) {
      toggleMenu();
    }
  };
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background transition-shadow duration-200",
        {
          "shadow-md": isScrolled,
        }
      )}
    >
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center" onClick={handleNavigation}>
            <span className="text-xl font-bold tracking-tight">AIDirectory</span>
          </Link>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-4">
          <Link
            to="/categories"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary"
            onClick={handleNavigation}
          >
            Categories
          </Link>
          <Link
            to="/pricing"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary"
            onClick={handleNavigation}
          >
            Pricing
          </Link>
          <Link
            to="/blog"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary"
            onClick={handleNavigation}
          >
            Blog
          </Link>
          <Link
            to="/about"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary"
            onClick={handleNavigation}
          >
            About
          </Link>
          <Link
            to="/submit-tool"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary"
            onClick={handleNavigation}
          >
            Submit Tool
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          {isSearchVisible ? (
            <div className="relative w-full max-w-xs">
              <Input
                type="text"
                placeholder="Search AI tools..."
                className="pr-8"
              />
              <button
                onClick={() => setIsSearchVisible(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsSearchVisible(true)}
              className="hidden sm:flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary"
            >
              <Search className="h-4 w-4 mr-1" />
              Search
            </button>
          )}
          
          <ThemeToggle />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard/saved-tools')}>
                  Saved Tools
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-500">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
          
          <button
            onClick={toggleMenu}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-secondary"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } lg:hidden absolute top-16 inset-x-0 z-50 h-screen bg-background border-t`}
      >
        <div className="space-y-1 px-4 py-6">
          <Link
            to="/categories"
            className="block rounded-md px-3 py-2 text-base font-medium hover:bg-secondary"
            onClick={handleNavigation}
          >
            Categories
          </Link>
          <Link
            to="/pricing"
            className="block rounded-md px-3 py-2 text-base font-medium hover:bg-secondary"
            onClick={handleNavigation}
          >
            Pricing
          </Link>
          <Link
            to="/blog"
            className="block rounded-md px-3 py-2 text-base font-medium hover:bg-secondary"
            onClick={handleNavigation}
          >
            Blog
          </Link>
          <Link
            to="/about"
            className="block rounded-md px-3 py-2 text-base font-medium hover:bg-secondary"
            onClick={handleNavigation}
          >
            About
          </Link>
          <Link
            to="/submit-tool"
            className="block rounded-md px-3 py-2 text-base font-medium hover:bg-secondary"
            onClick={handleNavigation}
          >
            Submit Tool
          </Link>
          
          <div className="relative mt-4">
            <Input
              type="text"
              placeholder="Search AI tools..."
              className="w-full"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          
          {!user ? (
            <div className="mt-6 flex flex-col gap-2">
              <Link to="/login" onClick={handleNavigation}>
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link to="/signup" onClick={handleNavigation}>
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          ) : (
            <div className="mt-6 flex flex-col gap-2">
              <Link to="/dashboard" onClick={handleNavigation}>
                <Button variant="outline" className="w-full">Dashboard</Button>
              </Link>
              <Button onClick={handleSignOut} variant="destructive" className="w-full">Sign Out</Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
