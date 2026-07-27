import { AnimatePresence, motion } from "framer-motion";

const MissionSheet = ({
    mission,
    onClose,
}) => {

    return (

        <AnimatePresence>

            {mission && (

                <>

                    <motion.div

                        initial={{
                            opacity: 0,
                        }}

                        animate={{
                            opacity: 1,
                        }}

                        exit={{
                            opacity: 0,
                        }}

                        onClick={onClose}

                        className="
                            fixed
                            inset-0
                            z-40
                            bg-black/40
                        "

                    />

                    <motion.div

                        initial={{
                            y: "100%",
                        }}

                        animate={{
                            y: 0,
                        }}

                        exit={{
                            y: "100%",
                        }}

                        transition={{
                            type: "spring",
                            stiffness: 250,
                            damping: 28,
                        }}

                        className="
                            fixed
                            bottom-0
                            left-0
                            right-0
                            z-50
                            rounded-t-[32px]
                            bg-[#F8F6F3]
                            p-6
                        "

                    >

                        <div className="mx-auto mb-6 h-1.5 w-16 rounded-full bg-[#D8CCBF]" />

                        <div className="text-center">

                            <div className="text-5xl">
                                {mission.icon}
                            </div>

                            <h2 className="mt-5 font-heading text-3xl">

                                {mission.title}

                            </h2>

                            <p className="mt-4 text-[#6F6255]">

                                {mission.currentPhotos}
                                {" / "}
                                {mission.requiredPhotos}
                                {" zdjęć"}

                            </p>

                        </div>

                    </motion.div>

                </>

            )}

        </AnimatePresence>

    );

};

export default MissionSheet;