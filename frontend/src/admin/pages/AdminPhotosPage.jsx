import { useEffect, useMemo, useState } from "react";
import {
    Images,
    RefreshCw,
    LoaderCircle,
    ImageOff,
} from "lucide-react";

import AdminHeader from "../components/AdminHeader";
import PhotoCard from "../components/PhotoCard";
import DeletePhotoModal from "../components/DeletePhotoModal";
import PhotoPreviewModal from "../components/PhotoPreviewModal";

const API_URL = import.meta.env.VITE_API_URL;

const filters = [
    {
        id: "all",
        label: "Wszystkie",
    },
    {
        id: "missions",
        label: "Z misji",
    },
    {
        id: "regular",
        label: "Zwykłe",
    },
];

const AdminPhotosPage = () => {
    const [photos, setPhotos] = useState([]);
    const [activeFilter, setActiveFilter] = useState("all");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [previewPhoto, setPreviewPhoto] = useState(null);
    const [photoToDelete, setPhotoToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    // =========================
    // POBIERANIE ZDJĘĆ
    // =========================

    const fetchPhotos = async () => {
        const token = localStorage.getItem("adminToken");

        if (!token) {
            setError("Brak tokenu administratora.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/api/admin/photos/`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            if (
                response.status === 401 ||
                response.status === 403
            ) {
                localStorage.removeItem("adminToken");
                localStorage.removeItem("adminUsername");

                window.location.href = "/admin-panel/login";
                return;
            }

            if (!response.ok) {
                throw new Error(
                    "Nie udało się pobrać zdjęć."
                );
            }

            const data = await response.json();

            setPhotos(data);

        } catch (error) {
            console.error(error);

            setError(
                "Nie udało się pobrać zdjęć z serwera."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    // =========================
    // FILTROWANIE
    // =========================

    const filteredPhotos = useMemo(() => {
        if (activeFilter === "missions") {
            return photos.filter(
                (photo) => photo.mission !== null
            );
        }

        if (activeFilter === "regular") {
            return photos.filter(
                (photo) => photo.mission === null
            );
        }

        return photos;
    }, [photos, activeFilter]);

    const missionPhotosCount = photos.filter(
        (photo) => photo.mission !== null
    ).length;

    const regularPhotosCount = photos.filter(
        (photo) => photo.mission === null
    ).length;

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

    // =========================
    // USUWANIE ZDJĘCIA
    // =========================

    const handleDeletePhoto = async () => {
        if (!photoToDelete || deleting) return;

        const token = localStorage.getItem("adminToken");

        if (!token) {
            window.location.href = "/admin-panel/login";
            return;
        }

        try {
            setDeleting(true);

            const response = await fetch(
                `${API_URL}/api/admin/photos/${photoToDelete.id}/`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            if (
                response.status === 401 ||
                response.status === 403
            ) {
                localStorage.removeItem("adminToken");
                localStorage.removeItem("adminUsername");

                window.location.href = "/admin-panel/login";
                return;
            }

            if (!response.ok) {
                throw new Error(
                    "Nie udało się usunąć zdjęcia."
                );
            }

            // Usuwamy zdjęcie lokalnie z listy,
            // bez ponownego odświeżania całej strony.

            setPhotos((currentPhotos) =>
                currentPhotos.filter(
                    (photo) =>
                        photo.id !== photoToDelete.id
                )
            );

            // Jeżeli usuwane zdjęcie było otwarte
            // w podglądzie, zamykamy również podgląd.

            if (
                previewPhoto?.id === photoToDelete.id
            ) {
                setPreviewPhoto(null);
            }

            setPhotoToDelete(null);

        } catch (error) {
            console.error(error);

            alert(
                "Nie udało się usunąć zdjęcia. Spróbuj ponownie."
            );
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <AdminHeader
                title="Zdjęcia"
                subtitle="Zarządzaj zdjęciami przesłanymi przez gości"
            />

            <section className="p-10">

                <div className="mx-auto max-w-[1600px]">

                    {/* ========================= */}
                    {/* GÓRNY PANEL              */}
                    {/* ========================= */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-6
                        "
                    >

                        <div>

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-white
                                        shadow-sm
                                    "
                                >
                                    <Images
                                        size={21}
                                        strokeWidth={1.5}
                                        className="text-[#B89B7A]"
                                    />
                                </div>

                                <div>

                                    <p
                                        className="
                                            font-heading
                                            text-2xl
                                            text-[#3A312B]
                                        "
                                    >
                                        Wszystkie zdjęcia
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-sm
                                            text-[#8B8075]
                                        "
                                    >
                                        {photos.length}{" "}
                                        {photos.length === 1
                                            ? "zdjęcie"
                                            : "zdjęć"}
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* ODŚWIEŻ */}

                        <button
                            type="button"
                            onClick={fetchPhotos}
                            disabled={loading}
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-xl
                                border
                                border-[#E8DDD2]
                                bg-white
                                px-4
                                py-3
                                text-sm
                                text-[#6F6255]
                                transition
                                hover:bg-[#F8F6F3]
                                disabled:opacity-50
                            "
                        >
                            <RefreshCw
                                size={17}
                                strokeWidth={1.6}
                                className={
                                    loading
                                        ? "animate-spin"
                                        : ""
                                }
                            />

                            Odśwież
                        </button>

                    </div>

                    {/* ========================= */}
                    {/* FILTRY                    */}
                    {/* ========================= */}

                    <div
                        className="
                            mt-8
                            flex
                            items-center
                            gap-2
                        "
                    >

                        {filters.map((filter) => {
                            let count = photos.length;

                            if (filter.id === "missions") {
                                count = missionPhotosCount;
                            }

                            if (filter.id === "regular") {
                                count = regularPhotosCount;
                            }

                            const active =
                                activeFilter === filter.id;

                            return (
                                <button
                                    key={filter.id}
                                    type="button"
                                    onClick={() =>
                                        setActiveFilter(
                                            filter.id
                                        )
                                    }
                                    className={`
                                        flex
                                        items-center
                                        gap-2
                                        rounded-xl
                                        px-4
                                        py-2.5
                                        text-sm
                                        transition
                                        ${
                                            active
                                                ? "bg-[#4B433C] text-white"
                                                : "border border-[#E8DDD2] bg-white text-[#7B7065] hover:bg-[#F3ECE5]"
                                        }
                                    `}
                                >
                                    {filter.label}

                                    <span
                                        className={`
                                            rounded-full
                                            px-2
                                            py-0.5
                                            text-xs
                                            ${
                                                active
                                                    ? "bg-white/15 text-white"
                                                    : "bg-[#F3ECE5] text-[#8B8075]"
                                            }
                                        `}
                                    >
                                        {count}
                                    </span>

                                </button>
                            );
                        })}

                    </div>

                    {/* ========================= */}
                    {/* ŁADOWANIE                 */}
                    {/* ========================= */}

                    {loading && (
                        <div
                            className="
                                flex
                                min-h-[400px]
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
                                        text-[#8B8075]
                                    "
                                >
                                    Pobieranie zdjęć...
                                </p>

                            </div>
                        </div>
                    )}

                    {/* ========================= */}
                    {/* BŁĄD                      */}
                    {/* ========================= */}

                    {!loading && error && (
                        <div
                            className="
                                mt-10
                                rounded-2xl
                                border
                                border-red-100
                                bg-red-50
                                p-8
                                text-center
                            "
                        >
                            <p className="text-sm text-red-600">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={fetchPhotos}
                                className="
                                    mt-5
                                    rounded-xl
                                    bg-[#4B433C]
                                    px-5
                                    py-3
                                    text-sm
                                    text-white
                                "
                            >
                                Spróbuj ponownie
                            </button>

                        </div>
                    )}

                    {/* ========================= */}
                    {/* BRAK ZDJĘĆ                */}
                    {/* ========================= */}

                    {!loading &&
                        !error &&
                        filteredPhotos.length === 0 && (

                            <div
                                className="
                                    mt-10
                                    flex
                                    min-h-[400px]
                                    flex-col
                                    items-center
                                    justify-center
                                    rounded-3xl
                                    border
                                    border-dashed
                                    border-[#D8CCBF]
                                    bg-white
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-16
                                        w-16
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-[#F8F6F3]
                                    "
                                >
                                    <ImageOff
                                        size={27}
                                        strokeWidth={1.5}
                                        className="text-[#B89B7A]"
                                    />
                                </div>

                                <h2
                                    className="
                                        mt-5
                                        font-heading
                                        text-2xl
                                        text-[#3A312B]
                                    "
                                >
                                    Brak zdjęć
                                </h2>

                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        text-[#8B8075]
                                    "
                                >
                                    W tej kategorii nie ma jeszcze
                                    żadnych zdjęć.
                                </p>

                            </div>
                        )}

                    {/* ========================= */}
                    {/* GRID ZDJĘĆ                */}
                    {/* ========================= */}

                    {!loading &&
                        !error &&
                        filteredPhotos.length > 0 && (

                            <div
                                className="
                                    mt-8
                                    grid
                                    grid-cols-2
                                    gap-5
                                    lg:grid-cols-3
                                    xl:grid-cols-4
                                    2xl:grid-cols-5
                                "
                            >

                                {filteredPhotos.map((photo) => (

                                    <PhotoCard
                                        key={photo.id}
                                        photo={photo}
                                        imageUrl={getImageUrl(
                                            photo.image
                                        )}
                                        onPreview={setPreviewPhoto}
                                        onDelete={setPhotoToDelete}
                                    />

                                ))}

                            </div>
                        )}

                </div>

            </section>

            {/* ========================= */}
            {/* PODGLĄD ZDJĘCIA          */}
            {/* ========================= */}

            <PhotoPreviewModal
                photo={previewPhoto}
                imageUrl={
                    previewPhoto
                        ? getImageUrl(
                            previewPhoto.image
                        )
                        : ""
                }
                onClose={() =>
                    setPreviewPhoto(null)
                }
            />

            {/* ========================= */}
            {/* POTWIERDZENIE USUNIĘCIA  */}
            {/* ========================= */}

            <DeletePhotoModal
                photo={photoToDelete}
                deleting={deleting}
                onCancel={() => {
                    if (!deleting) {
                        setPhotoToDelete(null);
                    }
                }}
                onConfirm={handleDeletePhoto}
            />

        </>
    );
};

export default AdminPhotosPage;