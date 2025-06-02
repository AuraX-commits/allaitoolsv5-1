import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, ExternalLink, Plus, X, ArrowRight } from 'lucide-react';
import { toolsData } from '@/utils/toolsData';
import { ReplaceToolButton } from '@/components/comparison/ReplaceToolButton';
import BreadcrumbNav from '@/components/common/BreadcrumbNav';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { Helmet } from 'react-helmet-async';
import { generateLocalSeoKeywords, generateLocalSeoDescription } from '@/utils/localSeoHelper';

interface Tool {
  id: string;
  name: string;
  description: string;
  categories: string[];
  pricing: string;
  url: string;
  rating: number;
  votes: number;
  tags: string[];
  featured: boolean;
  [key: string]: any;
}

const Compare: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tools, setTools] = useState<Tool[]>([]);
  const [seoKeywords, setSeoKeywords] = useState<string[]>([]);
  const [seoDescription, setSeoDescription] = useState<string>('');

  useEffect(() => {
    const tool1Id = searchParams.get('tool1');
    const tool2Id = searchParams.get('tool2');
    const tool3Id = searchParams.get('tool3');

    const selectedTools = [];

    if (tool1Id) {
      const tool1 = toolsData.find(tool => tool.id === tool1Id);
      if (tool1) {
        selectedTools.push(tool1);
      }
    }

    if (tool2Id) {
      const tool2 = toolsData.find(tool => tool.id === tool2Id);
      if (tool2) {
        selectedTools.push(tool2);
      }
    }

    if (tool3Id) {
      const tool3 = toolsData.find(tool => tool.id === tool3Id);
      if (tool3) {
        selectedTools.push(tool3);
      }
    }

    setTools(selectedTools);

    // SEO Keywords and Description
    if (selectedTools.length > 0) {
      const toolNames = selectedTools.map(tool => tool.name).join(' vs ');
      const category = selectedTools[0].categories[0];
      const pricing = selectedTools[0].pricing;

      const keywords = generateLocalSeoKeywords(toolNames, category, pricing);
      setSeoKeywords(keywords);

      const baseDescription = `Compare ${toolNames} and find the best AI tool for your needs.`;
      const description = generateLocalSeoDescription(toolNames, category, baseDescription);
      setSeoDescription(description);
    }
  }, [searchParams]);

  const addTool = () => {
    // Logic to add a tool, possibly navigating to a search page
    const currentToolIds = tools.map(tool => tool.id);
    setSearchParams({ tool1: currentToolIds[0], tool2: currentToolIds[1], tool3: 'search' });
  };

  const removeTool = (index: number) => {
    const updatedTools = [...tools];
    updatedTools.splice(index, 1);

    const params: { [key: string]: string | null } = {};
    updatedTools.forEach((tool, i) => {
      params[`tool${i + 1}`] = tool.id;
    });

    setSearchParams(params);
    setTools(updatedTools);
  };

  const clearTools = () => {
    setSearchParams({});
    setTools([]);
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
                    <Button variant="outline" size="icon" onClick={() => removeTool(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                      Visit Website <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <Badge>{tool.categories[0]}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                  <div className="flex items-center mb-2">
                    <Star className="h-5 w-5 text-yellow-500 mr-1" />
                    <span>{tool.rating} ({tool.votes} votes)</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.tags && tool.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary">{tag}</Badge>
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
                <CardContent className="flex items-center justify-center">
                  <ReplaceToolButton />
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg">No tools selected for comparison. Add tools to compare.</p>
            <ReplaceToolButton />
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
