import { Heart } from "lucide-react";

const Footer = () => {
    return (
        <footer
            className="
                border-t
                border-[#E8DDD2]
                bg-[#F8F6F3]
                px-6
                py-8
                text-center
            "
        >
            <div className="mx-auto max-w-md">

                <p
                    className="
                        font-heading
                        text-2xl
                        text-[#3A312B]
                    "
                >
                    Sandra & Dawid
                </p>

                <div
                    className="
                        my-3
                        flex
                        items-center
                        justify-center
                        gap-3
                    "
                >
                    <span className="h-px w-8 bg-[#D8CCBF]" />

                    <Heart
                        size={13}
                        strokeWidth={1.5}
                        className="text-[#B89B7A]"
                    />

                    <span className="h-px w-8 bg-[#D8CCBF]" />
                </div>

                <p
                    className="
                        text-xs
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