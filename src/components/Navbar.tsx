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
import {Link} from "react-router-dom";
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
                            <ListItem href="/about" title="Compétences">
                                Découvrez mes compétences.
                            </ListItem>
                            <ListItem href="/projects" title="Projets">
                                Découvrez mes projets.
                            </ListItem>
                            <ListItem href="/contact" title="Contact">
                                Contactez-moi.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className="hidden md:flex">
                    <NavigationMenuTrigger>Mes outils</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={
                                        <span className="flex items-center gap-2">
                {component.title}
                                            {component.isNew && (
                                                <Badge variant="default">
                                                    Nouveau
                                                </Badge>
                                            )}
            </span>
                                    }
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
