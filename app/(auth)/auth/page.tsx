"use client";

import { createClientBrowser } from "@/utils/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useLayoutEffect } from "react";

function AuthContent() {
  const client = createClientBrowser();
  const router = useRouter();

  const searchParams = useSearchParams();

  useLayoutEffect(() => {
    const handleEmailConfirmation = async () => {
      const code = searchParams.get("code");
      if (code) {
        const { error } = await client.auth.exchangeCodeForSession(code);
        if (!error) {
          router.push("/");
        } else {
          console.error("Error exchanging code for session:", error.message);
        }
      }
    };

    handleEmailConfirmation();
  }, [router, searchParams, client]);

  return (
    <div className="flex justify-center items-center">
      <Auth supabaseClient={client} />
    </div>
  );
}

export default function PageAuth() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center">Loading...</div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
