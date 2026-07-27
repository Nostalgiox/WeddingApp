import { motion } from "framer-motion";

const FadeUp = ({
    children,
    delay = 0,
    duration = 0.7,
}) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 40,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: true,
                amount: 0.2,
            }}
            transition={{
                duration,
                delay,
                ease: [0.25, 1, 0.5, 1],
            }}
        >
            {children}
        </motion.div>
    );
};

export default FadeUp;