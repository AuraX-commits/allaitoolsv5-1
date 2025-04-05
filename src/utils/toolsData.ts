
import { Database } from '@/types/supabase';

// Define the AITool interface to match our app's expected structure
export interface AITool {
  id: string;
  name: string;
  logo: string;
  description: string;
  shortDescription: string;
  category: string[];
  pricing: string;
  rating: number;
  reviewCount: number;
  features: string[];
  url: string;
  apiAccess: boolean;
  createdAt?: number; // Adding the optional createdAt property
  pros?: string[];
  cons?: string[];
  useCases?: string[];
}

// Empty array of AI tools (since we're using the database now)
export const aiTools: AITool[] = [];

// Create a type for the database row
export type AIToolRow = Database['public']['Tables']['ai_tools']['Row'];

// Helper function to convert database row to AITool
export function mapRowToAITool(row: AIToolRow): AITool {
  return {
    id: row.id,
    name: row.name,
    logo: row.logo,
    description: row.description,
    shortDescription: row.shortdescription,
    category: row.category,
    pricing: row.pricing,
    rating: row.rating,
    reviewCount: row.reviewcount,
    features: row.features,
    url: row.url,
    apiAccess: row.apiaccess,
    createdAt: row.createdat ? new Date(row.createdat).getTime() : undefined,
    pros: row.pros || undefined,
    cons: row.cons || undefined,
    useCases: row.usecases || undefined
  };
}

// Helper function to convert AITool to database row for inserts/updates
export function mapAIToolToRow(tool: Partial<AITool>): Partial<AIToolRow> {
  const row: Partial<AIToolRow> = {
    name: tool.name,
    logo: tool.logo,
    description: tool.description,
    shortdescription: tool.shortDescription,
    category: tool.category,
    pricing: tool.pricing,
    rating: tool.rating,
    reviewcount: tool.reviewCount,
    features: tool.features,
    url: tool.url,
    apiaccess: tool.apiAccess,
  };

  if (tool.id) row.id = tool.id;
  if (tool.createdAt) row.createdat = new Date(tool.createdAt).toISOString();
  if (tool.pros) row.pros = tool.pros;
  if (tool.cons) row.cons = tool.cons;
  if (tool.useCases) row.usecases = tool.useCases;

  return row;
}

export const categories = [
  "All",
  "Text Generation",
  "Image Generation",
  "Conversational AI",
  "Code Generation",
  "Search",
  "Marketing",
  "Design",
  "Developer Tools",
  "Video Editing",
  "Transcription", 
  "Translation",
  "Automation",
  "Collaboration",
  "Presentation",
  "Voice Generation",
  "Customer Service",
  "Data Analysis",
  "Research",
  "Education",
  "Productivity",
  "Content Creation",
  "Open Source",
  "Career",
  "Business",
  "Sales",
  "Machine Learning",
  "No-Code",
  "Integration"
];

export const pricingOptions = ["All", "Free", "Freemium", "Subscription", "Credit-based", "Self-hosted", "Paid"];
