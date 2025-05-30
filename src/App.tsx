import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { ROUTES } from "./constants/routes";
import { LoginPage } from "./pages/LoginPage";
import { PasswordResetPage } from "./pages/PasswordResetPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.PASSWORDRESET} element={<PasswordResetPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
