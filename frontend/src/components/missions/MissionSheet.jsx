import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    Camera,
    ImagePlus,
    X,
    RefreshCw,
    Upload,
    ArrowLeft,
} from "lucide-react";

const MissionSheet = ({
    mission,
    onClose,
    onUploaded,
}) => {
    const galleryInput = useRef(null);
    const cameraInput = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const API_URL = import.meta.env.VITE_API_URL;
    const progress = mission
        ? Math.min(
              mission.currentPhotos / mission.requiredPhotos,
              1
          )
        : 0;

    // Czyści wybrane zdjęcie po zamknięciu misji
    useEffect(() => {
        if (!mission) {
            setSelectedFile(null);
            setPreview(null);
            setUploadError("");
        }
    }, [mission]);

    // Czyszczenie Object URL
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    // Wybranie zdjęcia z galerii lub aparatu
    const handleImage = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (preview) {
            URL.revokeObjectURL(preview);
        }

        const previewUrl = URL.createObjectURL(file);

        setSelectedFile(file);
        setPreview(previewUrl);
        setUploadError("");

        // Pozwala później wybrać ponownie ten sam plik
        event.target.value = "";
    };

    // Zmiana zdjęcia
    const handleChangeImage = () => {
        galleryInput.current?.click();
    };

    // Powrót z podglądu
    const handleBack = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }

        setSelectedFile(null);
        setPreview(null);
        setUploadError("");
    };

    // Faktyczne wysłanie zdjęcia do Django
    const handleUpload = async () => {
        if (!selectedFile || !mission || uploading) return;

        try {
            setUploading(true);
            setUploadError("");

            const formData = new FormData();

            formData.append("image", selectedFile);
            formData.append("mission", mission.id);

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

                console.error("Błąd API:", errorData);

                throw new Error(
                    "Nie udało się dodać zdjęcia."
                );
            }

            const photo = await response.json();

            console.log("Dodano zdjęcie:", photo);

            // Odświeżamy misje.
            // Django policzy nową wartość currentPhotos.
            if (onUploaded) {
                await onUploaded();
            }

            // Czyścimy podgląd
            if (preview) {
                URL.revokeObjectURL(preview);
            }

            setSelectedFile(null);
            setPreview(null);
            setUploadError("");

            // Zamykamy Bottom Sheet
            onClose();

        } catch (error) {
            console.error(error);

            setUploadError(
                "Nie udało się dodać zdjęcia. Spróbuj ponownie."
            );
        } finally {
            setUploading(false);
        }
    };

    return (
        <AnimatePresence>

            {mission && (
                <motion.div
                    key="mission-sheet-wrapper"
                    className="fixed inset-0 z-[150]"
                >

                    {/* TŁO */}

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
                            duration: 0.3,
                        }}
                        onClick={onClose}
                        className="
                            absolute
                            inset-0
                            bg-black/40
                            backdrop-blur-sm
                        "
                    />

                    {/* BOTTOM SHEET */}

                    <motion.div
                        initial={{
                            y: "100%",
                        }}
                        animate={{
                            y: 0,
                        }}
                        exit={{
                            y: "100%",
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 28,
                        }}
                        className="
                            absolute
                            bottom-0
                            left-0
                            right-0
                            max-h-[92vh]
                            overflow-y-auto
                            rounded-t-[32px]
                            bg-[#F8F6F3]
                            px-6
                            pb-8
                            pt-4
                            shadow-2xl
                        "
                    >

                        {/* UCHWYT */}

                        <div
                            className="
                                mx-auto
                                h-1.5
                                w-14
                                rounded-full
                                bg-[#D8CCBF]
                            "
                        />

                        {/* ZAMKNIJ */}

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={uploading}
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
                                bg-white
                                text-[#4B433C]
                                shadow-sm
                                transition
                                active:scale-90
                                disabled:opacity-50
                            "
                        >
                            <X size={20} />
                        </button>

                        <AnimatePresence mode="wait">

                            {!preview ? (

                                /* ========================= */
                                /*       WIDOK MISJI         */
                                /* ========================= */

                                <motion.div
                                    key="mission"
                                    initial={{
                                        opacity: 0,
                                        x: -20,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        x: -20,
                                    }}
                                    transition={{
                                        duration: 0.25,
                                    }}
                                >

                                    <div className="mt-7 text-center">

                                        {/* IKONA */}

                                        <div className="text-5xl">
                                            {mission.icon}
                                        </div>

                                        {/* NUMER MISJI */}

                                        <p
                                            className="
                                                mt-5
                                                text-xs
                                                tracking-[0.25em]
                                                text-[#B89B7A]
                                            "
                                        >
                                            MISJA {mission.id}
                                        </p>

                                        {/* TYTUŁ */}

                                        <h2
                                            className="
                                                mt-2
                                                font-heading
                                                text-3xl
                                                text-[#3A312B]
                                            "
                                        >
                                            {mission.title}
                                        </h2>

                                        {/* POSTĘP */}

                                        <div className="mx-auto mt-7 max-w-xs">

                                            <div
                                                className="
                                                    flex
                                                    justify-between
                                                    text-sm
                                                "
                                            >

                                                <span className="text-[#6F6255]">
                                                    Postęp
                                                </span>

                                                <span className="text-[#3A312B]">
                                                    {mission.currentPhotos}
                                                    {" / "}
                                                    {mission.requiredPhotos}
                                                </span>

                                            </div>

                                            {/* PASEK POSTĘPU */}

                                            <div
                                                className="
                                                    mt-3
                                                    h-2
                                                    overflow-hidden
                                                    rounded-full
                                                    bg-[#E8DDD2]
                                                "
                                            >

                                                <motion.div
                                                    initial={{
                                                        width: 0,
                                                    }}
                                                    animate={{
                                                        width: `${progress * 100}%`,
                                                    }}
                                                    transition={{
                                                        duration: 0.6,
                                                    }}
                                                    className="
                                                        h-full
                                                        rounded-full
                                                        bg-[#B89B7A]
                                                    "
                                                />

                                            </div>

                                        </div>

                                    </div>

                                    {/* OPCJE DODANIA ZDJĘCIA */}

                                    <div className="mt-9 space-y-3">

                                        {/* GALERIA */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                galleryInput.current?.click()
                                            }
                                            className="
                                                flex
                                                w-full
                                                items-center
                                                justify-center
                                                gap-3
                                                rounded-2xl
                                                bg-[#B89B7A]
                                                py-4
                                                text-white
                                                transition
                                                active:scale-[0.98]
                                            "
                                        >
                                            <ImagePlus size={21} />

                                            Wybierz z galerii
                                        </button>

                                        {/* APARAT */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                cameraInput.current?.click()
                                            }
                                            className="
                                                flex
                                                w-full
                                                items-center
                                                justify-center
                                                gap-3
                                                rounded-2xl
                                                border
                                                border-[#D8CCBF]
                                                py-4
                                                text-[#3A312B]
                                                transition
                                                active:scale-[0.98]
                                            "
                                        >
                                            <Camera size={21} />

                                            Zrób zdjęcie
                                        </button>

                                    </div>

                                </motion.div>

                            ) : (

                                /* ========================= */
                                /*      PODGLĄD ZDJĘCIA      */
                                /* ========================= */

                                <motion.div
                                    key="preview"
                                    initial={{
                                        opacity: 0,
                                        x: 30,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        x: 30,
                                    }}
                                    transition={{
                                        duration: 0.25,
                                    }}
                                >

                                    {/* POWRÓT */}

                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        disabled={uploading}
                                        className="
                                            absolute
                                            left-5
                                            top-5
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-white
                                            text-[#4B433C]
                                            shadow-sm
                                            transition
                                            active:scale-90
                                            disabled:opacity-50
                                        "
                                    >
                                        <ArrowLeft size={20} />
                                    </button>

                                    {/* NAGŁÓWEK */}

                                    <div className="mt-8 text-center">

                                        <p
                                            className="
                                                text-xs
                                                tracking-[0.25em]
                                                text-[#B89B7A]
                                            "
                                        >
                                            MISJA {mission.id}
                                        </p>

                                        <h2
                                            className="
                                                mt-2
                                                font-heading
                                                text-2xl
                                                text-[#3A312B]
                                            "
                                        >
                                            {mission.title}
                                        </h2>

                                    </div>

                                    {/* PODGLĄD */}

                                    <div
                                        className="
                                            mt-6
                                            overflow-hidden
                                            rounded-3xl
                                            bg-[#E8DDD2]
                                            shadow-md
                                        "
                                    >
                                        <img
                                            src={preview}
                                            alt="Podgląd zdjęcia"
                                            className="
                                                h-[42vh]
                                                w-full
                                                object-cover
                                            "
                                        />
                                    </div>

                                    {/* INFORMACJA */}

                                    <p
                                        className="
                                            mt-4
                                            text-center
                                            text-sm
                                            leading-6
                                            text-[#7B7065]
                                        "
                                    >
                                        Zdjęcie zostanie dodane do misji{" "}

                                        <span
                                            className="
                                                font-medium
                                                text-[#3A312B]
                                            "
                                        >
                                            „{mission.title}”
                                        </span>.
                                    </p>

                                    {/* PRZYCISKI */}

                                    <div className="mt-6 flex gap-3">

                                        {/* ZMIEŃ */}

                                        <button
                                            type="button"
                                            onClick={handleChangeImage}
                                            disabled={uploading}
                                            className="
                                                flex
                                                flex-1
                                                items-center
                                                justify-center
                                                gap-2
                                                rounded-2xl
                                                border
                                                border-[#D8CCBF]
                                                py-4
                                                text-[#3A312B]
                                                transition
                                                active:scale-[0.98]
                                                disabled:opacity-50
                                            "
                                        >
                                            <RefreshCw size={18} />

                                            Zmień
                                        </button>

                                        {/* WYŚLIJ */}

                                        <button
                                            type="button"
                                            onClick={handleUpload}
                                            disabled={uploading}
                                            className="
                                                flex
                                                flex-[2]
                                                items-center
                                                justify-center
                                                gap-2
                                                rounded-2xl
                                                bg-[#B89B7A]
                                                py-4
                                                text-white
                                                transition
                                                active:scale-[0.98]
                                                disabled:cursor-not-allowed
                                                disabled:opacity-60
                                            "
                                        >

                                            {uploading ? (
                                                <>
                                                    <RefreshCw
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

                                        </button>

                                    </div>

                                    {/* BŁĄD UPLOADU */}

                                    <AnimatePresence>

                                        {uploadError && (
                                            <motion.p
                                                initial={{
                                                    opacity: 0,
                                                    y: 5,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                }}
                                                className="
                                                    mt-4
                                                    text-center
                                                    text-sm
                                                    text-red-500
                                                "
                                            >
                                                {uploadError}
                                            </motion.p>
                                        )}

                                    </AnimatePresence>

                                </motion.div>
                            )}

                        </AnimatePresence>

                        {/* INPUT GALERII */}

                        <input
                            ref={galleryInput}
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="hidden"
                        />

                        {/* INPUT APARATU */}

                        <input
                            ref={cameraInput}
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleImage}
                            className="hidden"
                        />

                    </motion.div>

                </motion.div>
            )}

        </AnimatePresence>
    );
};

export default MissionSheet;