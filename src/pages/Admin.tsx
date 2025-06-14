
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { DataMigration } from "@/components/admin/DataMigration";
import { Helmet } from "react-helmet-async";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Shield, Users, Database, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";

const AdminMessageScreen = ({ message }: { message: string }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex-grow flex items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-primary mx-auto mb-4"></div>
        <p>{message}</p>
      </div>
    </div>
    <Footer />
  </div>
);

const Admin = () => {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [toolCount, setToolCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [adminEmail, setAdminEmail] = useState<string>('');
  
  console.log('[Admin.tsx] Rendering. Auth state:', { 
    user: !!user, 
    isAdmin, 
    authLoading 
  });

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    console.log('[Admin.tsx] useEffect triggered. Auth state:', { user: !!user, isAdmin, authLoading });

    if (!authLoading) {
      console.log('[Admin.tsx] Auth context finished loading.');
      if (!user) {
        console.log('[Admin.tsx] No user found, redirecting to /login.');
        toast({
          title: "Access Denied",
          description: "You must be logged in to access the admin dashboard.",
          variant: "destructive",
        });
        navigate("/login");
      } else if (!isAdmin) {
        console.log('[Admin.tsx] User is not admin, redirecting to /dashboard.');
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin dashboard.",
          variant: "destructive",
        });
        navigate("/dashboard");
      } else {
        console.log('[Admin.tsx] User is admin, fetching stats.');
        fetchStats();
        if (user.email) {
          setAdminEmail(user.email);
        }
      }
    } else {
      console.log('[Admin.tsx] Auth context is still loading.');
    }
  }, [user, isAdmin, authLoading, navigate, toast]);

  const fetchStats = async () => {
    console.log('[Admin.tsx] fetchStats called.');
    try {
      const { count: tools, error: toolError } = await supabase
        .from('ai_tools')
        .select('*', { count: 'exact', head: true });
      
      if (toolError) {
        console.error('[Admin.tsx] Error fetching tool count:', toolError);
        toast({ title: "Error", description: `Failed to fetch tool count: ${toolError.message}`, variant: "destructive" });
      } else {
        setToolCount(tools || 0);
      }
      
      const { count: users, error: userError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
        
      if (userError) {
        console.error('[Admin.tsx] Error fetching user count:', userError);
        toast({ title: "Error", description: `Failed to fetch user count: ${userError.message}`, variant: "destructive" });
      } else {
        setUserCount(users || 0);
      }
      
      console.log('[Admin.tsx] fetchStats completed.');
    } catch (error) {
      console.error('[Admin.tsx] Error in fetchStats:', error);
      toast({
        title: "Error fetching stats",
        description: "Could not load dashboard statistics.",
        variant: "destructive",
      });
    }
  };

  if (authLoading) {
    console.log('[Admin.tsx] Rendering loading screen because authLoading is true.');
    return <AdminMessageScreen message="Loading Admin Dashboard..." />;
  }

  // Auth is loaded, now check user and admin status for rendering
  if (!user) {
    console.log('[Admin.tsx] Auth loaded, but no user. Showing redirect message.');
    // useEffect should handle the actual navigation
    return <AdminMessageScreen message="Redirecting to login..." />;
  }

  if (!isAdmin) {
    console.log('[Admin.tsx] Auth loaded, user exists, but not admin. Showing redirect message.');
    // useEffect should handle the actual navigation
    return <AdminMessageScreen message="Access Denied. Redirecting to dashboard..." />;
  }

  // If auth has loaded and user is admin, render the dashboard content
  console.log('[Admin.tsx] Rendering admin content.');
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Admin Dashboard | AI Tools Directory</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            </div>
            <p className="text-foreground/70 max-w-3xl">
              Welcome, {adminEmail || user?.email || 'Admin User'}. Manage your AI tools database and perform administrative tasks.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tools</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{toolCount}</div>
                <p className="text-xs text-muted-foreground">
                  AI tools in the directory
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userCount}</div>
                <p className="text-xs text-muted-foreground">
                  Registered users on the platform
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Admin Email</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium truncate">{adminEmail || user?.email}</div>
                <p className="text-xs text-muted-foreground">
                  Current admin access
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Data Management</h2>
              <DataMigration />
            </section>
            {/* Add more admin sections here as needed */}
          </div>
        </div>
      </main>
      
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Admin;
