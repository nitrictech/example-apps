import { Site } from "../resources";

export const statusCheck = async (url: string): Promise<Site> => {
  const now = new Date().toISOString();
  const formattedUrl =
    url.startsWith("http:") || url.startsWith("https:")
      ? url
      : `https://${url}`;

  try {
    const response = await fetch(formattedUrl);

    return { up: response.status < 400, url, lastChecked: now };
  } catch (error) {
    return { up: false, url, lastChecked: now };
  }
};
