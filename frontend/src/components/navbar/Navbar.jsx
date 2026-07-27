import { Menu, X } from "lucide-react";

const Navbar = ({
    isOpen,
    onToggle,
}) => {
    return (
        <header
            className="
                fixed
                top-0
                left-0
                z-[110]
                w-full
                border-b
                border-[#E8DDD2]/70
                bg-[#F8F6F3]/70
                backdrop-blur-xl
                transition-all
                duration-300
            "
        >
            <div
                className="
                    mx-auto
                    flex
                    items-center
                    justify-between
                    px-6
                    py-4
                "
            >

                {/* Logo */}

                <div
                    className="
                        font-heading
                        text-[28px]
                        tracking-[0.12em]
                        text-[#4B433C]
                        select-none
                    "
                >
                    S&nbsp;|&nbsp;D
                </div>

                {/* Menu */}

                <button
                    onClick={onToggle}
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        transition-all
                        duration-300
                        active:scale-90
                    "
                >
                    {isOpen ? (
                        <X
                            size={30}
                            strokeWidth={1.75}
                            className="text-[#4B433C]"
                        />
                    ) : (
                        <Menu
                            size={30}
                            strokeWidth={1.75}
                            className="text-[#4B433C]"
                        />
                    )}
                </button>

            </div>
        </header>
    );
};

export default Navbar;