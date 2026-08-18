import { createClientBrowser } from "@/utils/supabase/client";

export class UserService {
  static getConnections = async () => {
    const client = createClientBrowser();
    const { data, error } = await client.from("connections").select("*");
    if (error) throw error;
    return data;
  };
}
