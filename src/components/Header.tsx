import { cn } from "@/lib/utils.ts";
import { Navbar } from "@/components/Navbar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Github, Linkedin } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle.tsx";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Shield, LogOut } from "lucide-react";
import { PersonIcon } from "@radix-ui/react-icons";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:border",
        isScrolled ? "pt-0 border-none sm:pt-4" : "pt-0"
      )}
    >
      <header
        className={cn(
          "mx-auto px-4 w-full h-20 flex items-center justify-between transition-all duration-300 gap-4",
          "max-w-screen-2xl", // par défaut (mobile)
          isScrolled
            ? "backdrop-blur-md md:border md:border-l md:border-r rounded-xl mt-2 max-w-screen-xl"
            : "md:border-l md:border-r"
        )}
      >
        <Navbar />
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://www.linkedin.com/in/elouanbruzek/" target="_blank">
              <Linkedin strokeWidth={1.5} />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/AloneDay-91" target="_blank">
              <Github strokeWidth={1.5} />
            </a>
          </Button>
          <div className="hidden md:block">
            <Button variant="ghost" size="icon" asChild>
              <ThemeToggle />
            </Button>
          </div>
          <Button variant="default" className="font-md" size="sm" asChild>
            <a href="/CV_Elouan_Bruzek.pdf" target="_blank" className="text-xs">
              Télécharger mon CV
            </a>
          </Button>
        </div>
        <div>
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="hidden md:block">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <PersonIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Rôle: {user?.role}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                  <Link to="/profile">Mon compte</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                  <Link to="/dashboard">Tableau de bord</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    navigate("/login", { state: { fromLogout: true } });
                  }}
                  className="flex items-center gap-2 text-red-600 dark:text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
