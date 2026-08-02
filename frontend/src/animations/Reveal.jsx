import { motion } from "framer-motion";

const Reveal = ({ children }) => {
    return (
        <motion.div
            initial={{
                clipPath: "inset(0 0 100% 0)",
            }}
            whileInView={{
                clipPath: "inset(0 0 0% 0)",
            }}
            viewport={{
                once: true,
                amount: 0.2,
            }}
            transition={{
                duration: 1,
                ease: [0.25, 1, 0.5, 1],
            }}
        >
            {children}
        </motion.div>
    );
};

export default Reveal;