import { fetcher } from "@/lib/fetcher";
import { UserService } from "@/services/UserService";
import { TConnection } from "@/types";
import { toast } from "react-toastify";
import useSWR from "swr";

export const useUserConnections = () => {
  return useSWR<TConnection[]>("user-connections", UserService.getConnections, {
    onError: (error) => {
      if (error.status > 400 && error.status < 500) {
        toast.error("Cannot load users connections");
        console.log();
      }
    },
  });
};
