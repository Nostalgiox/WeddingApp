import { Link } from "react-router-dom";
import {
    Camera,
    Heart,
    Image,
    Trophy,
    ArrowRight,
} from "lucide-react";

import { Stagger } from "../../animations";
import { motion } from "framer-motion";
import SectionTitle from "../common/SectionTitle";
const cards = [
    {
        title: "Misje weselne",
        subtitle: "Poznaj wyzwania",
        icon: Trophy,
        to: "/missions",
        accent: "#B89B7A",
        featured: true,
    },
    {
        title: "Galeria",
        subtitle: "Zobacz wspomnienia",
        icon: Image,
        to: "/gallery",
        accent: "#CBB59A",
    },
    {
        title: "Dodaj zdjęcie",
        subtitle: "Podziel się chwilą",
        icon: Camera,
        to: "/upload",
        accent: "#9DB9C7",
    },
    {
        title: "Życzenia",
        subtitle: "Napisz kilka słów",
        icon: Heart,
        to: "/wishes",
        accent: "#D4A6AE",
    },
];

const ActionCardsSection = () => {
    return (
        <section className="bg-[#F8F6F3] px-6 py-20">

            <Stagger>

                <div className="mx-auto max-w-md">

                    {/* Nagłówek */}

                    <motion.div
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 20,
                            },
                            show: {
                                opacity: 1,
                                y: 0,
                            },
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                        className="mb-10 text-center"
                    >

                        <div className="mx-auto mb-6 h-px w-16 bg-[#D8CCBF]" />

                        <SectionTitle
                            eyebrow="RAZEM ŚWIĘTUJMY"
                            title="Wybierz, od czego chcesz zacząć"
                        />

                        <p
                            className="
                                mt-4
                                text-[#7B7065]
                            "
                        >
                            Wszystkie najważniejsze
                            funkcje znajdziesz poniżej.
                        </p>

                    </motion.div>

                    <div className="space-y-4">
                    {cards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <motion.div
                                key={card.title}
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        y: 20,
                                    },
                                    show: {
                                        opacity: 1,
                                        y: 0,
                                    },
                                }}
                                transition={{
                                    duration: 0.5,
                                }}
                            >
                                <Link
                                    to={card.to}
                                    className="
                                        group
                                        block
                                        rounded-2xl
                                        border
                                        bg-white
                                        px-5
                                        py-5
                                        shadow-sm
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:shadow-xl
                                        active:scale-[0.98]
                                    "
                                    style={{
                                        borderColor: card.featured
                                            ? card.accent
                                            : "#E8DDD2",
                                    }}
                                >

                                    <div className="flex items-center gap-4">

                                        {/* IKONA */}

                                        <div
                                            className="
                                                flex
                                                h-14
                                                w-14
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-2xl
                                                transition-all
                                                duration-300
                                                group-hover:scale-110
                                                group-hover:-rotate-6
                                            "
                                            style={{
                                                backgroundColor: `${card.accent}18`,
                                            }}
                                        >
                                            <Icon
                                                size={28}
                                                strokeWidth={1.7}
                                                style={{
                                                    color: card.accent,
                                                }}
                                            />
                                        </div>

                                        {/* TEKST */}

                                        <div className="flex-1">

                                            <h3
                                                className="
                                                    font-heading
                                                    text-xl
                                                    text-[#3A312B]
                                                "
                                            >
                                                {card.title}
                                            </h3>

                                            <p
                                                className="
                                                    mt-1
                                                    text-sm
                                                    text-[#7B7065]
                                                "
                                            >
                                                {card.subtitle}
                                            </p>

                                        </div>

                                        {/* STRZAŁKA */}

                                        <ArrowRight
                                            size={21}
                                            strokeWidth={1.8}
                                            style={{
                                                color: card.accent,
                                            }}
                                            className="
                                                transition-all
                                                duration-300
                                                group-hover:translate-x-1.5
                                            "
                                        />

                                    </div>

                                </Link>
                            </motion.div>
                        );
                    })}

                </div>
                </div>
            </Stagger>

        </section>
    );
};

export default ActionCardsSection;