import { Link } from "react-router-dom";
import {
    Camera,
    Heart,
    Image,
    Trophy,
    ArrowRight,
} from "lucide-react";

const cards = [
    {
        title: "MISJE WESELNE",
        icon: Trophy,
        to: "/missions",
        featured: true,
    },
    {
        title: "GALERIA",
        icon: Image,
        to: "/gallery",
    },
    {
        title: "DODAJ ZDJĘCIE",
        icon: Camera,
        to: "/upload",
    },
    {
        title: "ŻYCZENIA",
        icon: Heart,
        to: "/wishes",
    },
];

const ActionCardsSection = () => {
    return (
        <section className="bg-[#F8F6F3] px-6 py-24">

            <div className="mx-auto max-w-md space-y-5">

                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <Link
                            key={card.title}
                            to={card.to}
                            className="
                                group
                                relative
                                block
                                w-full
                                rounded-3xl
                                border
                                bg-white
                                py-10
                                transition-all
                                duration-300
                                active:scale-[0.98]
                            "
                            style={{
                                borderColor: card.featured
                                    ? "#B89B7A"
                                    : "#E8DDD2",
                            }}
                        >

                            {card.featured && (
                                <span
                                    className="
                                        absolute
                                        right-5
                                        top-5
                                        rounded-full
                                        bg-[#B89B7A]
                                        px-3
                                        py-1
                                        text-xs
                                        tracking-wider
                                        text-white
                                    "
                                >
                                    NOWOŚĆ
                                </span>
                            )}

                            <div className="flex flex-col items-center">

                                <Icon
                                    size={46}
                                    strokeWidth={1.5}
                                    className="text-[#B89B7A]"
                                />

                                <h3
                                    className="
                                        mt-7
                                        font-heading
                                        text-2xl
                                        tracking-[0.18em]
                                        text-[#3A312B]
                                        text-center
                                    "
                                >
                                    {card.title}
                                </h3>

                                <ArrowRight
                                    size={30}
                                    strokeWidth={1.5}
                                    className="
                                        mt-8
                                        text-[#B89B7A]
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-2
                                    "
                                />

                            </div>

                        </Link>
                    );
                })}

            </div>

        </section>
    );
};

export default ActionCardsSection;