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

import { AdminMemberPage } from "./pages/AdminMember";
import { AdminNoticePage } from "./pages/AdminNotice";
import { AdminProjectPage } from "./pages/AdminProject";

import { AdminProjectEditPage } from "./pages/AdminProjectEdit";
import { AdminProjectCreatePage } from "./pages/AdminProjectCreate";

import { AdminNoticeDetailPage } from "./pages/AdminNoticeDetail";
import { AdminNoticeCreatePage } from "./pages/AdminNoticeCreate";
import { AdminNoticeEditPage } from "./pages/AdminNoticeEdit";
import { AdminBlogPage } from "./pages/AdminBlog";

import { AdminBlogCreatePage } from "./pages/AdminBlogCreate";
import { AdminBlogEditPage } from "./pages/AdminBlogEdit";

import { AdminRecruitPage } from "./pages/AdminRecruit";
import { AdminUserRecruitPage } from "./pages/AdminUserRecruit";
import { AdminManagerRecruitPage } from "./pages/AdminManageRecruit";
import { AdminManagerRecruitDetailPage } from "./pages/ApplyManagerDetail";
import { AdminUsererRecruitDetailPage } from "./pages/ApplyUserDetail";
import { AdminApplyUserPage } from "./pages/AdminApplyUser";
import { AdminApplyManagerPage } from "./pages/AdminApplyManager";

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

                <Route path={ROUTES.ADMIN_MEMBER} element={<AdminMemberPage />} />
                <Route path={ROUTES.ADMIN_NOTICE} element={<AdminNoticePage />} />

                <Route path={ROUTES.ADMIN_PROJECT} element={<AdminProjectPage />} />
                <Route path={ROUTES.ADMIN_PROJECT_CREATE} element={<AdminProjectCreatePage />} />
                <Route path={ROUTES.ADMIN_PROJECT_EDIT} element={<AdminProjectEditPage />} />

                <Route path={ROUTES.ADMIN_NOTICE_DETAIL} element={<AdminNoticeDetailPage />} />
                <Route path={ROUTES.ADMIN_NOTICE_CREATE} element={<AdminNoticeCreatePage />} />
                <Route path={ROUTES.ADMIN_NOTICE_EDIT} element={<AdminNoticeEditPage />} />

                <Route path={ROUTES.ADMIN_BLOG} element={<AdminBlogPage />} />
                <Route path={ROUTES.ADMIN_BLOG_CREATE} element={<AdminBlogCreatePage />} />
                <Route path={ROUTES.ADMIN_BLOG_EDIT} element={<AdminBlogEditPage />} />
                <Route path={ROUTES.ADMIN_RECRUIT} element={<AdminRecruitPage />} />
                <Route path={ROUTES.ADMIN_APPLY_MANAGER} element={<AdminApplyManagerPage />} />
                <Route path={ROUTES.ADMIN_APPLY_USER} element={<AdminApplyUserPage />} />
                <Route path={ROUTES.ADMIN_RECRUIT_USER} element={<AdminUserRecruitPage />} />
                <Route path={ROUTES.ADMIN_RECRUIT_MANAGER} element={<AdminManagerRecruitPage />} />
                <Route path={ROUTES.ADMIN_RECRUIT_MANAGER} element={<AdminManagerRecruitPage />} />
                <Route
                    path={ROUTES.ADMIN_RECRUIT_MANAGER_DETAIL}
                    element={<AdminManagerRecruitDetailPage />}
                />
                <Route
                    path={ROUTES.ADMIN_RECRUIT_USER_DETAIL}
                    element={<AdminUsererRecruitDetailPage />}
                />
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
            </Routes>
        </BrowserRouter>
    );
}

export default App;
