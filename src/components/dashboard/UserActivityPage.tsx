
import React, { useEffect, useState } from "react";
import { MessageCircle, Star, Edit, Trash2, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface UserReview {
  id: string;
  rating: number;
  title: string | null;
  content: string | null;
  created_at: string;
  updated_at: string;
  ai_tools: {
    id: string;
    name: string;
    logo: string;
  };
}

interface UserComment {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  ai_tools: {
    id: string;
    name: string;
    logo: string;
  };
}

const UserActivityPage = () => {
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [comments, setComments] = useState<UserComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchUserActivity = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Fetch user reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select(`
          id,
          rating,
          title,
          content,
          created_at,
          updated_at,
          ai_tools!inner(id, name, logo)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (reviewsError) throw reviewsError;

      // Fetch user comments
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          created_at,
          updated_at,
          ai_tools!inner(id, name, logo)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (commentsError) throw commentsError;

      setReviews(reviewsData || []);
      setComments(commentsData || []);
    } catch (error) {
      console.error("Error fetching user activity:", error);
      toast({
        title: "Error",
        description: "Failed to load your activity. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserActivity();
  }, [user]);

  const handleDeleteReview = async (reviewId: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

      if (error) throw error;

      toast({
        title: "Review deleted",
        description: "Your review has been deleted successfully.",
      });

      fetchUserActivity();
    } catch (error) {
      console.error("Error deleting review:", error);
      toast({
        title: "Error",
        description: "Failed to delete review. Please try again.",
        variant: "destructive",
      });
    }
  };

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

      fetchUserActivity();
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast({
        title: "Error",
        description: "Failed to delete comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const navigateToTool = (toolId: string, toolName: string) => {
    const slug = toolName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/tool/${toolId}/${slug}`);
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Activity</h1>
        <p className="text-muted-foreground">
          View and manage your reviews and comments
        </p>
      </div>

      <Tabs defaultValue="reviews" className="space-y-6">
        <TabsList>
          <TabsTrigger value="reviews" className="flex items-center space-x-2">
            <Star className="h-4 w-4" />
            <span>Reviews ({reviews.length})</span>
          </TabsTrigger>
          <TabsTrigger value="comments" className="flex items-center space-x-2">
            <MessageCircle className="h-4 w-4" />
            <span>Comments ({comments.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-4">
          {reviews.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Star className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-muted-foreground">You haven't written any reviews yet.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Start exploring tools and share your experience!
                </p>
              </CardContent>
            </Card>
          ) : (
            reviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <img
                        src={review.ai_tools.logo}
                        alt={review.ai_tools.name}
                        className="h-12 w-12 object-contain rounded"
                      />
                      <div>
                        <CardTitle className="text-lg">{review.ai_tools.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                          </div>
                          <Badge variant="secondary">{review.rating}/5</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {format(new Date(review.created_at), 'MMM d, yyyy')}
                          {review.updated_at !== review.created_at && ' (edited)'}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigateToTool(review.ai_tools.id, review.ai_tools.name)}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {(review.title || review.content) && (
                  <CardContent>
                    {review.title && (
                      <h4 className="font-medium mb-2">{review.title}</h4>
                    )}
                    {review.content && (
                      <p className="text-muted-foreground">{review.content}</p>
                    )}
                  </CardContent>
                )}
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="comments" className="space-y-4">
          {comments.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <MessageCircle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-muted-foreground">You haven't posted any comments yet.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Join the conversation and share your thoughts!
                </p>
              </CardContent>
            </Card>
          ) : (
            comments.map((comment) => (
              <Card key={comment.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <img
                        src={comment.ai_tools.logo}
                        alt={comment.ai_tools.name}
                        className="h-12 w-12 object-contain rounded"
                      />
                      <div>
                        <CardTitle className="text-lg">{comment.ai_tools.name}</CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {format(new Date(comment.created_at), 'MMM d, yyyy')}
                          {comment.updated_at !== comment.created_at && ' (edited)'}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigateToTool(comment.ai_tools.id, comment.ai_tools.name)}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-wrap">{comment.content}</p>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserActivityPage;
