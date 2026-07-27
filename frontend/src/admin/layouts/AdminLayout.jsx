import { Outlet } from "react-router-dom";
import { Monitor } from "lucide-react";

import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
    return (
        <>
            {/* ========================= */}
            {/* TELEFON                  */}
            {/* ========================= */}

            <div
                className="
                    flex
                    min-h-screen
                    flex-col
                    items-center
                    justify-center
                    bg-[#F8F6F3]
                    px-8
                    text-center
                    md:hidden
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
                        bg-white
                        shadow-sm
                    "
                >
                    <Monitor
                        size={30}
                        strokeWidth={1.5}
                        className="text-[#B89B7A]"
                    />
                </div>

                <h1
                    className="
                        mt-7
                        font-heading
                        text-3xl
                        text-[#3A312B]
                    "
                >
                    Panel administratora
                </h1>

                <p
                    className="
                        mt-4
                        max-w-sm
                        text-sm
                        leading-6
                        text-[#7B7065]
                    "
                >
                    Panel administratora został przygotowany
                    do obsługi na większym ekranie.
                </p>

                <p
                    className="
                        mt-2
                        max-w-sm
                        text-sm
                        leading-6
                        text-[#7B7065]
                    "
                >
                    Otwórz panel na komputerze lub tablecie,
                    aby wygodnie zarządzać zdjęciami i misjami.
                </p>

                <div
                    className="
                        mt-8
                        font-heading
                        text-xl
                        tracking-[0.15em]
                        text-[#4B433C]
                    "
                >
                    S&nbsp;|&nbsp;D
                </div>
            </div>


            {/* ========================= */}
            {/* DESKTOP                  */}
            {/* ========================= */}

            <div
                className="
                    hidden
                    min-h-screen
                    bg-[#F8F6F3]
                    md:block
                "
            >
                <AdminSidebar />

                <main className="ml-64 min-h-screen">
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default AdminLayout;