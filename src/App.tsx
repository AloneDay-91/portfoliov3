
import {Spotlight} from "@/components/ui/spotlight-new.tsx";
import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";


import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import {Resources} from "@/pages/resources.tsx";

export default function App() {

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
            </div>
            <Footer/>
        </>
    );
}
