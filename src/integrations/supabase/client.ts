import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Lanza un error explícito si las variables de entorno no están definidas
  throw new Error('Supabase URL o Anon Key no están definidas en las variables de entorno. Por favor, revisa tu archivo .env.local.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);