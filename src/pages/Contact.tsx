// src/pages/Home.tsx
import {ContactInfo} from "@/components/Contact.tsx";
import {TextAnimate} from "@/components/text-animate.tsx";
import { motion } from "framer-motion";

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};
const Contact = () => (
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
                                Contact
                            </TextAnimate>
                        </h1>
                        <p className="text-md md:text-xl font-thin text-muted-foreground">
                            <TextAnimate animation="blurInUp" by="character" duration={0.3}>
                                Si vous souhaitez me contacter, n'hésitez pas à m'envoyer un email ou sur Linkedin.
                            </TextAnimate>
                        </p>
                    </div>
                </section>
            </div>
        </div>
        <ContactInfo/>
    </div>
    </motion.div>
);

export default Contact;
