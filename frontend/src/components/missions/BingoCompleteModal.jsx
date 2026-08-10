import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

const BingoCompleteModal = ({
    open,
    onClose,
}) => {
    return (
        <AnimatePresence>

            {open && (
                <>
                    {/* Overlay */}

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="
                            fixed
                            inset-0
                            z-[150]
                            bg-black/40
                            backdrop-blur-sm
                        "
                    />

                    {/* Bottom Sheet */}

                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{
                            type: "spring",
                            damping: 28,
                            stiffness: 260,
                        }}
                        className="
                            fixed
                            bottom-0
                            left-0
                            right-0
                            z-[160]
                            rounded-t-[32px]
                            bg-[#F8F6F3]
                            px-6
                            pb-8
                            pt-5
                            shadow-2xl
                        "
                    >

                        {/* Handle */}

                        <div
                            className="
                                mx-auto
                                mb-7
                                h-1.5
                                w-14
                                rounded-full
                                bg-[#D8CCBF]
                            "
                        />

                        {/* Ikona */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.6,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                delay: 0.15,
                                duration: 0.45,
                            }}
                            className="flex justify-center"
                        >
                            <CheckCircle2
                                size={54}
                                strokeWidth={1.4}
                                className="text-[#B89B7A]"
                            />
                        </motion.div>

                        {/* Tytuł */}

                        <motion.h2
                            initial={{
                                opacity: 0,
                                y: 10,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.25,
                                duration: 0.4,
                            }}
                            className="
                                mt-5
                                text-center
                                font-heading
                                text-3xl
                                text-[#3A312B]
                            "
                        >
                            Gratulacje!
                        </motion.h2>

                        {/* Tekst */}

                        <motion.p
                            initial={{
                                opacity: 0,
                                y: 10,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.35,
                                duration: 0.4,
                            }}
                            className="
                                mt-4
                                text-center
                                leading-7
                                text-[#6F6255]
                            "
                        >
                            Udało Ci się ukończyć
                            <br />
                            bingo weselne!
                            <br />
                            <br />
                            Teraz znajdź osoby,
                            <br />
                            które widnieją na obrazku.
                        </motion.p>

                        {/* Zamknij */}

                        <motion.button
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                delay: 0.5,
                            }}
                            type="button"
                            onClick={onClose}
                            className="
                                mt-8
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-2xl
                                border
                                border-[#D8CCBF]
                                py-4
                                text-[#4B433C]
                                transition
                                active:scale-95
                            "
                        >
                            <X
                                size={18}
                                strokeWidth={1.6}
                            />

                            Zamknij

                        </motion.button>

                    </motion.div>
                </>
            )}

        </AnimatePresence>
    );
};

export default BingoCompleteModal;