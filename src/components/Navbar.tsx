"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ComponentBooleanIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import DynamicNavbar from "./DynamicNavbar";

export function Navbar() {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between w-full px-4 py-2">
      <NavigationMenu className="flex-1">
        <NavigationMenuList>
          <NavigationMenuItem className="flex flex-col sm:flex-row items-start md:items-center justify-between gap-2">
            <ComponentBooleanIcon className="h-6 w-6" />
            <Link
              to="/"
              className="hidden sm:flex md:text-lg font-semibold md:mr-2"
            >
              Elouan B.
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:flex">
            <Link to="/">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Accueil
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <DynamicNavbar />
          {user && (
            <NavigationMenuItem className="hidden md:flex">
              <Link to="/dashboard">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Administration
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
