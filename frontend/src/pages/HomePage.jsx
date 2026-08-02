import Navbar from "../components/navbar/Navbar";
import MobileMenu from "../components/navbar/MobileMenu";
import Hero from "../components/hero/Hero/Hero";
import QuoteSection from "../components/quote/QuoteSection";
import WeddingDateSection from "../components/weddingDate/WeddingDateSection";
import ActionCardsSection from "../components/actions/ActionCardsSection";
import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import SplashScreen from "../components/splash/SplashScreen";

const HomePage = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [showSplash, setShowSplash] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 1800);

        return () => clearTimeout(timer);
    }, []);
    return (
        <MainLayout>
            <SplashScreen show={showSplash} />

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

        </MainLayout>
    );
};

export default HomePage;