import { motion } from "framer-motion";

const GalleryGrid = ({
    photos,
    getImageUrl,
    onPhotoClick,
}) => {
    return (
        <div
            className="
                columns-2
                gap-3
                px-4
                pb-32
            "
        >
            {photos.map((photo, index) => (
                <motion.button
                    key={photo.id}
                    type="button"
                    onClick={() => onPhotoClick(photo)}
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.4,
                        delay: Math.min(index * 0.04, 0.4),
                    }}
                    whileTap={{
                        scale: 0.97,
                    }}
                    className="
                        mb-3
                        block
                        w-full
                        break-inside-avoid
                        overflow-hidden
                        rounded-2xl
                        bg-[#EDE7E1]
                        text-left
                    "
                >
                    <img
                        src={getImageUrl(photo.image)}
                        alt={`Wspomnienie ${photo.id}`}
                        loading="lazy"
                        className="
                            block
                            h-auto
                            w-full
                        "
                    />
                </motion.button>
            ))}
        </div>
    );
};

export default GalleryGrid;