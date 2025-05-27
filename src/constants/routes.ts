export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    SIGNUP: "/signup",
    PROJECT: "/project",
    MEMBER: "/member",
    MEMBER_DETAIL: "/members/:id",
    BLOG: "/blog",
    NEWS: "/news"
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
