import AppRouter from "./routes/AppRouter";
import MainLayout from "./layouts/MainLayout";

function App() {
    return (
        <MainLayout>
            <AppRouter />
        </MainLayout>
    );
}

export default App;