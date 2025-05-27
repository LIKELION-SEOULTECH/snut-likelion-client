import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { ROUTES } from "./constants/routes";
import { SignupPage } from "./pages/Signup";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
