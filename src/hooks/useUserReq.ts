import { UserService } from "@/services/UserService";
import { TConnection } from "@/types";
import { toast } from "react-toastify";
import useSWR from "swr";

export const useUserConnections = () => {
  return useSWR<TConnection[]>("user-connections", UserService.getConnections);
};
