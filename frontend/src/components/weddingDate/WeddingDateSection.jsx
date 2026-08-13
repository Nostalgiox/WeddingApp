import date1 from "../../assets/images/1.jpg";
import date2 from "../../assets/images/4.jpg";
import date3 from "../../assets/images/6.jpg";
import { motion } from "framer-motion";
import {
    FadeUp,
    ScaleIn,
    Float,
    Parallax,
} from "../../animations";
import SectionTitle from "../common/SectionTitle";

const dates = [
    {
        number: "22",
        image: date1,
        delay: 0,
        floatDistance: 6,
        floatDuration: 5,
        rotate: -2,
        marginTop: "",
    },
    {
        number: "08",
        image: date2,
        delay: 0.2,
        floatDistance: 8,
        floatDuration: 6,
        rotate: 2,
        marginTop: "mt-10",
    },
    {
        number: "26",
        image: date3,
        delay: 0.4,
        floatDistance: 5,
        floatDuration: 5.5,
        rotate: -1,
        marginTop: "mt-20",
    },
];

const WeddingDateSection = () => {
    return (
        <section className="bg-[#F8F6F3] py-24">

            <div className="mx-auto max-w-md px-6">

            <SectionTitle
                eyebrow="NASZ DZIEŃ"
                title="22 sierpnia 2026"
            />

                <div className="flex justify-center gap-4">

                    {dates.map((item) => (

                        <div
                            key={item.number}
                            className={`flex flex-col items-center ${item.marginTop}`}
                        >

                            <ScaleIn delay={item.delay}>

                                <motion.h2
                                    initial={{
                                        opacity: 0,
                                        y: 25,
                                        filter: "blur(6px)",
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        filter: "blur(0px)",
                                    }}
                                    viewport={{
                                        once: true,
                                    }}
                                    transition={{
                                        delay: item.delay,
                                        duration: 0.7,
                                    }}
                                    className="
                                        mb-3
                                        font-heading
                                        text-7xl
                                        font-light
                                        leading-none
                                        text-[#3A312B]
                                    "
                                >
                                    {item.number}
                                </motion.h2>

                            </ScaleIn>

                            <Parallax offset={12 + item.delay * 8}>

                                <Float
                                    distance={item.floatDistance}
                                    duration={item.floatDuration}
                                >

                                    <motion.img
                                        src={item.image}
                                        alt=""
                                        initial={{
                                            opacity: 0,
                                            scale: 0.92,
                                            rotate: item.rotate,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            scale: 1,
                                            rotate: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                        }}
                                        transition={{
                                            delay: item.delay + 0.15,
                                            duration: 0.8,
                                        }}
                                        className="
                                            h-72
                                            w-32
                                            object-cover
                                            shadow-lg
                                            transition-all
                                            duration-500
                                            hover:-translate-y-2
                                            hover:scale-[1.03]
                                            hover:shadow-xl
                                        "
                                    />

                                </Float>

                            </Parallax>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default WeddingDateSection;