import { motion } from "framer-motion";

const SlideRight = ({
    children,
    delay = 0,
    duration = 0.8,
}) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                x: 60,
            }}
            whileInView={{
                opacity: 1,
                x: 0,
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

export default SlideRight;