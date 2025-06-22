"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge"
import {MagicCard} from "@/components/magicui/magic-card.tsx";
import {ComponentBooleanIcon, FileIcon, FrameIcon, Half2Icon, StackIcon} from "@radix-ui/react-icons";
import {ScanQrCode} from "lucide-react";

const components = [
    {
        icon: Half2Icon,
        title: "StatusPage",
        href: "https://status.elouanb.fr/",
        description: "Surveillance des services.",
    },
    {
        icon: FileIcon,
        title: "Ressource Web",
        href: "/ressources",
        description: "Une collection de ressources.",
        isNew: true,
        textBadge: "Nouveau",
    },
    {
        icon: ScanQrCode,
        title: "Générateur de QR Code",
        href: "/qrgenerator",
        description: "Un générateur de QR Code.",
    },
    {
        icon: StackIcon,
        title: "Collection backgrounds",
        href: "https://bg.elouanb.fr",
        description: "Une collection de backgrounds ",
        isNew: true,
        textBadge: "Nouveau",
    },
    {
        icon: FrameIcon,
        title: "Design System",
        href: "https://design.elouanb.fr/",
        description: "Un design system pour composants.",
        isNew: true,
        textBadge: "Bientôt",
    },
]

export function Navbar() {
    return (
        <NavigationMenu className="flex items-center justify-between w-full">
            <NavigationMenuList>
                <NavigationMenuItem className="flex items-center justify-between gap-2">
                    <ComponentBooleanIcon className="h-6 w-6" />
                    <Link to="/" className="text-lg font-semibold mr-2 flex items-center">Elouan B.</Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="hidden md:flex">
                    <Link to="/">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Accueil
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="hidden md:flex">
                    <NavigationMenuTrigger>À propos</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild className="border">
                                    <MagicCard>
                                        <Link
                                            to="/about"
                                            className={cn(
                                                "flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md",
                                                // Quadrillage clair
                                                "bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)]",
                                                // Quadrillage sombre (remplace en dark mode)
                                                "dark:bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)]",
                                                // Taille du quadrillage
                                                "bg-[size:14px_24px]"
                                            )}
                                        >
                                            <div className="mb-2 mt-4 text-lg font-medium">
                                                À propos
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                Découvrez mon parcours, mes compétences et mes projets.
                                            </p>
                                        </Link>
                                    </MagicCard>
                                </NavigationMenuLink>
                            </li>
                            <Link to='/about'>
                                <ListItem2 className="flex flex-col">
                                    <span className="flex items-center gap-2 font-medium text-sm leading-none hover:text-muted-foreground">
                                      Compétences
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                      Découvrez mes compétences.
                                    </span>
                                </ListItem2>
                            </Link>
                            <Link to='/projects'>
                                <ListItem2>
                                    <span className="flex items-center gap-2 font-medium text-sm leading-none hover:text-muted-foreground">
                                      Projets
                                    </span>
                                                                    <span className="text-sm text-muted-foreground">
                                      Découvrez mes projets.
                                    </span>
                                </ListItem2>
                            </Link>
                            <Link to='/contact'>
                                <ListItem2>
                                    <span className="flex items-center gap-2 font-medium text-sm leading-none hover:text-muted-foreground">
                                      Contact
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                      Contactez-moi.
                                    </span>
                                </ListItem2>
                            </Link>

                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className="hidden md:flex">
                    <NavigationMenuTrigger>Mes outils</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] p-4 md:w-[500px] md:grid-cols-2 lg:w-max">
                            {components.map((component) => {
                                const isExternal = component.href.startsWith("http");
                                const isComingSoon = component.textBadge === "Bientôt";

                                const content = (
                                    <ListItem
                                        title={component.title}
                                        className={
                                            "flex flex-row items-start gap-3 group" +
                                            (isComingSoon ? " opacity-50 text-muted-foreground pointer-events-none select-none" : "")
                                        }
                                    >
          <span className="rounded border border-muted transition-colors group-hover:bg-muted">
            {component.icon ? (
                <component.icon className="max-w-8 w-full h-full p-2" />
            ) : (
                <span className="h-7 w-7" />
            )}
          </span>
                                        <span className="flex flex-col">
            <span className="flex items-center gap-2 font-medium text-sm leading-none hover:text-muted-foreground">
              {component.title}
                {component.isNew && (
                    <Badge variant="default" className="ml-2">
                        {component.textBadge || "Nouveau"}
                    </Badge>
                )}
            </span>
            <span className="text-sm text-muted-foreground">
              {component.description}
            </span>
          </span>
                                    </ListItem>
                                );

                                if (isComingSoon) {
                                    return (
                                        <div key={component.title} className="block">
                                            {content}
                                        </div>
                                    );
                                }

                                return isExternal ? (
                                    <a
                                        key={component.title}
                                        href={component.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        {content}
                                    </a>
                                ) : (
                                    <Link
                                        key={component.title}
                                        to={component.href}
                                        className="block"
                                    >
                                        {content}
                                    </Link>
                                );
                            })}
                        </ul>
                    </NavigationMenuContent>

                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

// @ts-ignore
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
                    isComingSoon && "opacity-50 pointer-events-none select-none grayscale",
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
                    isComingSoon && "opacity-50 pointer-events-none select-none grayscale",
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
ListItem.displayName = "ListItem2";

interface ListItemProps extends React.ComponentPropsWithoutRef<"li"> {
    children: React.ReactNode;
    isComingSoon?: boolean;
    className?: string;
}