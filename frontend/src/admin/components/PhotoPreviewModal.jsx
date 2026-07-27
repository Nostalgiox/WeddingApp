import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const PhotoPreviewModal = ({
    photo,
    imageUrl,
    onClose,
}) => {
    return (
        <AnimatePresence>
            {photo && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="
                        fixed
                        inset-0
                        z-[250]
                        flex
                        items-center
                        justify-center
                        bg-black/80
                        p-8
                        backdrop-blur-sm
                    "
                >
                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            absolute
                            right-8
                            top-8
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            text-[#3A312B]
                            shadow-lg
                        "
                    >
                        <X size={21} />
                    </button>

                    <motion.div
                        initial={{
                            scale: 0.96,
                            opacity: 0,
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                        }}
                        exit={{
                            scale: 0.96,
                            opacity: 0,
                        }}
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                        className="
                            flex
                            max-h-[90vh]
                            max-w-[90vw]
                            flex-col
                            overflow-hidden
                            rounded-2xl
                            bg-white
                            shadow-2xl
                        "
                    >
                        <img
                            src={imageUrl}
                            alt={`Zdjęcie ${photo.id}`}
                            className="
                                max-h-[78vh]
                                max-w-[90vw]
                                object-contain
                            "
                        />

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                gap-8
                                px-5
                                py-4
                            "
                        >
                            <div>
                                <p
                                    className="
                                        text-sm
                                        font-medium
                                        text-[#3A312B]
                                    "
                                >
                                    Zdjęcie #{photo.id}
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-[#8B8075]
                                    "
                                >
                                    {photo.mission !== null
                                        ? `Misja ${photo.mission}`
                                        : "Zdjęcie gościa"}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PhotoPreviewModal;