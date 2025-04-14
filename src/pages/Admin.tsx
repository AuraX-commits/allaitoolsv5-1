
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

const Admin = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [toolCount, setToolCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [adminEmail, setAdminEmail] = useState<string>('');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Only check admin status after auth has loaded
    if (!isLoading) {
      if (!user) {
        toast({
          title: "Access Denied",
          description: "You must be logged in to access the admin dashboard",
          variant: "destructive",
        });
        navigate("/login");
      } else if (!isAdmin) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin dashboard",
          variant: "destructive",
        });
        navigate("/dashboard");
      } else {
        // Fetch counts for admin dashboard
        fetchStats();
      }
    }
  }, [user, isAdmin, isLoading, navigate, toast]);

  const fetchStats = async () => {
    try {
      // Get tool count
      const { count: toolCount, error: toolError } = await supabase
        .from('ai_tools')
        .select('*', { count: 'exact', head: true });
      
      if (!toolError) {
        setToolCount(toolCount || 0);
      }
      
      // Get user count
      const { count: userCount, error: userError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
        
      if (!userError) {
        setUserCount(userCount || 0);
      }
      
      // Get admin email
      if (user) {
        setAdminEmail(user.email || 'admin@example.com');
      }
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    }
  };

  // Don't render anything until we've checked admin status
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Don't render admin content if not admin
  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Admin Dashboard | AI Tools Directory</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            </div>
            <p className="text-foreground/70 max-w-3xl">
              Manage your AI tools database and perform administrative tasks.
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
                <div className="text-sm font-medium truncate">{adminEmail}</div>
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
          </div>
        </div>
      </main>
      
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Admin;
