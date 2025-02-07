import {Navbar} from "@/components/Navbar.tsx";
import ThemeToggle from "@/components/ThemeToggle.tsx";
import {Github, Linkedin} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {About} from "@/components/About.tsx";
import {Skills} from "@/components/Skills.tsx";
import {Spotlight} from "@/components/ui/spotlight-new.tsx";
import {DivideTitle} from "@/components/DivideTitle.tsx";
import {XP} from "@/components/XP.tsx";

export default function App() {
    // @ts-ignore
    return (
        <>
            <div className="relative h-screen">
                {/* Spotlight en arrière-plan */}
                <div className="absolute inset-0 -z-1 w-full h-full">
                    <Spotlight />
                </div>

                {/* Contenu principal */}
                <div className="relative flex flex-1 flex-col items-center">
                    <div className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <header className="max-w-screen-2xl mx-auto border-l border-r px-4 w-full h-20 flex items-center justify-between">
                            <Navbar />
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" asChild>
                                    <a href="" target="_blank">
                                        <Linkedin strokeWidth={1.5} />
                                    </a>
                                </Button>
                                <Button variant="ghost" size="icon" asChild>
                                    <a href="" target="_blank">
                                        <Github strokeWidth={1.5} />
                                    </a>
                                </Button>
                                <Button variant="ghost" size="icon" asChild>
                                    <ThemeToggle />
                                </Button>
                                <Button variant='default' asChild>
                                    <a href="/CV_Elouan_Bruzek.pdf" target="_blank">
                                        Télécharger mon CV
                                    </a>
                                </Button>
                            </div>
                        </header>
                    </div>
                </div>

                <About />
                <DivideTitle title="Formations"/>
                <XP/>
                <DivideTitle title="Compétences"/>
                <Skills />
            </div>


        </>
    );
}
