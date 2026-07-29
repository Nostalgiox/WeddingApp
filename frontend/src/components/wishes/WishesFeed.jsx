import { motion } from "framer-motion";
import { MessageCircleHeart } from "lucide-react";

import WishPost from "./WishPost";

const WishesFeed = ({ wishes }) => {
    if (wishes.length === 0) {
        return (
            <div
                className="
                    mx-4
                    mt-6
                    flex
                    min-h-[300px]
                    flex-col
                    items-center
                    justify-center
                    rounded-3xl
                    border
                    border-dashed
                    border-[#D8CCBF]
                "
            >
                <MessageCircleHeart
                    size={40}
                    strokeWidth={1.3}
                    className="text-[#B89B7A]"
                />

                <h2 className="mt-5 font-heading text-2xl text-[#3A312B]">
                    Jeszcze tu cicho
                </h2>

                <p className="mt-2 text-center leading-6 text-[#7B7065]">
                    Bądź pierwszą osobą,
                    <br />
                    która zostawi nam życzenia.
                </p>

            </div>
        );
    }

    return (
        <section className="space-y-4 px-4 pb-24 pt-6">

            {wishes.map((wish, index) => (
                <motion.div
                    key={wish.id}
                    initial={{
                        opacity: 0,
                        y: 15,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.35,
                        delay: Math.min(index * 0.04, 0.3),
                    }}
                >
                    <WishPost wish={wish} />
                </motion.div>
            ))}

        </section>
    );
};

export default WishesFeed;