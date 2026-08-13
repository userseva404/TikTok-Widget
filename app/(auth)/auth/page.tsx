"use client";

import { createClientBrowser } from "@/utils/supabase/client";
import { Auth } from "@supabase/auth-ui-react";

export default function pagAuth() {
  const client = createClientBrowser();

  return (
    <div className="flex justify-center items-center">
      <Auth supabaseClient={client} />
    </div>
  );
}
