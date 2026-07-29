import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

import Navbar from "../components/navbar/Navbar";
import MobileMenu from "../components/navbar/MobileMenu";

import WishesHeader from "../components/wishes/WishesHeader";
import WishComposer from "../components/wishes/WishComposer";
import WishesFeed from "../components/wishes/WishesFeed";
import WishFormSheet from "../components/wishes/WishFormSheet";

import MainLayout from "../layouts/MainLayout";

const API_URL = import.meta.env.VITE_API_URL;

const WishesPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);

    const [wishes, setWishes] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =========================
    // POBIERANIE ŻYCZEŃ
    // =========================

    const fetchWishes = async (silent = false) => {
        try {
            if (!silent) {
                setLoading(true);
            }

            setError("");

            const response = await fetch(
                `${API_URL}/api/wishes/`
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

            if (!silent) {
                setError(
                    "Nie udało się załadować życzeń."
                );
            }
        } finally {
            if (!silent) {
                setLoading(false);
            }
        }
    };

    // =========================
    // AUTOMATYCZNE ODŚWIEŻANIE
    // =========================

    useEffect(() => {
        fetchWishes();

        const interval = setInterval(() => {
            fetchWishes(true);
        }, 15000);

        const handleVisibilityChange = () => {
            if (
                document.visibilityState === "visible"
            ) {
                fetchWishes(true);
            }
        };

        document.addEventListener(
            "visibilitychange",
            handleVisibilityChange
        );

        return () => {
            clearInterval(interval);

            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, []);

    // =========================
    // NOWE ŻYCZENIE
    // =========================

    const handlePublished = (wish) => {
        setWishes((current) => [
            wish,
            ...current.filter(
                (item) => item.id !== wish.id
            ),
        ]);
    };

    return (
        <MainLayout>

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

            <div className="mx-auto max-w-xl">

                <WishesHeader
                    count={wishes.length}
                />

                <WishComposer
                    onClick={() =>
                        setFormOpen(true)
                    }
                />

                {/* ŁADOWANIE */}

                {loading && (
                    <div className="flex min-h-[300px] items-center justify-center">

                        <div className="text-center">

                            <LoaderCircle
                                size={30}
                                strokeWidth={1.5}
                                className="mx-auto animate-spin text-[#B89B7A]"
                            />

                            <p className="mt-4 text-sm text-[#7B7065]">
                                Ładowanie życzeń...
                            </p>

                        </div>

                    </div>
                )}

                {/* BŁĄD */}

                {!loading && error && (
                    <div
                        className="
                            mx-4
                            mt-6
                            rounded-3xl
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
                            onClick={() =>
                                fetchWishes()
                            }
                            className="
                                mt-5
                                rounded-2xl
                                bg-[#B89B7A]
                                px-6
                                py-3
                                text-white
                            "
                        >
                            Spróbuj ponownie
                        </button>

                    </div>
                )}

                {/* FEED */}

                {!loading && !error && (
                    <WishesFeed
                        wishes={wishes}
                    />
                )}

            </div>

            <WishFormSheet
                open={formOpen}
                onClose={() =>
                    setFormOpen(false)
                }
                onPublished={
                    handlePublished
                }
            />

        </MainLayout>
    );
};

export default WishesPage;