import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/database.types";
import { fetcher } from "@/lib/fetcher";

export function createClientBrowser() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      global: {
        fetch: fetcher,
      },
    },
  );
}
