export interface FetchError extends Error {
  status?: number;
}

export const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    const message =
      errorData.message ||
      errorData.error ||
      "An error occurred while fetching the data.";

    const error: FetchError = new Error(message);
    error.status = res.status;

    throw error;
  }

  return res.json();
};
