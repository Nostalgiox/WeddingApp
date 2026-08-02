import { motion, useScroll, useTransform } from "framer-motion";

const Parallax = ({children, offset = 20,}) => {
    const { scrollY } = useScroll();

    const y = useTransform(scrollY, [0, 1200], [0, -offset]);

    return (
        <motion.div style={{ y }}>
            {children}
        </motion.div>
    );
};

export default Parallax;