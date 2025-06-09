import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { ROUTES } from "./constants/routes";
import { BlogPage } from "./pages/Blog";
import { BlogContentPage } from "./pages/BlogContent";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.BLOG} element={<BlogPage />} />
                <Route path={ROUTES.BLOG_CONTENT} element={<BlogContentPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
