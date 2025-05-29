
import React, { useEffect, useState } from "react";
import { Star, ThumbsUp, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import ReviewForm from "./ReviewForm";
import { format } from "date-fns";

interface Review {
  id: string;
  rating: number;
  title: string | null;
  content: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
  profiles: {
    username: string | null;
    email: string | null;
  } | null;
}

interface ReviewsListProps {
  toolId: string;
  toolName: string;
}

const ReviewsList = ({ toolId, toolName }: ReviewsListProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          id,
          rating,
          title,
          content,
          created_at,
          updated_at,
          user_id,
          profiles(username, email)
        `)
        .eq('tool_id', toolId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setReviews(data || []);
      
      // Find user's review if logged in
      if (user && data) {
        const currentUserReview = data.find(review => review.user_id === user.id);
        setUserReview(currentUserReview || null);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [toolId, user]);

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

      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      toast({
        title: "Error",
        description: "Failed to delete review. Please try again.",
        variant: "destructive",
      });
    }
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

  const getDisplayName = (review: Review) => {
    return review.profiles?.username || review.profiles?.email?.split('@')[0] || 'Anonymous User';
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
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Reviews ({reviews.length})</h3>
        {user && (
          <ReviewForm
            toolId={toolId}
            toolName={toolName}
            existingReview={userReview ? {
              id: userReview.id,
              rating: userReview.rating,
              title: userReview.title || undefined,
              content: userReview.content || undefined,
            } : undefined}
            onSuccess={fetchReviews}
          />
        )}
      </div>

      {reviews.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No reviews yet. Be the first to review this tool!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{getDisplayName(review)}</span>
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                      </div>
                      <Badge variant="secondary">{review.rating}/5</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(review.created_at), 'MMM d, yyyy')}
                      {review.updated_at !== review.created_at && ' (edited)'}
                    </p>
                  </div>
                  {user && review.user_id === user.id && (
                    <div className="flex space-x-2">
                      <ReviewForm
                        toolId={toolId}
                        toolName={toolName}
                        existingReview={{
                          id: review.id,
                          rating: review.rating,
                          title: review.title || undefined,
                          content: review.content || undefined,
                        }}
                        onSuccess={fetchReviews}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsList;
