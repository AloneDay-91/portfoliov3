import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { apiService, apiFetch } from "@/services/apiService";
import {
  FolderOpen,
  Link,
  Navigation,
  Activity,
  AlertCircle,
} from "lucide-react";

interface DashboardStats {
  cards: {
    total: number;
    active: number;
    inactive: number;
  };
  resources: {
    total: number;
    active: number;
    inactive: number;
  };
  navigation: {
    total: number;
    public: number;
    private: number;
  };
  siteStatus: {
    total: number;
    online: number;
    offline: number;
    uptime: number;
  };
}

interface CardData {
  active?: boolean;
}

interface ResourceData {
  active?: boolean;
}

interface NavigationData {
  public?: boolean;
}

interface SiteData {
  name: string;
  history: string[];
  lastChecked: string;
}

function StatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </div>
          <CardContent>
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-3 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function OverviewRenderDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        setError(null);

        // Récupérer toutes les données en parallèle
        const [cardsData, resourcesData, navigationData, siteStatusData] =
          await Promise.all([
            apiFetch(apiService.getCards()).catch(() => []),
            apiFetch(apiService.getResources()).catch(() => ({})),
            apiFetch(apiService.getNavigation()).catch(() => []),
            apiFetch(apiService.getSiteStatus()).catch(() => ({ sites: [] })),
          ]);

        // Calculer les statistiques
        const cardsStats = {
          total: Array.isArray(cardsData) ? cardsData.length : 0,
          active: Array.isArray(cardsData)
            ? cardsData.filter((card: CardData) => card.active !== false).length
            : 0,
          inactive: Array.isArray(cardsData)
            ? cardsData.filter((card: CardData) => card.active === false).length
            : 0,
        };

        const resourcesStats = {
          total: Object.keys(resourcesData).length,
          active: Object.values(resourcesData).filter(
            (r) => (r as ResourceData).active !== false
          ).length,
          inactive: Object.values(resourcesData).filter(
            (r) => (r as ResourceData).active === false
          ).length,
        };

        const navigationStats = {
          total: Array.isArray(navigationData) ? navigationData.length : 0,
          public: Array.isArray(navigationData)
            ? navigationData.filter(
                (nav: NavigationData) => nav.public !== false
              ).length
            : 0,
          private: Array.isArray(navigationData)
            ? navigationData.filter(
                (nav: NavigationData) => nav.public === false
              ).length
            : 0,
        };

        const siteStatusStats = {
          total: Object.keys(siteStatusData).length,
          online: Object.values(siteStatusData).filter((site) => {
            // Vérifier le dernier statut dans l'historique
            const siteData = site as SiteData;
            return (
              Array.isArray(siteData.history) &&
              siteData.history.length > 0 &&
              siteData.history[siteData.history.length - 1] === "online"
            );
          }).length,
          offline: Object.values(siteStatusData).filter((site) => {
            // Vérifier le dernier statut dans l'historique
            const siteData = site as SiteData;
            return (
              Array.isArray(siteData.history) &&
              siteData.history.length > 0 &&
              siteData.history[siteData.history.length - 1] === "offline"
            );
          }).length,
          uptime:
            Object.keys(siteStatusData).length > 0
              ? Math.round(
                  (Object.values(siteStatusData).filter((site) => {
                    const siteData = site as SiteData;
                    return (
                      Array.isArray(siteData.history) &&
                      siteData.history.length > 0 &&
                      siteData.history[siteData.history.length - 1] === "online"
                    );
                  }).length /
                    Object.keys(siteStatusData).length) *
                    100
                )
              : 0,
        };

        setStats({
          cards: cardsStats,
          resources: resourcesStats,
          navigation: navigationStats,
          siteStatus: siteStatusStats,
        });
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques:", error);
        setError("Impossible de charger les statistiques");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="mt-6">
        <div className="text-left text-muted-foreground">
          <div className="flex flex-col gap-2 my-6">
            <h2 className="text-lg font-normal">Vue d'ensemble</h2>
          </div>
        </div>
        <StatsSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6">
        <div className="text-left text-muted-foreground">
          <div className="flex flex-col gap-2 my-6">
            <h2 className="text-lg font-normal">Vue d'ensemble</h2>
          </div>
        </div>
        <Card>
          <CardContent className="flex items-center justify-center p-6">
            <div className="flex items-center gap-2 text-red-500">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="text-left text-muted-foreground">
        <div className="flex flex-col gap-2 my-6">
          <h2 className="text-lg font-normal">Vue d'ensemble</h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
            <h3 className="text-sm font-medium">Projets</h3>
            <FolderOpen className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.cards.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.cards.active || 0} actifs, {stats?.cards.inactive || 0}{" "}
              inactifs
            </p>
          </CardContent>
        </Card>

        <Card>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
            <h3 className="text-sm font-medium">Ressources</h3>
            <Link className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.resources.total || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.resources.active || 0} actives,{" "}
              {stats?.resources.inactive || 0} inactives
            </p>
          </CardContent>
        </Card>

        <Card>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
            <h3 className="text-sm font-medium">Navigation</h3>
            <Navigation className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.navigation.total || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.navigation.public || 0} publiques,{" "}
              {stats?.navigation.private || 0} privées
            </p>
          </CardContent>
        </Card>

        <Card>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
            <h3 className="text-sm font-medium">Sites surveillés</h3>
            <Activity className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.siteStatus.total || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.siteStatus.online || 0} en ligne,{" "}
              {stats?.siteStatus.offline || 0} hors ligne
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Garder l'export pour la compatibilité
// eslint-disable-next-line react-refresh/only-export-components
export const renderOverviewTab = () => <OverviewRenderDashboard />;
