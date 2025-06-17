import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";

import Home from "@/pages/Home";

import { NewsPage } from "./pages/News";
import { NewsContentPage } from "./pages/NewsContent";

import { BlogPage } from "./pages/Blog";
import { BlogPostPage } from "./pages/BlogPost";
import { BlogContentPage } from "./pages/BlogContent";

import ProjectPage from "./pages/Project";
import ProjectDetailPage from "./pages/ProjectDetail";

import { MemberPage } from "./pages/Member";
import { MemberDetailPage } from "./pages/MemberDetailPage";



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />

                <Route path={ROUTES.NEWS} element={<NewsPage />} />
                <Route path={ROUTES.NEWS_CONTENT} element={<NewsContentPage />} />
              
                <Route path={ROUTES.BLOG} element={<BlogPage />} />
                <Route path={ROUTES.BLOG_POST} element={<BlogPostPage />} />
                <Route path={ROUTES.BLOG_CONTENT} element={<BlogContentPage />} />
              
                <Route path={ROUTES.PROJECT} element={<ProjectPage />} />
                <Route path="/project/:id" element={<ProjectDetailPage />} />
              
                <Route path={ROUTES.MEMBER} element={<MemberPage />} />
                <Route path={ROUTES.MEMBER_DETAIL} element={<MemberDetailPage />} />
              
            </Routes>
        </BrowserRouter>
    );
}

export default App;
