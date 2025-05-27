import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { ROUTES } from "./constants/routes";

import ProjectPage from "./pages/Project";
import ProjectDetailPage from "./pages/ProjectDetail";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.PROJECT} element={<ProjectPage />} />
                <Route path="/project/:id" element={<ProjectDetailPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
