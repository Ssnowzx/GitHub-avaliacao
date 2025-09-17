// githubProfileService.ts
// Serviço para buscar dados reais de um perfil do GitHub

export interface GitHubProfileData {
  username: string;
  name?: string;
  bio?: string;
  blog?: string;
  location?: string;
  email?: string;
  avatar_url?: string;
  public_repos: number;
  pinned_repos: Array<{
    name: string;
    description?: string;
    language?: string;
    license?: string;
    hasReadme: boolean;
    hasWorkflow: boolean;
    topics: string[];
  }>;
}

// Busca dados básicos do perfil
export async function fetchGitHubProfile(username: string): Promise<any> {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) throw new Error("Perfil não encontrado");
  return await res.json();
}

// Busca repositórios fixados (pinned) usando a API do GitHub GraphQL
export async function fetchPinnedRepos(username: string): Promise<any[]> {
  const query = `
    query {
      user(login: "${username}") {
        pinnedItems(first: 6, types: [REPOSITORY]) {
          nodes {
            ... on Repository {
              name
              description
              primaryLanguage { name }
              licenseInfo { name }
              url
              repositoryTopics(first: 10) { nodes { topic { name } } }
              object(expression: "HEAD:README.md") { ... on Blob { text } }
              hasReadme: object(expression: "HEAD:README.md") { ... on Blob { id } }
              hasWorkflow: object(expression: "HEAD:.github/workflows") { ... on Tree { id } }
            }
          }
        }
      }
    }
  `;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Authorization': `Bearer <YOUR_GITHUB_TOKEN>` // opcional para evitar rate limit
    },
    body: JSON.stringify({ query }),
  });
  const data = await res.json();
  return data.data.user.pinnedItems.nodes;
}

// Função principal para compilar os dados do perfil
export async function getFullGitHubProfile(
  username: string
): Promise<GitHubProfileData> {
  const profile = await fetchGitHubProfile(username);
  let pinned = [];
  try {
    pinned = await fetchPinnedRepos(username);
  } catch {}
  return {
    username,
    name: profile.name,
    bio: profile.bio,
    blog: profile.blog,
    location: profile.location,
    email: profile.email,
    avatar_url: profile.avatar_url,
    public_repos: profile.public_repos,
    pinned_repos: pinned.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      language: repo.primaryLanguage?.name,
      license: repo.licenseInfo?.name,
      hasReadme: !!repo.hasReadme,
      hasWorkflow: !!repo.hasWorkflow,
      topics: repo.repositoryTopics?.nodes?.map((t: any) => t.topic.name) || [],
    })),
  };
}
