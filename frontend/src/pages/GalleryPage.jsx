import { useEffect, useState } from "react";
import { LoaderCircle, Images } from "lucide-react";
import { motion } from "framer-motion";

import Navbar from "../components/navbar/Navbar";
import MobileMenu from "../components/navbar/MobileMenu";

import GalleryHeader from "../components/gallery/GalleryHeader";
import GalleryGrid from "../components/gallery/GalleryGrid";
import GalleryPreview from "../components/gallery/GalleryPreview";
import MainLayout from "../layouts/MainLayout";

const API_URL = import.meta.env.VITE_API_URL;

const GalleryPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =========================
    // POBIERANIE ZDJĘĆ
    // =========================

    const fetchPhotos = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/api/photos/`
            );

            if (!response.ok) {
                throw new Error(
                    "Nie udało się pobrać zdjęć."
                );
            }

            const data = await response.json();

            // Najnowsze zdjęcia na początku
            const sortedPhotos = [...data].sort(
                (a, b) => b.id - a.id
            );

            setPhotos(sortedPhotos);

        } catch (error) {
            console.error(error);

            setError(
                "Nie udało się załadować galerii."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    // =========================
    // ADRES ZDJĘCIA
    // =========================

    const getImageUrl = (image) => {
        if (!image) return "";

        if (
            image.startsWith("http://") ||
            image.startsWith("https://")
        ) {
            return image;
        }

        return `${API_URL}${image}`;
    };

    return (
        <MainLayout>

            {/* NAVBAR */}

            <Navbar
                isOpen={menuOpen}
                onToggle={() =>
                    setMenuOpen(!menuOpen)
                }
            />

            <MobileMenu
                isOpen={menuOpen}
                onClose={() =>
                    setMenuOpen(false)
                }
            />

            {/* HEADER */}

            <GalleryHeader
                photoCount={photos.length}
            />

            {/* ŁADOWANIE */}

            {loading && (
                <div
                    className="
                        flex
                        min-h-[40vh]
                        items-center
                        justify-center
                    "
                >
                    <div className="text-center">

                        <LoaderCircle
                            size={32}
                            strokeWidth={1.5}
                            className="
                                mx-auto
                                animate-spin
                                text-[#B89B7A]
                            "
                        />

                        <p
                            className="
                                mt-4
                                text-sm
                                text-[#7B7065]
                            "
                        >
                            Ładowanie wspomnień...
                        </p>

                    </div>
                </div>
            )}

            {/* BŁĄD */}

            {!loading && error && (
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 10,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="
                        mx-6
                        rounded-3xl
                        border
                        border-[#E8DDD2]
                        bg-white
                        px-6
                        py-10
                        text-center
                    "
                >
                    <p className="text-[#6F6255]">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={fetchPhotos}
                        className="
                            mt-6
                            rounded-2xl
                            bg-[#B89B7A]
                            px-7
                            py-3
                            text-white
                            transition
                            active:scale-95
                        "
                    >
                        Spróbuj ponownie
                    </button>
                </motion.div>
            )}

            {/* BRAK ZDJĘĆ */}

            {!loading &&
                !error &&
                photos.length === 0 && (

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        className="
                            mx-6
                            flex
                            min-h-[40vh]
                            flex-col
                            items-center
                            justify-center
                            rounded-3xl
                            border
                            border-dashed
                            border-[#D8CCBF]
                        "
                    >

                        <Images
                            size={42}
                            strokeWidth={1.3}
                            className="text-[#B89B7A]"
                        />

                        <h2
                            className="
                                mt-5
                                font-heading
                                text-2xl
                                text-[#3A312B]
                            "
                        >
                            Jeszcze tu pusto
                        </h2>

                        <p
                            className="
                                mt-3
                                text-center
                                leading-6
                                text-[#7B7065]
                            "
                        >
                            Pierwsze wspomnienia
                            <br />
                            pojawią się tutaj już niedługo.
                        </p>

                    </motion.div>
                )}

            {/* GALERIA */}

            {!loading &&
                !error &&
                photos.length > 0 && (

                    <GalleryGrid
                        photos={photos}
                        getImageUrl={getImageUrl}
                        onPhotoClick={setSelectedPhoto}
                    />
                )}

            {/* PODGLĄD */}

            <GalleryPreview
                photo={selectedPhoto}
                imageUrl={
                    selectedPhoto
                        ? getImageUrl(
                            selectedPhoto.image
                        )
                        : ""
                }
                onClose={() =>
                    setSelectedPhoto(null)
                }
            />

        </MainLayout>
    );
};

export default GalleryPage;