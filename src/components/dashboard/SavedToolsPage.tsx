
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/supabase";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Trash2 } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

type AITool = Database['public']['Tables']['ai_tools']['Row'];
type SavedTool = Database['public']['Tables']['saved_tools']['Row'];

const SavedToolsPage = () => {
  const { user } = useAuth();
  const [savedTools, setSavedTools] = useState<(SavedTool & { tool: AITool })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSavedTools = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_tools')
        .select(`
          *,
          tool:tool_id(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setSavedTools(data as any || []);
    } catch (error) {
      console.error('Error fetching saved tools:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedTools();
  }, [user]);

  const handleRemoveTool = async (id: string) => {
    try {
      const { error } = await supabase
        .from('saved_tools')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setSavedTools((prev) => prev.filter((tool) => tool.id !== id));
      
      toast({
        title: "Tool removed",
        description: "The tool has been removed from your saved list.",
      });
    } catch (error) {
      console.error('Error removing tool:', error);
      toast({
        title: "Error",
        description: "Failed to remove the tool. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Saved Tools</h1>
        <p className="text-muted-foreground">
          Manage your collection of favorite AI tools.
        </p>
      </div>

      {savedTools.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bookmark className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No saved tools yet</h3>
            <p className="text-center text-muted-foreground mb-6 max-w-md">
              You haven't saved any tools to your collection. Browse the directory and save tools you're interested in.
            </p>
            <Link to="/categories">
              <Button>Browse AI Tools</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTools.map((item) => (
            <Card key={item.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.tool.name}</CardTitle>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive transition-colors" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove saved tool?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to remove "{item.tool.name}" from your saved tools? 
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleRemoveTool(item.id)}>
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <CardDescription>
                  {item.tool.shortdescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2 flex-grow">
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
                <Link to={`/tool/${item.tool.id}`} className="w-full">
                  <Button variant="outline" size="sm" className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedToolsPage;
