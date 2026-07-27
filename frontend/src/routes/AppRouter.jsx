import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import GalleryPage from "../pages/GalleryPage";
import UploadPage from "../pages/UploadPage";
import WishesPage from "../pages/WishesPage";
import MissionsPage from "../pages/MissionsPage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/missions" element={<MissionsPage />}/>
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/wishes" element={<WishesPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;