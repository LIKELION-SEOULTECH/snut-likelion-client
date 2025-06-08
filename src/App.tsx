import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { ROUTES } from "./constants/routes";
import { BlogPage } from "./pages/Blog";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.BLOG} element={<BlogPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
