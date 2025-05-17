import DecryptedText from "@/components/ui/TextAnimations/DecryptedText/DecryptedText.tsx";

export function XPPRO(){
    return (
        <>
<div className="">
    <div className="border-grid flex flex-1 flex-col items-center">
        <div
            className="border-grid w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <section className="relative max-w-screen-2xl mx-auto border-l border-r w-full py-12 px-12 gap-8">
                <div className="absolute inset-0 -z-10 h-full w-full dark:bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="flex items-start justify-start gap-8">
                    <div className="w-1/5">
                        <span className="text-muted-foreground text-2xl"><DecryptedText animateOn="view" revealDirection="start" speed={80} sequential={true} text="Avril - Juin 2025" /></span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-medium text-2xl"><DecryptedText animateOn="view" revealDirection="start" speed={50} sequential={true} text="Xlog - Paris" /></h2>
                        <div className="text-muted-foreground  leading-6 text-md">
                            <p><DecryptedText animateOn="view" revealDirection="start" speed={50} sequential={true} text="Stage de 2ème année en développement web - développeur front" /></p>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="flex items-start justify-start gap-8">
                    <div className="w-1/5">
                        <span className="text-muted-foreground text-2xl"><DecryptedText animateOn="view" revealDirection="start" speed={80} sequential={true} text="Juillet 2024" /></span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-medium text-2xl"><DecryptedText animateOn="view" revealDirection="start" speed={50} sequential={true} text="Jeux Olympique Paris 2024 - Châteauroux" /></h2>
                        <div className="text-muted-foreground  leading-6 text-md">
                            <p><DecryptedText animateOn="view" revealDirection="start" speed={50} sequential={true} text="Volontaire tir sportif Équipier armurerie" /></p>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="flex items-start justify-start gap-8">
                    <div className="w-1/4">
                        <span className="text-muted-foreground text-2xl"><DecryptedText animateOn="view" revealDirection="start" speed={80} sequential={true} text="Janvier 2018" /></span>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <h2 className="font-medium text-2xl"><DecryptedText animateOn="view" revealDirection="start" speed={50} sequential={true} text="Air France KLM - Orly" /></h2>
                        <div className="text-muted-foreground  leading-6 text-md">
                            <p><DecryptedText animateOn="view" revealDirection="start" speed={50} sequential={true} text="Stage d’observation Département moteur" /></p>
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