
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { User, Session, Provider, OAuthResponse } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    data: Session | null;
  }>;
  signInWithProvider: (provider: Provider) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<{
    error: Error | null;
    data: { user: User | null; session: Session | null };
  }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Get the current session on mount
    const getSession = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error getting session:", error);
        } else {
          setSession(data.session);
          setUser(data.session?.user || null);
          
          // Check if user is admin
          if (data.session?.user) {
            checkIfAdmin(data.session.user.id);
          }
        }
      } catch (error) {
        console.error("Unexpected error during getSession:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state change event:", _event);
      setSession(session);
      setUser(session?.user || null);
      
      // Check if user is admin
      if (session?.user) {
        checkIfAdmin(session.user.id);
      } else {
        setIsAdmin(false);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkIfAdmin = async (userId: string) => {
    try {
      // Check if the user's email exists in the admin_users table
      const { data, error } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', user?.email)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error("Error checking admin status:", error);
      }

      setIsAdmin(!!data);
    } catch (error) {
      console.error("Unexpected error checking admin status:", error);
      setIsAdmin(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
        return { error, data: null };
      }

      toast({
        title: "Sign in successful",
        description: "Welcome back!",
      });

      return { error: null, data: data.session };
    } catch (error) {
      console.error("Unexpected error during sign in:", error);
      toast({
        title: "Sign in failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return { error: error as Error, data: null };
    }
  };

  const signInWithProvider = async (provider: Provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Unexpected error during provider sign in:", error);
      toast({
        title: "Sign in failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      // Include name in user metadata if provided
      const options = {
        emailRedirectTo: `${window.location.origin}/login`,
        data: name ? { name } : undefined
      };

      console.log("SignUp options:", options);
      console.log("Redirect URL:", `${window.location.origin}/login`);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options
      });

      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
        return { error, data: { user: null, session: null } };
      }

      toast({
        title: "Sign up successful",
        description: "Please check your email for a confirmation link to complete your registration.",
        duration: 6000,
      });

      return { error: null, data };
    } catch (error) {
      console.error("Unexpected error during sign up:", error);
      toast({
        title: "Sign up failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return {
        error: error as Error,
        data: { user: null, session: null },
      };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign out failed",
        description: "An error occurred while signing out",
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signInWithProvider,
    signUp,
    signOut,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
