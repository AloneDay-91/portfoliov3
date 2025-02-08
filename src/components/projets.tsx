import ExpandableCardDemo from "@/components/expandable-card-demo-standard.tsx";
import {Button} from "@/components/ui/button.tsx";

export function Projets(){
    return (
        <div className="border-grid flex flex-1 flex-col items-center">
            <div className="border-grid sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <section className="max-w-screen-2xl mx-auto border-l border-r w-full py-12 px-12 gap-8 flex flex-col items-center justify-start">
                    <ExpandableCardDemo/>
                    <div>
                        <Button variant="outline" asChild>
                            <a href="https://github.com/AloneDay-91?tab=repositories" target="_blank">
                                Voir plus de projets
                            </a>
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    )
}