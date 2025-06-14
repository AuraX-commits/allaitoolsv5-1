import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session, Provider } from "@supabase/supabase-js";
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

  console.log('[AuthContext] Initializing: isLoading state set to true.');

  const checkIfAdmin = async (userId: string, userEmail?: string) => {
    console.log(`[AuthContext] Checking admin status for user: ${userId}, email: ${userEmail}`);
    if (!userEmail) {
      console.log("[AuthContext] No email provided, cannot check admin status.");
      setIsAdmin(false);
      return;
    }

    try {
      // Use .maybeSingle() to avoid error if no row is found
      const { data, error } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', userEmail)
        .maybeSingle(); // Changed from .single() to .maybeSingle()

      if (error) {
        // An error occurred that is not 'PGRST116' (0 rows)
        console.error("[AuthContext] Error checking admin status:", error);
        setIsAdmin(false);
      } else if (data) {
        // User's email found in admin_users table
        console.log("[AuthContext] User is admin:", data);
        setIsAdmin(true);
      } else {
        // User's email not found in admin_users table (data is null)
        console.log("[AuthContext] User is NOT admin.");
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("[AuthContext] Unexpected error checking admin status:", error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    console.log('[AuthContext] useEffect mounting. Mounted set to true.');

    const getSession = async () => {
      console.log('[AuthContext] getSession called. Setting isLoading to true.');
      setIsLoading(true);
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("[AuthContext] Error getting session:", error);
        } else if (mounted) {
          console.log("[AuthContext] Initial session data received:", data.session ? "Session found" : "No session");
          setSession(data.session);
          setUser(data.session?.user || null);
          
          if (data.session?.user) {
            await checkIfAdmin(data.session.user.id, data.session.user.email);
          } else {
            console.log("[AuthContext] No user in initial session, setting isAdmin to false.");
            setIsAdmin(false);
          }
        } else {
          console.log("[AuthContext] getSession completed but component unmounted.");
        }
      } catch (error) {
        console.error("[AuthContext] Unexpected error during getSession:", error);
      } finally {
        if (mounted) {
          console.log('[AuthContext] getSession finally block. Setting isLoading to false.');
          setIsLoading(false);
        } else {
          console.log('[AuthContext] getSession finally block but component unmounted. isLoading not changed.');
        }
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) {
        console.log("[AuthContext] onAuthStateChange: Component unmounted, ignoring event.");
        return;
      }
      
      console.log("[AuthContext] Auth state change event:", _event, "Session:", session ? "Session found" : "No session");
      setSession(session);
      setUser(session?.user || null);
      
      if (session?.user) {
        await checkIfAdmin(session.user.id, session.user.email);
      } else {
        console.log("[AuthContext] No user in auth state change, setting isAdmin to false.");
        setIsAdmin(false);
      }
    });

    return () => {
      console.log('[AuthContext] useEffect cleanup. Unsubscribing and setting mounted to false.');
      mounted = false;
      subscription.unsubscribe();
    };
  }, []); // Removed toast from dependencies as it's stable

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

      // Admin check will be triggered by onAuthStateChange
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
      // Admin check will be triggered by onAuthStateChange
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
      const options = {
        emailRedirectTo: `${window.location.origin}/login`,
        data: name ? { name } : undefined
      };

      console.log("[AuthContext] SignUp options:", options);
      console.log("[AuthContext] Redirect URL:", `${window.location.origin}/login`);

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
      // Admin check will be triggered by onAuthStateChange after confirmation and login

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
      // setIsAdmin(false) will be handled by onAuthStateChange
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

  console.log("[AuthContext] Provider value update:", { user: !!user, session: !!session, isLoading, isAdmin });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
