import { Spotlight } from "@/components/ui/spotlight-new.tsx";
import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProjectsDetail from "./pages/ProjectsDetail.tsx";
import { Resources } from "@/pages/resources.tsx";
import { ExpandableTabs } from "@/components/ui/expandable-tabs.tsx";
import { FolderOpen, Mail, Archive, BookUser, HomeIcon } from "lucide-react";
import QRGenerator from "@/pages/qrgenerator.tsx";
import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence } from "framer-motion";
import WordCounterPage from "./pages/wordCounter.tsx";
import PasswordGeneratorPage from "./pages/passwordGenerator.tsx";
import SiteStatusChecker from "./pages/siteStatusChecker.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ProtectedLayout from "@/components/ProtectedLayout";
import { useEffect, useState } from "react";
import GithubActivity from "./pages/GithubActivity.tsx";

export default function App() {
  const location = useLocation();
  const [registerEnabled, setRegisterEnabled] = useState(true);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/config`)
      .then((res) => res.json())
      .then((data) => setRegisterEnabled(!!data.registerEnabled))
      .catch(() => setRegisterEnabled(true));
  }, []);

  const tabs = [
    { title: "Home", icon: HomeIcon, to: "/" },
    { title: "Projects", icon: FolderOpen, to: "/projects" },
    { title: "About", icon: BookUser, to: "/about" },
    { title: "Contact", icon: Mail, to: "/contact" },
    { title: "Resources", icon: Archive, to: "/ressources" },
    { type: "separator" as const },
  ];

  return (
    <>
      <Toaster />
      <main>
        <div className="relative h-full">
          <div className="absolute inset-0 -z-1 w-full h-full">
            <Spotlight />
          </div>
          <Header />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectsDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/ressources" element={<Resources />} />
              <Route path="/qrgenerator" element={<QRGenerator />} />
              <Route path="/wordcounter" element={<WordCounterPage />} />

              <Route
                path="/passwordgenerator"
                element={<PasswordGeneratorPage />}
              />
              <Route path="/status" element={<SiteStatusChecker />} />
              <Route path="/activity" element={<GithubActivity />} />
              <Route path="/login" element={<Login />} />
              {registerEnabled && (
                <Route path="/register" element={<Register />} />
              )}
              <Route
                path="/dashboard"
                element={
                  <ProtectedLayout>
                    <Dashboard />
                  </ProtectedLayout>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
          <div className="sticky flex flex-col gap-4 top-4 left-4 z-50 bottom-6 mx-auto items-center w-full sm:hidden">
            <ExpandableTabs tabs={tabs} />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
