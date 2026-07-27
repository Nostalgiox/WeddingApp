import { Eye, Trash2 } from "lucide-react";

const PhotoCard = ({
    photo,
    imageUrl,
    onPreview,
    onDelete,
}) => {
    return (
        <article
            className="
                group
                overflow-hidden
                rounded-2xl
                border
                border-[#E8DDD2]
                bg-white
                shadow-sm
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
            "
        >
            {/* ZDJĘCIE */}

            <div
                className="
                    relative
                    aspect-[4/3]
                    overflow-hidden
                    bg-[#F3ECE5]
                "
            >
                <img
                    src={imageUrl}
                    alt={`Zdjęcie ${photo.id}`}
                    loading="lazy"
                    onClick={() => onPreview(photo)}
                    className="
                        h-full
                        w-full
                        cursor-pointer
                        object-cover
                        transition
                        duration-500
                        group-hover:scale-[1.03]
                    "
                />

                {/* ID */}

                <div
                    className="
                        absolute
                        left-3
                        top-3
                        rounded-lg
                        bg-black/50
                        px-2.5
                        py-1
                        text-xs
                        text-white
                        backdrop-blur-sm
                    "
                >
                    #{photo.id}
                </div>

                {/* MISJA */}

                {photo.mission !== null && (
                    <div
                        className="
                            absolute
                            right-3
                            top-3
                            rounded-lg
                            bg-[#B89B7A]
                            px-2.5
                            py-1
                            text-xs
                            font-medium
                            text-white
                            shadow-sm
                        "
                    >
                        MISJA {photo.mission}
                    </div>
                )}

                {/* AKCJE */}

                <div
                    className="
                        absolute
                        inset-x-0
                        bottom-0
                        flex
                        justify-end
                        gap-2
                        bg-gradient-to-t
                        from-black/60
                        to-transparent
                        p-3
                        opacity-0
                        transition
                        duration-300
                        group-hover:opacity-100
                    "
                >
                    <button
                        type="button"
                        onClick={() => onPreview(photo)}
                        title="Podgląd"
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-white
                            text-[#4B433C]
                            shadow
                            transition
                            hover:scale-105
                        "
                    >
                        <Eye size={18} />
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(photo)}
                        title="Usuń zdjęcie"
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-white
                            text-red-500
                            shadow
                            transition
                            hover:scale-105
                            hover:bg-red-50
                        "
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            {/* INFORMACJE */}

            <div className="p-4">
                <p className="text-sm font-medium text-[#4B433C]">
                    {photo.mission !== null
                        ? `Zdjęcie z misji ${photo.mission}`
                        : "Zdjęcie gościa"}
                </p>

                <p className="mt-1 text-xs text-[#A99A8B]">
                    ID: {photo.id}
                </p>
            </div>
        </article>
    );
};

export default PhotoCard;