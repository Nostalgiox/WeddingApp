import date1 from "../../assets/images/1.jpg";
import date2 from "../../assets/images/2.jpg";
import date3 from "../../assets/images/6.jpg";

const WeddingDateSection = () => {
    return (
        <section className="bg-[#F8F6F3] py-24">

            <div className="mx-auto max-w-md px-6">

                <div className="flex justify-center gap-4">

                    {/* 22 */}
                    <div className="flex flex-col items-center">

                        <h2 className="mb-3 font-heading text-7xl font-light leading-none text-[#3A312B]">
                            22
                        </h2>

                        <img
                            src={date1}
                            alt=""
                            className="h-72 w-32 object-cover shadow-lg"
                        />

                    </div>

                    {/* 08 */}
                    <div className="mt-10 flex flex-col items-center">

                        <h2 className="mb-3 font-heading text-7xl font-light leading-none text-[#3A312B]">
                            08
                        </h2>

                        <img
                            src={date2}
                            alt=""
                            className="h-72 w-32 object-cover shadow-lg"
                        />

                    </div>

                    {/* 26 */}
                    <div className="mt-20 flex flex-col items-center">

                        <h2 className="mb-3 font-heading text-7xl font-light leading-none text-[#3A312B]">
                            26
                        </h2>

                        <img
                            src={date3}
                            alt=""
                            className="h-72 w-32 object-cover shadow-lg"
                        />

                    </div>

                </div>

            </div>

        </section>
    );
};

export default WeddingDateSection;