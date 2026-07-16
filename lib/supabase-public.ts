import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Anon Supabase client for the public instructor-site renderer. Both the
// `instructor_site` read and the `submit_enquiry` write are anon/public-safe
// (guarded by RLS + SECURITY DEFINER RPCs), so no cookies/SSR session is
// needed — a plain client with the public anon key is all we require.
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
