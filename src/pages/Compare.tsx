
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, ExternalLink, Plus, X } from 'lucide-react';
import { AITool, mapRowToAITool } from '@/utils/toolsData';
import { ReplaceToolButton } from '@/components/comparison/ReplaceToolButton';
import BreadcrumbNav from '@/components/common/BreadcrumbNav';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { Helmet } from 'react-helmet-async';
import { generateLocalSeoKeywords, generateLocalSeoDescription } from '@/utils/localSeoHelper';
import { supabase } from '@/lib/supabaseClient';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchBar } from '@/components/comparison/SearchBar';
import { ToolGrid } from '@/components/comparison/ToolGrid';
import { useToolComparison } from '@/hooks/use-tool-comparison';

const Compare: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tools, setTools] = useState<AITool[]>([]);
  const [seoKeywords, setSeoKeywords] = useState<string[]>([]);
  const [seoDescription, setSeoDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [addToolDialogOpen, setAddToolDialogOpen] = useState(false);
  
  const {
    searchTerm,
    setSearchTerm,
    displayTools,
    isLoading: isSearchLoading,
  } = useToolComparison();

  useEffect(() => {
    const fetchTools = async () => {
      const toolsParam = searchParams.get('tools');
      
      if (!toolsParam) {
        setTools([]);
        setIsLoading(false);
        return;
      }

      const toolIds = toolsParam.split(',');
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('ai_tools')
          .select('*')
          .in('id', toolIds);

        if (error) {
          console.error('Error fetching tools:', error);
          setTools([]);
          return;
        }

        const selectedTools = data.map(row => mapRowToAITool(row));
        setTools(selectedTools);

        // SEO Keywords and Description
        if (selectedTools.length > 0) {
          const toolNames = selectedTools.map(tool => tool.name).join(' vs ');
          const category = selectedTools[0].category[0];
          const pricing = selectedTools[0].pricing;

          const keywords = generateLocalSeoKeywords(toolNames, category, pricing);
          setSeoKeywords(keywords);

          const baseDescription = `Compare ${toolNames} and find the best AI tool for your needs.`;
          const description = generateLocalSeoDescription(toolNames, category, baseDescription);
          setSeoDescription(description);
        }
      } catch (err) {
        console.error('Error in fetchTools:', err);
        setTools([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTools();
  }, [searchParams]);

  const addTool = (newToolId: string) => {
    const currentToolIds = tools.map(tool => tool.id);
    if (!currentToolIds.includes(newToolId)) {
      const updatedToolIds = [...currentToolIds, newToolId];
      setSearchParams({ tools: updatedToolIds.join(',') });
    }
    setAddToolDialogOpen(false);
    setSearchTerm("");
  };

  const removeTool = (toolId: string) => {
    const updatedTools = tools.filter(tool => tool.id !== toolId);
    const updatedToolIds = updatedTools.map(tool => tool.id);
    
    if (updatedToolIds.length > 0) {
      setSearchParams({ tools: updatedToolIds.join(',') });
    } else {
      setSearchParams({});
    }
  };

  const replaceTool = (oldToolId: string, newToolId: string) => {
    const updatedToolIds = tools.map(tool => 
      tool.id === oldToolId ? newToolId : tool.id
    );
    setSearchParams({ tools: updatedToolIds.join(',') });
  };

  const clearTools = () => {
    setSearchParams({});
  };

  const getUniqueFeatures = (): string[] => {
    const allFeatures = tools.reduce((acc: string[], tool) => {
      if (tool.features && Array.isArray(tool.features)) {
        return [...acc, ...tool.features];
      }
      return acc;
    }, []);
    return [...new Set(allFeatures)];
  };

  const uniqueFeatures = getUniqueFeatures();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading comparison...</div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>AI Tool Comparison | AllAITools.tech</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords.join(', ')} />
      </Helmet>
      <ScrollToTop />
      <div className="container mx-auto py-8">
        <BreadcrumbNav customItems={[{ label: 'Compare Tools' }]} />
        <h1 className="text-3xl font-bold mb-4">AI Tool Comparison</h1>
        <p className="mb-4">Compare AI tools side-by-side to find the best solution for your needs.</p>

        {tools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool, index) => (
              <Card key={tool.id} className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center justify-between">
                    {tool.name}
                    <div className="flex items-center gap-2">
                      <ReplaceToolButton
                        toolId={tool.id}
                        onReplace={replaceTool}
                      />
                      <Button variant="outline" size="icon" onClick={() => removeTool(tool.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                      Visit Website <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <Badge>{tool.category[0]}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                  <div className="flex items-center mb-2">
                    <Star className="h-5 w-5 text-yellow-500 mr-1" />
                    <span>{tool.rating} ({tool.reviewCount} reviews)</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.features && tool.features.map((feature, i) => (
                      <Badge key={i} variant="secondary">{feature}</Badge>
                    ))}
                  </div>
                  <Separator className="my-2" />
                  <div>
                    <h3 className="text-md font-semibold mb-2">Key Features:</h3>
                    <ul className="list-disc list-inside text-sm">
                      {tool.features && tool.features.map((feature: string, i: number) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}

            {tools.length < 3 && (
              <Card className="shadow-md flex items-center justify-center">
                <CardContent className="flex items-center justify-center p-8">
                  <Dialog open={addToolDialogOpen} onOpenChange={setAddToolDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Tool to Compare
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Add Tool to Compare</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <SearchBar
                          searchTerm={searchTerm}
                          onSearchChange={setSearchTerm}
                          onClear={() => setSearchTerm("")}
                        />
                        <ToolGrid
                          tools={displayTools.filter(tool => !tools.some(selectedTool => selectedTool.id === tool.id))}
                          selectedTools={[]}
                          isLoading={isSearchLoading}
                          onToolSelect={addTool}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg mb-4">No tools selected for comparison. Add tools to compare.</p>
            <Dialog open={addToolDialogOpen} onOpenChange={setAddToolDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 mx-auto">
                  <Plus className="h-4 w-4" />
                  Add Tools to Compare
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add Tools to Compare</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onClear={() => setSearchTerm("")}
                  />
                  <ToolGrid
                    tools={displayTools}
                    selectedTools={[]}
                    isLoading={isSearchLoading}
                    onToolSelect={addTool}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {tools.length > 0 && (
          <div className="mt-8">
            <Button variant="destructive" onClick={clearTools}>Clear Comparison</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
