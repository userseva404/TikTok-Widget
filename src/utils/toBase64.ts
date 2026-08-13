export async function toBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
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
