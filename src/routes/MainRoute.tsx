import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

import { LoginPage } from "@/pages/main/LoginPage";
import { PasswordResetPage } from "@/pages/main/PasswordResetPage";
import { RegisterPage } from "@/pages/main/Signup";

import Home from "@/pages/main/Home";

import { NewsPage } from "@/pages/main/News";
import { NewsContentPage } from "@/pages/main/NewsContent";

import { BlogPage } from "@/pages/main/Blog";
import { BlogPostPage } from "@/pages/main/BlogPost";
import { BlogContentPage } from "@/pages/main/BlogContent";

import ProjectPage from "@/pages/main/Project";
import ProjectDetailPage from "@/pages/main/ProjectDetail";

import { MemberPage } from "@/pages/main/Member";
import { MemberDetailPage } from "@/pages/main/MemberDetailPage";

import { MyPage } from "@/pages/main/MyPage";
import { MyPageEdit } from "@/pages/main/MyPageEdit";
import { PasswordChange } from "@/pages/main/PasswordChange";
import { NewProjectPage } from "@/pages/main/NewProjectPage";

import { Recruit } from "@/pages/main/Recruit";
import { RecruitForm } from "@/pages/main/RecruitForm";

export default function MainRoutes() {
    return (
        <Routes>
            {/* 홈 */}
            <Route path={ROUTES.HOME} element={<Home />} />

            {/* 인증 */}
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.PASSWORD_RESET} element={<PasswordResetPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

            {/* 뉴스 */}
            <Route path={ROUTES.NOTICE} element={<NewsPage />} />
            <Route path={ROUTES.NOTICE_CONTENT} element={<NewsContentPage />} />

            {/* 블로그 */}
            <Route path={ROUTES.BLOG} element={<BlogPage />} />
            <Route path={ROUTES.BLOG_POST} element={<BlogPostPage />} />
            <Route path={ROUTES.BLOG_CONTENT} element={<BlogContentPage />} />

            {/* 프로젝트 */}
            <Route path={ROUTES.PROJECT} element={<ProjectPage />} />
            <Route path={ROUTES.PROJECT_DETAIL} element={<ProjectDetailPage />} />
            <Route path={ROUTES.PROJECT_NEW} element={<NewProjectPage />} />

            {/* 멤버 */}
            <Route path={ROUTES.MEMBER} element={<MemberPage />} />
            <Route path={ROUTES.MEMBER_DETAIL} element={<MemberDetailPage />} />

            {/* 마이페이지 */}
            <Route path={ROUTES.MYPAGE} element={<MyPage />} />
            <Route path={ROUTES.MYPAGE_EDIT} element={<MyPageEdit />} />
            <Route path={ROUTES.MYPAGE_PASSWORD_CHANGE} element={<PasswordChange />} />

            {/* 모집 페이지 */}
            <Route path={ROUTES.RECRUIT_MEMBER} element={<Recruit isManager={false} />} />
            <Route path={ROUTES.RECRUIT_MANAGER} element={<Recruit isManager={true} />} />
            <Route path={ROUTES.RECRUIT_FORM_MANAGER} element={<RecruitForm isManeger={true} />} />
            <Route path={ROUTES.RECRUIT_FORM_MEMBER} element={<RecruitForm isManeger={false} />} />

            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
    );
}
