
import React, { useEffect, useState } from "react";
import { Edit, Trash2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import CommentForm from "./CommentForm";
import { format } from "date-fns";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

interface CommentsListProps {
  toolId: string;
}

const CommentsList = ({ toolId }: CommentsListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [userProfiles, setUserProfiles] = useState<Map<string, { username: string | null; email: string | null }>>(new Map());
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          created_at,
          updated_at,
          user_id
        `)
        .eq('tool_id', toolId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setComments(data || []);

      // Get unique user IDs and fetch their profiles
      const userIds = [...new Set((data || []).map(comment => comment.user_id))];
      if (userIds.length > 0) {
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, username, email')
          .in('id', userIds);

        if (!profilesError && profilesData) {
          const profilesMap = new Map();
          profilesData.forEach(profile => {
            profilesMap.set(profile.id, {
              username: profile.username,
              email: profile.email
            });
          });
          setUserProfiles(profilesMap);
        }
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [toolId]);

  const handleDeleteComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      toast({
        title: "Comment deleted",
        description: "Your comment has been deleted successfully.",
      });

      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast({
        title: "Error",
        description: "Failed to delete comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getDisplayName = (comment: Comment) => {
    const profile = userProfiles.get(comment.user_id);
    return profile?.username || profile?.email?.split('@')[0] || 'Anonymous User';
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <MessageCircle className="h-5 w-5" />
        <h3 className="text-xl font-semibold">Comments ({comments.length})</h3>
      </div>

      <CommentForm toolId={toolId} onSuccess={fetchComments} />

      {comments.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No comments yet. Start the conversation!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="font-medium">{getDisplayName(comment)}</span>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(comment.created_at), 'MMM d, yyyy')}
                      {comment.updated_at !== comment.created_at && ' (edited)'}
                    </p>
                  </div>
                  {user && comment.user_id === user.id && (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingComment(comment.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {editingComment === comment.id ? (
                  <CommentForm
                    toolId={toolId}
                    existingComment={{
                      id: comment.id,
                      content: comment.content,
                    }}
                    onSuccess={() => {
                      setEditingComment(null);
                      fetchComments();
                    }}
                    onCancel={() => setEditingComment(null)}
                  />
                ) : (
                  <p className="text-muted-foreground whitespace-pre-wrap">{comment.content}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsList;
