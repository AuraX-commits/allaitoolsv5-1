
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Get environment variables
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://favhnurmqbtzttzxvfmm.supabase.co';
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!GEMINI_API_KEY) {
      throw new Error("Missing Gemini API key");
    }
    
    if (!SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing Supabase service role key");
    }
    
    const requestData = await req.json();
    const { requirements } = requestData;
    
    if (!requirements) {
      throw new Error("Missing requirements");
    }
    
    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    // Fetch tools data from Supabase
    const { data: tools, error: toolsError } = await supabase
      .from('ai_tools')
      .select('*');
      
    if (toolsError) {
      throw new Error(`Error fetching tools: ${toolsError.message}`);
    }
    
    // Context for the Gemini model - limited tool data to avoid token limits
    const toolsContext = tools.map((tool: any) => ({
      id: tool.id,
      name: tool.name,
      description: tool.description,
      shortdescription: tool.shortdescription,
      category: tool.category,
      pricing: tool.pricing,
      features: tool.features,
      usecases: tool.usecases
    }));
    
    // Call Gemini API to analyze requirements and match with tools
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { 
                  text: `
As a tool recommendation specialist, analyze the user's requirements and recommend the most suitable AI tools from our database.

USER REQUIREMENTS:
${requirements}

AVAILABLE TOOLS (JSON format):
${JSON.stringify(toolsContext)}

INSTRUCTIONS:
1. Analyze the user's requirements carefully
2. Select 1-3 tools that best match their needs
3. For each recommended tool, provide:
   - The tool's ID, name, description, and other information from the database
   - A specific reasoning explaining why this tool is a good match for their requirements

Return ONLY a JSON array of recommended tools in this exact format:
[
  {
    "id": "tool-id",
    "name": "Tool Name",
    "description": "Tool description",
    "logo": "logo-url",
    "category": ["category1", "category2"],
    "url": "website-url",
    "reasoning": "Detailed explanation of why this tool matches the user's requirements"
  }
]`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 2048,
            topP: 0.8,
            topK: 40
          }
        })
      }
    );
    
    const geminiData = await geminiResponse.json();
    
    if (!geminiData.candidates || !geminiData.candidates[0].content || !geminiData.candidates[0].content.parts || !geminiData.candidates[0].content.parts[0].text) {
      throw new Error("Invalid response from Gemini API");
    }
    
    let recommendations;
    try {
      // Extract the JSON from the response
      const responseText = geminiData.candidates[0].content.parts[0].text;
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      
      if (jsonMatch) {
        recommendations = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse recommendations from Gemini response");
      }
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      throw new Error("Failed to parse recommendations");
    }
    
    // Enhance recommendations with complete tool data
    const enhancedRecommendations = recommendations.map((rec: any) => {
      const fullTool = tools.find((t: any) => t.id === rec.id);
      
      if (!fullTool) {
        return rec;
      }
      
      return {
        ...rec,
        logo: fullTool.logo || rec.logo,
        url: fullTool.url || rec.url,
        category: fullTool.category || rec.category
      };
    });
    
    return new Response(
      JSON.stringify({ recommendations: enhancedRecommendations }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error("Error in recommend-tools function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
