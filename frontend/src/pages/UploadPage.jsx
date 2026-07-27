import { useState } from "react";

import Navbar from "../components/navbar/Navbar";
import MobileMenu from "../components/navbar/MobileMenu";

import UploadHeader from "../components/upload/UploadHeader";
import UploadDropzone from "../components/upload/UploadDropzone";
import MainLayout from "../layouts/MainLayout";
const UploadPage = () => {

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

            <UploadHeader />

            <UploadDropzone />

        </MainLayout>
    );
};

export default UploadPage;