import { useEffect, useMemo, useState } from "react";
import {
    Eye,
    EyeOff,
    LoaderCircle,
    MessageCircleHeart,
    RefreshCw,
} from "lucide-react";

import WishAdminCard from "../components/WishAdminCard";
import DeleteWishModal from "../components/DeleteWishModal";

const API_URL = import.meta.env.VITE_API_URL;

const AdminWishesPage = () => {
    const [wishes, setWishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedWish, setSelectedWish] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);

    // =========================
    // TOKEN
    // =========================

    const getToken = () => {
        return localStorage.getItem("adminToken");
    };

    // =========================
    // POBIERANIE ŻYCZEŃ
    // =========================

    const fetchWishes = async () => {
        try {
            setLoading(true);
            setError("");

            const token = getToken();

            const response = await fetch(
                `${API_URL}/api/admin/wishes/`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Nie udało się pobrać życzeń."
                );
            }

            const data = await response.json();

            setWishes(data);

        } catch (error) {
            console.error(error);

            setError(
                "Nie udało się załadować życzeń."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishes();
    }, []);

    // =========================
    // UKRYWANIE / PRZYWRACANIE
    // =========================

    const handleVisibility = async (wish) => {
        try {
            setUpdatingId(wish.id);

            const token = getToken();

            const response = await fetch(
                `${API_URL}/api/admin/wishes/${wish.id}/`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },

                    body: JSON.stringify({
                        is_visible: !wish.is_visible,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Nie udało się zmienić widoczności."
                );
            }

            const updatedWish =
                await response.json();

            setWishes((current) =>
                current.map((item) =>
                    item.id === updatedWish.id
                        ? updatedWish
                        : item
                )
            );

        } catch (error) {
            console.error(error);

            alert(
                "Nie udało się zmienić widoczności życzenia."
            );
        } finally {
            setUpdatingId(null);
        }
    };

    // =========================
    // USUWANIE
    // =========================

    const handleDelete = async () => {
        if (!selectedWish) return;

        try {
            setDeleting(true);

            const token = getToken();

            const response = await fetch(
                `${API_URL}/api/admin/wishes/${selectedWish.id}/`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Nie udało się usunąć życzenia."
                );
            }

            setWishes((current) =>
                current.filter(
                    (wish) =>
                        wish.id !== selectedWish.id
                )
            );

            setSelectedWish(null);

        } catch (error) {
            console.error(error);

            alert(
                "Nie udało się usunąć życzenia."
            );
        } finally {
            setDeleting(false);
        }
    };

    // =========================
    // STATYSTYKI
    // =========================

    const stats = useMemo(() => {
        const visible = wishes.filter(
            (wish) => wish.is_visible
        ).length;

        const hidden =
            wishes.length - visible;

        return {
            all: wishes.length,
            visible,
            hidden,
        };
    }, [wishes]);

    return (
        <div className="space-y-6">

            {/* HEADER */}

            <div
                className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >
                <div>

                    <h1 className="text-2xl font-semibold text-[#3A312B]">
                        Życzenia
                    </h1>

                    <p className="mt-1 text-sm text-[#7B7065]">
                        Zarządzaj życzeniami dodanymi przez gości.
                    </p>

                </div>

                <button
                    type="button"
                    onClick={fetchWishes}
                    className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-[#DDD3CA]
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        text-[#4B433C]
                        transition
                        hover:bg-[#F8F6F3]
                    "
                >
                    <RefreshCw size={16} />

                    Odśwież
                </button>

            </div>

            {/* STATYSTYKI */}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                <StatCard
                    label="Wszystkie"
                    value={stats.all}
                    icon={MessageCircleHeart}
                />

                <StatCard
                    label="Widoczne"
                    value={stats.visible}
                    icon={Eye}
                />

                <StatCard
                    label="Ukryte"
                    value={stats.hidden}
                    icon={EyeOff}
                />

            </div>

            {/* LOADING */}

            {loading && (
                <div className="flex min-h-[300px] items-center justify-center">

                    <div className="text-center">

                        <LoaderCircle
                            size={30}
                            className="mx-auto animate-spin text-[#B89B7A]"
                        />

                        <p className="mt-3 text-sm text-[#7B7065]">
                            Ładowanie życzeń...
                        </p>

                    </div>

                </div>
            )}

            {/* ERROR */}

            {!loading && error && (
                <div
                    className="
                        rounded-2xl
                        border
                        border-[#E8DDD2]
                        bg-white
                        p-8
                        text-center
                    "
                >
                    <p className="text-[#6F6255]">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={fetchWishes}
                        className="
                            mt-5
                            rounded-xl
                            bg-[#B89B7A]
                            px-5
                            py-2.5
                            text-sm
                            text-white
                        "
                    >
                        Spróbuj ponownie
                    </button>
                </div>
            )}

            {/* BRAK ŻYCZEŃ */}

            {!loading &&
                !error &&
                wishes.length === 0 && (

                    <div
                        className="
                            flex
                            min-h-[300px]
                            flex-col
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-dashed
                            border-[#D8CCBF]
                            bg-white
                        "
                    >
                        <MessageCircleHeart
                            size={38}
                            strokeWidth={1.4}
                            className="text-[#B89B7A]"
                        />

                        <h2 className="mt-4 text-lg font-medium text-[#3A312B]">
                            Brak życzeń
                        </h2>

                        <p className="mt-2 text-sm text-[#7B7065]">
                            Życzenia gości pojawią się tutaj.
                        </p>

                    </div>
                )}

            {/* LISTA */}

            {!loading &&
                !error &&
                wishes.length > 0 && (

                    <div className="space-y-3">

                        {wishes.map((wish) => (
                            <WishAdminCard
                                key={wish.id}
                                wish={wish}
                                updating={
                                    updatingId === wish.id
                                }
                                onVisibility={() =>
                                    handleVisibility(wish)
                                }
                                onDelete={() =>
                                    setSelectedWish(wish)
                                }
                            />
                        ))}

                    </div>
                )}

            {/* DELETE MODAL */}

            <DeleteWishModal
                wish={selectedWish}
                deleting={deleting}
                onClose={() => {
                    if (!deleting) {
                        setSelectedWish(null);
                    }
                }}
                onConfirm={handleDelete}
            />

        </div>
    );
};


// =========================
// STAT CARD
// =========================

const StatCard = ({
    label,
    value,
    icon: Icon,
}) => {
    return (
        <div
            className="
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-[#E8DDD2]
                bg-white
                p-5
            "
        >
            <div
                className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#F3ECE5]
                "
            >
                <Icon
                    size={20}
                    strokeWidth={1.5}
                    className="text-[#B89B7A]"
                />
            </div>

            <div>
                <p className="text-2xl font-semibold text-[#3A312B]">
                    {value}
                </p>

                <p className="text-xs text-[#8B8075]">
                    {label}
                </p>
            </div>

        </div>
    );
};

export default AdminWishesPage;