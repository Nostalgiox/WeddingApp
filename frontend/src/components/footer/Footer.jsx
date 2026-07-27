import { Heart } from "lucide-react";

const Footer = () => {
    return (
        <footer
            className="
                border-t
                border-[#E8DDD2]
                bg-[#F8F6F3]
                px-6
                py-14
                text-center
            "
        >
            <div className="mx-auto max-w-md">

                <p
                    className="
                        font-heading
                        text-3xl
                        text-[#3A312B]
                    "
                >
                    Sandra & Dawid
                </p>

                <div
                    className="
                        my-5
                        flex
                        items-center
                        justify-center
                        gap-3
                    "
                >
                    <span className="h-px w-10 bg-[#D8CCBF]" />

                    <Heart
                        size={15}
                        strokeWidth={1.5}
                        className="text-[#B89B7A]"
                    />

                    <span className="h-px w-10 bg-[#D8CCBF]" />
                </div>

                <p
                    className="
                        text-sm
                        tracking-[0.15em]
                        text-[#8B8075]
                    "
                >
                    22 · 08 · 2026
                </p>

            </div>
        </footer>
    );
};

export default Footer;