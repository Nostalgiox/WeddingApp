import quoteImage from "../../assets/images/2.jpg";
import { FadeUp } from "../../animations";
const QuoteSection = () => {
    return (
        <FadeUp>
            <section className="bg-[#F8F6F3] px-6 py-20">

                <div className="mx-auto max-w-5xl">

                    <div className="grid items-center gap-10 md:grid-cols-2">

                        {/* Zdjęcie */}

                        <div className="flex justify-center">
                            <img
                                src={quoteImage}
                                alt="Sandra i Dawid"
                                className="w-full max-w-sm object-cover shadow-lg"
                            />
                        </div>

                        {/* Cytat */}

                        <div className="flex flex-col items-center text-center">

                            <p className="font-heading text-6xl text-[#B89B7A]">
                                ❝
                            </p>

                            <p className="mt-8 max-w-sm text-2xl italic leading-relaxed text-[#3A312B]">
                                Najlepszych i najpiękniejszych rzeczy na świecie
                                nie można ani zobaczyć, ani dotknąć,
                                trzeba je poczuć sercem...
                            </p>

                            <div className="mt-10 flex items-center gap-5">

                                <div className="h-px w-12 bg-[#B89B7A]" />

                                <span className="text-xl text-[#B89B7A]">
                                    ♡
                                </span>

                                <div className="h-px w-12 bg-[#B89B7A]" />

                            </div>

                        </div>

                    </div>

                </div>

            </section>
        </FadeUp>
    );
};

export default QuoteSection;