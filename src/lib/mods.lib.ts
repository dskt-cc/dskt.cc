import type { Mod, ModMeta } from "@types";

const GITHUB_RAW_URL = "https://raw.githubusercontent.com/dskt-cc/mods/main";

const fetchJSON = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(endpoint);
  if (!response.ok) {
    return Promise.reject();
  }
  const text = await response.text();
  return JSON.parse(text);
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

// @TODO: this should probably have error handling, but in a way that dosent log 404 when main is called master
const fetchModMeta = async (repo: string): Promise<ModMeta> => {
  try {
    return await fetchJSON<ModMeta>(convertToRawUrl(repo, "dskt.json", "main"));
  } catch {
    return await fetchJSON<ModMeta>(
      convertToRawUrl(repo, "dskt.json", "master"),
    );
  }
};

export { fetchMods, fetchModMeta };
