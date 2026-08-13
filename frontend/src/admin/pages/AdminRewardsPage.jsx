import { useEffect, useState } from "react";
import {
    Gift,
    Plus,
    RotateCcw,
    LoaderCircle,
} from "lucide-react";

import AdminHeader from "../components/AdminHeader";

const AdminRewardsPage = () => {
    const [claimedRewards, setClaimedRewards] = useState(0);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [resetting, setResetting] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    const token = localStorage.getItem("adminToken");

    // =========================
    // POBIERANIE LICZNIKA
    // =========================

    const fetchRewards = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/api/admin/rewards/`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Nie udało się pobrać licznika."
                );
            }

            const data = await response.json();

            setClaimedRewards(
                data.claimedRewards
            );
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRewards();
    }, []);

    // =========================
    // ODEBRANO NAGRODĘ
    // =========================

    const handleClaimReward = async () => {
        if (updating || resetting) return;

        try {
            setUpdating(true);

            const response = await fetch(
                `${API_URL}/api/admin/rewards/`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Nie udało się zwiększyć licznika."
                );
            }

            const data = await response.json();

            setClaimedRewards(
                data.claimedRewards
            );
        } catch (error) {
            console.error(error);

            alert(
                "Nie udało się zwiększyć licznika."
            );
        } finally {
            setUpdating(false);
        }
    };

    // =========================
    // RESET LICZNIKA
    // =========================

    const handleResetRewards = async () => {
        if (resetting || updating) return;

        const confirmed = window.confirm(
            "Czy na pewno chcesz wyzerować licznik odebranych nagród?\n\nTej operacji nie można cofnąć."
        );

        if (!confirmed) {
            return;
        }

        try {
            setResetting(true);

            const response = await fetch(
                `${API_URL}/api/admin/rewards/`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Nie udało się wyzerować licznika."
                );
            }

            const data = await response.json();

            setClaimedRewards(
                data.claimedRewards
            );
        } catch (error) {
            console.error(error);

            alert(
                "Nie udało się wyzerować licznika."
            );
        } finally {
            setResetting(false);
        }
    };

    return (
        <section className="p-10">

            <AdminHeader
                title="Nagrody"
                subtitle="Licznik osób, które odebrały nagrodę za ukończenie bingo."
            />

            <div className="mt-10 max-w-xl">

                <div
                    className="
                        rounded-3xl
                        border
                        border-[#E8DDD2]
                        bg-white
                        p-10
                        shadow-sm
                    "
                >

                    {/* IKONA + TYTUŁ */}

                    <div className="flex items-center gap-4">

                        <div
                            className="
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                bg-[#F3ECE5]
                            "
                        >
                            <Gift
                                size={27}
                                strokeWidth={1.5}
                                className="text-[#B89B7A]"
                            />
                        </div>

                        <div>

                            <p className="text-sm text-[#8B8075]">
                                Odebrane nagrody
                            </p>

                            <p className="mt-1 text-sm text-[#A99A8B]">
                                Łączna liczba
                            </p>

                        </div>

                    </div>

                    {/* LICZNIK */}

                    <div className="mt-10 text-center">

                        <p
                            className="
                                font-heading
                                text-7xl
                                text-[#3A312B]
                            "
                        >
                            {loading
                                ? "—"
                                : claimedRewards}
                        </p>

                        <p className="mt-3 text-sm text-[#7B7065]">
                            osób odebrało nagrodę
                        </p>

                    </div>

                    {/* ODEBRANO NAGRODĘ */}

                    <button
                        type="button"
                        onClick={handleClaimReward}
                        disabled={
                            updating ||
                            resetting
                        }
                        className="
                            mt-10
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-3
                            rounded-2xl
                            bg-[#B89B7A]
                            px-6
                            py-4
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:bg-[#A98A69]
                            active:scale-[0.98]
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >

                        {updating ? (
                            <LoaderCircle
                                size={19}
                                strokeWidth={1.8}
                                className="animate-spin"
                            />
                        ) : (
                            <Plus
                                size={19}
                                strokeWidth={1.8}
                            />
                        )}

                        {updating
                            ? "Zapisywanie..."
                            : "Odebrano nagrodę"}

                    </button>

                    {/* RESET */}

                    <button
                        type="button"
                        onClick={handleResetRewards}
                        disabled={
                            resetting ||
                            updating ||
                            loading
                        }
                        className="
                            mt-3
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-3
                            rounded-2xl
                            border
                            border-[#E8DDD2]
                            bg-white
                            px-6
                            py-3.5
                            text-sm
                            font-medium
                            text-[#7B7065]
                            transition
                            hover:bg-[#F8F6F3]
                            active:scale-[0.98]
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >

                        {resetting ? (
                            <LoaderCircle
                                size={18}
                                strokeWidth={1.8}
                                className="animate-spin"
                            />
                        ) : (
                            <RotateCcw
                                size={18}
                                strokeWidth={1.8}
                            />
                        )}

                        {resetting
                            ? "Zerowanie..."
                            : "Wyzeruj licznik"}

                    </button>

                </div>

            </div>

        </section>
    );
};

export default AdminRewardsPage;