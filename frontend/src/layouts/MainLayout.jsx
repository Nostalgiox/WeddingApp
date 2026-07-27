import Footer from "../components/footer/Footer";

const MainLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col bg-[#F8F6F3]">

            <main className="flex-1">
                {children}
            </main>

            <Footer />

        </div>
    );
};

export default MainLayout;