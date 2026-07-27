import { useState } from "react";

import Navbar from "../components/navbar/Navbar";
import MobileMenu from "../components/navbar/MobileMenu";

import MissionsHeader from "../components/missions/MissionsHeader";
import MissionBoard from "../components/missions/MissionBoard";

const MissionsPage = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <main className="min-h-screen bg-[#F8F6F3]">

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

        </main>
    );
};

export default MissionsPage;