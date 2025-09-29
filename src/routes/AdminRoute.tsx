import { Routes, Route, Navigate } from "react-router-dom";
import { ADMIN } from "@/routes/routes";

import { AdminMemberPage } from "@/pages/admin/AdminMember";
import { AdminNoticePage } from "@/pages/admin/AdminNotice";
import { AdminProjectPage } from "@/pages/admin/AdminProject";

import { AdminProjectEditPage } from "@/pages/admin/AdminProjectEdit";
import { AdminProjectCreatePage } from "@/pages/admin/AdminProjectCreate";

import { AdminNoticeDetailPage } from "@/pages/admin/AdminNoticeDetail";
import { AdminNoticeCreatePage } from "@/pages/admin/AdminNoticeCreate";
import { AdminNoticeEditPage } from "@/pages/admin/AdminNoticeEdit";
import { AdminBlogPage } from "@/pages/admin/AdminBlog";

import { AdminBlogCreatePage } from "@/pages/admin/AdminBlogCreate";
import { AdminBlogEditPage } from "@/pages/admin/AdminBlogEdit";

import { AdminRecruitPage } from "@/pages/admin/AdminRecruit";
import { AdminUserRecruitPage } from "@/pages/admin/AdminUserRecruit";
import { AdminManagerRecruitPage } from "@/pages/admin/AdminManageRecruit";
import { AdminManagerRecruitDetailPage } from "@/pages/admin/ApplyManagerDetail";
import { AdminUsererRecruitDetailPage } from "@/pages/admin/ApplyUserDetail";
import { AdminUserApplyPage } from "@/pages/admin/AdminUserApply";
import { AdminManagerApplyPage } from "@/pages/admin/AdminManagerApply";

export default function AdminRoute() {
    return (
        <Routes>
            {/* /admin -> /admin/member로 리다이렉트 */}
            <Route index element={<Navigate to={ADMIN.MEMBER} replace />} />

            <Route path={ADMIN.MEMBER} element={<AdminMemberPage />} />

            <Route path={ADMIN.NOTICE} element={<AdminNoticePage />} />
            <Route path={ADMIN.NOTICE_DETAIL} element={<AdminNoticeDetailPage />} />
            <Route path={ADMIN.NOTICE_CREATE} element={<AdminNoticeCreatePage />} />
            <Route path={ADMIN.NOTICE_EDIT} element={<AdminNoticeEditPage />} />

            <Route path={ADMIN.PROJECT} element={<AdminProjectPage />} />
            <Route path={ADMIN.PROJECT_CREATE} element={<AdminProjectCreatePage />} />
            <Route path={ADMIN.PROJECT_EDIT} element={<AdminProjectEditPage />} />

            <Route path={ADMIN.BLOG} element={<AdminBlogPage />} />
            <Route path={ADMIN.BLOG_CREATE} element={<AdminBlogCreatePage />} />
            <Route path={ADMIN.BLOG_EDIT} element={<AdminBlogEditPage />} />

            <Route path={ADMIN.RECRUIT} element={<AdminRecruitPage />} />
            <Route path={ADMIN.APPLY_MANAGER} element={<AdminManagerApplyPage />} />
            <Route path={ADMIN.APPLY_USER} element={<AdminUserApplyPage />} />
            <Route path={ADMIN.RECRUIT_USER} element={<AdminUserRecruitPage />} />
            <Route path={ADMIN.RECRUIT_MANAGER} element={<AdminManagerRecruitPage />} />
            <Route
                path={ADMIN.RECRUIT_MANAGER_DETAIL}
                element={<AdminManagerRecruitDetailPage />}
            />
            <Route path={ADMIN.RECRUIT_USER_DETAIL} element={<AdminUsererRecruitDetailPage />} />
        </Routes>
    );
}
