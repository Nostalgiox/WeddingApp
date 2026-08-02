const SectionTitle = ({
    eyebrow,
    title,
}) => {
    return (
        <div className="mb-14 text-center">

            <div className="flex items-center justify-center gap-4">

                <span className="h-px w-10 bg-[#D8CCBF]" />

                <p
                    className="
                        text-xs
                        uppercase
                        tracking-[0.35em]
                        text-[#B89B7A]
                    "
                >
                    {eyebrow}
                </p>

                <span className="h-px w-10 bg-[#D8CCBF]" />

            </div>

            <h2
                className="
                    mt-5
                    font-heading
                    text-3xl
                    text-[#3A312B]
                "
            >
                {title}
            </h2>

        </div>
    );
};

export default SectionTitle;