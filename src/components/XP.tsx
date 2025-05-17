import DecryptedText from "@/components/ui/TextAnimations/DecryptedText/DecryptedText.tsx";

export function XP(){
    return (
        <>
<div className="">
    <div className="border-grid flex flex-1 flex-col items-center">
        <div
            className="border-grid w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <section className="relative max-w-screen-2xl mx-auto border-l border-r w-full py-12 px-12 gap-8">
                <div className="absolute inset-0 -z-10 h-full w-full dark:bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="flex flex-col md:flex-row md:items-start md:justify-start gap-8">
                    <div className="w-auto md:w-1/5">
                        <span className="text-muted-foreground text-2xl"><DecryptedText animateOn="view" revealDirection="start" speed={50} sequential={true} text="2023 - Aujourd'hui" /></span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-medium text-2xl">
                            <DecryptedText animateOn="view" revealDirection="start" speed={50} sequential={true} text="IUT de Troyes - Troyes" />
                        </h2>
                        <div className="text-muted-foreground  leading-6 text-md">
                            <p><DecryptedText animateOn="view" revealDirection="start" speed={20} sequential={true} text="Bachelor Universitaire de Technologie (Métiers du Multimédia et de l’Internet)" /></p>
                            <p><DecryptedText animateOn="view" revealDirection="start" speed={20} sequential={true} text="Parcours Développement web et dispositifs interactifs" /></p>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="flex flex-col md:flex-row md:items-start md:justify-start gap-8">
                    <div className="w-auto md:w-1/4">
                        <span className="text-muted-foreground text-2xl"><DecryptedText animateOn="view" revealDirection="start" speed={50} sequential={true} text="2022 - 2023" /></span>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <h2 className="font-medium text-2xl">
                            <DecryptedText animateOn="view" revealDirection="start" speed={50} sequential={true} text="IUT de Reims - Reims" />
                        </h2>
                        <div className="text-muted-foreground  leading-6 text-md">
                            <p><DecryptedText animateOn="view" revealDirection="start" speed={20} sequential={true} text="Bachelor Universitaire de Technologie (Informatique)" /></p>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="flex flex-col md:flex-row md:items-start md:justify-start gap-8">
                    <div className="w-auto md:w-1/4">
                        <span className="text-muted-foreground text-2xl"><DecryptedText animateOn="view" revealDirection="start" speed={50} sequential={true} text="2019 - 2022" /></span>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <h2 className="font-medium text-2xl">
                            <DecryptedText animateOn="view" revealDirection="start" speed={50} sequential={true} text="Lycée Rosa Parks - Montgeron" />
                        </h2>
                        <div className="text-muted-foreground  leading-6 text-md">
                            <p><DecryptedText animateOn="view" revealDirection="start" speed={20} sequential={true} text="Baccalauréat STI2D mention Assez Bien" /></p>
                            <p><DecryptedText animateOn="view" revealDirection="start" speed={20} sequential={true} text="Système informatique et numérique (SIN)" /></p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</div>
        </>
    )
}