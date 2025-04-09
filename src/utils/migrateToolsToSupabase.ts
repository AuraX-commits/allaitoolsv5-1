
import { AITool, mapAIToolToRow } from './toolsData';
import { supabase } from '@/lib/supabaseClient';

/**
 * This utility function can be used to migrate tool data to a Supabase database table.
 * It expects an array of tools to be provided.
 * 
 * To use this:
 * 1. Make sure your Supabase environment variables are set
 * 2. Create a 'ai_tools' table in Supabase with the correct schema
 * 3. Import and call this function from a component
 */
export async function migrateToolsToSupabase(tools: AITool[] = []) {
  try {
    console.log('Starting migration of tools data to Supabase...');
    console.log(`Total tools to migrate: ${tools.length}`);

    if (tools.length === 0) {
      console.log('No tools to migrate. Please provide an array of tools.');
      return { success: false, error: 'No tools provided for migration' };
    }

    // Map tools to the database schema format
    const toolsToMigrate = tools.map(tool => mapAIToolToRow(tool));

    const { data, error } = await supabase
      .from('ai_tools')
      .insert(toolsToMigrate)
      .select();

    if (error) {
      console.error('Error migrating data to Supabase:', error);
      return { success: false, error };
    }

    console.log('Migration successful!', data);
    return { success: true, count: data?.length || 0 };
  } catch (error) {
    console.error('Exception during migration:', error);
    return { success: false, error };
  }
}

/**
 * This function adds new tools to the Supabase database without duplicating existing ones.
 * It checks each tool by ID and only inserts those that don't already exist.
 */
export async function migrateNewToolsToSupabase(toolsToAdd: AITool[] = []) {
  try {
    console.log('Starting migration of new tools to Supabase...');
    
    if (toolsToAdd.length === 0) {
      console.log('No tools to migrate. Please provide an array of tools.');
      return { success: false, error: 'No tools provided for migration' };
    }
    
    // Get existing tool IDs from Supabase
    const { data: existingTools, error: fetchError } = await supabase
      .from('ai_tools')
      .select('id');
      
    if (fetchError) {
      console.error('Error fetching existing tools:', fetchError);
      return { success: false, error: fetchError };
    }
    
    const existingIds = new Set(existingTools?.map(tool => tool.id) || []);
    
    // Filter out tools that already exist in the database
    const newTools = toolsToAdd.filter(tool => !existingIds.has(tool.id));
    
    if (newTools.length === 0) {
      console.log('No new tools to migrate. All tools already exist in the database.');
      return { success: true, count: 0 };
    }
    
    console.log(`Found ${newTools.length} new tools to migrate.`);
    
    // Map new tools to the database schema format
    const newToolsToMigrate = newTools.map(tool => mapAIToolToRow(tool));
    
    // Insert new tools
    const { data, error } = await supabase
      .from('ai_tools')
      .insert(newToolsToMigrate)
      .select();
      
    if (error) {
      console.error('Error migrating new tools to Supabase:', error);
      return { success: false, error };
    }
    
    console.log('New tools migration successful!', data);
    return { success: true, count: data?.length || 0 };
  } catch (error) {
    console.error('Exception during new tools migration:', error);
    return { success: false, error };
  }
}

/**
 * Utility to check if data already exists in Supabase
 */
export async function checkExistingTools() {
  const { data, error, count } = await supabase
    .from('ai_tools')
    .select('*', { count: 'exact' });

  if (error) {
    console.error('Error checking Supabase data:', error);
    return { success: false, error };
  }

  return { 
    success: true, 
    count: count || 0,
    isEmpty: count === 0,
    data
  };
}

/**
 * Utility to fetch categories from the Supabase database
 */
export async function fetchCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('name')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return { success: false, error };
  }

  return {
    success: true,
    categories: data?.map(category => category.name) || []
  };
}

/**
 * Utility to fetch pricing options from the Supabase database
 */
export async function fetchPricingOptions() {
  const { data, error } = await supabase
    .from('pricing_options')
    .select('name')
    .order('name');

  if (error) {
    console.error('Error fetching pricing options:', error);
    return { success: false, error };
  }

  return {
    success: true,
    pricingOptions: data?.map(option => option.name) || []
  };
}
