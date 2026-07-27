import { motion } from "framer-motion";

const MissionTile = ({
    mission,
    onClick,
}) => {

    return (

        <motion.button

            whileTap={{
                scale: 0.95,
            }}

            onClick={onClick}

            className="
                aspect-square
                rounded-2xl
                bg-[#D8CCBF]
                shadow-sm
            "
        >

            <div
                className="
                    flex
                    h-full
                    items-center
                    justify-center
                "
            >

                <span
                    className="
                        text-3xl
                    "
                >
                    ❓
                </span>

            </div>

        </motion.button>

    );

};

export default MissionTile;