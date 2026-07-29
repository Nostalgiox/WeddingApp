import {
    Eye,
    EyeOff,
    LoaderCircle,
    Trash2,
    UserRound,
} from "lucide-react";

const formatDate = (value) => {
    return new Intl.DateTimeFormat(
        "pl-PL",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    ).format(new Date(value));
};

const WishAdminCard = ({
    wish,
    updating,
    onVisibility,
    onDelete,
}) => {
    const author = wish.is_anonymous
        ? "Anonimowy gość"
        : wish.author;

    return (
        <article
            className={`
                rounded-2xl
                border
                bg-white
                p-5
                transition
                ${
                    wish.is_visible
                        ? "border-[#E8DDD2]"
                        : "border-[#DDD3CA] opacity-60"
                }
            `}
        >

            <div
                className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-start
                    sm:justify-between
                "
            >

                {/* TREŚĆ */}

                <div className="min-w-0 flex-1">

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-[#F3ECE5]
                            "
                        >
                            <UserRound
                                size={18}
                                className="text-[#B89B7A]"
                            />
                        </div>

                        <div>

                            <div className="flex flex-wrap items-center gap-2">

                                <p className="font-medium text-[#3A312B]">
                                    {author}
                                </p>

                                {!wish.is_visible && (
                                    <span
                                        className="
                                            rounded-full
                                            bg-[#EEE8E2]
                                            px-2
                                            py-0.5
                                            text-[10px]
                                            font-medium
                                            uppercase
                                            tracking-wide
                                            text-[#7B7065]
                                        "
                                    >
                                        Ukryte
                                    </span>
                                )}

                            </div>

                            <p className="mt-0.5 text-xs text-[#9B9085]">
                                {formatDate(
                                    wish.created_at
                                )}
                            </p>

                        </div>

                    </div>

                    <p
                        className="
                            mt-4
                            whitespace-pre-wrap
                            break-words
                            leading-7
                            text-[#4B433C]
                        "
                    >
                        {wish.content}
                    </p>

                </div>

                {/* AKCJE */}

                <div
                    className="
                        flex
                        shrink-0
                        gap-2
                        border-t
                        border-[#F0E9E2]
                        pt-4
                        sm:border-0
                        sm:pt-0
                    "
                >

                    <button
                        type="button"
                        disabled={updating}
                        onClick={onVisibility}
                        className="
                            flex
                            flex-1
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-[#DDD3CA]
                            px-3
                            py-2.5
                            text-sm
                            text-[#4B433C]
                            transition
                            hover:bg-[#F8F6F3]
                            disabled:opacity-50
                            sm:flex-none
                        "
                    >
                        {updating ? (
                            <LoaderCircle
                                size={16}
                                className="animate-spin"
                            />
                        ) : wish.is_visible ? (
                            <EyeOff size={16} />
                        ) : (
                            <Eye size={16} />
                        )}

                        {wish.is_visible
                            ? "Ukryj"
                            : "Pokaż"}
                    </button>

                    <button
                        type="button"
                        onClick={onDelete}
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-red-200
                            text-red-500
                            transition
                            hover:bg-red-50
                        "
                        aria-label="Usuń życzenie"
                    >
                        <Trash2 size={17} />
                    </button>

                </div>

            </div>

        </article>
    );
};

export default WishAdminCard;