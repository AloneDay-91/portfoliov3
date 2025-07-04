import React, { useState, useEffect } from "react";
import { NavigationLink } from "../types/navigation";
import { NavigationService } from "../services/navigationService";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { MagicCard } from "@/components/magicui/magic-card.tsx";
import { cn } from "@/lib/utils";
import {
  ComponentBooleanIcon,
  FileIcon,
  FrameIcon,
  Half2Icon,
  LockClosedIcon,
  StackIcon,
  TextIcon,
} from "@radix-ui/react-icons";
import { ScanQrCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DynamicNavbarProps {
  className?: string;
}

// Mapping des icônes par nom
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } =
  {
    Half2Icon: Half2Icon,
    FileIcon: FileIcon,
    FrameIcon: FrameIcon,
    LockClosedIcon: LockClosedIcon,
    StackIcon: StackIcon,
    TextIcon: TextIcon,
    ScanQrCode: ScanQrCode,
    ComponentBooleanIcon: ComponentBooleanIcon,
  };

// Composant ListItem pour les liens
interface ListItemProps extends React.ComponentPropsWithoutRef<"li"> {
  children: React.ReactNode;
  isComingSoon?: boolean;
  className?: string;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, children, isComingSoon, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(
          "flex flex-row items-start gap-3 group rounded-md p-2 transition-colors",
          isComingSoon &&
            "opacity-50 pointer-events-none select-none grayscale",
          className
        )}
        {...props}
      >
        <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-muted-foreground focus:bg-accent focus:text-accent-foreground group">
          <div className="line-clamp-2 text-sm leading-snug flex items-center gap-2 hover:text-muted-foreground transition duration-200">
            {children}
          </div>
        </div>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

const ListItem2 = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, children, isComingSoon, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(
          "flex flex-col items-start gap-3 group rounded-md p-2 transition-colors",
          isComingSoon &&
            "opacity-50 pointer-events-none select-none grayscale",
          className
        )}
        {...props}
      >
        <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-muted-foreground focus:bg-accent focus:text-accent-foreground group">
          <div className="line-clamp-2 text-sm leading-snug hover:text-muted-foreground transition duration-200">
            {children}
          </div>
        </div>
      </li>
    );
  }
);
ListItem2.displayName = "ListItem2";

export default function DynamicNavbar({
  className = "flex",
}: DynamicNavbarProps) {
  const [navigationData, setNavigationData] = useState<{
    [key: string]: NavigationLink[];
  }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNavigationData();
  }, []);

  // Écouter les événements de mise à jour de la navigation
  useEffect(() => {
    const handleNavigationUpdate = () => {
      loadNavigationData();
    };

    window.addEventListener("navigation-updated", handleNavigationUpdate);

    // Nettoyer l'écouteur d'événement
    return () => {
      window.removeEventListener("navigation-updated", handleNavigationUpdate);
    };
  }, []);

  const loadNavigationData = async () => {
    try {
      setLoading(true);

      // Récupérer tous les liens en une seule requête publique
      const allLinks = await NavigationService.getAllLinksPublic();

      // Grouper par section
      const data: { [key: string]: NavigationLink[] } = {};
      allLinks.forEach((link) => {
        if (!data[link.section]) {
          data[link.section] = [];
        }
        data[link.section].push(link);
      });

      setNavigationData(data);
    } catch (error) {
      console.error("Erreur lors du chargement de la navigation:", error);
      setNavigationData({});
    } finally {
      setLoading(false);
    }
  };

  const getSectionTitle = (sectionId: string): string => {
    const titles: { [key: string]: string } = {
      "mes-outils": "Mes outils",
      "a-propos": "A propos",
      contact: "Contact",
      autre: "Autre",
    };
    return titles[sectionId] || sectionId;
  };

  const renderLink = (link: NavigationLink) => {
    const isExternal = link.url.startsWith("http");
    const IconComponent = link.icon ? iconMap[link.icon] : null;

    const linkContent = (
      <ListItem
        title={link.title}
        className="flex flex-row items-start gap-3 group"
      >
        <span className="rounded border border-muted transition-colors group-hover:bg-muted">
          {IconComponent ? (
            <IconComponent className="max-w-8 w-full h-full p-2" />
          ) : (
            <span className="h-7 w-7" />
          )}
        </span>
        <span className="flex flex-col">
          <span className="flex items-center gap-2 font-medium text-sm leading-none hover:text-muted-foreground">
            {link.title}
            {isExternal && <ExternalLink className="w-3 h-3" />}
            {/* Badge personnalisé */}
            {link.showBadge &&
              link.createdAt &&
              new Date(link.createdAt) >
                new Date(
                  Date.now() - (link.badgeDuration || 14) * 24 * 60 * 60 * 1000
                ) && (
                <Badge variant="default" className="ml-2">
                  {link.badgeText || "Nouveau"}
                </Badge>
              )}
          </span>
          <span className="text-sm text-muted-foreground">
            {link.description || "Lien"}
          </span>
        </span>
      </ListItem>
    );

    if (isExternal) {
      return (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {linkContent}
        </a>
      );
    }

    return (
      <Link key={link.id} to={link.url} className="block">
        {linkContent}
      </Link>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
      </div>
    );
  }

  return (
    <div className={className}>
      {Object.entries(navigationData).map(([sectionId, links]) => {
        if (links.length === 0) return null;

        // Section "À propos" avec layout spécial
        if (sectionId === "a-propos" && links.length > 0) {
          return (
            <NavigationMenuItem key={sectionId} className="hidden md:flex">
              <NavigationMenuTrigger>
                {getSectionTitle(sectionId)}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild className="border">
                      <MagicCard>
                        <Link
                          to="/about"
                          className={cn(
                            "flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md",
                            "bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)]",
                            "dark:bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)]",
                            "bg-[size:14px_24px]"
                          )}
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            À propos
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Découvrez mon parcours, mes compétences et mes
                            projets.
                          </p>
                        </Link>
                      </MagicCard>
                    </NavigationMenuLink>
                  </li>
                  {links.map((link) => (
                    <Link key={link.id} to={link.url}>
                      <ListItem2 className="flex flex-col">
                        <span className="flex items-center gap-2 font-medium text-sm leading-none hover:text-muted-foreground">
                          {link.title}
                          {/* Badge personnalisé pour la section À propos */}
                          {link.showBadge &&
                            link.createdAt &&
                            new Date(link.createdAt) >
                              new Date(
                                Date.now() -
                                  (link.badgeDuration || 14) *
                                    24 *
                                    60 *
                                    60 *
                                    1000
                              ) && (
                              <Badge variant="default" className="ml-2">
                                {link.badgeText || "Nouveau"}
                              </Badge>
                            )}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {link.description}
                        </span>
                      </ListItem2>
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        }

        // Section "Mes outils" avec layout en grille
        if (sectionId === "mes-outils" && links.length > 0) {
          return (
            <NavigationMenuItem key={sectionId} className="hidden md:flex">
              <NavigationMenuTrigger>
                {getSectionTitle(sectionId)}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] p-4 md:w-[500px] md:grid-cols-2 lg:w-max">
                  {links.map((link) => renderLink(link))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        }

        // Autres sections avec dropdown simple
        if (links.length === 1) {
          const link = links[0];
          const isExternal = link.url.startsWith("http");

          return (
            <NavigationMenuItem key={sectionId} className="hidden md:flex">
              {isExternal ? (
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {link.title}
                  </NavigationMenuLink>
                </a>
              ) : (
                <Link to={link.url}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {link.title}
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          );
        }

        // Plusieurs liens dans une section
        return (
          <NavigationMenuItem key={sectionId} className="hidden md:flex">
            <NavigationMenuTrigger>
              {getSectionTitle(sectionId)}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] p-4 md:w-[500px] md:grid-cols-2 lg:w-max">
                {links.map((link) => renderLink(link))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        );
      })}
    </div>
  );
}
