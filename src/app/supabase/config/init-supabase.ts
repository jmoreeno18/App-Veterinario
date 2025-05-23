import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

export const supabase: SupabaseClient = createClient(
  environment.SUPABASE_URL,
  environment.SUPABASE_KEY
);
