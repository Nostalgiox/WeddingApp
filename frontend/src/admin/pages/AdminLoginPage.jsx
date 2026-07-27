import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LockKeyhole, User, LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

const AdminLoginPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const existingToken = localStorage.getItem("adminToken");

    if (existingToken) {
        return (
            <Navigate
                to="/admin-panel"
                replace
            />
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username.trim() || !password) {
            setError("Wpisz login i hasło.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/api/admin/login/`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        username,
                        password,
                    }),
                }
            );

            const data = await response
                .json()
                .catch(() => null);

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error(
                        "To konto nie posiada uprawnień administratora."
                    );
                }

                throw new Error(
                    "Nieprawidłowy login lub hasło."
                );
            }

            if (!data?.token) {
                throw new Error(
                    "Serwer nie zwrócił tokenu logowania."
                );
            }

            localStorage.setItem(
                "adminToken",
                data.token
            );

            if (data.username) {
                localStorage.setItem(
                    "adminUsername",
                    data.username
                );
            }

            navigate(
                "/admin-panel",
                {
                    replace: true,
                }
            );

        } catch (error) {
            console.error(error);

            setError(
                error.message ||
                "Nie udało się zalogować."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main
            className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-[#F8F6F3]
                px-6
                py-12
            "
        >

            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                }}
                className="w-full max-w-md"
            >

                {/* LOGO */}

                <div className="text-center">

                    <div
                        className="
                            font-heading
                            text-4xl
                            tracking-[0.18em]
                            text-[#4B433C]
                        "
                    >
                        S&nbsp;|&nbsp;D
                    </div>

                    <p
                        className="
                            mt-4
                            text-xs
                            tracking-[0.25em]
                            text-[#B89B7A]
                        "
                    >
                        PANEL ADMINISTRATORA
                    </p>

                </div>

                {/* FORMULARZ */}

                <div
                    className="
                        mt-10
                        rounded-3xl
                        border
                        border-[#E8DDD2]
                        bg-white
                        p-8
                        shadow-sm
                    "
                >

                    <div className="text-center">

                        <div
                            className="
                                mx-auto
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                bg-[#F8F6F3]
                            "
                        >
                            <LockKeyhole
                                size={25}
                                strokeWidth={1.5}
                                className="text-[#B89B7A]"
                            />
                        </div>

                        <h1
                            className="
                                mt-5
                                font-heading
                                text-3xl
                                text-[#3A312B]
                            "
                        >
                            Zaloguj się
                        </h1>

                        <p
                            className="
                                mt-2
                                text-sm
                                text-[#8B8075]
                            "
                        >
                            Dostęp tylko dla administratora
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-5"
                    >

                        {/* LOGIN */}

                        <div>

                            <label
                                htmlFor="username"
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    text-[#6F6255]
                                "
                            >
                                Login
                            </label>

                            <div className="relative">

                                <User
                                    size={19}
                                    strokeWidth={1.5}
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-[#A99A8B]
                                    "
                                />

                                <input
                                    id="username"
                                    type="text"
                                    autoComplete="username"
                                    value={username}
                                    onChange={(event) =>
                                        setUsername(
                                            event.target.value
                                        )
                                    }
                                    disabled={loading}
                                    placeholder="Login administratora"
                                    className="
                                        w-full
                                        rounded-2xl
                                        border
                                        border-[#E8DDD2]
                                        bg-[#FDFCFB]
                                        py-4
                                        pl-12
                                        pr-4
                                        text-[#3A312B]
                                        outline-none
                                        transition
                                        placeholder:text-[#B8ADA3]
                                        focus:border-[#B89B7A]
                                        disabled:opacity-60
                                    "
                                />

                            </div>

                        </div>

                        {/* HASŁO */}

                        <div>

                            <label
                                htmlFor="password"
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    text-[#6F6255]
                                "
                            >
                                Hasło
                            </label>

                            <div className="relative">

                                <LockKeyhole
                                    size={19}
                                    strokeWidth={1.5}
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-[#A99A8B]
                                    "
                                />

                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(
                                            event.target.value
                                        )
                                    }
                                    disabled={loading}
                                    placeholder="Hasło"
                                    className="
                                        w-full
                                        rounded-2xl
                                        border
                                        border-[#E8DDD2]
                                        bg-[#FDFCFB]
                                        py-4
                                        pl-12
                                        pr-4
                                        text-[#3A312B]
                                        outline-none
                                        transition
                                        placeholder:text-[#B8ADA3]
                                        focus:border-[#B89B7A]
                                        disabled:opacity-60
                                    "
                                />

                            </div>

                        </div>

                        {/* BŁĄD */}

                        {error && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: -5,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                className="
                                    rounded-2xl
                                    bg-red-50
                                    px-4
                                    py-3
                                    text-center
                                    text-sm
                                    text-red-600
                                "
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* LOGOWANIE */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-2xl
                                bg-[#B89B7A]
                                py-4
                                text-white
                                transition
                                hover:bg-[#A88A69]
                                active:scale-[0.98]
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >

                            {loading ? (
                                <>
                                    <LoaderCircle
                                        size={19}
                                        className="animate-spin"
                                    />

                                    Logowanie...
                                </>
                            ) : (
                                "Zaloguj się"
                            )}

                        </button>

                    </form>

                </div>

            </motion.div>

        </main>
    );
};

export default AdminLoginPage;