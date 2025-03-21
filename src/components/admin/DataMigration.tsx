
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { migrateToolsToSupabase, migrateNewToolsToSupabase, checkExistingTools, fetchCategories, fetchPricingOptions } from '@/utils/migrateToolsToSupabase';
import { AlertCircle, CheckCircle2, Database, Download, Upload, RefreshCw, List, Plus } from 'lucide-react';
import { aiTools } from '@/utils/toolsData';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from '../ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export function DataMigration() {
  const [checking, setChecking] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [migratingNew, setMigratingNew] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [pricingOptions, setPricingOptions] = useState<string[]>([]);
  const { toast } = useToast();
  const [status, setStatus] = useState<{
    message: string;
    type: 'info' | 'success' | 'error';
    count?: number;
  } | null>(null);

  useEffect(() => {
    // Check database status on component mount
    handleCheckData();
    // Load categories and pricing options
    loadCategoriesAndPricing();
  }, []);

  const loadCategoriesAndPricing = async () => {
    setLoadingCategories(true);
    try {
      const { categories: fetchedCategories } = await fetchCategories();
      const { pricingOptions: fetchedPricing } = await fetchPricingOptions();
      
      if (fetchedCategories) setCategories(fetchedCategories);
      if (fetchedPricing) setPricingOptions(fetchedPricing);
    } catch (error) {
      console.error('Error loading categories and pricing:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleCheckData = async () => {
    setChecking(true);
    setStatus({ message: 'Checking Supabase database...', type: 'info' });
    
    try {
      const result = await checkExistingTools();
      
      if (result.success) {
        if (result.isEmpty) {
          setStatus({ 
            message: 'Your Supabase database is empty and ready for migration.', 
            type: 'info',
            count: 0
          });
        } else {
          setStatus({ 
            message: `Found ${result.count} tools in your Supabase database.`, 
            type: 'success',
            count: result.count
          });
        }
      } else {
        setStatus({ 
          message: `Error checking database: ${result.error}`, 
          type: 'error' 
        });
      }
    } catch (error) {
      setStatus({ 
        message: `Exception: ${error instanceof Error ? error.message : String(error)}`, 
        type: 'error' 
      });
    } finally {
      setChecking(false);
    }
  };

  const handleMigrateData = async () => {
    setMigrating(true);
    setStatus({ message: 'Migrating data to Supabase...', type: 'info' });
    
    try {
      const result = await migrateToolsToSupabase();
      
      if (result.success) {
        setStatus({ 
          message: `Successfully migrated ${result.count} tools to Supabase!`, 
          type: 'success',
          count: result.count
        });
        toast({
          title: "Migration Successful",
          description: `${result.count} tools were migrated to Supabase.`
        });
        // Refresh the check after migration
        await handleCheckData();
      } else {
        setStatus({ 
          message: `Error migrating data: ${result.error}`, 
          type: 'error' 
        });
        toast({
          title: "Migration Failed",
          description: `Error: ${result.error}`,
          variant: "destructive"
        });
      }
    } catch (error) {
      setStatus({ 
        message: `Exception: ${error instanceof Error ? error.message : String(error)}`, 
        type: 'error' 
      });
      toast({
        title: "Migration Failed",
        description: `Exception: ${error instanceof Error ? error.message : String(error)}`,
        variant: "destructive"
      });
    } finally {
      setMigrating(false);
    }
  };

  const handleMigrateNewTools = async () => {
    setMigratingNew(true);
    setStatus({ message: 'Migrating new tools to Supabase...', type: 'info' });
    
    try {
      const result = await migrateNewToolsToSupabase();
      
      if (result.success) {
        setStatus({ 
          message: result.count > 0 
            ? `Successfully migrated ${result.count} new tools to Supabase!` 
            : 'No new tools to migrate. All tools already exist in the database.', 
          type: 'success',
          count: result.count
        });
        toast({
          title: result.count > 0 ? "New Tools Added" : "No New Tools",
          description: result.count > 0 
            ? `${result.count} new tools were added to Supabase.` 
            : 'All tools already exist in the database.'
        });
        // Refresh the check after migration
        await handleCheckData();
      } else {
        setStatus({ 
          message: `Error migrating new tools: ${result.error}`, 
          type: 'error' 
        });
        toast({
          title: "Migration Failed",
          description: `Error: ${result.error}`,
          variant: "destructive"
        });
      }
    } catch (error) {
      setStatus({ 
        message: `Exception: ${error instanceof Error ? error.message : String(error)}`, 
        type: 'error' 
      });
      toast({
        title: "Migration Failed",
        description: `Exception: ${error instanceof Error ? error.message : String(error)}`,
        variant: "destructive"
      });
    } finally {
      setMigratingNew(false);
    }
  };

  const handleExportData = async () => {
    setExporting(true);
    setStatus({ message: 'Exporting data from Supabase...', type: 'info' });
    
    try {
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      // Create a JSON file for download
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      // Create and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai_tools_export_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setStatus({ 
        message: `Successfully exported ${data.length} tools from Supabase!`, 
        type: 'success',
        count: data.length
      });
    } catch (error) {
      setStatus({ 
        message: `Error exporting data: ${error instanceof Error ? error.message : String(error)}`, 
        type: 'error' 
      });
    } finally {
      setExporting(false);
    }
  };

  return (
    <Tabs defaultValue="tools" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="tools">AI Tools</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
        <TabsTrigger value="pricing">Pricing Options</TabsTrigger>
      </TabsList>
      
      <TabsContent value="tools">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" /> 
              AI Tools Data Migration
            </CardTitle>
            <CardDescription>
              Manage your AI tools data between the static file and Supabase database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-md">
                <h3 className="font-medium mb-2">Static Data Status</h3>
                <p>You have {aiTools.length} tools in your static data file.</p>
              </div>
              
              {status && (
                <div className={`p-4 rounded-md flex items-start gap-3 ${
                  status.type === 'error' ? 'bg-destructive/10 text-destructive' : 
                  status.type === 'success' ? 'bg-green-100 text-green-800' : 
                  'bg-blue-100 text-blue-800'
                }`}>
                  {status.type === 'error' ? (
                    <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  ) : status.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Database className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p>{status.message}</p>
                    {status.type === 'success' && status.count !== undefined && (
                      <p className="text-sm mt-1">
                        {status.count === aiTools.length 
                          ? 'All tools have been successfully processed.'
                          : `Note: The count differs from your static data (${aiTools.length} tools).`
                        }
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-3">
            <Button 
              onClick={handleCheckData} 
              disabled={checking}
              variant="outline"
              className="flex-1 min-w-[120px]"
            >
              <Database className="w-4 h-4 mr-2" />
              {checking ? 'Checking...' : 'Check Database'}
            </Button>
            <Button 
              onClick={handleMigrateData} 
              disabled={migrating}
              variant="default"
              className="flex-1 min-w-[120px]"
            >
              <Upload className="w-4 h-4 mr-2" />
              {migrating ? 'Migrating...' : 'Migrate All Tools'}
            </Button>
            <Button 
              onClick={handleMigrateNewTools} 
              disabled={migratingNew}
              variant="secondary"
              className="flex-1 min-w-[120px]"
            >
              <Plus className="w-4 h-4 mr-2" />
              {migratingNew ? 'Migrating...' : 'Migrate New Tools'}
            </Button>
            <Button 
              onClick={handleExportData} 
              disabled={exporting}
              variant="secondary"
              className="flex-1 min-w-[120px]"
            >
              <Download className="w-4 h-4 mr-2" />
              {exporting ? 'Exporting...' : 'Export from Supabase'}
            </Button>
            <Button 
              onClick={loadCategoriesAndPricing} 
              disabled={loadingCategories}
              variant="ghost"
              className="flex-1 min-w-[120px]"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loadingCategories ? 'animate-spin' : ''}`} />
              Refresh Metadata
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="categories">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <List className="w-5 h-5" /> 
              Categories
            </CardTitle>
            <CardDescription>
              Manage categories for AI tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingCategories ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <TableRow key={category}>
                        <TableCell>{category}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={1} className="text-center py-4 text-muted-foreground">
                        No categories found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="pricing">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <List className="w-5 h-5" /> 
              Pricing Options
            </CardTitle>
            <CardDescription>
              Manage pricing options for AI tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingCategories ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pricingOptions.length > 0 ? (
                    pricingOptions.map((option) => (
                      <TableRow key={option}>
                        <TableCell>{option}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={1} className="text-center py-4 text-muted-foreground">
                        No pricing options found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
