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
import {ComponentBooleanIcon} from "@radix-ui/react-icons";

const components = [
    {
        title: "StatusPage",
        href: "https://status.elouanb.fr/",
        description: "Site de status pour surveiller la disponibilité de mes services.",
    },
    {
        title: "Ressource Web",
        href: "/ressources",
        description: "Une collection de ressources pour les développeurs et designers.",
        isNew: true,
        textBadge: "Nouveau",
    },
    {
        title: "Générateur de QR Code",
        href: "/qrgenerator",
        description: "Un générateur de QR Code pour partager des informations facilement.",
    },
    {
        title: "Collection backgrounds",
        href: "/bg",
        description: "Une collection de backgrounds Tailwindcss pour vos projets.",
        isNew: true,
        textBadge: "Bientôt",
    },
    {
        title: "Design System",
        href: "https://design.elouanb.fr/",
        description: "Un design system pour standardiser les composants de vos applications.",
        isNew: true,
        textBadge: "Nouveau",
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
                                <ListItem title="Compétences">
                                        Découvrez mes compétences.
                                </ListItem>
                            </Link>
                            <Link to='/projects'>
                                <ListItem title="Projets">
                                        Découvrez mes projets.
                                </ListItem>
                            </Link>
                            <Link to='/contact'>
                                <ListItem title="Contact">
                                        Contactez-moi.
                                </ListItem>
                            </Link>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className="hidden md:flex">
                    <NavigationMenuTrigger>Mes outils</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {components.map((component) => {
                                const isExternal = component.href.startsWith("http");
                                const isComingSoon = component.textBadge === "Bientôt";

                                const content = (
                                    <ListItem
                                        title={
                                            <span className="flex items-center gap-2 font-medium">
                                            {component.title}
                                                {component.isNew && (
                                                    <Badge variant="default" className="ml-2">
                                                        {component.textBadge || "Nouveau"}
                                                    </Badge>
                                                )}
                                            </span>
                                        }
                                        className={isComingSoon ? "opacity-50 pointer-events-none select-none" : ""}
                                    >
                                        {component.description}
                                    </ListItem>
                                );

                                if (isComingSoon) {
                                    // Désactivé, pas de lien
                                    return (
                                        <div key={component.title} className="block">
                                            {content}
                                        </div>
                                    );
                                }

                                // Sinon, lien normal
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
    title: React.ReactNode;
    children: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li ref={ref} className={cn("list-none", className)} {...props}>
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </div>
                </div>
            </li>
        );
    }
);
ListItem.displayName = "ListItem";