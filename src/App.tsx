
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./context/AuthContext";
import { useScrollToTop } from "./hooks/useScrollToTop";
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
import Advertise from "./pages/Advertise";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/auth/PrivateRoute';
import ToolRecommender from './pages/ToolRecommender';
import AdminPage from './pages/Admin';

// Component to handle scroll to top on route changes
const ScrollToTopWrapper = ({ children }: { children: React.ReactNode }) => {
  useScrollToTop();
  return <>{children}</>;
};

// Create QueryClient outside of component to avoid recreation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AuthProvider>
            <TooltipProvider>
              {/* Only include one toast provider to avoid conflicts */}
              <Toaster />
              <BrowserRouter>
                <ScrollToTopWrapper>
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
                      <Route path="/advertise" element={<Advertise />} />
                      <Route path="/login" element={<SignIn />} />
                      <Route path="/signup" element={<SignUp />} />
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
                      <Route path="/admin" element={<AdminPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </ScrollToTopWrapper>
              </BrowserRouter>
              {/* Add Vercel Analytics and Speed Insights */}
              <Analytics />
              <SpeedInsights />
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
