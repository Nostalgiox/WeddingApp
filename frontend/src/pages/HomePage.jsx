import { useState } from "react";

import Navbar from "../components/navbar/Navbar";
import MobileMenu from "../components/navbar/MobileMenu";
import Hero from "../components/hero/Hero/Hero";
import QuoteSection from "../components/quote/QuoteSection";
import WeddingDateSection from "../components/weddingDate/WeddingDateSection";
import ActionCardsSection from "../components/actions/ActionCardsSection";
import Footer from "../components/footer/Footer";

const HomePage = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>

            <Navbar
                isOpen={menuOpen}
                onToggle={() => setMenuOpen(!menuOpen)}
            />

            <MobileMenu
                isOpen={menuOpen}
                onClose={() => setMenuOpen(false)}
            />

            <Hero />

            <QuoteSection />

            <WeddingDateSection />

            <ActionCardsSection />

            <Footer />

        </>
    );
};

export default HomePage;