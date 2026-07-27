import { NavLink, useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    Images,
    Target,
    Heart,
    LogOut,
} from "lucide-react";

const navigation = [
    {
        name: "Dashboard",
        path: "/admin-panel",
        icon: LayoutDashboard,
        end: true,
    },
    {
        name: "Zdjęcia",
        path: "/admin-panel/photos",
        icon: Images,
    },
    {
        name: "Misje",
        path: "/admin-panel/missions",
        icon: Target,
    },
    {
        name: "Życzenia",
        path: "/admin-panel/wishes",
        icon: Heart,
    },
];

const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUsername");

        navigate("/admin-panel/login", {
            replace: true,
        });
    };

    return (
        <aside
            className="
                fixed
                left-0
                top-0
                flex
                h-screen
                w-64
                flex-col
                border-r
                border-[#E8DDD2]
                bg-white
                px-5
                py-7
            "
        >
            {/* LOGO */}

            <div className="px-3">

                <div
                    className="
                        font-heading
                        text-2xl
                        tracking-[0.15em]
                        text-[#4B433C]
                    "
                >
                    S&nbsp;|&nbsp;D
                </div>

                <p
                    className="
                        mt-2
                        text-xs
                        tracking-[0.15em]
                        text-[#A99A8B]
                    "
                >
                    PANEL ADMINISTRATORA
                </p>

            </div>

            {/* NAWIGACJA */}

            <nav className="mt-12 space-y-2">

                {navigation.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) => `
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                px-4
                                py-3
                                text-sm
                                transition-all
                                ${
                                    isActive
                                        ? "bg-[#F3ECE5] text-[#4B433C]"
                                        : "text-[#7B7065] hover:bg-[#F8F6F3]"
                                }
                            `}
                        >
                            <Icon
                                size={19}
                                strokeWidth={1.6}
                            />

                            {item.name}

                        </NavLink>
                    );
                })}

            </nav>

            {/* WYLOGOWANIE */}

            <div className="mt-auto">

                <button
                    type="button"
                    onClick={handleLogout}
                    className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        text-[#7B7065]
                        transition
                        hover:bg-[#F8F6F3]
                    "
                >
                    <LogOut
                        size={19}
                        strokeWidth={1.6}
                    />

                    Wyloguj
                </button>

            </div>

        </aside>
    );
};

export default AdminSidebar;