import { useState } from "react";

import Navbar from "../components/navbar/Navbar";
import MobileMenu from "../components/navbar/MobileMenu";

import MissionsHeader from "../components/missions/MissionsHeader";
import MissionBoard from "../components/missions/MissionBoard";

import MainLayout from "../layouts/MainLayout";

const MissionsPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <MainLayout>

            <Navbar
                isOpen={menuOpen}
                onToggle={() => setMenuOpen(!menuOpen)}
            />

            <MobileMenu
                isOpen={menuOpen}
                onClose={() => setMenuOpen(false)}
            />

            <MissionsHeader />

            <MissionBoard />

        </MainLayout>
    );
};

export default MissionsPage;