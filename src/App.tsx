
import {Spotlight} from "@/components/ui/spotlight-new.tsx";
import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";


import {Routes, Route, useLocation} from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProjectsDetail from "./pages/ProjectsDetail.tsx";
import {Resources} from "@/pages/resources.tsx";
import {ExpandableTabs} from "@/components/ui/expandable-tabs.tsx";
import {FolderOpen, Mail, Archive, BookUser, HomeIcon} from "lucide-react";
import QRGenerator from "@/pages/qrgenerator.tsx";
import { Toaster } from "@/components/ui/sonner"
import { AnimatePresence } from "framer-motion";

export default function App() {

    const location = useLocation();

    const tabs = [
        { title: "Home", icon: HomeIcon, to: "/" },
        { title: "Projects", icon: FolderOpen, to: "/projects" },
        { title: "About", icon: BookUser, to: "/about" },
        { title: "Contact", icon: Mail, to: "/contact" },
        { title: "Resources", icon: Archive, to: "/ressources" },
        { type: "separator" as const }
    ];


    return (
        <main>
            <Toaster />
            <div className="relative h-full">
                {/* Spotlight en arrière-plan */}
                <div className="absolute inset-0 -z-1 w-full h-full">
                    <Spotlight />
                </div>
                <Header/>
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/projects/:id" element={<ProjectsDetail />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/ressources" element={<Resources />} />
                        <Route path="/qrgenerator" element={<QRGenerator />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </AnimatePresence>
                <div className="sticky flex flex-col gap-4 top-4 left-4 z-50 bottom-6 mx-auto items-center w-full sm:hidden">
                    <ExpandableTabs tabs={tabs} />
                </div>

            </div>
            <Footer/>
        </main>
    );
}
