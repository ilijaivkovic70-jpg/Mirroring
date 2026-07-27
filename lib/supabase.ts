import { createBrowserClient } from "@supabase/ssr";

// Konekcija ka Supabase-u za koriscenje u pregledacu (client komponente).
// Koristi iskljucivo javni "anon" kljuc - "service_role" kljuc nikad ne sme da se pojavi ovde.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
