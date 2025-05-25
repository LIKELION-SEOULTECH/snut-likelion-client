import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { ROUTES } from "./constants/routes";
import ProjectPage from "./pages/Project";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.PROJECT} element={<ProjectPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
