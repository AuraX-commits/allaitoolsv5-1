
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-100/50">
        <div className="text-center px-4 py-16 max-w-md">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500 mb-8">
            The page at <code className="bg-gray-200 px-2 py-1 rounded">{location.pathname}</code> wasn't found.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
