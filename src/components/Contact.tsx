import {Github, Linkedin, Mails} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

export function Contact(){
    return (
        <>
<div className="">
    <div className="border-grid flex flex-1 flex-col items-center">
        <div
            className="border-grid w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <section className="relative max-w-screen-2xl mx-auto border-l border-r w-full py-12 px-12 gap-8">
                <div className="absolute inset-0 -z-10 h-full w-full dark:bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="flex items-start justify-start">
                    <div className="w-1/4">
                        <span className="text-muted-foreground text-2xl flex items-center gap-4"><Linkedin size={24} strokeWidth={2} /> Linkedin</span>
                    </div>
                    <div className="flex items-start">
                        <Button variant="link" asChild className="font-medium text-2xl text-left">
                            <a href="https://www.linkedin.com/in/elouanbruzek/" target="_blank">Elouan Bruzek</a>
                        </Button>
                    </div>
                </div>
                <br/>
                <div className="flex items-start justify-start">
                    <div className="w-1/4">
                        <span className="text-muted-foreground text-2xl flex items-center gap-4"><Mails size={24} strokeWidth={2} /> Email</span>
                    </div>
                    <div className="flex items-start">
                        <Button variant="link" asChild className="font-medium text-2xl text-left">
                            <a href="mailto:ebruzek@elouanb.fr">ebruzek@elouanb.fr</a>
                        </Button>
                    </div>
                </div>
                <br/>
                <div className="flex items-start justify-start">
                    <div className="w-1/4">
                        <span className="text-muted-foreground text-2xl flex items-center gap-4"><Github size={24} strokeWidth={2} /> Github</span>
                    </div>
                    <div className="flex items-start">
                        <Button variant="link" asChild className="font-medium text-2xl text-left">
                            <a href="https://github.com/AloneDay-91" target="_blank">Elouan Bruzek</a>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</div>
        </>
    )
}