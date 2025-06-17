import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";

import Home from "@/pages/Home";

import { BlogPage } from "./pages/Blog";

import ProjectPage from "./pages/Project";
import ProjectDetailPage from "./pages/ProjectDetail";

import { MemberPage } from "./pages/Member";
import { MemberDetailPage } from "./pages/MemberDetailPage";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.BLOG} element={<BlogPage />} />
                <Route path={ROUTES.PROJECT} element={<ProjectPage />} />
                <Route path="/project/:id" element={<ProjectDetailPage />} />
                <Route path={ROUTES.MEMBER} element={<MemberPage />} />
                <Route path={ROUTES.MEMBER_DETAIL} element={<MemberDetailPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
