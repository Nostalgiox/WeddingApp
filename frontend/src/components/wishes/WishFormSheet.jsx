import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    LoaderCircle,
    Send,
    User,
    UserRoundX,
    X,
} from "lucide-react";

const WishFormSheet = ({
    open,
    onClose,
    onPublished,
}) => {
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [anonymous, setAnonymous] = useState(false);

    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (!open) return;

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow =
                previousOverflow;
        };
    }, [open]);

    const handleSubmit = async () => {
        if (sending) return;

        if (!content.trim()) {
            setError("Napisz treść życzeń.");
            return;
        }

        if (!anonymous && !author.trim()) {
            setError(
                "Podpisz się lub wybierz opcję anonimową."
            );
            return;
        }

        try {
            setSending(true);
            setError("");

            const response = await fetch(
                `${API_URL}/api/wishes/`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        author: anonymous
                            ? ""
                            : author.trim(),

                        content: content.trim(),

                        is_anonymous: anonymous,
                    }),
                }
            );

            if (!response.ok) {
                const data = await response
                    .json()
                    .catch(() => null);

                console.error(data);

                throw new Error();
            }

            const newWish = await response.json();

            setContent("");
            setAuthor("");
            setAnonymous(false);

            onPublished(newWish);
            onClose();

        } catch (error) {
            console.error(error);

            setError(
                "Nie udało się opublikować życzeń. Spróbuj ponownie."
            );
        } finally {
            setSending(false);
        }
    };

    return (
        <AnimatePresence>

            {open && (
                <>
                    {/* TŁO */}

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={
                            sending
                                ? undefined
                                : onClose
                        }
                        className="
                            fixed
                            inset-0
                            z-[150]
                            bg-black/40
                            backdrop-blur-sm
                        "
                    />

                    {/* SHEET */}

                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{
                            type: "spring",
                            damping: 28,
                            stiffness: 260,
                        }}
                        className="
                            fixed
                            bottom-0
                            left-0
                            right-0
                            z-[160]
                            max-h-[92vh]
                            overflow-y-auto
                            rounded-t-[32px]
                            bg-[#F8F6F3]
                            px-5
                            pb-8
                            pt-4
                            shadow-2xl
                        "
                    >

                        <div className="mx-auto h-1.5 w-14 rounded-full bg-[#D8CCBF]" />

                        {/* HEADER */}

                        <div className="mt-6 flex items-center justify-between">

                            <div>
                                <h2 className="font-heading text-3xl text-[#3A312B]">
                                    Napisz życzenia
                                </h2>

                                <p className="mt-1 text-sm text-[#8B8075]">
                                    Zostaw nam kilka słów ♡
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={onClose}
                                disabled={sending}
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-white
                                    text-[#6F6255]
                                "
                            >
                                <X size={20} />
                            </button>

                        </div>

                        {/* TREŚĆ */}

                        <div className="mt-7">

                            <textarea
                                value={content}
                                onChange={(event) => {
                                    setContent(event.target.value);
                                    setError("");
                                }}
                                maxLength={2000}
                                rows={6}
                                placeholder="Napisz coś od serca..."
                                className="
                                    w-full
                                    resize-none
                                    rounded-2xl
                                    border
                                    border-[#E8DDD2]
                                    bg-white
                                    p-4
                                    text-base
                                    leading-7
                                    text-[#3A312B]
                                    outline-none
                                    transition
                                    placeholder:text-[#B5AAA0]
                                    focus:border-[#B89B7A]
                                "
                            />

                            <p className="mt-2 text-right text-xs text-[#A79C91]">
                                {content.length} / 2000
                            </p>

                        </div>

                        {/* SPOSÓB PUBLIKACJI */}

                        <p className="mt-5 text-sm font-medium text-[#4B433C]">
                            Jak chcesz opublikować?
                        </p>

                        <div className="mt-3 grid grid-cols-2 gap-3">

                            <button
                                type="button"
                                onClick={() => {
                                    setAnonymous(false);
                                    setError("");
                                }}
                                className={`
                                    rounded-2xl
                                    border
                                    p-4
                                    transition
                                    ${
                                        !anonymous
                                            ? "border-[#B89B7A] bg-[#F3ECE5]"
                                            : "border-[#E8DDD2] bg-white"
                                    }
                                `}
                            >
                                <User
                                    size={22}
                                    className="mx-auto text-[#B89B7A]"
                                />

                                <p className="mt-2 text-sm text-[#4B433C]">
                                    Z podpisem
                                </p>
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setAnonymous(true);
                                    setError("");
                                }}
                                className={`
                                    rounded-2xl
                                    border
                                    p-4
                                    transition
                                    ${
                                        anonymous
                                            ? "border-[#B89B7A] bg-[#F3ECE5]"
                                            : "border-[#E8DDD2] bg-white"
                                    }
                                `}
                            >
                                <UserRoundX
                                    size={22}
                                    className="mx-auto text-[#B89B7A]"
                                />

                                <p className="mt-2 text-sm text-[#4B433C]">
                                    Anonimowo
                                </p>
                            </button>

                        </div>

                        {/* PODPIS */}

                        <AnimatePresence>

                            {!anonymous && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        height: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        height: "auto",
                                    }}
                                    exit={{
                                        opacity: 0,
                                        height: 0,
                                    }}
                                    className="overflow-hidden"
                                >
                                    <input
                                        type="text"
                                        value={author}
                                        maxLength={100}
                                        onChange={(event) => {
                                            setAuthor(event.target.value);
                                            setError("");
                                        }}
                                        placeholder="Twój podpis, np. Kasia i Tomek"
                                        className="
                                            mt-4
                                            w-full
                                            rounded-2xl
                                            border
                                            border-[#E8DDD2]
                                            bg-white
                                            px-4
                                            py-4
                                            text-[#3A312B]
                                            outline-none
                                            placeholder:text-[#B5AAA0]
                                            focus:border-[#B89B7A]
                                        "
                                    />
                                </motion.div>
                            )}

                        </AnimatePresence>

                        {/* BŁĄD */}

                        {error && (
                            <p className="mt-4 text-sm text-red-500">
                                {error}
                            </p>
                        )}

                        {/* PUBLIKUJ */}

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={sending}
                            className="
                                mt-6
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-2xl
                                bg-[#B89B7A]
                                py-4
                                text-white
                                transition
                                active:scale-[0.98]
                                disabled:opacity-60
                            "
                        >
                            {sending ? (
                                <>
                                    <LoaderCircle
                                        size={19}
                                        className="animate-spin"
                                    />

                                    Publikowanie...
                                </>
                            ) : (
                                <>
                                    <Send size={18} />

                                    Opublikuj życzenia
                                </>
                            )}
                        </button>

                    </motion.div>
                </>
            )}

        </AnimatePresence>
    );
};

export default WishFormSheet;