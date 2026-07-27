import { AnimatePresence, motion } from "framer-motion";
import {
    AlertTriangle,
    LoaderCircle,
    Trash2,
    X,
} from "lucide-react";

const DeletePhotoModal = ({
    photo,
    deleting,
    onCancel,
    onConfirm,
}) => {
    return (
        <AnimatePresence>
            {photo && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="
                        fixed
                        inset-0
                        z-[300]
                        flex
                        items-center
                        justify-center
                        bg-black/40
                        p-6
                        backdrop-blur-sm
                    "
                    onClick={deleting ? undefined : onCancel}
                >
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.95,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.95,
                            y: 15,
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                        className="
                            relative
                            w-full
                            max-w-md
                            rounded-3xl
                            bg-white
                            p-8
                            shadow-2xl
                        "
                    >
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={deleting}
                            className="
                                absolute
                                right-5
                                top-5
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                bg-[#F8F6F3]
                                text-[#7B7065]
                                transition
                                hover:bg-[#F3ECE5]
                                disabled:opacity-50
                            "
                        >
                            <X size={18} />
                        </button>

                        <div
                            className="
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                bg-red-50
                            "
                        >
                            <AlertTriangle
                                size={26}
                                className="text-red-500"
                            />
                        </div>

                        <h2
                            className="
                                mt-6
                                font-heading
                                text-2xl
                                text-[#3A312B]
                            "
                        >
                            Usunąć zdjęcie?
                        </h2>

                        <p
                            className="
                                mt-3
                                text-sm
                                leading-6
                                text-[#7B7065]
                            "
                        >
                            Zdjęcie #{photo.id} zostanie trwale
                            usunięte. Tej operacji nie można cofnąć.
                        </p>

                        {photo.mission !== null && (
                            <p
                                className="
                                    mt-3
                                    rounded-xl
                                    bg-[#F8F6F3]
                                    px-4
                                    py-3
                                    text-sm
                                    text-[#6F6255]
                                "
                            >
                                To zdjęcie należy do misji{" "}
                                <strong>
                                    {photo.mission}
                                </strong>
                                . Po usunięciu postęp tej misji
                                zostanie zmniejszony.
                            </p>
                        )}

                        <div className="mt-7 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onCancel}
                                disabled={deleting}
                                className="
                                    rounded-xl
                                    border
                                    border-[#E8DDD2]
                                    px-5
                                    py-3
                                    text-sm
                                    text-[#6F6255]
                                    transition
                                    hover:bg-[#F8F6F3]
                                    disabled:opacity-50
                                "
                            >
                                Anuluj
                            </button>

                            <button
                                type="button"
                                onClick={onConfirm}
                                disabled={deleting}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-red-500
                                    px-5
                                    py-3
                                    text-sm
                                    text-white
                                    transition
                                    hover:bg-red-600
                                    disabled:opacity-60
                                "
                            >
                                {deleting ? (
                                    <>
                                        <LoaderCircle
                                            size={17}
                                            className="animate-spin"
                                        />
                                        Usuwanie...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 size={17} />
                                        Usuń zdjęcie
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DeletePhotoModal;