import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";

import { LoginPage } from "./pages/LoginPage";
import { PasswordResetPage } from "./pages/PasswordResetPage";
import { RegisterPage } from "./pages/Signup";

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

import { MyPage } from "./pages/MyPage";
import { MyPageEdit } from "./pages/MyPageEdit";
import { PasswordChange } from "./pages/PasswordChange";
import { NewProjectPage } from "./pages/NewProjectPage";

import { Recruit } from "./pages/Recruit";
import { RecruitForm } from "./pages/RecruitForm";

import { AdminPage } from "./pages/Admin";
import { AdminMemberPage } from "./pages/AdminMember";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />

                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.PASSWORDRESET} element={<PasswordResetPage />} />
                <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

                <Route path={ROUTES.NEWS} element={<NewsPage />} />
                <Route path={ROUTES.NEWS_CONTENT} element={<NewsContentPage />} />

                <Route path={ROUTES.BLOG} element={<BlogPage />} />
                <Route path={ROUTES.BLOG_POST} element={<BlogPostPage />} />
                <Route path={ROUTES.BLOG_CONTENT} element={<BlogContentPage />} />

                <Route path={ROUTES.PROJECT} element={<ProjectPage />} />
                <Route path="/project/:id" element={<ProjectDetailPage />} />
                <Route path={ROUTES.PROJECT_NEW} element={<NewProjectPage />} />

                <Route path={ROUTES.MEMBER} element={<MemberPage />} />
                <Route path={ROUTES.MEMBER_DETAIL} element={<MemberDetailPage />} />

                <Route path={ROUTES.MYPAGE} element={<MyPage />} />
                <Route path={ROUTES.MYPAGE_EDIT} element={<MyPageEdit />} />
                <Route path={ROUTES.MYPAGE_PASSWORD_CHANGE} element={<PasswordChange />} />

                <Route path={ROUTES.RECRUIT_MEMBER} element={<Recruit isManager={false} />} />
                <Route path={ROUTES.RECRUIT_MANAGER} element={<Recruit isManager={true} />} />
                <Route
                    path={ROUTES.RECRUIT_FORM_MANAGER}
                    element={<RecruitForm isManeger={true} />}
                />
                <Route
                    path={ROUTES.RECRUIT_FORM_MEMBER}
                    element={<RecruitForm isManeger={false} />}
                />

                <Route path={ROUTES.ADMIN} element={<AdminPage />} />
                <Route path={ROUTES.ADMIN_MEMBER} element={<AdminMemberPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
