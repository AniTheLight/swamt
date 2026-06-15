// Supabase project connection details.
// The publishable key is safe to expose in client-side code —
// access is controlled by the Row Level Security policies on each table.

const SUPABASE_URL = "https://gotjpxlmsnvqguhtjrtk.supabase.co";
const SUPABASE_KEY = "sb_publishable_a6RzXuWk5PDuUUq3lz9kEQ_gzMo2R8G";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
