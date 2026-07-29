import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    X,
    ChevronLeft,
    ChevronRight,
    Download,
} from "lucide-react";

const GalleryPreview = ({
    photo,
    photos,
    getImageUrl,
    onClose,
    onChange,
}) => {
    // =========================
    // AKTUALNY INDEX
    // =========================

    const currentIndex = photo
        ? photos.findIndex(
              (item) => item.id === photo.id
          )
        : -1;

    const hasPrevious = currentIndex > 0;

    const hasNext =
        currentIndex >= 0 &&
        currentIndex < photos.length - 1;

    // =========================
    // POPRZEDNIE ZDJĘCIE
    // =========================

    const showPrevious = () => {
        if (!hasPrevious) return;

        onChange(
            photos[currentIndex - 1]
        );
    };

    // =========================
    // NASTĘPNE ZDJĘCIE
    // =========================

    const showNext = () => {
        if (!hasNext) return;

        onChange(
            photos[currentIndex + 1]
        );
    };

    // =========================
    // BLOKADA SCROLLA
    // =========================

    useEffect(() => {
        if (!photo) return;

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow =
                previousOverflow;
        };
    }, [photo]);

    // =========================
    // KLAWIATURA
    // =========================

    useEffect(() => {
        if (!photo) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }

            if (event.key === "ArrowLeft") {
                showPrevious();
            }

            if (event.key === "ArrowRight") {
                showNext();
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [
        photo,
        currentIndex,
        hasPrevious,
        hasNext,
    ]);

    // =========================
    // SWIPE
    // =========================

    const handleDragEnd = (
        event,
        info
    ) => {
        const swipeDistance = 70;

        // przesunięcie w lewo
        if (
            info.offset.x < -swipeDistance
        ) {
            showNext();
        }

        // przesunięcie w prawo
        if (
            info.offset.x > swipeDistance
        ) {
            showPrevious();
        }
    };

    // =========================
    // POBIERANIE
    // =========================

    const handleDownload = async () => {
        if (!photo) return;

        try {
            const imageUrl =
                getImageUrl(photo.image);

            const response =
                await fetch(imageUrl);

            if (!response.ok) {
                throw new Error(
                    "Nie udało się pobrać zdjęcia."
                );
            }

            const blob =
                await response.blob();

            const downloadUrl =
                URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = downloadUrl;

            link.download =
                `Sandra-Dawid-${photo.id}.jpg`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            URL.revokeObjectURL(
                downloadUrl
            );
        } catch (error) {
            console.error(error);

            alert(
                "Nie udało się pobrać zdjęcia."
            );
        }
    };

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
                        overflow-hidden
                        bg-black/95
                        backdrop-blur-sm
                    "
                >

                    {/* ========================= */}
                    {/* GÓRNY PASEK              */}
                    {/* ========================= */}

                    <div
                        className="
                            absolute
                            left-0
                            right-0
                            top-0
                            z-30
                            flex
                            items-center
                            justify-between
                            px-5
                            pb-4
                            pt-5
                        "
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        {/* LICZNIK */}

                        <div
                            className="
                                rounded-full
                                bg-white/10
                                px-4
                                py-2
                                text-sm
                                text-white
                                backdrop-blur-md
                            "
                        >
                            {currentIndex + 1}
                            {" / "}
                            {photos.length}
                        </div>

                        <div className="flex gap-2">

                            {/* POBIERZ */}

                            <button
                                type="button"
                                onClick={handleDownload}
                                className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-white/10
                                    text-white
                                    backdrop-blur-md
                                    transition
                                    active:scale-90
                                "
                                aria-label="Pobierz zdjęcie"
                            >
                                <Download
                                    size={21}
                                    strokeWidth={1.5}
                                />
                            </button>

                            {/* ZAMKNIJ */}

                            <button
                                type="button"
                                onClick={onClose}
                                className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-white/10
                                    text-white
                                    backdrop-blur-md
                                    transition
                                    active:scale-90
                                "
                                aria-label="Zamknij"
                            >
                                <X
                                    size={23}
                                    strokeWidth={1.5}
                                />
                            </button>

                        </div>

                    </div>

                    {/* ========================= */}
                    {/* STRZAŁKA LEWA            */}
                    {/* ========================= */}

                    {hasPrevious && (
                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();
                                showPrevious();
                            }}
                            className="
                                absolute
                                left-5
                                top-1/2
                                z-30
                                hidden
                                h-12
                                w-12
                                -translate-y-1/2
                                items-center
                                justify-center
                                rounded-full
                                bg-white/10
                                text-white
                                backdrop-blur-md
                                transition
                                hover:bg-white/20
                                md:flex
                            "
                            aria-label="Poprzednie zdjęcie"
                        >
                            <ChevronLeft
                                size={27}
                                strokeWidth={1.5}
                            />
                        </button>
                    )}

                    {/* ========================= */}
                    {/* ZDJĘCIE                  */}
                    {/* ========================= */}

                    <AnimatePresence
                        mode="wait"
                    >
                        <motion.div
                            key={photo.id}
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
                                duration: 0.22,
                            }}
                            drag="x"
                            dragConstraints={{
                                left: 0,
                                right: 0,
                            }}
                            dragElastic={0.15}
                            onDragEnd={
                                handleDragEnd
                            }
                            onClick={(event) =>
                                event.stopPropagation()
                            }
                            className="
                                flex
                                h-full
                                w-full
                                cursor-grab
                                items-center
                                justify-center
                                px-3
                                pb-20
                                pt-20
                                active:cursor-grabbing
                                md:px-24
                            "
                        >
                            <img
                                src={getImageUrl(
                                    photo.image
                                )}
                                alt={`Wspomnienie ${photo.id}`}
                                draggable={false}
                                className="
                                    max-h-full
                                    max-w-full
                                    select-none
                                    rounded-xl
                                    object-contain
                                    shadow-2xl
                                    md:rounded-2xl
                                "
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* ========================= */}
                    {/* STRZAŁKA PRAWA           */}
                    {/* ========================= */}

                    {hasNext && (
                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();
                                showNext();
                            }}
                            className="
                                absolute
                                right-5
                                top-1/2
                                z-30
                                hidden
                                h-12
                                w-12
                                -translate-y-1/2
                                items-center
                                justify-center
                                rounded-full
                                bg-white/10
                                text-white
                                backdrop-blur-md
                                transition
                                hover:bg-white/20
                                md:flex
                            "
                            aria-label="Następne zdjęcie"
                        >
                            <ChevronRight
                                size={27}
                                strokeWidth={1.5}
                            />
                        </button>
                    )}

                    {/* ========================= */}
                    {/* PODPOWIEDŹ MOBILE        */}
                    {/* ========================= */}

                    {photos.length > 1 && (
                        <motion.p
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 0.55,
                            }}
                            transition={{
                                delay: 0.8,
                            }}
                            className="
                                pointer-events-none
                                absolute
                                bottom-7
                                left-0
                                right-0
                                text-center
                                text-xs
                                tracking-[0.12em]
                                text-white
                                md:hidden
                            "
                        >
                            PRZESUŃ, ABY ZOBACZYĆ WIĘCEJ
                        </motion.p>
                    )}

                </motion.div>
            )}

        </AnimatePresence>
    );
};

export default GalleryPreview;