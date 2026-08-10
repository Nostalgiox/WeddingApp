import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import GalleryPage from "../pages/GalleryPage";
import UploadPage from "../pages/UploadPage";
import WishesPage from "../pages/WishesPage";
import MissionsPage from "../pages/MissionsPage";

// ADMIN
import AdminLayout from "../admin/layouts/AdminLayout";
import AdminDashboardPage from "../admin/pages/AdminDashboardPage";
import AdminPhotosPage from "../admin/pages/AdminPhotosPage";
import AdminMissionsPage from "../admin/pages/AdminMissionsPage";
import AdminLoginPage from "../admin/pages/AdminLoginPage";
import ProtectedAdminRoute from "../admin/components/ProtectedAdminRoute";
import AdminWishesPage from "../admin/pages/AdminWishesPage";
import AdminRewardsPage from "../admin/pages/AdminRewardsPage";
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* ========================= */}
                {/* STRONA DLA GOŚCI         */}
                {/* ========================= */}

                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/gallery"
                    element={<GalleryPage />}
                />

                <Route
                    path="/upload"
                    element={<UploadPage />}
                />

                <Route
                    path="/wishes"
                    element={<WishesPage />}
                />

                <Route
                    path="/missions"
                    element={<MissionsPage />}
                />




                {/* ========================= */}
                {/* LOGOWANIE ADMINA         */}
                {/* ========================= */}

                <Route
                    path="/admin-panel/login"
                    element={<AdminLoginPage />}
                />


                {/* ========================= */}
                {/* PANEL ADMINA             */}
                {/* ========================= */}

                <Route element={<ProtectedAdminRoute />}>

                    <Route
                        path="/admin-panel"
                        element={<AdminLayout />}
                    >

                        <Route
                            index
                            element={<AdminDashboardPage />}
                        />

                        <Route
                            path="photos"
                            element={<AdminPhotosPage />}
                        />

                        <Route
                            path="missions"
                            element={<AdminMissionsPage />}
                        />

                        <Route
                            path="wishes"
                            element={<AdminWishesPage />}
                        />
                        
                      <Route
                        path="rewards"
                        element={<AdminRewardsPage />}
                    />

                    </Route>

                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;