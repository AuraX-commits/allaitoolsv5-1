import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Compare from "./pages/Compare";
import ToolDetail from "./pages/ToolDetail";
import Categories from "./pages/Categories";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ComingSoon from "./pages/ComingSoon";
import Careers from "./pages/Careers";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import SubmitTool from "./pages/SubmitTool";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/auth/PrivateRoute';
import ToolRecommender from './pages/ToolRecommender';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <TooltipProvider>
          {/* Only include one toast provider to avoid conflicts */}
          <Toaster />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col overflow-x-hidden">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/tool/:id" element={<ToolDetail />} />
                <Route path="/tool/:id/:name" element={<ToolDetail />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/:category" element={<Categories />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/news" element={<ComingSoon title="AI News" />} />
                <Route path="/api-docs" element={<ComingSoon title="API Documentation" />} />
                <Route path="/community" element={<ComingSoon title="Community" />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/submit-tool" element={<SubmitTool />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/recommend" element={<ToolRecommender />} />
                <Route 
                  path="/dashboard/*" 
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  } 
                />
                <Route path="/signin" element={<Navigate to="/login" replace />} />
                <Route path="/sign-in" element={<Navigate to="/login" replace />} />
                <Route path="/sign-up" element={<Navigate to="/signup" replace />} />
                <Route path="/register" element={<Navigate to="/signup" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
