import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {MagicCard} from "@/components/magicui/magic-card.tsx";
import {Button} from "@/components/ui/button.tsx";
import { useTheme } from "next-themes";
import {ArrowRightIcon} from "@radix-ui/react-icons";
import {useEffect, useId, useState} from "react";
import {DivideTitle} from "@/components/DivideTitle.tsx";
import {TextAnimate} from "@/components/text-animate.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {ListFilter} from "lucide-react";
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

type Project = {
    id: string;
    nom: string;
    url: string | null;
    nb_components: string;
    image: string;
    category: string;
};

function groupByCategory(projects: Project[]) {
    return projects.reduce((acc: Record<string, Project[]>, project) => {
        acc[project.category] = acc[project.category] || [];
        acc[project.category].push(project);
        return acc;
    }, {});
}

export function Resources(){
    const { theme } = useTheme();
    const [projects, setProjects] = useState<Project[]>([]);
    const [grouped, setGrouped] = useState<Record<string, Project[]>>({});
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
        fetch("/project.json")
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                setGrouped(groupByCategory(data));
            });
    }, []);

    // Extraire toutes les catégories uniques
    const allCategories = Array.from(new Set(projects.map(p => p.category)));

    // Filtrer les projets selon les catégories sélectionnées
    const filteredGrouped = selectedCategories.length > 0
        ? Object.fromEntries(
            Object.entries(groupByCategory(projects)).filter(([cat]) =>
                selectedCategories.includes(cat)
            )
        )
        : grouped;

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleClear = () => setSelectedCategories([]);

    const id = useId();

    return (
        <>
            <div className="">
                <div className="border-grid flex flex-1 flex-col items-center">
                    <div className="border-grid w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <section className="relative max-w-screen-2xl mx-auto border-l border-r w-full py-12 px-12 gap-8">
                            <div className="absolute inset-0 -z-10 h-full w-full dark:bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                            <div className="flex flex-row items-center justify-between gap-8">
                                <div>
                                    <h1 className="text-4xl md:text-4xl font-medium">
                                        <TextAnimate animation="blurInUp" by="character" duration={0.3}>
                                            Ressources
                                        </TextAnimate>
                                    </h1>
                                    <p className="text-md md:text-xl font-thin text-muted-foreground">
                                        <TextAnimate animation="blurInUp" by="character" duration={0.3}>
                                            Différentes ressources pour vous aider dans vos projets
                                        </TextAnimate>
                                    </p>
                                </div>
                                <div><div className="flex flex-col gap-4">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" size="icon" aria-label="Filters">
                                                <ListFilter size={16} strokeWidth={2} aria-hidden="true" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36 p-3">
                                            <div className="space-y-3">
                                                <div className="text-xs font-medium text-muted-foreground">Catégories</div>
                                                <form className="space-y-3">
                                                    {allCategories.map((cat, idx) => (
                                                        <div className="flex items-center gap-2" key={cat}>
                                                            <Checkbox
                                                                id={`${id}-${idx}`}
                                                                checked={selectedCategories.includes(cat)}
                                                                onCheckedChange={() => handleCategoryChange(cat)}
                                                            />
                                                            <Label htmlFor={`${id}-${idx}`} className="font-normal">
                                                                {cat}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                    <div className="-mx-3 my-1 h-px bg-border"></div>
                                                    <div className="flex justify-between gap-2">
                                                        <Button size="sm" variant="outline" className="h-7 px-2" onClick={handleClear}>
                                                            Clear
                                                        </Button>
                                                    </div>
                                                </form>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                </div>
                            </div>
                            <br/>
                            {Object.entries(filteredGrouped).map(([category, projects]) => (
                                <div key={category} className="mb-12">
                                    <DivideTitle title={category} id={category.toLowerCase()} />
                                    <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 justify-items-center">
                                        {projects.map((project) => (
                                            <Card key={project.id} className="p-0 max-w-sm w-full shadow-none border-none">
                                                <MagicCard
                                                    gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                                                    className="p-0"
                                                >
                                                    <CardContent className="p-4">
                                                        <img
                                                            src={project.image}
                                                            className="rounded-lg w-auto object-cover"
                                                            alt={project.nom}
                                                        />
                                                        <hr className="my-4 border-muted" />
                                                        <CardHeader className="py-0 px-1 flex flex-row items-center justify-between">
                                                            <CardTitle>{project.nom}</CardTitle>
                                                            {project.url && (
                                                                <Button
                                                                    asChild
                                                                    variant="ghost"
                                                                >
                                                                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                                                                        Voir le site
                                                                        <ArrowRightIcon />
                                                                    </a>
                                                                </Button>
                                                            )}
                                                        </CardHeader>
                                                    </CardContent>
                                                </MagicCard>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}