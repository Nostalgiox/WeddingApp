import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    X,
    Mic,
    Square,
    Trash2,
    Send,
    LoaderCircle,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const WishFormSheet = ({
    open,
    onClose,
    onPublished,
}) => {
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [anonymous, setAnonymous] = useState(false);

    const [audioBlob, setAudioBlob] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);

    const [recording, setRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);

    const [publishing, setPublishing] = useState(false);
    const [error, setError] = useState("");

    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);
    const timerRef = useRef(null);

    const pressTimerRef = useRef(null);
    const isPressingRef = useRef(false);

    // =========================
    // CZYSZCZENIE
    // =========================

    useEffect(() => {
        return () => {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }

            if (streamRef.current) {
                streamRef.current
                    .getTracks()
                    .forEach((track) => track.stop());
            }

            clearInterval(timerRef.current);
            clearTimeout(pressTimerRef.current);
        };
    }, [audioUrl]);

    // =========================
    // FORMAT CZASU
    // =========================

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
    };

    // =========================
    // ROZPOCZĘCIE NAGRYWANIA
    // =========================

    const startRecording = async () => {
        if (recording || audioBlob) return;

        try {
            setError("");

            const stream =
                await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });

            streamRef.current = stream;

            const mimeType =
                MediaRecorder.isTypeSupported(
                    "audio/webm;codecs=opus"
                )
                    ? "audio/webm;codecs=opus"
                    : "audio/webm";

            const recorder = new MediaRecorder(
                stream,
                {
                    mimeType,
                }
            );

            const chunks = [];

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };

            recorder.onstop = () => {
                const blob = new Blob(
                    chunks,
                    {
                        type: recorder.mimeType,
                    }
                );

                setAudioBlob(blob);

                const url =
                    URL.createObjectURL(blob);

                setAudioUrl(url);

                stream
                    .getTracks()
                    .forEach((track) =>
                        track.stop()
                    );

                streamRef.current = null;
            };

            mediaRecorderRef.current = recorder;

            recorder.start();

            setRecording(true);
            setRecordingTime(0);

            timerRef.current = setInterval(() => {
                setRecordingTime(
                    (current) => current + 1
                );
            }, 1000);

        } catch (error) {
            console.error(error);

            setError(
                "Nie udało się uruchomić mikrofonu. Sprawdź uprawnienia przeglądarki."
            );
        }
    };

    // =========================
    // ZATRZYMANIE
    // =========================

    const stopRecording = () => {
        if (
            !mediaRecorderRef.current ||
            !recording
        ) {
            return;
        }

        mediaRecorderRef.current.stop();

        setRecording(false);

        clearInterval(timerRef.current);
    };

    // =========================
    // PRZYTRZYMANIE
    // =========================

    const handlePointerDown = () => {
        isPressingRef.current = true;

        pressTimerRef.current = setTimeout(() => {
            if (isPressingRef.current) {
                startRecording();
            }
        }, 300);
    };

    const handlePointerUp = () => {
        isPressingRef.current = false;

        clearTimeout(pressTimerRef.current);

        if (recording) {
            stopRecording();
        }
    };

    const handlePointerCancel = () => {
        isPressingRef.current = false;

        clearTimeout(pressTimerRef.current);

        if (recording) {
            stopRecording();
        }
    };

    // =========================
    // USUNIĘCIE GŁOSÓWKI
    // =========================

    const removeAudio = () => {
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
        }

        setAudioUrl(null);
        setAudioBlob(null);
        setRecordingTime(0);
    };

    // =========================
    // RESET
    // =========================

    const resetForm = () => {
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
        }

        setAuthor("");
        setContent("");
        setAnonymous(false);

        setAudioBlob(null);
        setAudioUrl(null);

        setRecording(false);
        setRecordingTime(0);

        setError("");

        clearInterval(timerRef.current);
        clearTimeout(pressTimerRef.current);

        if (streamRef.current) {
            streamRef.current
                .getTracks()
                .forEach((track) => track.stop());

            streamRef.current = null;
        }

        mediaRecorderRef.current = null;
    };

    // =========================
    // ZAMKNIĘCIE
    // =========================

    const handleClose = () => {
        if (publishing) return;

        resetForm();
        onClose();
    };

    // =========================
    // PUBLIKACJA
    // =========================

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (publishing || recording) return;

        setError("");

        if (!content.trim() && !audioBlob) {
            setError(
                "Napisz życzenia lub nagraj wiadomość głosową."
            );

            return;
        }

        if (!anonymous && !author.trim()) {
            setError(
                "Podaj podpis lub wybierz opcję anonimową."
            );

            return;
        }

        try {
            setPublishing(true);

            const formData = new FormData();

            formData.append(
                "author",
                anonymous
                    ? ""
                    : author.trim()
            );

            formData.append(
                "content",
                content.trim()
            );

            formData.append(
                "is_anonymous",
                anonymous ? "true" : "false"
            );

            if (audioBlob) {
                formData.append(
                    "audio",
                    audioBlob,
                    "wish.webm"
                );
            }

            const response = await fetch(
                `${API_URL}/api/wishes/`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data =
                await response.json().catch(
                    () => null
                );

            if (!response.ok) {
                console.error(
                    "Błąd API:",
                    data
                );

                throw new Error(
                    "Nie udało się opublikować życzeń."
                );
            }

            if (onPublished) {
                onPublished(data);
            }

            resetForm();
            onClose();

        } catch (error) {
            console.error(error);

            setError(
                "Nie udało się opublikować życzeń. Spróbuj ponownie."
            );
        } finally {
            setPublishing(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[200]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >

                    {/* TŁO */}

                    <div
                        className="
                            absolute
                            inset-0
                            bg-black/40
                            backdrop-blur-sm
                        "
                        onClick={handleClose}
                    />

                    {/* SHEET */}

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
                            stiffness: 260,
                            damping: 28,
                        }}
                        className="
                            absolute
                            bottom-0
                            left-0
                            right-0
                            max-h-[92vh]
                            overflow-y-auto
                            rounded-t-[32px]
                            bg-[#F8F6F3]
                            px-6
                            pb-8
                            pt-4
                            shadow-2xl
                        "
                    >

                        {/* UCHWYT */}

                        <div
                            className="
                                mx-auto
                                h-1.5
                                w-14
                                rounded-full
                                bg-[#D8CCBF]
                            "
                        />

                        {/* ZAMKNIĘCIE */}

                        <button
                            type="button"
                            onClick={handleClose}
                            className="
                                absolute
                                right-5
                                top-5
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                bg-white
                                text-[#4B433C]
                                shadow-sm
                                transition
                                active:scale-90
                            "
                        >
                            <X size={19} />
                        </button>

                        {/* NAGŁÓWEK */}

                        <div className="mt-8 text-center">

                            <p
                                className="
                                    text-xs
                                    tracking-[0.25em]
                                    text-[#B89B7A]
                                "
                            >
                                ŻYCZENIA
                            </p>

                            <h2
                                className="
                                    mt-2
                                    font-heading
                                    text-3xl
                                    text-[#3A312B]
                                "
                            >
                                Zostaw kilka słów
                            </h2>

                            <p
                                className="
                                    mt-3
                                    text-sm
                                    leading-6
                                    text-[#7B7065]
                                "
                            >
                                Możesz napisać wiadomość
                                albo nagrać ją swoim głosem.
                            </p>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8"
                        >

                            {/* TEKST */}

                            <textarea
                                value={content}
                                onChange={(event) =>
                                    setContent(
                                        event.target.value
                                    )
                                }
                                disabled={
                                    publishing ||
                                    recording
                                }
                                placeholder="Napisz swoje życzenia..."
                                maxLength={2000}
                                className="
                                    min-h-36
                                    w-full
                                    resize-none
                                    rounded-3xl
                                    border
                                    border-[#E8DDD2]
                                    bg-white
                                    px-5
                                    py-5
                                    text-base
                                    leading-7
                                    text-[#3A312B]
                                    outline-none
                                    placeholder:text-[#B4A89C]
                                    focus:border-[#B89B7A]
                                "
                            />

                            <div className="mt-2 text-right text-xs text-[#A99A8B]">
                                {content.length} / 2000
                            </div>

                            {/* PODPIS */}

                            <input
                                type="text"
                                value={author}
                                onChange={(event) =>
                                    setAuthor(
                                        event.target.value
                                    )
                                }
                                disabled={
                                    publishing ||
                                    recording ||
                                    anonymous
                                }
                                placeholder="Twój podpis"
                                maxLength={100}
                                className="
                                    mt-5
                                    w-full
                                    rounded-2xl
                                    border
                                    border-[#E8DDD2]
                                    bg-white
                                    px-5
                                    py-4
                                    text-sm
                                    text-[#3A312B]
                                    outline-none
                                    placeholder:text-[#B4A89C]
                                    focus:border-[#B89B7A]
                                    disabled:bg-[#F3ECE5]
                                "
                            />

                            {/* ANONIMOWO */}

                            <label
                                className="
                                    mt-4
                                    flex
                                    cursor-pointer
                                    items-center
                                    gap-3
                                    text-sm
                                    text-[#6F6255]
                                "
                            >
                                <input
                                    type="checkbox"
                                    checked={anonymous}
                                    onChange={(event) =>
                                        setAnonymous(
                                            event.target.checked
                                        )
                                    }
                                    disabled={
                                        publishing ||
                                        recording
                                    }
                                    className="
                                        h-4
                                        w-4
                                        accent-[#B89B7A]
                                    "
                                />

                                Dodaj anonimowo

                            </label>

                            {/* NAGRYWANIE */}

                            <div className="mt-7">

                                <p
                                    className="
                                        mb-3
                                        text-center
                                        text-xs
                                        uppercase
                                        tracking-[0.18em]
                                        text-[#A99A8B]
                                    "
                                >
                                    Wiadomość głosowa
                                </p>

                                {!audioBlob ? (

                                    <button
                                        type="button"
                                        disabled={
                                            publishing
                                        }
                                        onPointerDown={
                                            handlePointerDown
                                        }
                                        onPointerUp={
                                            handlePointerUp
                                        }
                                        onPointerCancel={
                                            handlePointerCancel
                                        }
                                        onPointerLeave={
                                            handlePointerCancel
                                        }
                                        className={`
                                            flex
                                            w-full
                                            select-none
                                            touch-none
                                            items-center
                                            justify-center
                                            gap-3
                                            rounded-2xl
                                            py-5
                                            text-sm
                                            transition
                                            ${
                                                recording
                                                    ? "bg-[#8F8174] text-white"
                                                    : "bg-[#B89B7A] text-white active:scale-[0.98]"
                                            }
                                        `}
                                    >

                                        {recording ? (
                                            <>
                                                <span
                                                    className="
                                                        h-3
                                                        w-3
                                                        animate-pulse
                                                        rounded-full
                                                        bg-white
                                                    "
                                                />

                                                Nagrywanie{" "}

                                                {formatTime(
                                                    recordingTime
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <Mic
                                                    size={21}
                                                    strokeWidth={1.6}
                                                />

                                                Przytrzymaj,
                                                aby nagrać
                                            </>
                                        )}

                                    </button>

                                ) : (

                                    <div
                                        className="
                                            rounded-2xl
                                            border
                                            border-[#E8DDD2]
                                            bg-white
                                            p-4
                                        "
                                    >

                                        <audio
                                            controls
                                            src={audioUrl}
                                            className="w-full"
                                        />

                                        <button
                                            type="button"
                                            onClick={
                                                removeAudio
                                            }
                                            className="
                                                mt-3
                                                flex
                                                w-full
                                                items-center
                                                justify-center
                                                gap-2
                                                rounded-xl
                                                py-2.5
                                                text-sm
                                                text-[#9A6F72]
                                            "
                                        >
                                            <Trash2
                                                size={17}
                                            />

                                            Usuń nagranie
                                        </button>

                                    </div>

                                )}

                            </div>

                            {/* BŁĄD */}

                            {error && (
                                <div
                                    className="
                                        mt-5
                                        rounded-2xl
                                        bg-[#F3E7E5]
                                        px-4
                                        py-3
                                        text-center
                                        text-sm
                                        text-[#8F5F62]
                                    "
                                >
                                    {error}
                                </div>
                            )}

                            {/* WYŚLIJ */}

                            <button
                                type="submit"
                                disabled={
                                    publishing ||
                                    recording
                                }
                                className="
                                    mt-6
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-2xl
                                    bg-[#4B433C]
                                    py-4
                                    text-sm
                                    font-medium
                                    text-white
                                    transition
                                    active:scale-[0.98]
                                    disabled:opacity-50
                                "
                            >

                                {publishing ? (
                                    <>
                                        <LoaderCircle
                                            size={19}
                                            className="animate-spin"
                                        />

                                        Publikowanie...
                                    </>
                                ) : (
                                    <>
                                        <Send
                                            size={18}
                                            strokeWidth={1.7}
                                        />

                                        Opublikuj życzenia
                                    </>
                                )}

                            </button>

                        </form>

                    </motion.div>

                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WishFormSheet;