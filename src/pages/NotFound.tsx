// src/pages/NotFound.tsx
import DecryptedText from "@/components/ui/TextAnimations/DecryptedText/DecryptedText.tsx";
import {Button} from "@/components/ui/button.tsx";
import { motion } from "framer-motion";

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

const NotFound = () => (
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
                    <section className="relative max-w-screen-2xl mx-auto border-l border-r w-full py-12 px-12 gap-8 h-screen flex flex-col items-center justify-center text-center">
                        <div className="absolute inset-0 -z-10 h-full w-full dark:bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                        <div className="flex flex-col items-center justify-center gap-8">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-4xl md:text-4xl font-medium flex flex-col items-center">
                                    <DecryptedText animateOn="view" revealDirection="start" speed={50} sequential={true} text="404" className="text-7xl font-bold" />
                                    <DecryptedText animateOn="view" revealDirection="start" speed={50} sequential={true} text="Page non trouvée" />
                                </h1>
                                <p className="text-md md:text-xl font-thin text-muted-foreground">
                                    <DecryptedText animateOn="view" revealDirection="start" speed={50} sequential={true} text="La page que vous cherchez n'existe pas." />
                                </p>
                                <div className="flex flex-col gap-2">
                                    <DecryptedText animateOn="view" revealDirection="start" speed={50} sequential={true} text="Peut-être que vous avez fait une erreur de frappe ou que la page a été déplacée." />
                                </div>
                            </div>
                            <Button variant="link" asChild>
                                <a href="/" className="flex items-center gap-2">
                                    <DecryptedText animateOn="view" revealDirection="start" speed={50} sequential={true} text="Retour à l'accueil" />
                                </a>
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </>
    </motion.div>
);

export default NotFound;
