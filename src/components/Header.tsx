import {cn} from "@/lib/utils.ts";
import {Navbar} from "@/components/Navbar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Github, Linkedin} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle.tsx";
import {useEffect, useState} from "react";

const Header = () => {

    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 15)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
    <div className={cn(
        "sticky top-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:border",
        isScrolled ? "pt-0 border-none sm:pt-4" : "pt-0",
    )}>
        <header
            className={cn(
                "mx-auto px-4 w-full h-20 flex items-center justify-between transition-all duration-300",
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
                    <Button variant="ghost" size="icon" asChild >
                        <ThemeToggle />
                    </Button>
                </div>
                <Button variant="default" asChild>
                    <a href="/CV_Elouan_Bruzek.pdf" target="_blank">
                        Télécharger mon CV
                    </a>
                </Button>
            </div>
        </header>
    </div>
    )
}

export default Header;