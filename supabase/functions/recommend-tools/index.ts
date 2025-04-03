
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Set up CORS headers
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
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables');
    }

    if (!geminiApiKey) {
      throw new Error('Missing Gemini API key');
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Parse request body
    const { requirements } = await req.json();

    if (!requirements || typeof requirements !== 'string') {
      throw new Error('Invalid requirements');
    }

    // Fetch AI tools from database
    const { data: tools, error } = await supabase
      .from('ai_tools')
      .select('*');

    if (error) {
      console.error("Error fetching tools:", error);
      throw new Error(`Database error: ${error.message}`);
    }

    if (!tools || tools.length === 0) {
      return new Response(JSON.stringify({ recommendations: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // Format tools data for the AI
    const toolsData = tools.map(tool => ({
      id: tool.id,
      name: tool.name,
      description: tool.description,
      shortDescription: tool.shortdescription,
      category: tool.category,
      features: tool.features,
      pricing: tool.pricing,
      pros: tool.pros,
      cons: tool.cons,
      useCases: tool.usecases,
      url: tool.url,
      logo: tool.logo
    }));

    // Create a prompt for Gemini
    const prompt = `
You are an AI tool recommendation expert. Given the following user requirements, analyze and recommend the most suitable AI tools from the provided database.
Explain why each tool is recommended based on the user's specific needs.

User requirements: "${requirements}"

Tools database (in JSON format):
${JSON.stringify(toolsData, null, 2)}

Provide recommendations for at most 3 tools that best match the user's needs. For each tool, explain your reasoning in detail.
Format your response as a valid JSON object with the following structure:
{
  "recommendations": [
    {
      "id": "tool-uuid",
      "name": "Tool Name",
      "description": "Tool description",
      "logo": "logo-url",
      "category": ["category1", "category2"],
      "url": "tool-url",
      "reasoning": "Detailed explanation of why this tool is recommended"
    }
  ]
}
Include ONLY the JSON response, no additional text.
`;

    // Call Gemini API for recommendations
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": geminiApiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        },
      }),
    });

    const geminiResponse = await response.json();
    
    if (!response.ok) {
      console.error("Gemini API error:", geminiResponse);
      throw new Error(`Gemini API error: ${JSON.stringify(geminiResponse)}`);
    }

    // Extract the generated text from Gemini's response
    const generatedText = geminiResponse.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      console.error("Invalid Gemini response:", geminiResponse);
      throw new Error("Invalid response from Gemini API");
    }

    // Extract the JSON from the generated text
    let recommendationsJson;
    try {
      // Find JSON object in the text (it might be wrapped in markdown code blocks)
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        recommendationsJson = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in Gemini response");
      }
    } catch (e) {
      console.error("Error parsing Gemini response:", e, generatedText);
      throw new Error(`Error parsing recommendations: ${e.message}`);
    }

    return new Response(JSON.stringify(recommendationsJson), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in recommend-tools function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
