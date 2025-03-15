import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, PanelTop, Bookmark, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/supabase";

type AITool = Database['public']['Tables']['ai_tools']['Row'];
type SavedTool = Database['public']['Tables']['saved_tools']['Row'];

const DashboardOverview = () => {
  const { user } = useAuth();
  const [savedTools, setSavedTools] = useState<(SavedTool & { tool: AITool })[]>([]);
  const [recentTools, setRecentTools] = useState<AITool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (user) {
          // Fetch saved tools
          const { data: savedToolsData, error: savedToolsError } = await supabase
            .from('saved_tools')
            .select(`
              *,
              tool:tool_id(*)
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(3);

          if (savedToolsError) {
            throw savedToolsError;
          }

          setSavedTools(savedToolsData as any || []);

          // Fetch recent tools
          const { data: recentToolsData, error: recentToolsError } = await supabase
            .from('ai_tools')
            .select('*')
            .order('createdat', { ascending: false })
            .limit(3);

          if (recentToolsError) {
            throw recentToolsError;
          }

          setRecentTools(recentToolsData || []);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.email}</h1>
        <p className="text-muted-foreground">
          Manage your account, saved tools, and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <PanelTop className="mr-2 h-5 w-5" />
              Tools Count
            </CardTitle>
            <CardDescription>
              Total number of tools in our directory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{recentTools.length > 0 ? recentTools.length + 100 : '100+'}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Bookmark className="mr-2 h-5 w-5" />
              Saved Tools
            </CardTitle>
            <CardDescription>
              Number of tools you've saved
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{savedTools.length}</p>
          </CardContent>
          <CardFooter>
            <Link to="/dashboard/saved-tools">
              <Button variant="ghost" size="sm" className="flex items-center">
                View All 
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Account Status
            </CardTitle>
            <CardDescription>
              Your current membership level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">Free Tier</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" disabled>
              Upgrade coming soon
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Saved Tools</h2>
          <Link to="/dashboard/saved-tools">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>

        {savedTools.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-center text-muted-foreground mb-4">
                You haven't saved any tools yet.
              </p>
              <Link to="/categories">
                <Button>Browse Tools</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savedTools.map((item) => (
              <Card key={item.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{item.tool.name}</CardTitle>
                  <CardDescription>
                    {item.tool.shortdescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm px-2 py-1 bg-secondary rounded-md">
                      {item.tool.pricing}
                    </span>
                    <span className="text-sm px-2 py-1 bg-secondary rounded-md">
                      {item.tool.category[0]}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to={`/tool/${item.tool.id}`}>
                    <Button variant="outline" size="sm">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Recently Added Tools</h2>
          <Link to="/categories">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentTools.map((tool) => (
            <Card key={tool.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{tool.name}</CardTitle>
                <CardDescription>
                  {tool.shortdescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm px-2 py-1 bg-secondary rounded-md">
                    {tool.pricing}
                  </span>
                  <span className="text-sm px-2 py-1 bg-secondary rounded-md">
                    {tool.category[0]}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/tool/${tool.id}`}>
                  <Button variant="outline" size="sm">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
