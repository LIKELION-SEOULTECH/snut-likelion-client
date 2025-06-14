import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { ROUTES } from "./constants/routes";
import { BlogPage } from "./pages/Blog";
import { NewsPage } from "./pages/News";
import { NewsContentPage } from "./pages/NewsContent";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.BLOG} element={<BlogPage />} />
                <Route path={ROUTES.NEWS} element={<NewsPage />} />
                <Route path={ROUTES.NEWS_CONTENT} element={<NewsContentPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
