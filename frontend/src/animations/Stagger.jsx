import { motion } from "framer-motion";

const Stagger = ({ children }) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{
                once: true,
                amount: 0.2,
            }}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: 0.15,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
};

export default Stagger;