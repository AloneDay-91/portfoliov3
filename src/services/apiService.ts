// Service centralisé pour les appels API
const getApiBaseUrl = () => {
  // En développement, utiliser le proxy Vite
  if (import.meta.env.DEV) {
    return "/api";
  }

  // En production, utiliser l'URL du backend Vercel
  return "https://backend-portfolio-brown.vercel.app/api";
};

export const apiService = {
  // Site Status
  getSiteStatus: () => `${getApiBaseUrl()}/site-status`,
  postSiteStatus: () => `${getApiBaseUrl()}/site-status`,
  addSite: () => `${getApiBaseUrl()}/site-status/site`,
  editSite: (url: string) =>
    `${getApiBaseUrl()}/site-status/site/${encodeURIComponent(url)}`,
  deleteSite: (url: string) =>
    `${getApiBaseUrl()}/site-status/site/${encodeURIComponent(url)}`,
  checkSiteStatus: (url: string) =>
    `${getApiBaseUrl()}/site-status/site/${encodeURIComponent(url)}/check`,

  // Navigation
  getNavigation: () => `${getApiBaseUrl()}/navigation`,
  getNavigationPublic: () => `${getApiBaseUrl()}/navigation/public`,
  getNavigationBySection: (section: string) =>
    `${getApiBaseUrl()}/navigation/${section}`,
  addNavigation: () => `${getApiBaseUrl()}/navigation`,
  updateNavigation: (id: string) => `${getApiBaseUrl()}/navigation/${id}`,
  deleteNavigation: (id: string) => `${getApiBaseUrl()}/navigation/${id}`,
  reorderNavigation: () => `${getApiBaseUrl()}/navigation/reorder`,

  // Auth
  login: () => `${getApiBaseUrl()}/login`,
  register: () => `${getApiBaseUrl()}/register`,
  me: () => `${getApiBaseUrl()}/me`,

  // Config
  getConfig: () => `${getApiBaseUrl()}/config`,

  // Test routes
  test: () => `${getApiBaseUrl()}/test`,
  testPrisma: () => `${getApiBaseUrl()}/test-prisma`,
  testEnv: () => `${getApiBaseUrl()}/test-env`,
  testSites: () => `${getApiBaseUrl()}/test-sites`,
};

// Fonction utilitaire pour les appels fetch avec gestion d'erreurs
export const apiFetch = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
