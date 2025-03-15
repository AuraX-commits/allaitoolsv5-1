
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { migrateToolsToSupabase, checkExistingTools } from '@/utils/migrateToolsToSupabase';
import { AlertCircle, CheckCircle2, Database, Download, Upload } from 'lucide-react';
import { aiTools } from '@/utils/toolsData';
import { supabase } from '@/lib/supabaseClient';

export function DataMigration() {
  const [checking, setChecking] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [status, setStatus] = useState<{
    message: string;
    type: 'info' | 'success' | 'error';
    count?: number;
  } | null>(null);

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
      } else {
        setStatus({ 
          message: `Error migrating data: ${result.error}`, 
          type: 'error' 
        });
      }
    } catch (error) {
      setStatus({ 
        message: `Exception: ${error instanceof Error ? error.message : String(error)}`, 
        type: 'error' 
      });
    } finally {
      setMigrating(false);
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
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" /> 
          Supabase Data Migration
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
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={handleCheckData} 
          disabled={checking}
          variant="outline"
          className="w-full sm:w-auto"
        >
          <Database className="w-4 h-4 mr-2" />
          {checking ? 'Checking...' : 'Check Database'}
        </Button>
        <Button 
          onClick={handleMigrateData} 
          disabled={migrating}
          variant="default"
          className="w-full sm:w-auto"
        >
          <Upload className="w-4 h-4 mr-2" />
          {migrating ? 'Migrating...' : 'Migrate to Supabase'}
        </Button>
        <Button 
          onClick={handleExportData} 
          disabled={exporting}
          variant="secondary"
          className="w-full sm:w-auto"
        >
          <Download className="w-4 h-4 mr-2" />
          {exporting ? 'Exporting...' : 'Export from Supabase'}
        </Button>
      </CardFooter>
    </Card>
  );
}
