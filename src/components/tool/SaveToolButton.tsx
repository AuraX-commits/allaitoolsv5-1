
import { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface SaveToolButtonProps {
  toolId: string;
  minimal?: boolean;
}

const SaveToolButton = ({ toolId, minimal = false }: SaveToolButtonProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (user) {
      checkIfSaved();
    } else {
      setIsChecking(false);
    }
  }, [user, toolId]);

  const checkIfSaved = async () => {
    if (!user) return;
    
    setIsChecking(true);
    try {
      const { data, error } = await supabase
        .from('saved_tools')
        .select('*')
        .eq('user_id', user.id)
        .eq('tool_id', toolId)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is the error code for no rows returned
        console.error("Error checking if tool is saved:", error);
      }

      setIsSaved(!!data);
    } catch (error) {
      console.error("Unexpected error checking if tool is saved:", error);
    } finally {
      setIsChecking(false);
    }
  };

  const toggleSave = async () => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please sign in to add tools to your toolkit",
        variant: "destructive",
      });
      
      // Redirect to login page
      navigate("/signin");
      return;
    }

    setIsLoading(true);
    try {
      if (isSaved) {
        // Remove from saved tools
        const { error } = await supabase
          .from('saved_tools')
          .delete()
          .eq('user_id', user.id)
          .eq('tool_id', toolId);

        if (error) {
          throw error;
        }

        setIsSaved(false);
        toast({
          title: "Tool removed",
          description: "Tool removed from your toolkit",
        });
      } else {
        // Add to saved tools
        const { error } = await supabase
          .from('saved_tools')
          .insert([
            {
              user_id: user.id,
              tool_id: toolId,
            },
          ]);

        if (error) {
          throw error;
        }

        setIsSaved(true);
        toast({
          title: "Tool added",
          description: "Tool added to your toolkit",
        });
      }
    } catch (error) {
      console.error("Error toggling saved status:", error);
      toast({
        title: "Error",
        description: `Failed to ${isSaved ? 'remove' : 'add'} tool`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (minimal) {
    return (
      <Button
        variant="ghost"
        size="sm"
        disabled={isChecking || isLoading}
        onClick={toggleSave}
        className="p-2 h-auto"
        title={isSaved ? "Remove from your toolkit" : "Add to your toolkit"}
      >
        {isSaved ? (
          <BookmarkCheck className="h-5 w-5 text-primary" />
        ) : (
          <Bookmark className="h-5 w-5" />
        )}
      </Button>
    );
  }

  return (
    <Button
      variant={isSaved ? "default" : "outline"}
      disabled={isChecking || isLoading}
      onClick={toggleSave}
      className="w-full flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {isSaved ? "Removing..." : "Adding..."}
        </span>
      ) : (
        <>
          {isSaved ? (
            <>
              <BookmarkCheck className="h-5 w-5" />
              Added to Toolkit
            </>
          ) : (
            <>
              <Bookmark className="h-5 w-5" />
              Add to Your Toolkit
            </>
          )}
        </>
      )}
    </Button>
  );
};

export default SaveToolButton;
