
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { mapRowToAITool, type AITool } from "@/utils/toolsData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const SavedToolsPage = () => {
  const [savedTools, setSavedTools] = useState<AITool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchSavedTools();
    }
  }, [user]);

  const fetchSavedTools = async () => {
    setIsLoading(true);
    try {
      // Get saved tool IDs for the current user
      const { data: savedToolsData, error: savedToolsError } = await supabase
        .from('saved_tools')
        .select('tool_id')
        .eq('user_id', user?.id);

      if (savedToolsError) {
        throw savedToolsError;
      }

      if (!savedToolsData || savedToolsData.length === 0) {
        setSavedTools([]);
        setIsLoading(false);
        return;
      }

      // Get the actual tool data for each saved tool
      const toolIds = savedToolsData.map(item => item.tool_id);
      const { data: toolsData, error: toolsError } = await supabase
        .from('ai_tools')
        .select('*')
        .in('id', toolIds);

      if (toolsError) {
        throw toolsError;
      }

      // Map the database rows to our AITool interface
      const mappedTools = toolsData.map(mapRowToAITool);
      setSavedTools(mappedTools);
    } catch (error) {
      console.error("Error fetching saved tools:", error);
      toast({
        title: "Error",
        description: "Failed to load your saved tools",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeTool = async (toolId: string) => {
    try {
      const { error } = await supabase
        .from('saved_tools')
        .delete()
        .eq('user_id', user?.id)
        .eq('tool_id', toolId);

      if (error) {
        throw error;
      }

      // Update the UI by removing the tool from the state
      setSavedTools(savedTools.filter(tool => tool.id !== toolId));
      
      toast({
        title: "Tool removed",
        description: "The tool has been removed from your saved list",
      });
    } catch (error) {
      console.error("Error removing tool:", error);
      toast({
        title: "Error",
        description: "Failed to remove the tool",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Saved Tools</h1>
      <p className="text-foreground/70 mb-8">
        Manage your collection of saved AI tools.
      </p>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-[320px] flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-2" />
                <Skeleton className="h-4 w-4/6 mb-2" />
                <div className="mt-4 flex flex-wrap gap-1">
                  {[1, 2, 3].map(j => (
                    <Skeleton key={j} className="h-6 w-16 rounded-full" />
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full rounded-md" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : savedTools.length === 0 ? (
        <div className="text-center p-12 border rounded-lg bg-background">
          <h3 className="text-lg font-medium mb-2">No saved tools yet</h3>
          <p className="text-muted-foreground mb-6">
            Browse the directory and save tools that interest you.
          </p>
          <Button asChild>
            <a href="/">Explore Tools</a>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTools.map((tool) => (
            <Card key={tool.id} className="flex flex-col h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    className="h-12 w-12 object-contain rounded-md"
                  />
                  <div>
                    <CardTitle className="text-xl">{tool.name}</CardTitle>
                    <CardDescription>{tool.pricing}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-foreground/80 line-clamp-3 mb-4">
                  {tool.shortDescription}
                </p>
                <div className="flex flex-wrap gap-1">
                  {tool.category.slice(0, 3).map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                  {tool.category.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{tool.category.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between gap-2 pt-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={`/tool/${tool.id}`} className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Details
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTool(tool.id)}
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedToolsPage;
