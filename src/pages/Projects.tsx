// src/pages/Projects.tsx
import {DivideTitle} from "@/components/DivideTitle.tsx";
import {Projets} from "@/components/projets.tsx";
import {TextAnimate} from "@/components/text-animate.tsx";

const Projects = () => (
    <div>
        <div className="border-grid flex flex-1 flex-col items-center">
            <div className="border-grid sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <section className="max-w-screen-2xl mx-auto border-l border-r w-full py-12 px-12 gap-8 flex flex-col items-start justify-start">
                    <div>
                        <h1 className="text-4xl md:text-4xl font-medium">
                            <TextAnimate animation="blurInUp" by="character" duration={0.3}>
                                Projets
                            </TextAnimate>
                        </h1>
                        <p className="text-md md:text-xl font-thin text-muted-foreground">
                            <TextAnimate animation="blurInUp" by="character" duration={0.3}>
                                Voici quelques projets personnels et universitaires que j'ai réalisés.
                            </TextAnimate>
                        </p>
                    </div>
                </section>
            </div>
        </div>
        <Projets/>
    </div>
);

export default Projects;
