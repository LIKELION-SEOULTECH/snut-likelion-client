export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    SIGNUP: "/signup",
    PROJECT: "/project",
    MEMBER: "/member",
    BLOG: "/blog",
    BLOG_CONTENT: "/blog-content/:id",
    NEWS: "/news"
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
