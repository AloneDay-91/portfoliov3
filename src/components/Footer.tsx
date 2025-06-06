import {Button} from "@/components/ui/button.tsx";
import {Github, Linkedin} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle.tsx";

const Footer = () => {

    return (
        <footer className="max-w-screen-2xl mx-auto border-l border-r border-b px-4 w-full h-20 flex items-center justify-between">
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
    )
}

export default Footer;