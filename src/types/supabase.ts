
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
          createdAt?: number
          pros?: string[]
          cons?: string[]
          useCases?: string[]
        }
        Insert: {
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
          createdAt?: number
          pros?: string[]
          cons?: string[]
          useCases?: string[]
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
          createdAt?: number
          pros?: string[]
          cons?: string[]
          useCases?: string[]
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
