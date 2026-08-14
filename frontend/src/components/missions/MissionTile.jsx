import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Lock } from "lucide-react";

const MissionTile = ({
    mission,
    index,
    puzzleImage,
    onClick,
}) => {
    const progress = Math.min(
        mission.currentPhotos / mission.requiredPhotos,
        1
    );

    const completed = progress >= 1;

    const [showCompleted, setShowCompleted] = useState(completed);

    // Pokazuje ptaszek przez 3 sekundy
    useEffect(() => {
        if (!completed) {
            setShowCompleted(false);
            return;
        }

        setShowCompleted(true);

        const timer = setTimeout(() => {
            setShowCompleted(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [completed]);

    // Pozycja fragmentu zdjęcia w planszy 4x4
    const row = Math.floor(index / 4);
    const column = index % 4;

    const positionX = (column / 3) * 100;
    const positionY = (row / 3) * 100;

    // Stopniowe odkrywanie zdjęcia
    const maxBlur = 35;
    const blur = maxBlur * (1 - progress);

    const brightness = 0.35 + progress * 0.65;

    const overlayOpacity = 0.65 * (1 - progress);

    return (
        <motion.button
            whileTap={{
                scale: 0.94,
            }}
            onClick={onClick}
            className="
                relative
                aspect-square
                overflow-hidden
                border
                border-white/40
            "
        >

            {/* Fragment zdjęcia */}

            <motion.div
                className="absolute inset-0 bg-no-repeat"
                animate={{
                    filter: `blur(${blur}px) brightness(${brightness})`,
                }}
                transition={{
                    duration: 0.7,
                    ease: "easeOut",
                }}
                style={{
                    backgroundImage: `url(${puzzleImage})`,
                    backgroundSize: "400% 400%",
                    backgroundPosition: `${positionX}% ${positionY}%`,
                    transform: "scale(1.15)",
                }}
            />

            {/* Przyciemnienie */}

            <motion.div
                className="absolute inset-0 bg-[#8F8174]"
                animate={{
                    opacity: overlayOpacity,
                }}
                transition={{
                    duration: 0.7,
                }}
            />

            {/* Kłódka */}

            <AnimatePresence>
                {!completed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            scale: 1.4,
                        }}
                        transition={{
                            duration: 0.35,
                        }}
                        className="
                            absolute
                            inset-0
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <Lock
                            size={21}
                            strokeWidth={1.4}
                            className="text-white/90 drop-shadow-md"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ptaszek po ukończeniu */}

            <AnimatePresence>
                {completed && showCompleted && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.7,
                        }}
                        transition={{
                            duration: 0.3,
                        }}
                        className="
                            absolute
                            right-2
                            top-2
                            flex
                            h-6
                            w-6
                            items-center
                            justify-center
                            rounded-full
                            bg-white/85
                            shadow-sm
                            backdrop-blur
                        "
                    >
                        <Check
                            size={14}
                            strokeWidth={2}
                            className="text-[#6F6255]"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.button>
    );
};

export default MissionTile;