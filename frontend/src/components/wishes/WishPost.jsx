import { Heart } from "lucide-react";

const formatDate = (dateString) => {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat(
        "pl-PL",
        {
            day: "numeric",
            month: "long",
            hour: "2-digit",
            minute: "2-digit",
        }
    ).format(date);
};

const WishPost = ({ wish }) => {
    const author = wish.is_anonymous
        ? "Anonimowy gość"
        : wish.author;

    const initial = wish.is_anonymous
        ? "♡"
        : author?.charAt(0)?.toUpperCase() || "♡";

    return (
        <article
            className="
                rounded-3xl
                border
                border-[#E8DDD2]
                bg-white
                p-5
                shadow-sm
            "
        >

            {/* AUTOR */}

            <div className="flex items-center gap-3">

                <div
                    className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#F3ECE5]
                        font-heading
                        text-lg
                        text-[#B89B7A]
                    "
                >
                    {initial}
                </div>

                <div>

                    <p className="font-medium text-[#3A312B]">
                        {author}
                    </p>

                    <p className="mt-0.5 text-xs text-[#9B9085]">
                        {formatDate(wish.created_at)}
                    </p>

                </div>

            </div>

            {/* TREŚĆ */}

            <p
                className="
                    mt-5
                    whitespace-pre-wrap
                    break-words
                    text-[16px]
                    leading-7
                    text-[#4B433C]
                "
            >
                {wish.content}
            </p>

            {/* OZDOBNIK */}

            <div
                className="
                    mt-5
                    flex
                    justify-end
                    border-t
                    border-[#F0E9E2]
                    pt-4
                "
            >
                <Heart
                    size={19}
                    strokeWidth={1.4}
                    className="text-[#B89B7A]"
                />
            </div>

        </article>
    );
};

export default WishPost;