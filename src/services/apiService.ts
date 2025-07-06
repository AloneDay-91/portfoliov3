// Service centralisé pour les appels API
import Cookies from "js-cookie";

const getApiBaseUrl = () => {
  const base = import.meta.env.VITE_API_URL || "http://localhost:3001";
  return `${base.replace(/\/$/, "")}/api`;
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

  // Resources
  getResources: () => `${getApiBaseUrl()}/resources`,
  getResourcesByCategory: (category: string) =>
    `${getApiBaseUrl()}/resources/category/${category}`,
  addResource: () => `${getApiBaseUrl()}/resources`,
  updateResource: (id: string) => `${getApiBaseUrl()}/resources/${id}`,
  deleteResource: (id: string) => `${getApiBaseUrl()}/resources/${id}`,
  reorderResources: () => `${getApiBaseUrl()}/resources/reorder`,

  // Auth
  login: () => `${getApiBaseUrl()}/login`,
  register: () => `${getApiBaseUrl()}/register`,
  me: () => `${getApiBaseUrl()}/me`,

  // Config
  getConfig: () => `${getApiBaseUrl()}/config`,

  // Cards (Projets)
  getCards: () => `${getApiBaseUrl()}/cards`,
  getCard: (id: string) => `${getApiBaseUrl()}/cards/${id}`,
  addCard: () => `${getApiBaseUrl()}/cards`,
  updateCard: (id: string) => `${getApiBaseUrl()}/cards/${id}`,
  deleteCard: (id: string) => `${getApiBaseUrl()}/cards/${id}`,

  // Test routes
  test: () => `${getApiBaseUrl()}/test`,
  testPrisma: () => `${getApiBaseUrl()}/test-prisma`,
  testEnv: () => `${getApiBaseUrl()}/test-env`,
  testSites: () => `${getApiBaseUrl()}/test-sites`,
};

// Fonction utilitaire pour les appels fetch avec gestion d'erreurs
export const apiFetch = async (url: string, options?: RequestInit) => {
  try {
    // Récupérer le token d'authentification
    const token = Cookies.get("token");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Ajouter les headers personnalisés s'ils existent
    if (options?.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        if (typeof value === "string") {
          headers[key] = value;
        }
      });
    }

    // Ajouter le token d'authentification si disponible
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
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
