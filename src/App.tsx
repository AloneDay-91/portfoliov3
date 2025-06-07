
import {Spotlight} from "@/components/ui/spotlight-new.tsx";
import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";


import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import {Resources} from "@/pages/resources.tsx";
import {ExpandableTabs} from "@/components/ui/expandable-tabs.tsx";
import {FolderOpen, Mail, Archive, BookUser, HomeIcon} from "lucide-react";

export default function App() {

    const tabs = [
        { title: "Home", icon: HomeIcon, to: "/" },
        { title: "Projects", icon: FolderOpen, to: "/projects" },
        { title: "About", icon: BookUser, to: "/about" },
        { title: "Contact", icon: Mail, to: "/contact" },
        { title: "Resources", icon: Archive, to: "/ressources" },
        { type: "separator" }
    ];


    return (
        <>
            <div className="relative h-full">
                {/* Spotlight en arrière-plan */}
                <div className="absolute inset-0 -z-1 w-full h-full">
                    <Spotlight />
                </div>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/ressources" element={<Resources />} />
                </Routes>
                <div className="sticky flex flex-col gap-4 top-4 left-4 z-50 bottom-6 mx-auto items-center w-full sm:hidden">
                    <ExpandableTabs tabs={tabs} />
                </div>

            </div>
            <Footer/>
        </>
    );
}
