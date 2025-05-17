import {Navbar} from "@/components/Navbar.tsx";
import ThemeToggle from "@/components/ThemeToggle.tsx";
import {Github, Linkedin} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {About} from "@/components/About.tsx";
import {Skills} from "@/components/Skills.tsx";
import {Spotlight} from "@/components/ui/spotlight-new.tsx";
import {DivideTitle} from "@/components/DivideTitle.tsx";
import {XP} from "@/components/XP.tsx";
import {XPPRO} from "@/components/XPPRO.tsx";
import {Projets} from "@/components/projets.tsx";
import {Contact} from "@/components/Contact.tsx";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils.ts";

export default function App() {

    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 15)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <div className="relative h-full">
                {/* Spotlight en arrière-plan */}
                <div className="absolute inset-0 -z-1 w-full h-full">
                    <Spotlight />
                </div>

                {/* Contenu principal */}
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
                            <Button variant="ghost" size="icon" asChild>
                                <ThemeToggle />
                            </Button>
                            <Button variant="default" asChild>
                                <a href="/CV_Elouan_Bruzek.pdf" target="_blank">
                                    Télécharger mon CV
                                </a>
                            </Button>
                        </div>
                    </header>
                </div>

                <About/>
                <DivideTitle title="Formations" id="formation"/>
                <XP/>
                <DivideTitle title="Compétences" id="skills"/>
                <Skills />
                <DivideTitle title="Expériences professionnelles" id="xppro"/>
                <XPPRO/>
                <DivideTitle title="Projets personnelles & universitaires" id="projects"/>
                <Projets/>
                <DivideTitle title="Contact" id="contact"/>
                <Contact/>
            </div>
            <footer className="max-w-screen-2xl mx-auto border-l border-r px-4 w-full h-20 flex items-center justify-between">
                <div>
                    <p className="text-muted-foreground text-sm">© 2025 Elouan Bruzek. Tous droits réservés.</p>
                </div>
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
                    <Button variant="ghost" size="icon" asChild>
                        <ThemeToggle />
                    </Button>
                    <Button variant='outline' asChild>
                        <a href="/CV_Elouan_Bruzek.pdf" target="_blank">
                            Télécharger mon CV
                        </a>
                    </Button>
                </div>
            </footer>
        </>
    );
}
