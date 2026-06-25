import { createClient } from "@supabase/supabase-js";

let supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables.");
}

// Sanitize URL: strip trailing slash or "/rest/v1/" suffix
supabaseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
