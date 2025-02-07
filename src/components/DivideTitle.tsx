import {VelocityScroll} from "@/components/magicui/scroll-based-velocity.tsx";

export function DivideTitle({ title }: { title: string }) {
    return (
        <div className="border-grid flex flex-1 flex-col items-center">
            <div className="border-grid sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <section className="max-w-screen-2xl mx-auto border-l border-r w-full py-0 px-0 gap-8">
                    <h1 className="text-4xl font-light text-muted-foreground">
                        <VelocityScroll defaultVelocity="1" numRows="1">{title}</VelocityScroll>
                    </h1>
                </section>
            </div>
        </div>
    );
}