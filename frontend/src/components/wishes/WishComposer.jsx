import { PenLine } from "lucide-react";

const WishComposer = ({ onClick }) => {
    return (
        <section className="px-4">

            <button
                type="button"
                onClick={onClick}
                className="
                    flex
                    w-full
                    items-center
                    gap-4
                    rounded-3xl
                    border
                    border-[#E8DDD2]
                    bg-white
                    p-4
                    text-left
                    shadow-sm
                    transition
                    active:scale-[0.98]
                "
            >

                <div
                    className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#F3ECE5]
                    "
                >
                    <PenLine
                        size={20}
                        strokeWidth={1.5}
                        className="text-[#B89B7A]"
                    />
                </div>

                <div className="flex-1">

                    <p className="text-[#6F6255]">
                        Napisz życzenia...
                    </p>

                    <p className="mt-1 text-xs text-[#A79C91]">
                        Możesz podpisać się lub pozostać anonimowo
                    </p>

                </div>

            </button>

        </section>
    );
};

export default WishComposer;