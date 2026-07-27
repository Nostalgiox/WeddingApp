import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

const UploadConfirmModal = ({
    open,
    onClose,
    onConfirm,
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
                            pt-4
                            shadow-2xl
                        "
                    >

                        {/* Handle */}

                        <div className="mx-auto mb-8 h-1.5 w-14 rounded-full bg-[#D8CCBF]" />

                        <div className="flex justify-center">

                            <CheckCircle2
                                size={48}
                                strokeWidth={1.5}
                                className="text-[#B89B7A]"
                            />

                        </div>

                        <h2 className="mt-6 text-center font-heading text-3xl text-[#3A312B]">
                            Gotowe do wysłania
                        </h2>

                        <p className="mt-4 text-center leading-7 text-[#6F6255]">
                            Czy na pewno chcesz
                            <br />
                            przesłać to zdjęcie?
                        </p>

                        <div className="mt-10 space-y-3">

                            <button
                                onClick={onConfirm}
                                className="
                                    w-full
                                    rounded-2xl
                                    bg-[#B89B7A]
                                    py-4
                                    text-lg
                                    text-white
                                    transition
                                    active:scale-95
                                "
                            >
                                Dodaj zdjęcie
                            </button>

                            <button
                                onClick={onClose}
                                className="
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-2xl
                                    border
                                    border-[#D8CCBF]
                                    py-4
                                    transition
                                    active:scale-95
                                "
                            >
                                <X size={18} />

                                Anuluj

                            </button>

                        </div>

                    </motion.div>

                </>

            )}

        </AnimatePresence>
    );
};

export default UploadConfirmModal;