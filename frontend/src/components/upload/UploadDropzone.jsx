import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    Camera,
    ImagePlus,
    RefreshCw,
    Upload,
} from "lucide-react";
import UploadConfirmModal from "./UploadConfirmModal";

const UploadDropzone = () => {
    const galleryInput = useRef(null);
    const cameraInput = useRef(null);

    const [image, setImage] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleImage = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (image?.preview) {
            URL.revokeObjectURL(image.preview);
        }

        setImage({
            file,
            preview: URL.createObjectURL(file),
        });
    };

    useEffect(() => {
        return () => {
            if (image?.preview) {
                URL.revokeObjectURL(image.preview);
            }
        };
    }, [image]);

    return (
        <section className="px-6 pb-36">

            <AnimatePresence mode="wait">

                {!image ? (

                    <motion.div
                        key="picker"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35 }}
                        className="space-y-5"
                    >

                        {/* GALERIA */}

                        <button
                            onClick={() => galleryInput.current.click()}
                            className="
                                w-full
                                rounded-3xl
                                border
                                border-[#E8DDD2]
                                bg-white
                                py-10
                                shadow-sm
                                transition-all
                                duration-200
                                active:scale-95
                            "
                        >

                            <div className="flex flex-col items-center">

                                <ImagePlus
                                    size={52}
                                    strokeWidth={1.5}
                                    className="text-[#B89B7A]"
                                />

                                <h2 className="mt-6 font-heading text-2xl text-[#3A312B]">
                                    Galeria
                                </h2>

                                <p className="mt-2 text-[#7B7065]">
                                    Wybierz zdjęcie z telefonu
                                </p>

                            </div>

                        </button>

                        {/* APARAT */}

                        <button
                            onClick={() => cameraInput.current.click()}
                            className="
                                w-full
                                rounded-3xl
                                border
                                border-[#E8DDD2]
                                bg-white
                                py-10
                                shadow-sm
                                transition-all
                                duration-200
                                active:scale-95
                            "
                        >

                            <div className="flex flex-col items-center">

                                <Camera
                                    size={52}
                                    strokeWidth={1.5}
                                    className="text-[#B89B7A]"
                                />

                                <h2 className="mt-6 font-heading text-2xl text-[#3A312B]">
                                    Aparat
                                </h2>

                                <p className="mt-2 text-[#7B7065]">
                                    Zrób nowe zdjęcie
                                </p>

                            </div>

                        </button>

                    </motion.div>

                ) : (

                    <motion.div
                        key="preview"
                        initial={{
                            opacity: 0,
                            scale: 0.96,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.96,
                        }}
                        transition={{
                            duration: 0.35,
                        }}
                    >

                        <motion.img
                            src={image.preview}
                            alt="Podgląd zdjęcia"
                            initial={{
                                opacity: 0,
                                scale: 0.95,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                duration: 0.4,
                            }}
                            className="
                                h-[55vh]
                                w-full
                                rounded-3xl
                                object-cover
                                shadow-md
                            "
                        />

                        {/* Sticky Bottom */}

                        <div
                            className="
                                fixed
                                bottom-0
                                left-0
                                right-0
                                z-40
                                border-t
                                border-[#E8DDD2]
                                bg-[#F8F6F3]/95
                                px-5
                                pt-4
                                pb-7
                                backdrop-blur-xl
                            "
                        >

                            <div className="mx-auto flex max-w-md gap-3">

                                <button
                                    onClick={() => galleryInput.current.click()}
                                    className="
                                        flex-1
                                        rounded-2xl
                                        border
                                        border-[#D8CCBF]
                                        py-4
                                        transition-all
                                        duration-200
                                        active:scale-95
                                    "
                                >

                                    <div className="flex items-center justify-center gap-2">

                                        <RefreshCw size={18} />

                                        Zmień

                                    </div>

                                </button>

                                <button
                                    onClick={() => setShowConfirm(true)}
                                    className="
                                        flex-[2]
                                        rounded-2xl
                                        bg-[#B89B7A]
                                        py-4
                                        text-white
                                        transition-all
                                        duration-200
                                        active:scale-95
                                    "
                                >

                                    <div className="flex items-center justify-center gap-2">

                                        <Upload size={18} />

                                        Dodaj zdjęcie

                                    </div>

                                </button>

                            </div>

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

            {/* Input Galeria */}

            <input
                ref={galleryInput}
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
            />

            {/* Input Aparat */}

            <input
                ref={cameraInput}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImage}
                className="hidden"
            />

            <UploadConfirmModal
                open={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={() => {
                    console.log("UPLOAD");
                    setShowConfirm(false);
                }}
            />

        </section>
    );
};

export default UploadDropzone;