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

    ADMIN: "/admin"
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
