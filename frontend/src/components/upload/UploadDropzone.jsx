import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    Camera,
    ImagePlus,
    RefreshCw,
    Upload,
    LoaderCircle,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

import UploadConfirmModal from "./UploadConfirmModal";

const API_URL = import.meta.env.VITE_API_URL;

const UploadDropzone = () => {
    const galleryInput = useRef(null);
    const cameraInput = useRef(null);

    const [image, setImage] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState("");

    // =========================
    // WYBÓR ZDJĘCIA
    // =========================

    const handleImage = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (image?.preview) {
            URL.revokeObjectURL(image.preview);
        }

        setUploadError("");
        setUploadSuccess(false);

        setImage({
            file,
            preview: URL.createObjectURL(file),
        });

        // Pozwala wybrać ponownie ten sam plik
        e.target.value = "";
    };

    // =========================
    // CZYSZCZENIE PREVIEW
    // =========================

    useEffect(() => {
        return () => {
            if (image?.preview) {
                URL.revokeObjectURL(image.preview);
            }
        };
    }, [image]);

    // =========================
    // UPLOAD DO DJANGO
    // =========================

    const handleUpload = async () => {
        if (!image?.file || uploading) return;

        try {
            setUploading(true);
            setUploadError("");

            const formData = new FormData();

            formData.append("image", image.file);

            /*
                NIE dodajemy mission.

                Dzięki temu zdjęcie będzie zwykłym
                zdjęciem i nie zostanie przypisane
                do żadnej Misji Weselnej.
            */

            const response = await fetch(
                `${API_URL}/api/photos/`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                const errorData = await response
                    .json()
                    .catch(() => null);

                console.error(
                    "Błąd uploadu:",
                    errorData
                );

                throw new Error(
                    "Nie udało się przesłać zdjęcia."
                );
            }

            const data = await response.json();

            console.log(
                "Zdjęcie zostało dodane:",
                data
            );

            // Zamykamy modal potwierdzenia
            setShowConfirm(false);

            // Pokazujemy ekran sukcesu
            setUploadSuccess(true);

            // Usuwamy podgląd
            if (image.preview) {
                URL.revokeObjectURL(
                    image.preview
                );
            }

            setImage(null);

        } catch (error) {
            console.error(error);

            setUploadError(
                "Nie udało się przesłać zdjęcia. Sprawdź połączenie i spróbuj ponownie."
            );

            setShowConfirm(false);

        } finally {
            setUploading(false);
        }
    };

    // =========================
    // KOLEJNE ZDJĘCIE
    // =========================

    const handleAddAnother = () => {
        setUploadSuccess(false);
        setUploadError("");
        setImage(null);
    };

    return (
        <section className="px-6 pb-36">

            <AnimatePresence mode="wait">

                {/* ========================= */}
                {/* SUKCES                    */}
                {/* ========================= */}

                {uploadSuccess ? (

                    <motion.div
                        key="success"
                        initial={{
                            opacity: 0,
                            scale: 0.95,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.95,
                        }}
                        transition={{
                            duration: 0.4,
                        }}
                        className="
                            rounded-3xl
                            border
                            border-[#E8DDD2]
                            bg-white
                            px-6
                            py-12
                            text-center
                            shadow-sm
                        "
                    >

                        <motion.div
                            initial={{
                                scale: 0,
                            }}
                            animate={{
                                scale: 1,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 220,
                                damping: 16,
                                delay: 0.1,
                            }}
                            className="
                                mx-auto
                                flex
                                h-20
                                w-20
                                items-center
                                justify-center
                                rounded-full
                                bg-[#F3ECE5]
                            "
                        >
                            <CheckCircle2
                                size={40}
                                strokeWidth={1.5}
                                className="text-[#B89B7A]"
                            />
                        </motion.div>

                        <h2
                            className="
                                mt-7
                                font-heading
                                text-3xl
                                text-[#3A312B]
                            "
                        >
                            Zdjęcie dodane!
                        </h2>

                        <p
                            className="
                                mt-4
                                leading-7
                                text-[#6F6255]
                            "
                        >
                            Dziękujemy za podzielenie się
                            <br />
                            z nami tym wspomnieniem.
                        </p>

                        <button
                            type="button"
                            onClick={handleAddAnother}
                            className="
                                mt-8
                                w-full
                                rounded-2xl
                                bg-[#B89B7A]
                                py-4
                                text-white
                                transition-all
                                duration-200
                                active:scale-95
                            "
                        >
                            Dodaj kolejne zdjęcie
                        </button>

                    </motion.div>

                ) : !image ? (

                    /* ========================= */
                    /* WYBÓR ŹRÓDŁA             */
                    /* ========================= */

                    <motion.div
                        key="picker"
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: -20,
                        }}
                        transition={{
                            duration: 0.35,
                        }}
                        className="space-y-5"
                    >

                        {/* BŁĄD */}

                        {uploadError && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: -10,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                className="
                                    flex
                                    items-start
                                    gap-3
                                    rounded-2xl
                                    border
                                    border-red-100
                                    bg-red-50
                                    p-4
                                "
                            >
                                <AlertCircle
                                    size={20}
                                    className="
                                        mt-0.5
                                        shrink-0
                                        text-red-500
                                    "
                                />

                                <p
                                    className="
                                        text-sm
                                        leading-6
                                        text-red-600
                                    "
                                >
                                    {uploadError}
                                </p>
                            </motion.div>
                        )}

                        {/* GALERIA */}

                        <button
                            type="button"
                            onClick={() =>
                                galleryInput.current?.click()
                            }
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

                                <h2
                                    className="
                                        mt-6
                                        font-heading
                                        text-2xl
                                        text-[#3A312B]
                                    "
                                >
                                    Galeria
                                </h2>

                                <p className="mt-2 text-[#7B7065]">
                                    Wybierz zdjęcie z telefonu
                                </p>

                            </div>

                        </button>

                        {/* APARAT */}

                        <button
                            type="button"
                            onClick={() =>
                                cameraInput.current?.click()
                            }
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

                                <h2
                                    className="
                                        mt-6
                                        font-heading
                                        text-2xl
                                        text-[#3A312B]
                                    "
                                >
                                    Aparat
                                </h2>

                                <p className="mt-2 text-[#7B7065]">
                                    Zrób nowe zdjęcie
                                </p>

                            </div>

                        </button>

                    </motion.div>

                ) : (

                    /* ========================= */
                    /* PODGLĄD                  */
                    /* ========================= */

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

                        {/* STICKY BOTTOM */}

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
                                pb-7
                                pt-4
                                backdrop-blur-xl
                            "
                        >

                            <div className="mx-auto flex max-w-md gap-3">

                                <button
                                    type="button"
                                    disabled={uploading}
                                    onClick={() =>
                                        galleryInput.current?.click()
                                    }
                                    className="
                                        flex-1
                                        rounded-2xl
                                        border
                                        border-[#D8CCBF]
                                        py-4
                                        transition-all
                                        duration-200
                                        active:scale-95
                                        disabled:opacity-50
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                        "
                                    >
                                        <RefreshCw size={18} />

                                        Zmień
                                    </div>

                                </button>

                                <button
                                    type="button"
                                    disabled={uploading}
                                    onClick={() =>
                                        setShowConfirm(true)
                                    }
                                    className="
                                        flex-[2]
                                        rounded-2xl
                                        bg-[#B89B7A]
                                        py-4
                                        text-white
                                        transition-all
                                        duration-200
                                        active:scale-95
                                        disabled:opacity-60
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                        "
                                    >
                                        {uploading ? (
                                            <>
                                                <LoaderCircle
                                                    size={18}
                                                    className="animate-spin"
                                                />

                                                Wysyłanie...
                                            </>
                                        ) : (
                                            <>
                                                <Upload size={18} />

                                                Dodaj zdjęcie
                                            </>
                                        )}
                                    </div>

                                </button>

                            </div>

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

            {/* ========================= */}
            {/* INPUT GALERIA            */}
            {/* ========================= */}

            <input
                ref={galleryInput}
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
            />

            {/* ========================= */}
            {/* INPUT APARAT             */}
            {/* ========================= */}

            <input
                ref={cameraInput}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImage}
                className="hidden"
            />

            {/* ========================= */}
            {/* POTWIERDZENIE            */}
            {/* ========================= */}

            <UploadConfirmModal
                open={showConfirm}
                uploading={uploading}
                onClose={() => {
                    if (!uploading) {
                        setShowConfirm(false);
                    }
                }}
                onConfirm={handleUpload}
            />

        </section>
    );
};

export default UploadDropzone;