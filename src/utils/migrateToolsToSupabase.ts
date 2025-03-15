
import { aiTools } from './toolsData';
import { supabase } from '@/integrations/supabase/client';

/**
 * This utility function can be used to migrate the static data from toolsData.ts
 * to a Supabase database table. Run this function once to populate your database.
 * 
 * To use this:
 * 1. Make sure your Supabase environment variables are set
 * 2. Create a 'ai_tools' table in Supabase with the correct schema
 * 3. Import and call this function from a component or console
 */
export async function migrateToolsToSupabase() {
  try {
    console.log('Starting migration of tools data to Supabase...');
    console.log(`Total tools to migrate: ${aiTools.length}`);

    // Prepare the data by transforming any fields if needed
    const toolsToMigrate = aiTools.map(tool => {
      // Convert createdAt from number to ISO string if it exists
      const transformed = {
        ...tool,
        createdAt: tool.createdAt ? new Date(tool.createdAt).toISOString() : null
      };
      return transformed;
    });

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
