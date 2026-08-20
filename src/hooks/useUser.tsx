"use client";

import { createClientBrowser } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type UserContext = {
  user: User | null;
};

const UserContext = createContext<UserContext>({
  user: null,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const supabaseClient = createClientBrowser();
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const initializeUser = async () => {
      const { data: user } = await supabaseClient.auth.getUser();
      setUser(user.user);
    };
    initializeUser();

    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
          router.refresh();
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user: user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser has to be used inside of UserProvider");
  }
  return context;
};
