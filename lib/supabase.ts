import { createClient } from '@supabase/supabase-js';

// Validate Supabase configuration
function validateSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      '❌ Supabase credentials are not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.',
    );
  }

  if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
    throw new Error(
      '❌ Invalid NEXT_PUBLIC_SUPABASE_URL. Must be a valid URL starting with http:// or https://',
    );
  }

  return { supabaseUrl, supabaseAnonKey };
}

// Get validated config
let supabaseConfig: { supabaseUrl: string; supabaseAnonKey: string };
try {
  supabaseConfig = validateSupabaseConfig();
} catch (error) {
  // In development, log error but allow app to start (for pages that don't need auth)
  if (process.env.NODE_ENV === 'development') {
    console.error(error instanceof Error ? error.message : 'Supabase configuration error');
  } else {
    // In production, throw to prevent app from starting with invalid config
    throw error;
  }
  // Fallback values (will cause errors if actually used)
  supabaseConfig = {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  };
}

export const supabase = createClient(supabaseConfig.supabaseUrl, supabaseConfig.supabaseAnonKey);
