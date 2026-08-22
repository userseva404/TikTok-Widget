export const calcExpire = (expires_in: number): string => {
  if (expires_in < 0) {
    throw new Error("Number cannot be less then 0");
  }

  const invalid_at_ms = Date.now() + expires_in * 1000;
  const invalid_at = new Date(invalid_at_ms).toISOString();
  return invalid_at;
};
