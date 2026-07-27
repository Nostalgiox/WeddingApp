import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const links = [
    {
        title: "STRONA GŁÓWNA",
        to: "/",
    },
    {
        title: "MISJE WESELNE",
        to: "/missions",
    },
    {
        title: "GALERIA",
        to: "/gallery",
    },
    {
        title: "DODAJ ZDJĘCIE",
        to: "/upload",
    },
    {
        title: "ŻYCZENIA",
        to: "/wishes",
    },
];

const menuVariants = {
    hidden: {
        y: "-100%",
    },
    visible: {
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 1, 0.5, 1],
            when: "beforeChildren",
            staggerChildren: 0.08,
        },
    },
    exit: {
        y: "-100%",
        transition: {
            duration: 0.45,
            ease: [0.25, 1, 0.5, 1],
            when: "afterChildren",
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: -20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.25,
        },
    },
};

const MobileMenu = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>

            {isOpen && (

                <motion.div
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 z-[100] bg-[#F8F6F3]"
                >

                    <motion.nav
                        className="mt-28 flex flex-col"
                    >

                        {links.map((link) => (

                            <motion.div
                                key={link.title}
                                variants={itemVariants}
                            >

                                <Link
                                    to={link.to}
                                    onClick={onClose}
                                    className="
                                        flex
                                        items-center
                                        justify-center
                                        border-b
                                        border-[#E8DDD2]
                                        py-10
                                        font-heading
                                        text-3xl
                                        tracking-[0.12em]
                                        transition-colors
                                        duration-300
                                        hover:text-[#B89B7A]
                                    "
                                >
                                    {link.title}
                                </Link>

                            </motion.div>

                        ))}

                    </motion.nav>

                </motion.div>

            )}

        </AnimatePresence>
    );
};

export default MobileMenu;