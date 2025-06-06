// src/pages/Home.tsx
import {AboutInfo} from "@/components/About.tsx";
import {DivideTitle} from "@/components/DivideTitle.tsx";
import {XP} from "@/components/XP.tsx";
import {Skills} from "@/components/Skills.tsx";
import {XPPRO} from "@/components/XPPRO.tsx";
import {Projets} from "@/components/projets.tsx";
import {ContactInfo} from "@/components/Contact.tsx";
const Home = () => (
    <div>
        <AboutInfo/>
        <DivideTitle title="Formations" id="formation"/>
        <XP/>
        <DivideTitle title="Compétences" id="skills"/>
        <Skills />
        <DivideTitle title="Expériences professionnelles" id="xppro"/>
        <XPPRO/>
        <DivideTitle title="Projets personnelles & universitaires" id="projects"/>
        <Projets/>
        <DivideTitle title="Contact" id="contact"/>
        <ContactInfo/>
    </div>
);

export default Home;
