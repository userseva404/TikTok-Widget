"use client"

import { cn } from "@/utils/cn";
import { createClientBrowser } from "@/utils/supabase/client";
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";

interface Props {
  className?: string;
}

export function LogOutBtn({ className = "" }: Props) {
  const client = createClientBrowser();

  const handleLogOUt = async () => {
    const { error } = await client.auth.signOut();
    if (error) {
      toast.error("Error while signing out");
    }
  };

  return (
    <button
      onClick={handleLogOUt}
      className={cn(
        "stroke-text-primary  interact:bg-primary-hover/15 border border-transparent interact:border-border p-2 rounded-xl",
        className,
      )}
    >
      <LogOut size={28} />
    </button>
  );
}
