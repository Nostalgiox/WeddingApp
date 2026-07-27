import image1 from "../../assets/images/4.jpg";
import image2 from "../../assets/images/5.jpg";

const MemoriesSection = () => {
    return (
        <section className="bg-[#F8F6F3] py-24">

            <div className="mx-auto max-w-md px-6">

                {/* Pierwszy wiersz */}

                <div className="mb-16 flex items-end justify-between">

                    <h2 className="font-heading text-8xl text-[#9E866F]">
                        S
                    </h2>

                    <img
                        src={image1}
                        alt=""
                        className="w-48 object-cover shadow-md"
                    />

                </div>

                {/* Drugi wiersz */}

                <div className="flex items-end justify-between">

                    <img
                        src={image2}
                        alt=""
                        className="w-48 object-cover shadow-md"
                    />

                    <h2 className="font-heading text-8xl text-[#9E866F]">
                        D
                    </h2>

                </div>

                {/* Serce */}

                <div className="mt-12 text-center text-6xl text-[#9E866F]">

                    ♡

                </div>

            </div>

        </section>
    );
};

export default MemoriesSection;