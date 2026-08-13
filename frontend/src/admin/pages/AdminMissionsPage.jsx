import { useEffect, useState } from "react";
import {
    Target,
    RefreshCw,
    LoaderCircle,
    Save,
    Pencil,
    CheckCircle2,
} from "lucide-react";

import AdminHeader from "../components/AdminHeader";

const API_URL = import.meta.env.VITE_API_URL;

const AdminMissionsPage = () => {
    const [missions, setMissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [savingId, setSavingId] = useState(null);

    const [form, setForm] = useState({
        title: "",
        icon: "",
        requiredPhotos: 5,
        order: 1,
    });

    // =========================
    // TOKEN
    // =========================

    const getToken = () => {
        return localStorage.getItem("adminToken");
    };

    // =========================
    // POBIERANIE MISJI
    // =========================

    const fetchMissions = async () => {
        const token = getToken();

        if (!token) {
            setError("Brak tokenu administratora.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/api/admin/missions/`,
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

                window.location.href =
                    "/admin-panel/login";

                return;
            }

            if (!response.ok) {
                throw new Error(
                    "Nie udało się pobrać misji."
                );
            }

            const data = await response.json();

            setMissions(data);
        } catch (error) {
            console.error(error);

            setError(
                "Nie udało się załadować misji."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMissions();
    }, []);

    // =========================
    // EDYCJA
    // =========================

    const startEditing = (mission) => {
        setEditingId(mission.id);

        setForm({
            title: mission.title,
            icon: mission.icon,
            requiredPhotos:
                mission.requiredPhotos,
            order: mission.order,
        });
    };

    const cancelEditing = () => {
        setEditingId(null);

        setForm({
            title: "",
            icon: "",
            requiredPhotos: 5,
            order: 1,
        });
    };

    // =========================
    // FORMULARZ
    // =========================

    const handleChange = (field, value) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    // =========================
    // ZAPIS
    // =========================

    const handleSave = async (missionId) => {
        const token = getToken();

        if (!token) {
            setError("Brak tokenu administratora.");
            return;
        }

        if (!form.title.trim()) {
            alert("Podaj nazwę misji.");
            return;
        }

        if (
            !Number.isInteger(
                Number(form.requiredPhotos)
            ) ||
            Number(form.requiredPhotos) < 1
        ) {
            alert(
                "Liczba wymaganych zdjęć musi być większa od 0."
            );
            return;
        }

        if (
            !Number.isInteger(
                Number(form.order)
            ) ||
            Number(form.order) < 1
        ) {
            alert(
                "Kolejność musi być liczbą większą od 0."
            );
            return;
        }

        try {
            setSavingId(missionId);

            const response = await fetch(
                `${API_URL}/api/admin/missions/${missionId}/`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization:
                            `Token ${token}`,
                    },

                    body: JSON.stringify({
                        title: form.title.trim(),
                        icon: form.icon.trim(),
                        requiredPhotos:
                            Number(
                                form.requiredPhotos
                            ),
                        order:
                            Number(form.order),
                    }),
                }
            );

            if (
                response.status === 401 ||
                response.status === 403
            ) {
                localStorage.removeItem(
                    "adminToken"
                );

                localStorage.removeItem(
                    "adminUsername"
                );

                window.location.href =
                    "/admin-panel/login";

                return;
            }

            if (!response.ok) {
                const errorData =
                    await response
                        .json()
                        .catch(() => null);

                console.error(
                    "Błąd zapisu misji:",
                    errorData
                );

                throw new Error(
                    "Nie udało się zapisać misji."
                );
            }

            const updatedMission =
                await response.json();

            setMissions((current) =>
                current
                    .map((mission) =>
                        mission.id ===
                        updatedMission.id
                            ? updatedMission
                            : mission
                    )
                    .sort(
                        (a, b) =>
                            a.order - b.order
                    )
            );

            setEditingId(null);

        } catch (error) {
            console.error(error);

            alert(
                "Nie udało się zapisać zmian w misji."
            );
        } finally {
            setSavingId(null);
        }
    };

    // =========================
    // LOADING
    // =========================

    if (loading) {
        return (
            <>
                <AdminHeader
                    title="Misje"
                    subtitle="Zarządzaj Misjami Weselnymi"
                />

                <div className="flex min-h-[400px] items-center justify-center">
                    <div className="text-center">
                        <LoaderCircle
                            size={32}
                            className="
                                mx-auto
                                animate-spin
                                text-[#B89B7A]
                            "
                        />

                        <p className="mt-4 text-sm text-[#7B7065]">
                            Ładowanie misji...
                        </p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <AdminHeader
                title="Misje"
                subtitle="Zarządzaj Misjami Weselnymi"
            />

            <section className="p-10">

                {/* HEADER */}

                <div
                    className="
                        mb-6
                        flex
                        flex-col
                        gap-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >
                    <div>
                        <h2
                            className="
                                text-xl
                                font-semibold
                                text-[#3A312B]
                            "
                        >
                            Misje Weselne
                        </h2>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-[#7B7065]
                            "
                        >
                            Edytuj treść i ustawienia
                            poszczególnych misji.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={fetchMissions}
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

                {/* ERROR */}

                {error && (
                    <div
                        className="
                            mb-6
                            rounded-2xl
                            border
                            border-[#E8DDD2]
                            bg-white
                            p-6
                        "
                    >
                        <p className="text-[#6F6255]">
                            {error}
                        </p>
                    </div>
                )}

                {/* LISTA MISJI */}

                <div className="space-y-4">

                    {missions.map((mission) => {
                        const isEditing =
                            editingId ===
                            mission.id;

                        const isSaving =
                            savingId ===
                            mission.id;

                        return (
                            <div
                                key={mission.id}
                                className="
                                    rounded-2xl
                                    border
                                    border-[#E8DDD2]
                                    bg-white
                                    p-6
                                "
                            >

                                {/* TOP */}

                                <div
                                    className="
                                        flex
                                        flex-col
                                        gap-5
                                        lg:flex-row
                                        lg:items-center
                                        lg:justify-between
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-4
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                h-14
                                                w-14
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-2xl
                                                bg-[#F3ECE5]
                                                text-2xl
                                            "
                                        >
                                            {isEditing
                                                ? form.icon ||
                                                  "🎯"
                                                : mission.icon ||
                                                  "🎯"}
                                        </div>

                                        <div>
                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    gap-3
                                                "
                                            >
                                                <span
                                                    className="
                                                        rounded-lg
                                                        bg-[#F8F6F3]
                                                        px-2
                                                        py-1
                                                        text-xs
                                                        text-[#8B8075]
                                                    "
                                                >
                                                    #
                                                    {
                                                        mission.order
                                                    }
                                                </span>

                                                <h3
                                                    className="
                                                        text-lg
                                                        font-semibold
                                                        text-[#3A312B]
                                                    "
                                                >
                                                    {
                                                        mission.title
                                                    }
                                                </h3>
                                            </div>

                                            <p
                                                className="
                                                    mt-1
                                                    text-sm
                                                    text-[#8B8075]
                                                "
                                            >
                                                Zdjęcia:{" "}
                                                <span className="font-medium">
                                                    {
                                                        mission.currentPhotos
                                                    }
                                                </span>
                                                {" / "}
                                                {
                                                    mission.requiredPhotos
                                                }
                                            </p>
                                        </div>

                                    </div>

                                    {!isEditing && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                startEditing(
                                                    mission
                                                )
                                            }
                                            className="
                                                flex
                                                items-center
                                                justify-center
                                                gap-2
                                                rounded-xl
                                                border
                                                border-[#DDD3CA]
                                                px-4
                                                py-2.5
                                                text-sm
                                                text-[#4B433C]
                                                transition
                                                hover:bg-[#F8F6F3]
                                            "
                                        >
                                            <Pencil
                                                size={16}
                                            />

                                            Edytuj
                                        </button>
                                    )}

                                </div>

                                {/* EDYCJA */}

                                {isEditing && (
                                    <div
                                        className="
                                            mt-6
                                            border-t
                                            border-[#EEE7E0]
                                            pt-6
                                        "
                                    >

                                        <div
                                            className="
                                                grid
                                                grid-cols-1
                                                gap-5
                                                md:grid-cols-2
                                            "
                                        >

                                            {/* TYTUŁ */}

                                            <label
                                                className="
                                                    md:col-span-2
                                                "
                                            >
                                                <span
                                                    className="
                                                        mb-2
                                                        block
                                                        text-xs
                                                        font-medium
                                                        uppercase
                                                        tracking-wider
                                                        text-[#8B8075]
                                                    "
                                                >
                                                    Tytuł
                                                </span>

                                                <input
                                                    type="text"
                                                    value={
                                                        form.title
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        handleChange(
                                                            "title",
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    className="
                                                        w-full
                                                        rounded-xl
                                                        border
                                                        border-[#DDD3CA]
                                                        bg-[#FCFAF8]
                                                        px-4
                                                        py-3
                                                        text-sm
                                                        text-[#3A312B]
                                                        outline-none
                                                        transition
                                                        focus:border-[#B89B7A]
                                                    "
                                                />
                                            </label>

                                            {/* IKONA */}

                                            <label>
                                                <span
                                                    className="
                                                        mb-2
                                                        block
                                                        text-xs
                                                        font-medium
                                                        uppercase
                                                        tracking-wider
                                                        text-[#8B8075]
                                                    "
                                                >
                                                    Ikona
                                                </span>

                                                <input
                                                    type="text"
                                                    value={
                                                        form.icon
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        handleChange(
                                                            "icon",
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    maxLength={
                                                        20
                                                    }
                                                    className="
                                                        w-full
                                                        rounded-xl
                                                        border
                                                        border-[#DDD3CA]
                                                        bg-[#FCFAF8]
                                                        px-4
                                                        py-3
                                                        text-sm
                                                        text-[#3A312B]
                                                        outline-none
                                                        transition
                                                        focus:border-[#B89B7A]
                                                    "
                                                />
                                            </label>

                                            {/* WYMAGANE */}

                                            <label>
                                                <span
                                                    className="
                                                        mb-2
                                                        block
                                                        text-xs
                                                        font-medium
                                                        uppercase
                                                        tracking-wider
                                                        text-[#8B8075]
                                                    "
                                                >
                                                    Wymagane
                                                    zdjęcia
                                                </span>

                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={
                                                        form.requiredPhotos
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        handleChange(
                                                            "requiredPhotos",
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    className="
                                                        w-full
                                                        rounded-xl
                                                        border
                                                        border-[#DDD3CA]
                                                        bg-[#FCFAF8]
                                                        px-4
                                                        py-3
                                                        text-sm
                                                        text-[#3A312B]
                                                        outline-none
                                                        transition
                                                        focus:border-[#B89B7A]
                                                    "
                                                />
                                            </label>

                                            {/* KOLEJNOŚĆ */}

                                            <label>
                                                <span
                                                    className="
                                                        mb-2
                                                        block
                                                        text-xs
                                                        font-medium
                                                        uppercase
                                                        tracking-wider
                                                        text-[#8B8075]
                                                    "
                                                >
                                                    Kolejność
                                                </span>

                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={
                                                        form.order
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        handleChange(
                                                            "order",
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    className="
                                                        w-full
                                                        rounded-xl
                                                        border
                                                        border-[#DDD3CA]
                                                        bg-[#FCFAF8]
                                                        px-4
                                                        py-3
                                                        text-sm
                                                        text-[#3A312B]
                                                        outline-none
                                                        transition
                                                        focus:border-[#B89B7A]
                                                    "
                                                />
                                            </label>

                                        </div>

                                        {/* INFORMACJA */}

                                        <div
                                            className="
                                                mt-5
                                                flex
                                                items-start
                                                gap-3
                                                rounded-xl
                                                bg-[#F8F6F3]
                                                p-4
                                            "
                                        >
                                            <CheckCircle2
                                                size={18}
                                                className="
                                                    mt-0.5
                                                    shrink-0
                                                    text-[#B89B7A]
                                                "
                                            />

                                            <p
                                                className="
                                                    text-xs
                                                    leading-5
                                                    text-[#7B7065]
                                                "
                                            >
                                                Liczba obecnych
                                                zdjęć jest
                                                obliczana
                                                automatycznie
                                                na podstawie
                                                zdjęć
                                                przypisanych
                                                do tej misji.
                                            </p>
                                        </div>

                                        {/* BUTTONS */}

                                        <div
                                            className="
                                                mt-6
                                                flex
                                                justify-end
                                                gap-3
                                            "
                                        >
                                            <button
                                                type="button"
                                                onClick={
                                                    cancelEditing
                                                }
                                                disabled={
                                                    isSaving
                                                }
                                                className="
                                                    rounded-xl
                                                    border
                                                    border-[#DDD3CA]
                                                    bg-white
                                                    px-5
                                                    py-2.5
                                                    text-sm
                                                    text-[#7B7065]
                                                    transition
                                                    hover:bg-[#F8F6F3]
                                                    disabled:opacity-50
                                                "
                                            >
                                                Anuluj
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleSave(
                                                        mission.id
                                                    )
                                                }
                                                disabled={
                                                    isSaving
                                                }
                                                className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    rounded-xl
                                                    bg-[#B89B7A]
                                                    px-5
                                                    py-2.5
                                                    text-sm
                                                    text-white
                                                    transition
                                                    hover:bg-[#A98A69]
                                                    disabled:opacity-60
                                                "
                                            >
                                                {isSaving ? (
                                                    <>
                                                        <LoaderCircle
                                                            size={
                                                                16
                                                            }
                                                            className="
                                                                animate-spin
                                                            "
                                                        />

                                                        Zapisywanie...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save
                                                            size={
                                                                16
                                                            }
                                                        />

                                                        Zapisz
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                    </div>
                                )}

                            </div>
                        );
                    })}

                </div>

                {/* BRAK MISJI */}

                {missions.length === 0 &&
                    !error && (
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
                            <Target
                                size={40}
                                strokeWidth={1.4}
                                className="text-[#B89B7A]"
                            />

                            <h2
                                className="
                                    mt-4
                                    text-lg
                                    font-medium
                                    text-[#3A312B]
                                "
                            >
                                Brak misji
                            </h2>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-[#7B7065]
                                "
                            >
                                Nie znaleziono żadnych
                                misji.
                            </p>
                        </div>
                    )}

            </section>
        </>
    );
};

export default AdminMissionsPage;