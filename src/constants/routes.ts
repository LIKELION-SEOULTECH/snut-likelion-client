export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    PASSWORDRESET: "/PasswordReset",
    REGISTER: "/register",

    PROJECT: "/project",
    PROJECT_NEW: "/project-new",

    MEMBER: "/member",
    MEMBER_DETAIL: "/members/:id",

    BLOG: "/blog",
    BLOG_POST: "/blog-post",
    BLOG_CONTENT: "/blog-content/:id",

    NEWS: "/news",
    NEWS_CONTENT: "/news-content/:id",

    MYPAGE: "/mypage",
    MYPAGE_EDIT: "/mypage-edit",
    MYPAGE_PASSWORD_CHANGE: "/PasswordChange",

    RECRUIT_MEMBER: "/recruitments/member",
    RECRUIT_MANAGER: "/recruitments/manager",
    RECRUIT_FORM_MANAGER: "/recruitform/manager",
    RECRUIT_FORM_MEMBER: "/recruitform/member",

    ADMIN_MEMBER: "/admin/member",

    ADMIN_NOTICE: "/admin/notice",
    ADMIN_NOTICE_DETAIL: "/admin/notice/:id",
    ADMIN_NOTICE_CREATE: "/admin/notice/create",
    ADMIN_NOTICE_EDIT: "/admin/notice/edit/:id",

    ADMIN_PROJECT: "/admin/project",
    ADMIN_PROJECT_CREATE: "/admin/project/create",
    ADMIN_PROJECT_EDIT: "/admin/project/edit/:id",

    ADMIN_BLOG: "/admin/blog",
    ADMIN_BLOG_CREATE: "/admin/blog/create",
    ADMIN_BLOG_EDIT: "/admin/blog/edit/:id",

    ADMIN_RECRUIT: "/admin/recruit",
    ADMIN_RECRUIT_MANAGER: "/admin/recruit/manager",
    ADMIN_RECRUIT_MANAGER_DETAIL: "/admin/recruit/result/manager/:id",
    ADMIN_RECRUIT_USER: "/admin/recruit/user",
    ADMIN_RECRUIT_USER_DETAIL: "/admin/recruit/result/user/:id",

    ADMIN_APPLY_MANAGER: "/admin/apply-manager",
    ADMIN_APPLY_USER: "/admin/apply-user"
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
