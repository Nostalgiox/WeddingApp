import { AnimatePresence, motion } from "framer-motion";
import {
    LoaderCircle,
    Trash2,
    X,
} from "lucide-react";

const DeleteWishModal = ({
    wish,
    deleting,
    onClose,
    onConfirm,
}) => {
    return (
        <AnimatePresence>

            {wish && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={
                            deleting
                                ? undefined
                                : onClose
                        }
                        className="
                            fixed
                            inset-0
                            z-[300]
                            bg-black/40
                            backdrop-blur-sm
                        "
                    />

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.96,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.96,
                            y: 15,
                        }}
                        className="
                            fixed
                            left-1/2
                            top-1/2
                            z-[310]
                            w-[calc(100%-32px)]
                            max-w-md
                            -translate-x-1/2
                            -translate-y-1/2
                            rounded-3xl
                            bg-white
                            p-6
                            shadow-2xl
                        "
                    >

                        <div className="flex justify-end">

                            <button
                                type="button"
                                disabled={deleting}
                                onClick={onClose}
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-[#F8F6F3]
                                    text-[#6F6255]
                                "
                            >
                                <X size={18} />
                            </button>

                        </div>

                        <div
                            className="
                                mx-auto
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-full
                                bg-red-50
                            "
                        >
                            <Trash2
                                size={24}
                                className="text-red-500"
                            />
                        </div>

                        <h2 className="mt-5 text-center text-xl font-semibold text-[#3A312B]">
                            Usunąć życzenie?
                        </h2>

                        <p className="mt-3 text-center text-sm leading-6 text-[#7B7065]">
                            Tej operacji nie będzie można cofnąć.
                            Życzenie zostanie trwale usunięte.
                        </p>

                        <div className="mt-7 flex gap-3">

                            <button
                                type="button"
                                disabled={deleting}
                                onClick={onClose}
                                className="
                                    flex-1
                                    rounded-xl
                                    border
                                    border-[#DDD3CA]
                                    py-3
                                    text-sm
                                    text-[#4B433C]
                                "
                            >
                                Anuluj
                            </button>

                            <button
                                type="button"
                                disabled={deleting}
                                onClick={onConfirm}
                                className="
                                    flex
                                    flex-1
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-red-500
                                    py-3
                                    text-sm
                                    text-white
                                    disabled:opacity-60
                                "
                            >
                                {deleting ? (
                                    <>
                                        <LoaderCircle
                                            size={16}
                                            className="animate-spin"
                                        />

                                        Usuwanie...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 size={16} />

                                        Usuń
                                    </>
                                )}
                            </button>

                        </div>

                    </motion.div>
                </>
            )}

        </AnimatePresence>
    );
};

export default DeleteWishModal;