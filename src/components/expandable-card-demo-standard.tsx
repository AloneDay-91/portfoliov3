"use client";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import {Github, Globe} from "lucide-react";

export default function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

    return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white border shadow-xl dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-lg font-normal text-muted-foreground border"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="w-full gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row ">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button layoutId={`button-${card.title}-${id}`} className="px-4 py-2 text-sm text-muted-foreground rounded-lg font-normal border mt-4 md:mt-0">
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Création d'un blog WordPress pour le Comité Départemental de Tir de l'Essonne",
    title: "blog WordPress CDTE",
    src: "projet_cdtev2.png",
    ctaText: <Globe size={16} strokeWidth={1} />,
    ctaLink: "https://cdtiressonne.fr/",
    content: () => {
      return (
        <p>
          Technologies utilisées : WordPress, Elementor, PHP, CSS, HTML, JavaScript
        </p>
      );
    },
  },
{
    description: "Création d'un site d'inscription aux compétitions pour le Comité Départemental de Tir de l'Essonne",
    title: "Inscription compétitions CDTE",
    src: "projet_cdteresa.png",
    ctaText: <Globe size={16} strokeWidth={1} />,
    ctaLink: "https://inscriptions.cdtiressonne.fr/",
    content: () => {
        return (
            <p>
                Technologies utilisées : PHP, CSS, HTML, JavaScript, Mysql, TailwindCSS
            </p>
        );
    },
},

    {
        description: "Création d'un blog WordPress pour le Club de Tir le Cercle de Tir de Montgeron",
        title: "Blog WordPress CTM",
        src: "projet_ctm%20(2).png",
        ctaText: <Globe size={16} strokeWidth={1} />,
        ctaLink: "https://ctmontgeron.fr/",
        content: () => {
            return (
                <p>
                    Technologies utilisées : WordPress, Elementor, PHP, CSS, HTML, JavaScript
                </p>
            );
        },
    },
    {
        description: "Site de macro pour OBS",
        title: "Macro OBS",
        src: "thumbProjets2.png",
        ctaText: <Github size={16} strokeWidth={1} />,
        ctaLink: "https://github.com/AloneDay-91/TalkCode",
        content: () => {
            return (
                <p>
                    Technologies utilisées : React, HTML, JavaScript, Mysql, TailwindCSS, Vite.Js
                </p>
            );
        },
    },
    {
        description: "Site de ressources pour les étudiants (veille technologique, cours, etc.)",
        title: "Site de ressources",
        src: "thumbProjets3.png",
        ctaText: <Globe size={16} strokeWidth={1} />,
        ctaLink: "https://elouanb.fr/design.elouanb.fr",
        content: () => {
            return (
                <p>
                    Technologies utilisées : PHP, CSS, HTML, JavaScript, Mysql, TailwindCSS, Symfony
                </p>
            );
        },
    },
    {
        description: "Projet scolaire sur le compositeur Hans Zimmer",
        title: "Site sur Hans Zimmer",
        src: "projet_sae105.png",
        ctaText: <Globe size={16} strokeWidth={1} />,
        ctaLink: "https://mmi23f03.sae203.ovh/",
        content: () => {
            return (
                <p>
                    Technologies utilisées : PHP, CSS, HTML, JavaScript, Mysql, TailwindCSS
                </p>
            );
        },
    },
    {
        description: "Projet scolaire sur un site de co-jardinage",
        title: "Jard'Unis",
        src: "projet_jardunis.png",
        ctaText: <Globe size={16} strokeWidth={1} />,
        ctaLink: "https://mmi23f03.sae202.ovh/",
        content: () => {
            return (
                <p>
                    Technologies utilisées : PHP, CSS, HTML, JavaScript, Mysql
                </p>
            );
        },
    },
    {
        description: "Projet scolaire sur la DataViz des bornes de recharge électrique en France",
        title: "DataViz borne de recharge électrique",
        src: "thumbProjets1.png",
        ctaText: <Globe size={16} strokeWidth={1} />,
        ctaLink: "https://www.data.gouv.fr/fr/reuses/accessibilites-des-bornes-de-recharges-pour-voiture-electriques/",
        content: () => {
            return (
                <p>
                    Technologies utilisées : CSS, HTML, JavaScript, Gsap
                </p>
            );
        },
    },
];
