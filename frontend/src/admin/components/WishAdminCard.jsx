import { useState } from "react";

import {
    Eye,
    EyeOff,
    LoaderCircle,
    Trash2,
    UserRound,
    Mic,
    Play,
    Pause,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

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

const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(
        seconds % 60
    );

    return `${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds
    ).padStart(2, "0")}`;
};

const getAudioUrl = (audio) => {
    if (!audio) {
        return "";
    }

    if (
        audio.startsWith("http://") ||
        audio.startsWith("https://")
    ) {
        return audio;
    }

    return `${API_URL}${audio}`;
};

const WishAdminCard = ({
    wish,
    updating,
    onVisibility,
    onDelete,
}) => {
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const author = wish.is_anonymous
        ? "Anonimowy gość"
        : wish.author;

    const audioUrl = getAudioUrl(wish.audio);

    const handlePlay = () => {
        const audio =
            document.getElementById(
                `admin-wish-audio-${wish.id}`
            );

        if (!audio) return;

        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    };

    const handleLoadedMetadata = (event) => {
        setDuration(
            event.currentTarget.duration
        );
    };

    const handleTimeUpdate = (event) => {
        setCurrentTime(
            event.currentTarget.currentTime
        );
    };

    const handleEnded = () => {
        setPlaying(false);
        setCurrentTime(0);
    };

    const handleSeek = (event) => {
        const audio =
            document.getElementById(
                `admin-wish-audio-${wish.id}`
            );

        if (!audio || !duration) return;

        const value = Number(
            event.target.value
        );

        audio.currentTime = value;
        setCurrentTime(value);
    };

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

                    {/* AUTOR */}

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

                    {/* TREŚĆ TEKSTOWA */}

                    {wish.content && (
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
                    )}

                    {/* GŁOSÓWKA */}

                    {audioUrl && (
                        <div
                            className="
                                mt-5
                                rounded-2xl
                                border
                                border-[#E8DDD2]
                                bg-[#F8F6F3]
                                p-4
                            "
                        >

                            <audio
                                id={`admin-wish-audio-${wish.id}`}
                                src={audioUrl}
                                preload="metadata"
                                onLoadedMetadata={
                                    handleLoadedMetadata
                                }
                                onTimeUpdate={
                                    handleTimeUpdate
                                }
                                onPlay={() =>
                                    setPlaying(true)
                                }
                                onPause={() =>
                                    setPlaying(false)
                                }
                                onEnded={
                                    handleEnded
                                }
                            />

                            <div className="flex items-center gap-3">

                                {/* PLAY / PAUSE */}

                                <button
                                    type="button"
                                    onClick={handlePlay}
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#B89B7A]
                                        text-white
                                        shadow-sm
                                        transition
                                        active:scale-90
                                    "
                                    aria-label={
                                        playing
                                            ? "Pauza"
                                            : "Odtwórz"
                                    }
                                >
                                    {playing ? (
                                        <Pause
                                            size={18}
                                            fill="currentColor"
                                            strokeWidth={1.5}
                                        />
                                    ) : (
                                        <Play
                                            size={18}
                                            fill="currentColor"
                                            strokeWidth={1.5}
                                            className="ml-0.5"
                                        />
                                    )}
                                </button>

                                {/* INFORMACJE */}

                                <div className="min-w-0 flex-1">

                                    <div className="flex items-center justify-between gap-3">

                                        <div className="flex items-center gap-1.5">

                                            <Mic
                                                size={15}
                                                strokeWidth={1.5}
                                                className="text-[#B89B7A]"
                                            />

                                            <span
                                                className="
                                                    text-xs
                                                    font-medium
                                                    text-[#6F6255]
                                                "
                                            >
                                                Wiadomość głosowa
                                            </span>

                                        </div>

                                        <span
                                            className="
                                                shrink-0
                                                text-xs
                                                tabular-nums
                                                text-[#9B9085]
                                            "
                                        >
                                            {formatTime(
                                                currentTime
                                            )}{" "}
                                            /{" "}
                                            {formatTime(
                                                duration
                                            )}
                                        </span>

                                    </div>

                                    {/* PASEK POSTĘPU */}

                                    <input
                                        type="range"
                                        min="0"
                                        max={
                                            duration || 0
                                        }
                                        step="0.01"
                                        value={
                                            currentTime
                                        }
                                        onChange={
                                            handleSeek
                                        }
                                        disabled={
                                            !duration
                                        }
                                        className="
                                            mt-2
                                            h-1.5
                                            w-full
                                            cursor-pointer
                                            accent-[#B89B7A]
                                        "
                                    />

                                </div>

                            </div>

                        </div>
                    )}

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