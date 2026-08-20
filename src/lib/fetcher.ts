import { toast } from "react-toastify";

export interface FetchError extends Error {
  status?: number;
}

export const fetcher = async (
  ...args: Parameters<typeof fetch>
): Promise<Response> => {
  const res = await fetch(...args);

  if (!res.ok) {
    const clone = res.clone();
    const errorData = await clone.json().catch(() => ({}));

    const message =
      errorData.message ||
      errorData.error_description ||
      errorData.error ||
      "An error occurred while fetching the data.";

    const error: FetchError = new Error(message);
    error.status = res.status;
    if (error.status > 400 && error.status < 500) {
      toast.error(error.message);
    }
    throw error;
  }
  return res;
};

export const swrFetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetcher(...args);
  return res.json();
};
