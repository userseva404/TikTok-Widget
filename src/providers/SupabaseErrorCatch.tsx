"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function SupabaseErrorCatch() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const error = searchParams.get("error");

    if (error) {
      if (searchParams.get("error_code") === "otp_expired") {
        toast.error(
          "Your email link has expired or was already used. Please sign in or request a new link.",
        );
      } else {
        toast.error("An authentication error occurred.");
      }
      router.replace("/");
    }
  }, [searchParams, router]);

  return null;
}
