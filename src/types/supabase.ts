
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
          shortDescription: string
          category: string[]
          pricing: string
          rating: number
          reviewCount: number
          features: string[]
          url: string
          apiAccess: boolean
          createdAt?: string | null
          pros?: string[] | null
          cons?: string[] | null
          useCases?: string[] | null
        }
        Insert: {
          id?: string
          name: string
          logo: string
          description: string
          shortDescription: string
          category: string[]
          pricing: string
          rating: number
          reviewCount: number
          features: string[]
          url: string
          apiAccess: boolean
          createdAt?: string | null
          pros?: string[] | null
          cons?: string[] | null
          useCases?: string[] | null
        }
        Update: {
          id?: string
          name?: string
          logo?: string
          description?: string
          shortDescription?: string
          category?: string[]
          pricing?: string
          rating?: number
          reviewCount?: number
          features?: string[]
          url?: string
          apiAccess?: boolean
          createdAt?: string | null
          pros?: string[] | null
          cons?: string[] | null
          useCases?: string[] | null
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
