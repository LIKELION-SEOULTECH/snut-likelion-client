// src/routes/routes.ts

export const ROUTES = {
    HOME: "/",

    // auth
    LOGIN: "/login",
    PASSWORD_RESET: "/password-reset",
    REGISTER: "/register",

    // project
    PROJECT: "/project",
    PROJECT_DETAIL: "/project/:id",
    PROJECT_NEW: "/project-new",

    // member
    MEMBER: "/member",
    MEMBER_DETAIL: "/members/:id",

    // blog
    BLOG: "/blog",
    BLOG_POST: "/blog-post",
    BLOG_CONTENT: "/blog-content/:id",

    // news
    NOTICE: "/notice", // 기존: NEWS
    NOTICE_CONTENT: "/notice-content/:id",

    // my page
    MYPAGE: "/mypage",
    MYPAGE_EDIT: "/mypage-edit",
    MYPAGE_PASSWORD_CHANGE: "/password-change", // 기존: "/PasswordChange"

    // recruit (public)
    RECRUIT_MEMBER: "/recruitments/member",
    RECRUIT_MANAGER: "/recruitments/manager",
    RECRUIT_FORM_MANAGER: "/recruitform/manager",
    RECRUIT_FORM_MEMBER: "/recruitform/member",

    // admin base (절대)
    ADMIN_BASE: "/admin"
} as const;

// 어드민 라우트: AdminRoute가 /admin/* 로 마운트되므로 "상대 경로" 사용
export const ADMIN = {
    INDEX: "", // /admin -> index

    MEMBER: "member",

    NOTICE: "notice",
    NOTICE_DETAIL: "notice/:id",
    NOTICE_CREATE: "notice/create",
    NOTICE_EDIT: "notice/edit/:id",

    PROJECT: "project",
    PROJECT_CREATE: "project/create",
    PROJECT_EDIT: "project/edit/:id",

    BLOG: "blog",
    BLOG_CREATE: "blog/create",
    BLOG_EDIT: "blog/edit/:id",

    RECRUIT: "recruit",
    RECRUIT_MANAGER: "recruit/manager",
    RECRUIT_MANAGER_DETAIL: "recruit/result/manager/:id",
    RECRUIT_USER: "recruit/user",
    RECRUIT_USER_DETAIL: "recruit/result/user/:id",

    APPLY_MANAGER: "recruit/apply-manager",
    APPLY_USER: "recruit/apply-user"
} as const;

export const ADMIN_ABS = Object.fromEntries(
    Object.entries(ADMIN).map(([k, v]) => [k, `${ROUTES.ADMIN_BASE}/${v}`])
) as Record<keyof typeof ADMIN, string>;
export const adminTo = (k: AdminKey) => `${ROUTES.ADMIN_BASE}/${ADMIN[k]}`;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
export type AdminKey = keyof typeof ADMIN;
export type AdminPath = (typeof ADMIN)[AdminKey];
