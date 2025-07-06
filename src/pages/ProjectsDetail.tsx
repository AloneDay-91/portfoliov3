import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DecryptedText from "@/components/ui/TextAnimations/DecryptedText/DecryptedText.tsx";
import { Button } from "@/components/ui/button.tsx";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";
import { AvatarGroup } from "@/components/ui/avatar-group.tsx";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Skeleton pour la page détail projet
function ProjectDetailSkeleton() {
  return (
    <div className="border-grid flex flex-1 flex-col items-center animate-pulse">
      <div className="border-grid w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <section className="relative max-w-screen-2xl mx-auto border-l border-r w-full py-12 px-12 gap-8 min-h-screen flex flex-col">
          <div className="absolute inset-0 -z-10 h-full w-full dark:bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="flex flex-col gap-6">
            <div>
              <div className="h-10 w-64 bg-muted rounded mb-2" />
              <div className="h-4 w-80 bg-muted rounded" />
            </div>
            <div className="flex items-center gap-4">
              <div className="h-8 w-24 bg-muted rounded" />
              <div className="h-8 w-24 bg-muted rounded" />
              <div className="h-8 w-24 bg-muted rounded" />
            </div>
            <div className="flex flex-col items-center w-full border border-muted-foreground/20 rounded-lg bg-muted p-4">
              <div className="w-full h-64 bg-muted rounded-lg" />
            </div>
            <div className="h-32 w-full bg-muted rounded mt-4" />
            <div className="h-10 w-32 bg-muted rounded mt-4" />
          </div>
        </section>
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    async function fetchProject() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/cards/${id}`);
        if (!res.ok) throw new Error("Projet introuvable");
        const data = await res.json();
        // On attend au moins 800ms avant d'afficher le projet
        timeout = setTimeout(() => {
          setProject(data);
          setLoading(false);
        }, 800);
      } catch (e) {
        setError("Projet introuvable");
        setLoading(false);
      }
    }
    fetchProject();
    return () => clearTimeout(timeout);
  }, [id]);

  if (loading) return <ProjectDetailSkeleton />;
  if (error || !project)
    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        <div className="border-grid flex flex-1 flex-col items-center">
          <div className="border-grid w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <section className="relative max-w-screen-2xl mx-auto border-l border-r w-full py-12 px-12 gap-8 h-screen flex flex-col items-center justify-center text-center">
              <div className="absolute inset-0 -z-10 h-full w-full dark:bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:14px_24px]"></div>
              <div className="flex flex-col items-center justify-center gap-8">
                <div className="flex flex-col gap-2">
                  <h1 className="text-4xl md:text-4xl font-medium flex flex-col items-center">
                    <DecryptedText
                      animateOn="view"
                      revealDirection="start"
                      speed={50}
                      sequential={true}
                      text="Projet introuvable"
                    />
                  </h1>
                  <p className="text-md md:text-xl font-thin text-muted-foreground">
                    <DecryptedText
                      animateOn="view"
                      revealDirection="start"
                      speed={50}
                      sequential={true}
                      text="Le projet que vous cherchez n'existe pas."
                    />
                  </p>
                  <div className="flex flex-col gap-2">
                    <DecryptedText
                      animateOn="view"
                      revealDirection="start"
                      speed={50}
                      sequential={true}
                      text="Peut-être que vous avez fait une erreur de frappe ou que le projet a été supprimé."
                    />
                  </div>
                </div>
                <Button variant="link" asChild>
                  <a href="/" className="flex items-center gap-2">
                    <DecryptedText
                      animateOn="view"
                      revealDirection="start"
                      speed={50}
                      sequential={true}
                      text="Retour à l'accueil"
                    />
                  </a>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    );

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div className="border-grid flex flex-1 flex-col items-center">
        <div className="border-grid w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <section className="relative max-w-screen-2xl mx-auto border-l border-r w-full py-12 px-12 gap-8 min-h-screen flex flex-col">
            <div className="absolute inset-0 -z-10 h-full w-full dark:bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div>
              <Button variant="link" asChild>
                <Link to="/projects" className="flex items-center gap-2">
                  <ArrowLeftIcon />
                  Retour aux projets
                </Link>
              </Button>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-4xl font-bold">{project.title}</h1>
                <p className="font-light text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  variant={
                    project.badgeColor as
                      | "outline"
                      | "blue"
                      | "green"
                      | "red"
                      | "yellow"
                      | "default"
                      | "secondary"
                      | "destructive"
                  }
                  className="font-normal"
                >
                  <span className="text-sm p-0.5 font-light">
                    {project.category}
                  </span>
                </Badge>
                <Badge variant="outline" className="font-normal">
                  <span className="text-sm p-0.5 font-light">
                    {project.date
                      ? new Date(project.date).toLocaleDateString("fr-FR", {
                          month: "short",
                          year: "numeric",
                        })
                      : ""}
                  </span>
                </Badge>
                <div className="ml-4">
                  <AvatarGroup
                    avatars={project.avatars || []}
                    maxVisible={10}
                    size={35}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center w-full border border-muted-foreground/20 rounded-lg bg-muted p-4">
                <img
                  src={
                    project.src?.startsWith("/")
                      ? project.src
                      : "/" + project.src
                  }
                  alt={project.title}
                  className="w-full rounded-lg"
                />
              </div>
              <div
                className="mt-4 text-justify text-muted-foreground text-sm"
                dangerouslySetInnerHTML={{ __html: project.content || "" }}
              />
              <div>
                <Button variant="outline" asChild>
                  <a href={project.ctaLink}>
                    <span className="flex items-center gap-2">
                      {project.ctaText}
                    </span>
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
