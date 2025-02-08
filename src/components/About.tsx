import {TextAnimate} from "@/components/text-animate.tsx";
import { WordRotate } from "./magicui/word-rotate";

export function About(){
    return (
        <div className="border-grid flex flex-1 flex-col items-center" id="#about">
            <div className="border-grid sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <section className="max-w-screen-2xl mx-auto border-l border-r w-full py-12 px-12 gap-8">
                    <div className="flex flex-col md:flex-row items-center justify-start">
                        <div className="flex flex-col md:flex-row items-center gap-8 w-full md:w-3/5">
                            <div>
                                <img className='rounded-xl' src="/photoprofile.jpeg" alt=""/>
                            </div>
                            <div className='flex flex-col md:justify-start justify-center items-center md:items-start'>
                                <h1 className="text-6xl font-medium">
                                    <TextAnimate animation="blurInUp" by="character" duration={0.3}>
                                        Elouan Bruzek
                                    </TextAnimate>
                                </h1>
                                <p className="text-4xl text-muted-foreground">
                                    <TextAnimate animation="blurInUp" by="character" duration={0.3}>
                                        Développeur web fullstack
                                    </TextAnimate>
                                </p>
                                <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl dark:shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block my-6 max-w-80">
                                    <span className="absolute inset-0 overflow-hidden rounded-full">
                                        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                        </span>
                                        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-100 dark:bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                                            <span className="flex items-center gap-2 dark:text-emerald-400/90 text-emerald-700/90">
                                                <span className="relative flex size-3"><span
                                                    className="absolute inline-flex size-full animate-ping rounded-full opacity-75 dark:bg-emerald-400/80 bg-emerald-800/80"></span><span
                                                    className="relative inline-flex size-3 scale-90 rounded-full dark:bg-emerald-500/80 bg-emerald-900/80"></span></span>
                                              Disponible pour de nouvelles opportunités
                                            </span>
                                            <svg className="dark:text-white text-black"
                                                fill="none"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                width="16"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M10.75 8.75L14.25 12L10.75 15.25"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                />
                                            </svg>
                                        </div>
                                        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                                </button>
                            </div>
                        </div>
                        <div className="w-full text-center md:text-left md:w-2/5">
                            <p className="text-lg text-muted-foreground">
                                Passionné par le web et le design interactif, je suis en deuxième année de BUT MMI à Troyes.
                                <div className='inline-flex overflow-hidden px-2'><p><WordRotate className="text-lg font-bold text-black dark:text-white" words={['Dynamique', 'Curieux', 'Rigoureux', 'Serieux']}/></p></div>
                                et toujours en quête d'apprentissage, je m'investis dans des projets personnels et collabore sur diverses initiatives pour affiner mes compétences techniques et créatives. Je suis actuellement à la recherche d'un stage d'une durée minimale de 10 semaines
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}