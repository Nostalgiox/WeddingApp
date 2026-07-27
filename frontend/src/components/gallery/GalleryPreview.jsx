import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const GalleryPreview = ({
    photo,
    imageUrl,
    onClose,
}) => {
    return (
        <AnimatePresence>

            {photo && (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.25,
                    }}
                    onClick={onClose}
                    className="
                        fixed
                        inset-0
                        z-[200]
                        flex
                        items-center
                        justify-center
                        bg-black/90
                        p-4
                        backdrop-blur-sm
                    "
                >

                    {/* ZAMKNIJ */}

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            absolute
                            right-5
                            top-5
                            z-10
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            bg-white/15
                            text-white
                            backdrop-blur-md
                        "
                    >
                        <X
                            size={23}
                            strokeWidth={1.5}
                        />
                    </button>

                    {/* ZDJĘCIE */}

                    <motion.img
                        key={photo.id}
                        src={imageUrl}
                        alt={`Wspomnienie ${photo.id}`}
                        initial={{
                            opacity: 0,
                            scale: 0.94,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.94,
                        }}
                        transition={{
                            duration: 0.3,
                        }}
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                        className="
                            max-h-[88vh]
                            max-w-full
                            rounded-2xl
                            object-contain
                            shadow-2xl
                        "
                    />

                </motion.div>
            )}

        </AnimatePresence>
    );
};

export default GalleryPreview;