import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";

const SplashScreen = ({ show }) => {
    return (
        <AnimatePresence>

            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="
                        fixed
                        inset-0
                        z-[9999]
                        flex
                        items-center
                        justify-center
                        bg-[#F8F6F3]
                    "
                >
                    <div className="text-center">

                        <motion.h1
                            initial={{
                                opacity: 0,
                                y: 30,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.9,
                                ease: "easeOut",
                            }}
                            className="
                                font-heading
                                text-5xl
                                text-[#3A312B]
                            "
                        >
                            Sandra & Dawid
                        </motion.h1>

                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                delay: 0.4,
                                duration: 0.7,
                            }}
                            className="mt-6 flex justify-center"
                        >
                            <Heart
                                size={20}
                                strokeWidth={1.5}
                                className="text-[#B89B7A]"
                            />
                        </motion.div>

                        <motion.p
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.6,
                                duration: 0.7,
                            }}
                            className="
                                mt-6
                                text-sm
                                tracking-[0.25em]
                                text-[#8B8075]
                            "
                        >
                            22 · 08 · 2026
                        </motion.p>

                    </div>

                </motion.div>
            )}

        </AnimatePresence>
    );
};

export default SplashScreen;