export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    PASSWORDRESET: "/PasswordReset",
    SIGNUP: "/signup",
    PROJECT: "/project",
  
    MEMBER: "/member",
    MEMBER_DETAIL: "/members/:id",
  
    BLOG: "/blog",
    BLOG_POST: "/blog-post",
    BLOG_CONTENT: "/blog-content/:id",
  
    NEWS: "/news"
    NEWS_CONTENT: "/news-content/:id"
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
