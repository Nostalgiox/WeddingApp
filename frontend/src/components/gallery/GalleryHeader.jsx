const GalleryHeader = ({ photoCount }) => {
    return (
        <section className="px-6 pb-8 pt-32 text-center">

            <h1 className="font-heading text-5xl text-[#3A312B]">
                Galeria
            </h1>

            <p className="mt-5 text-lg leading-7 text-[#6F6255]">
                Wasze wspomnienia
                <br />
                z naszego wyjątkowego dnia.
            </p>

            {photoCount > 0 && (
                <p
                    className="
                        mt-4
                        text-sm
                        tracking-[0.12em]
                        text-[#B89B7A]
                    "
                >
                    {photoCount}{" "}
                    {photoCount === 1
                        ? "ZDJĘCIE"
                        : "ZDJĘĆ"}
                </p>
            )}

        </section>
    );
};

export default GalleryHeader;