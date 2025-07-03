// src/pages/Home.tsx
import { AboutInfo } from "@/components/About.tsx";
import { DivideTitle } from "@/components/DivideTitle.tsx";
import { XP } from "@/components/XP.tsx";
import { Skills } from "@/components/Skills.tsx";
import { XPPRO } from "@/components/XPPRO.tsx";
import { Projets } from "@/components/projets.tsx";
import { ContactInfo } from "@/components/Contact.tsx";
import { motion } from "framer-motion";
import GithubActivityPreview from "@/components/GithubActivityPreview";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};
const Home = () => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.5 }}
  >
    <div>
      <AboutInfo />
      <DivideTitle title="Formations" id="formation" />
      <XP />
      <DivideTitle title="Compétences" id="skills" />
      <Skills />
      <DivideTitle title="Expériences professionnelles" id="xppro" />
      <XPPRO />
      <DivideTitle
        title="Projets personnelles & universitaires"
        id="projects"
      />
      <Projets />
      <DivideTitle title="Github" id="Activité GitHub" />
      <GithubActivityPreview />
      <DivideTitle title="Contact" id="contact" />
      <ContactInfo />
    </div>
  </motion.div>
);

export default Home;
