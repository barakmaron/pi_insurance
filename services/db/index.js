import { createClient } from '@supabase/supabase-js';
const options = {
    schema: 'public',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  };

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPBASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    options
);

export default supabaseAdmin;