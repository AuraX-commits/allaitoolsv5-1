
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
