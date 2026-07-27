import { useState } from "react";

import Navbar from "../components/navbar/Navbar";
import MobileMenu from "../components/navbar/MobileMenu";

import UploadHeader from "../components/upload/UploadHeader";
import UploadDropzone from "../components/upload/UploadDropzone";

const UploadPage = () => {

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

            <UploadHeader />

            <UploadDropzone />

        </main>
    );
};

export default UploadPage;