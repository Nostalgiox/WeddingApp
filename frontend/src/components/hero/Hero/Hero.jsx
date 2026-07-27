import heroImage from "../../../assets/images/5.jpg";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
    const { scrollY } = useScroll();

    // Parallax
    const imageScale = useTransform(scrollY, [0, 600], [1, 1.1]);
    const textY = useTransform(scrollY, [0, 600], [0, -100]);
    const textOpacity = useTransform(scrollY, [0, 350], [1, 0]);

    return (
        <section className="relative h-screen overflow-hidden">

            {/* Zdjęcie */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${heroImage})`,
                    scale: imageScale,
                }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/25" />

            {/* Content */}
            <motion.div
                style={{
                    y: textY,
                    opacity: textOpacity,
                }}
                className="relative z-10 flex h-full flex-col items-center px-6 pt-[15vh] text-center text-white"
            >

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                    }}
                    className="font-heading text-5xl md:text-5xl font-light tracking-[0.15em] uppercase"
                >
                    Sandra
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        delay: 0.4,
                        duration: 0.8,
                    }}
                    className="my-0 font-heading text-2xl"
                >
                    &
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.8,
                        duration: 1,
                    }}
                    className="font-heading text-5xl md:text-7xl font-light tracking-[0.15em] uppercase"
                >
                    Dawid
                </motion.h1>

                <div className="flex-1" />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        delay: 1.3,
                        duration: 0.8,
                    }}
                    className="mb-8 max-w-xs text-2xl italic leading-relaxed"
                >
                    Dziękujemy,
                    <br />
                    że jesteście z nami.
                </motion.p>

                <motion.div
                    animate={{
                        y: [0, 10, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="mb-10"
                >
                    <p className="text-2xl">↓</p>

                    <p className="mt-2 text-xs tracking-[0.4em] uppercase">
                        Przewiń
                    </p>
                </motion.div>

            </motion.div>

            {/* Fade */}
            <div className="absolute bottom-0 left-0 h-56 w-full bg-gradient-to-b from-transparent via-[#F8F6F3]/40 to-[#F8F6F3]" />

        </section>
    );
};

export default Hero;