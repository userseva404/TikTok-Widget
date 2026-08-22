"use client";

import { cn } from "@/utils/cn";
import { createClientBrowser } from "@/utils/supabase/client";
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "../ui/Button";

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
    <Button
      variant={"hollow"}
      size={"icon"}
      onClick={handleLogOUt}
      className={cn(className)}
    >
      <LogOut size={28} />
    </Button>
  );
}
