
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(1000, "Comment too long"),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface CommentFormProps {
  toolId: string;
  onSuccess: () => void;
  existingComment?: {
    id: string;
    content: string;
  };
  onCancel?: () => void;
}

const CommentForm = ({ toolId, onSuccess, existingComment, onCancel }: CommentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: existingComment?.content || "",
    },
  });

  const handleSubmit = async (data: CommentFormData) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to post a comment",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      let error;
      if (existingComment) {
        ({ error } = await supabase
          .from('comments')
          .update({ content: data.content })
          .eq('id', existingComment.id));
      } else {
        ({ error } = await supabase
          .from('comments')
          .insert([{
            user_id: user.id,
            tool_id: toolId,
            content: data.content,
          }]));
      }

      if (error) throw error;

      toast({
        title: existingComment ? "Comment updated" : "Comment posted",
        description: `Your comment has been ${existingComment ? 'updated' : 'posted'}.`,
      });

      form.reset();
      onSuccess();
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast({
        title: "Error",
        description: "Failed to submit comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">Please log in to post comments</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea 
                  placeholder={existingComment ? "Edit your comment..." : "Share your thoughts about this tool..."}
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          {existingComment && onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : existingComment ? "Update Comment" : "Post Comment"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommentForm;
