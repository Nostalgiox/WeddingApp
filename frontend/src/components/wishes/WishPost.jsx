import { useState } from "react";
import {
    Heart,
    Mic,
    Play,
    Pause,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

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

const WishPost = ({ wish }) => {
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const author = wish.is_anonymous
        ? "Anonimowy gość"
        : wish.author;

    const initial = wish.is_anonymous
        ? "♡"
        : author?.charAt(0)?.toUpperCase() || "♡";

    const audioUrl = getAudioUrl(wish.audio);

    const handlePlay = () => {
        const audio =
            document.getElementById(
                `wish-audio-${wish.id}`
            );

        if (!audio) return;

        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    };

    const handleLoadedMetadata = (event) => {
        setDuration(event.currentTarget.duration);
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
                `wish-audio-${wish.id}`
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

            {/* TREŚĆ TEKSTOWA */}

            {wish.content && (
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
                        id={`wish-audio-${wish.id}`}
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
                        onEnded={handleEnded}
                    />

                    <div className="flex items-center gap-3">

                        {/* PLAY */}

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

                        {/* INFO */}

                        <div className="min-w-0 flex-1">

                            <div className="flex items-center justify-between">

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

                            {/* PROGRESS */}

                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                step="0.01"
                                value={currentTime}
                                onChange={handleSeek}
                                disabled={!duration}
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