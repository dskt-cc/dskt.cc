import type { Mod, ModMeta } from "@types";

const GITHUB_RAW_URL = "https://raw.githubusercontent.com/dskt-cc/mods/main";

const fetchJSON = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

const convertToRawUrl = (
  githubUrl: string,
  filename: string,
  branch: string,
): string => {
  const matches = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!matches) {
    throw new Error("Invalid GitHub URL");
  }
  const [, username, repo] = matches;

  return `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${filename}`;
};

const fetchMods = async (): Promise<Mod[]> => {
  return fetchJSON<Mod[]>(`${GITHUB_RAW_URL}/mods.json`);
};

const fetchModMeta = async (repo: string): Promise<ModMeta> => {
  try {
    const mainUrl = convertToRawUrl(repo, "dskt.json", "main");
    try {
      return await fetchJSON<ModMeta>(mainUrl);
    } catch  {
      const masterUrl = convertToRawUrl(repo, "dskt.json", "master");
      return await fetchJSON<ModMeta>(masterUrl);
    }
  } catch (error) {
    console.error(
      "Failed to fetch mod metadata from both main and master branches:",
      error,
    );
    throw error;
  }
};

export { fetchMods, fetchModMeta };
