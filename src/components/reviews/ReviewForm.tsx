
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().optional(),
  content: z.string().optional(),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  toolId: string;
  toolName: string;
  existingReview?: {
    id: string;
    rating: number;
    title?: string;
    content?: string;
  };
  onSuccess: () => void;
}

const ReviewForm = ({ toolId, toolName, existingReview, onSuccess }: ReviewFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: existingReview?.rating || 0,
      title: existingReview?.title || "",
      content: existingReview?.content || "",
    },
  });

  const handleSubmit = async (data: ReviewFormData) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to write a review",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const reviewData = {
        user_id: user.id,
        tool_id: toolId,
        rating: data.rating,
        title: data.title || null,
        content: data.content || null,
      };

      let error;
      if (existingReview) {
        ({ error } = await supabase
          .from('reviews')
          .update(reviewData)
          .eq('id', existingReview.id));
      } else {
        ({ error } = await supabase
          .from('reviews')
          .insert([reviewData]));
      }

      if (error) throw error;

      toast({
        title: existingReview ? "Review updated" : "Review submitted",
        description: `Your review for ${toolName} has been ${existingReview ? 'updated' : 'submitted'}.`,
      });

      setIsOpen(false);
      form.reset();
      onSuccess();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ value, onChange }: { value: number; onChange: (rating: number) => void }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none"
          >
            <Star
              className={`h-6 w-6 ${
                star <= value
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (!user) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={existingReview ? "outline" : "default"}>
          {existingReview ? "Edit Review" : "Write Review"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {existingReview ? "Edit Review" : "Write a Review"}
          </DialogTitle>
          <DialogDescription>
            Share your experience with {toolName}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating *</FormLabel>
                  <FormControl>
                    <StarRating
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief summary of your experience" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share your detailed thoughts about this tool..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || form.watch("rating") === 0}>
                {isSubmitting ? "Submitting..." : existingReview ? "Update Review" : "Submit Review"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm;
