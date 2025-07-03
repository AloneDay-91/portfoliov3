// src/pages/About.tsx
import { DivideTitle } from "@/components/DivideTitle.tsx";
import { XP } from "@/components/XP.tsx";
import { XPPRO } from "@/components/XPPRO.tsx";
import { TextAnimate } from "@/components/text-animate.tsx";
import { Skills } from "@/components/Skills.tsx";
import { motion } from "framer-motion";
import GithubActivityPreview from "@/components/GithubActivityPreview";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const About = () => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.5 }}
  >
    <div>
      <div className="border-grid flex flex-1 flex-col items-center">
        <div className="border-grid sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <section className="max-w-screen-2xl mx-auto border-l border-r w-full py-12 px-12 gap-8 flex flex-col items-start justify-start">
            <div>
              <h1 className="text-4xl md:text-4xl font-medium">
                <TextAnimate animation="blurInUp" by="character" duration={0.3}>
                  À propos de moi
                </TextAnimate>
              </h1>
              <p className="text-md md:text-xl font-thin text-muted-foreground">
                <TextAnimate animation="blurInUp" by="character" duration={0.3}>
                  Passionné par le web et le design interactif, je suis en
                  deuxième année de BUT MMI à Troyes. Serieux et toujours en
                  quête d'apprentissage, je m'investis dans des projets
                  personnels et collabore sur diverses initiatives pour affiner
                  mes compétences techniques et créatives.
                </TextAnimate>
              </p>
            </div>
          </section>
        </div>
      </div>
      <DivideTitle title="Formations" id="formation" />
      <XP />
      <DivideTitle title="Expériences professionnelles" id="xppro" />
      <XPPRO />
      <DivideTitle title="Compétences" id="skills" />
      <Skills />
      <DivideTitle title="Github" id="github" />
      <GithubActivityPreview />
    </div>
  </motion.div>
);

export default About;
