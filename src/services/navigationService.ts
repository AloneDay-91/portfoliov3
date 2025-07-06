import { NavigationLink, ReorderUpdate } from "../types/navigation";
import Cookies from "js-cookie";
import { apiService, apiFetch } from "./apiService";

export class NavigationService {
  static async getAllLinks(): Promise<NavigationLink[]> {
    return await apiFetch(apiService.getNavigation(), {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  }

  static async getAllLinksPublic(): Promise<NavigationLink[]> {
    return await apiFetch(apiService.getNavigationPublic());
  }

  static async getLinksBySection(
    section: NavigationLink["section"]
  ): Promise<NavigationLink[]> {
    return await apiFetch(apiService.getNavigationBySection(section));
  }

  static async addLink(
    link: Omit<NavigationLink, "_id" | "createdAt" | "updatedAt">
  ): Promise<NavigationLink> {
    return await apiFetch(apiService.addNavigation(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(link),
    });
  }

  static async updateLink(
    id: string,
    updates: Partial<NavigationLink>
  ): Promise<NavigationLink> {
    return await apiFetch(apiService.updateNavigation(id), {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(updates),
    });
  }

  static async deleteLink(id: string): Promise<void> {
    await apiFetch(apiService.deleteNavigation(id), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  }

  static async reorderLinks(updates: ReorderUpdate[]): Promise<void> {
    await apiFetch(apiService.reorderNavigation(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify({ updates }),
    });
  }
}
