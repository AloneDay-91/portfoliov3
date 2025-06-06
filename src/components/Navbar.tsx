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
    },
    {
        title: "Générateur de QR Code",
        href: "https://aloneday-91.github.io/qrcode-generator-html/",
        description: "Un générateur de QR Code pour partager des informations facilement.",
    },
]

export function Navbar() {
    return (
        <NavigationMenu className="flex items-center justify-between w-full">
            <NavigationMenuList>
                <NavigationMenuItem>
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
                                <NavigationMenuLink asChild>
                                    <Link
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        to="/about"
                                    >
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            À propos
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Découvrez mon parcours, mes compétences et mes projets.
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <ListItem title="Compétences">
                                <Link to='/about'>
                                    Découvrez mes compétences.
                                </Link>
                            </ListItem>
                            <ListItem title="Projets">
                                <Link to='/projects'>
                                    Découvrez mes projets.
                                </Link>
                            </ListItem>
                            <ListItem title="Contact">
                                <Link to='/contact'>
                                    Contactez-moi.
                                </Link>
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className="hidden md:flex">
                    <NavigationMenuTrigger>Mes outils</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {components.map((component) => {
                                const isExternal = component.href.startsWith("http");
                                const link = isExternal ? (
                                    <a
                                        href={component.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 font-medium"
                                    >
                                        {component.title}
                                        {component.isNew && (
                                            <Badge variant="default" className="ml-2">
                                                Nouveau
                                            </Badge>
                                        )}
                                    </a>
                                ) : (
                                    <Link to={component.href} className="flex items-center gap-2 font-medium">
                                        {component.title}
                                        {component.isNew && (
                                            <Badge variant="default" className="ml-2">
                                                Nouveau
                                            </Badge>
                                        )}
                                    </Link>
                                );
                                return (
                                    <ListItem key={component.title} title={link}>
                                        {component.description}
                                    </ListItem>
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