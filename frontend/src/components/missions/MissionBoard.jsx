import { useEffect, useState } from "react";

import MissionTile from "./MissionTile";
import MissionSheet from "./MissionSheet";

import puzzleImage from "../../assets/images/5.jpg";

const MissionBoard = () => {
    const [missions, setMissions] = useState([]);
    const [selectedMission, setSelectedMission] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
    const fetchMissions = async () => {
        try {
            setError(false);

            const response = await fetch(`${API_URL}/api/missions`);

            if (!response.ok) {
                throw new Error("Nie udało się pobrać misji.");
            }

            const data = await response.json();

            setMissions(data);

            // Jeśli Bottom Sheet jest otwarty,
            // aktualizujemy również jego dane.
            setSelectedMission((currentMission) => {
                if (!currentMission) return null;

                return (
                    data.find(
                        (mission) =>
                            mission.id === currentMission.id
                    ) ?? null
                );
            });
        } catch (error) {
            console.error(error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMissions();
    }, []);

    const completedMissions = missions.filter(
        (mission) =>
            mission.currentPhotos >= mission.requiredPhotos
    ).length;

    if (loading) {
        return (
            <section className="px-5 pb-24">
                <div
                    className="
                        mx-auto
                        flex
                        max-w-md
                        items-center
                        justify-center
                        py-20
                        text-sm
                        text-[#7B7065]
                    "
                >
                    Ładowanie misji...
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="px-5 pb-24">
                <div
                    className="
                        mx-auto
                        max-w-md
                        rounded-3xl
                        border
                        border-[#E8DDD2]
                        bg-white
                        p-6
                        text-center
                    "
                >
                    <p className="text-[#6F6255]">
                        Nie udało się pobrać misji.
                    </p>

                    <button
                        type="button"
                        onClick={fetchMissions}
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
            </section>
        );
    }

    return (
        <section className="px-5 pb-24">

            {/* PLANSZA 4x4 */}

            <div
                className="
                    mx-auto
                    grid
                    w-full
                    max-w-md
                    grid-cols-4
                    overflow-hidden
                    rounded-3xl
                    border
                    border-[#D8CCBF]
                    shadow-lg
                "
            >
                {missions.map((mission, index) => (
                    <MissionTile
                        key={mission.id}
                        mission={mission}
                        index={index}
                        puzzleImage={puzzleImage}
                        onClick={() =>
                            setSelectedMission(mission)
                        }
                    />
                ))}
            </div>

            {/* POSTĘP */}

            <div className="mx-auto mt-8 max-w-md">

                <div className="flex items-center justify-between">

                    <p className="text-sm text-[#6F6255]">
                        Odkryte pola
                    </p>

                    <p className="font-heading text-lg text-[#3A312B]">
                        {completedMissions} / {missions.length}
                    </p>

                </div>

                <div
                    className="
                        mt-3
                        h-2
                        overflow-hidden
                        rounded-full
                        bg-[#E8DDD2]
                    "
                >
                    <div
                        className="
                            h-full
                            rounded-full
                            bg-[#B89B7A]
                            transition-all
                            duration-700
                        "
                        style={{
                            width: missions.length
                                ? `${(completedMissions / missions.length) * 100}%`
                                : "0%",
                        }}
                    />
                </div>

            </div>

            <MissionSheet
                mission={selectedMission}
                onClose={() => setSelectedMission(null)}
                onUploaded={fetchMissions}
            />

        </section>
    );
};

export default MissionBoard;