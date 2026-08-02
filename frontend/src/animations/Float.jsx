import { motion } from "framer-motion";

const Float = ({
    children,
    duration = 5,
    distance = 8,
}) => {
    return (
        <motion.div
            animate={{
                y: [0, -distance, 0],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.div>
    );
};

export default Float;