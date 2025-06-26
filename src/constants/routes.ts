export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    PASSWORDRESET: "/PasswordReset",
    REGISTER: "/register",
    PROJECT: "/project",

    MEMBER: "/member",
    MEMBER_DETAIL: "/members/:id",

    BLOG: "/blog",
    BLOG_POST: "/blog-post",
    BLOG_CONTENT: "/blog-content/:id",

    NEWS: "/news",
    NEWS_CONTENT: "/news-content/:id",

    ADMIN: "/admin",
    ADMIN_MEMBER: "/admin/member",
    ADMIN_RECRUIT: "/admin/recruit",
    ADMIN_RECRUIT_MANAGER: "/admin/recruit/manager",
    ADMIN_RECRUIT_USER: "/admin/recruit/user",
    ADMIN_APPLY_MANAGER: "/admin/apply-manager",
    ADMIN_APPLY_USER: "/admin/apply-user"
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
