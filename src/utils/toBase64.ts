export async function toBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      method: "GET",
    });
    if (!response.ok) {
      console.log(response);

      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString("base64");
    const contentType = response.headers.get("content-type");
    const dataUrl = `data:${contentType};base64,${base64String}`;
    return dataUrl;
  } catch (error) {
    console.error("Failed to convert image:", error);
    throw error;
  }
}
