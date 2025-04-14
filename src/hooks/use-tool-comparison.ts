
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AITool, mapRowToAITool } from "@/utils/toolsData";

export const useToolComparison = (initialSelectedCount = 3) => {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayTools, setDisplayTools] = useState<AITool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial tools
  useEffect(() => {
    const fetchInitialTools = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('ai_tools')
          .select('*')
          .limit(6);
        
        if (error) {
          console.error('Error fetching initial tools:', error);
          return;
        }
        
        const tools = data.map(row => mapRowToAITool(row));
        setDisplayTools(tools);
        
        if (tools.length > 0 && selectedTools.length === 0) {
          setSelectedTools(tools.slice(0, initialSelectedCount).map(tool => tool.id));
        }
      } catch (err) {
        console.error('Error in fetchInitialTools:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialTools();
  }, [initialSelectedCount, selectedTools.length]);

  // Search functionality
  useEffect(() => {
    const searchTools = async () => {
      if (!searchTerm) {
        const { data, error } = await supabase
          .from('ai_tools')
          .select('*')
          .limit(6);
          
        if (error) {
          console.error('Error fetching tools:', error);
          return;
        }
        
        setDisplayTools(data.map(row => mapRowToAITool(row)));
        return;
      }
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('ai_tools')
          .select('*')
          .or(`name.ilike.%${searchTerm}%,shortdescription.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
          .limit(6);
        
        if (error) {
          console.error('Error searching tools:', error);
          return;
        }
        
        setDisplayTools(data.map(row => mapRowToAITool(row)));
      } catch (err) {
        console.error('Error in searchTools:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    const debounce = setTimeout(() => {
      searchTools();
    }, 300);
    
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const handleToolSelect = (id: string) => {
    setSelectedTools(prev => {
      if (prev.includes(id)) {
        if (prev.length <= 2) return prev;
        return prev.filter(toolId => toolId !== id);
      } else {
        if (prev.length >= 3) {
          return [...prev.slice(1), id];
        }
        return [...prev, id];
      }
    });
  };

  return {
    selectedTools,
    searchTerm,
    setSearchTerm,
    displayTools,
    isLoading,
    handleToolSelect,
  };
};
