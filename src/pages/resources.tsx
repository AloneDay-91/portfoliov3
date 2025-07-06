import { Card, CardContent } from "@/components/ui/card";
import { MagicCard } from "@/components/magicui/magic-card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useTheme } from "next-themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useEffect, useId, useState } from "react";
import { DivideTitle } from "@/components/DivideTitle.tsx";
import { TextAnimate } from "@/components/text-animate.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ListFilter } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { apiService, apiFetch } from "@/services/apiService";
import { Skeleton } from "@/components/ui/skeleton";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

type Project = {
  id: string;
  nom: string;
  url: string | null;
  nb_components: string;
  image: string;
  category: string;
  active?: boolean;
};

function groupByCategory(projects: Project[]) {
  return projects.reduce((acc: Record<string, Project[]>, project) => {
    acc[project.category] = acc[project.category] || [];
    acc[project.category].push(project);
    return acc;
  }, {});
}

function ResourceCardSkeleton() {
  return (
    <div className="max-w-sm w-full">
      <div className="p-0">
        <div className="p-4">
          <Skeleton className="w-full h-40 mb-4" />
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  );
}

export function Resources() {
  const { theme } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);
  const [grouped, setGrouped] = useState<Record<string, Project[]>>({});
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const data = await apiFetch(apiService.getResources());

        // Convertir le format de l'API vers le format attendu par le composant
        const resources = Object.entries(data).map(([id, r]) => {
          const resource = r as {
            nom: string;
            url: string;
            nb_components: string;
            image: string;
            category: string;
            active: boolean;
          };
          return {
            id,
            nom: resource.nom,
            url: resource.url,
            nb_components: resource.nb_components,
            image: resource.image,
            category: resource.category,
            active: resource.active,
          };
        });

        // Filtrer les ressources inactives
        const activeResources = resources.filter(
          (resource) => resource.active !== false
        );

        setProjects(activeResources);
        setGrouped(groupByCategory(activeResources));
      } catch (error) {
        console.error("Erreur lors du chargement des ressources:", error);
        // Fallback vers le fichier JSON en cas d'erreur
        fetch("/project.json")
          .then((res) => res.json())
          .then((data) => {
            setProjects(data);
            setGrouped(groupByCategory(data));
          });
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Extraire toutes les catégories uniques
  const allCategories = Array.from(new Set(projects.map((p) => p.category)));

  // Filtrer les projets selon les catégories sélectionnées
  const filteredGrouped =
    selectedCategories.length > 0
      ? Object.fromEntries(
          Object.entries(groupByCategory(projects)).filter(([cat]) =>
            selectedCategories.includes(cat)
          )
        )
      : grouped;

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleClear = () => setSelectedCategories([]);

  const id = useId();

  if (loading) {
    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl">
            {[...Array(8)].map((_, i) => (
              <ResourceCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <>
        <div className="">
          <div className="border-grid flex flex-1 flex-col items-center">
            <div className="border-grid w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <section className="relative max-w-screen-2xl mx-auto border-l border-r w-full py-12 px-12 gap-8">
                <div className="absolute inset-0 -z-10 h-full w-full dark:bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="flex flex-row items-center justify-between gap-8">
                  <div>
                    <h1 className="text-4xl md:text-4xl font-medium">
                      <TextAnimate
                        animation="blurInUp"
                        by="character"
                        duration={0.3}
                      >
                        Ressources
                      </TextAnimate>
                    </h1>
                    <p className="text-md md:text-xl font-thin text-muted-foreground">
                      <TextAnimate
                        animation="blurInUp"
                        by="character"
                        duration={0.3}
                      >
                        Différentes ressources pour vous aider dans vos projets
                      </TextAnimate>
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-4">
                      <Popover>
                        <span className="text-sm">Filtres</span>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            aria-label="Filters"
                          >
                            <ListFilter
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-36 p-3">
                          <div className="space-y-3">
                            <div className="text-xs font-medium text-muted-foreground">
                              Catégories
                            </div>
                            <form className="space-y-3">
                              {allCategories.map((cat, idx) => (
                                <div
                                  className="flex items-center gap-2"
                                  key={cat}
                                >
                                  <Checkbox
                                    id={`${id}-${idx}`}
                                    checked={selectedCategories.includes(cat)}
                                    onCheckedChange={() =>
                                      handleCategoryChange(cat)
                                    }
                                  />
                                  <Label
                                    htmlFor={`${id}-${idx}`}
                                    className="font-normal"
                                  >
                                    {cat}
                                  </Label>
                                </div>
                              ))}
                              <div className="-mx-3 my-1 h-px bg-border"></div>
                              <div className="flex justify-between gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 px-2"
                                  onClick={handleClear}
                                >
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
                <br />
                {Object.entries(filteredGrouped).map(([category, projects]) => (
                  <div key={category} className="mb-12">
                    <DivideTitle title={category} id={category.toLowerCase()} />
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 justify-items-center">
                      {projects.map((project) => (
                        <Card
                          key={project.id}
                          className="p-0 max-w-sm w-full border-none bg-transparent dark:bg-transparent"
                        >
                          <MagicCard
                            gradientColor={
                              theme === "dark" ? "#262626" : "#D9D9D955"
                            }
                            className="p-0"
                          >
                            <CardContent className="p-4" title={project.nom}>
                              <img
                                src={project.image}
                                className="rounded-lg w-auto object-cover"
                                alt={project.nom}
                              />
                              <hr className="my-4 border-muted" />
                              <div className="flex flex-row items-center justify-between gap-2">
                                <h3 className="font-semibold text-lg">
                                  {project.nom}
                                </h3>
                                <div className="flex items-center justify-between">
                                  {/** Ajouter animation de survole sur le bouton */}
                                  <Button variant="outline" size="sm" asChild>
                                    <a
                                      href={project.url || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2"
                                    >
                                      Visiter
                                      <ArrowRightIcon className="h-3 w-3" />
                                    </a>
                                  </Button>
                                </div>
                              </div>
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
    </motion.div>
  );
}
