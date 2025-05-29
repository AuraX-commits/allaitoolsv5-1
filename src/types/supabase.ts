
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      ai_tools: {
        Row: {
          id: string
          name: string
          logo: string
          description: string
          shortdescription: string
          category: string[]
          pricing: string
          rating: number
          reviewcount: number
          features: string[]
          url: string
          apiaccess: boolean
          createdat?: string | null
          pros?: string[] | null
          cons?: string[] | null
          usecases?: string[] | null
        }
        Insert: {
          id?: string
          name: string
          logo: string
          description: string
          shortdescription: string
          category: string[]
          pricing: string
          rating: number
          reviewcount: number
          features: string[]
          url: string
          apiaccess: boolean
          createdat?: string | null
          pros?: string[] | null
          cons?: string[] | null
          usecases?: string[] | null
        }
        Update: {
          id?: string
          name?: string
          logo?: string
          description?: string
          shortdescription?: string
          category?: string[]
          pricing?: string
          rating?: number
          reviewcount?: number
          features?: string[]
          url?: string
          apiaccess?: boolean
          createdat?: string | null
          pros?: string[] | null
          cons?: string[] | null
          usecases?: string[] | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          created_at?: string | null
        }
        Insert: {
          id?: string
          name: string
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          created_at?: string | null
        }
      }
      comments: {
        Row: {
          id: string
          user_id: string
          tool_id: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tool_id: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tool_id?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          subject: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string
          message?: string
          created_at?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
      }
      pricing_options: {
        Row: {
          id: string
          name: string
          created_at?: string | null
        }
        Insert: {
          id?: string
          name: string
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          created_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
          email: string | null
        }
        Insert: {
          id: string
          username?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          email?: string | null
        }
        Update: {
          id?: string
          username?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          email?: string | null
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          tool_id: string
          rating: number
          title: string | null
          content: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tool_id: string
          rating: number
          title?: string | null
          content?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tool_id?: string
          rating?: number
          title?: string | null
          content?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      saved_tools: {
        Row: {
          id: string
          user_id: string
          tool_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tool_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tool_id?: string
          created_at?: string
        }
      }
      tool_submissions: {
        Row: {
          id: string
          name: string
          description: string
          short_description: string
          website: string
          logo_url: string | null
          category: string
          pricing: string
          email: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          short_description: string
          website: string
          logo_url?: string | null
          category: string
          pricing: string
          email: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          short_description?: string
          website?: string
          logo_url?: string | null
          category?: string
          pricing?: string
          email?: string
          status?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_tool_rating: {
        Args: { tool_uuid: string }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
