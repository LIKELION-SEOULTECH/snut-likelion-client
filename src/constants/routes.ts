export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    SIGNUP: "/signup",
    PROJECT: "/project",
    MEMBER: "/member",
    BLOG: "/blog",
    NEWS: "/news",
    NEWS_CONTENT: "/news-content/:id"
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
