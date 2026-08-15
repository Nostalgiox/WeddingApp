import { useEffect, useState } from "react";

import AdminHeader from "../components/AdminHeader";

const AdminDashboardPage = () => {
    const API_URL = import.meta.env.VITE_API_URL;

    const [photosCount, setPhotosCount] = useState(null);
    const [wishesCount, setWishesCount] = useState(null);
    const [completedMissions, setCompletedMissions] = useState(null);
    const [missionsCount, setMissionsCount] = useState(0);

    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                const headers = {
                    Authorization: `Token ${token}`,
                };

                const [
                    photosResponse,
                    wishesResponse,
                    missionsResponse,
                ] = await Promise.all([
                    fetch(
                        `${API_URL}/api/admin/photos/`,
                        {
                            headers,
                        }
                    ),

                    fetch(
                        `${API_URL}/api/admin/wishes/`,
                        {
                            headers,
                        }
                    ),

                    fetch(
                        `${API_URL}/api/missions/`
                    ),
                ]);

                if (
                    !photosResponse.ok ||
                    !wishesResponse.ok ||
                    !missionsResponse.ok
                ) {
                    throw new Error(
                        "Nie udało się pobrać danych dashboardu."
                    );
                }

                const photos =
                    await photosResponse.json();

                const wishes =
                    await wishesResponse.json();

                const missions =
                    await missionsResponse.json();

                // =========================
                // ZDJĘCIA
                // =========================

                setPhotosCount(
                    photos.length
                );

                // =========================
                // ŻYCZENIA
                // =========================

                setWishesCount(
                    wishes.length
                );

                // =========================
                // MISJE
                // =========================

                const completed = missions.filter(
                    (mission) =>
                        mission.currentPhotos >=
                        mission.requiredPhotos
                ).length;

                setCompletedMissions(
                    completed
                );

                setMissionsCount(
                    missions.length
                );

            } catch (error) {
                console.error(
                    "Błąd dashboardu:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchDashboardData();
        } else {
            setLoading(false);
        }
    }, [API_URL, token]);

    return (
        <>
            <AdminHeader
                title="Dashboard"
                subtitle="Zarządzaj aplikacją weselną"
            />

            <section className="p-10">

                <div className="grid grid-cols-3 gap-6">

                    {/* ========================= */}
                    {/* ZDJĘCIA */}
                    {/* ========================= */}

                    <div
                        className="
                            rounded-2xl
                            border
                            border-[#E8DDD2]
                            bg-white
                            p-6
                        "
                    >
                        <p className="text-sm text-[#8B8075]">
                            Zdjęcia
                        </p>

                        <p
                            className="
                                mt-3
                                font-heading
                                text-4xl
                                text-[#3A312B]
                            "
                        >
                            {loading
                                ? "—"
                                : photosCount}
                        </p>
                    </div>


                    {/* ========================= */}
                    {/* UKOŃCZONE MISJE */}
                    {/* ========================= */}

                    <div
                        className="
                            rounded-2xl
                            border
                            border-[#E8DDD2]
                            bg-white
                            p-6
                        "
                    >
                        <p className="text-sm text-[#8B8075]">
                            Ukończone misje
                        </p>

                        <p
                            className="
                                mt-3
                                font-heading
                                text-4xl
                                text-[#3A312B]
                            "
                        >
                            {loading
                                ? "—"
                                : `${completedMissions} / ${missionsCount}`}
                        </p>
                    </div>


                    {/* ========================= */}
                    {/* ŻYCZENIA */}
                    {/* ========================= */}

                    <div
                        className="
                            rounded-2xl
                            border
                            border-[#E8DDD2]
                            bg-white
                            p-6
                        "
                    >
                        <p className="text-sm text-[#8B8075]">
                            Życzenia
                        </p>

                        <p
                            className="
                                mt-3
                                font-heading
                                text-4xl
                                text-[#3A312B]
                            "
                        >
                            {loading
                                ? "—"
                                : wishesCount}
                        </p>
                    </div>

                </div>

            </section>
        </>
    );
};

export default AdminDashboardPage;