import quoteImage from "../../assets/images/2.jpg";
import {
    SlideLeft,
    FadeUp,
    FadeIn,
    ScaleIn,
    Float,
} from "../../animations";
import { motion } from "framer-motion";
import SectionTitle from "../common/SectionTitle";

const QuoteSection = () => {
    return (
        <FadeUp>
            <section className="bg-[#F8F6F3] px-6 py-20">

                <div className="mx-auto max-w-5xl">

                <SectionTitle
                    eyebrow="♡ MIŁOŚĆ"
                    title="Każda historia ma swój początek"
                />

                    <div className="grid items-center gap-10 md:grid-cols-2">

                        {/* Zdjęcie */}

                        <SlideLeft>

                            <div className="flex justify-center">

                                <Float distance={10} duration={6}>

                                    <img
                                        src={quoteImage}
                                        alt="Sandra i Dawid"
                                        className="
                                            w-full
                                            max-w-sm
                                            object-cover
                                            shadow-lg
                                            transition-transform
                                            duration-700
                                            hover:scale-[1.02]
                                        "
                                    />

                                </Float>

                            </div>

                        </SlideLeft>

                        {/* Cytat */}

                        <div className="flex flex-col items-center text-center">

                            <ScaleIn delay={0.15}>

                                <p
                                    className="
                                        font-heading
                                        text-6xl
                                        text-[#B89B7A]
                                    "
                                >
                                    ❝
                                </p>

                            </ScaleIn>

                            <FadeUp delay={0.3}>

                                <p className="mt-8 max-w-sm text-2xl italic leading-relaxed text-[#3A312B]">
                                    Najlepszych i najpiękniejszych rzeczy na świecie
                                    nie można ani zobaczyć, ani dotknąć,
                                    trzeba je poczuć sercem...
                                </p>

                            </FadeUp>

                            <motion.div
                                initial={{
                                    opacity: 0,
                                }}
                                whileInView={{
                                    opacity: 1,
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.2,
                                }}
                                transition={{
                                    delay: 0.55,
                                    duration: 0.4,
                                }}
                                className="mt-10 flex items-center gap-5"
                            >

                                <motion.div
                                    initial={{
                                        width: 0,
                                    }}
                                    whileInView={{
                                        width: 48,
                                    }}
                                    viewport={{
                                        once: true,
                                    }}
                                    transition={{
                                        delay: 0.8,
                                        duration: 0.6,
                                        ease: [0.25, 1, 0.5, 1],
                                    }}
                                    className="h-px bg-[#B89B7A]"
                                />

                                <Float
                                    duration={3}
                                    distance={4}
                                >
                                    <motion.span
                                        initial={{
                                            opacity: 0,
                                            scale: 0.5,
                                            rotate: -20,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            scale: 1,
                                            rotate: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                        }}
                                        transition={{
                                            delay: 0.55,
                                            duration: 0.45,
                                        }}
                                        className="text-xl text-[#B89B7A]"
                                    >
                                        ♡
                                    </motion.span>
                                </Float>

                                <motion.div
                                    initial={{
                                        width: 0,
                                    }}
                                    whileInView={{
                                        width: 48,
                                    }}
                                    viewport={{
                                        once: true,
                                    }}
                                    transition={{
                                        delay: 0.8,
                                        duration: 0.6,
                                        ease: [0.25, 1, 0.5, 1],
                                    }}
                                    className="h-px bg-[#B89B7A]"
                                />

                            </motion.div>

                        </div>

                    </div>

                </div>

            </section>
        </FadeUp>
    );
};

export default QuoteSection;