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
    RECRUIT_MANEGER: "/recruitments/maneger",
    RECRUIT_FORM_MANEGER: "/recruitform/maneger",
    RECRUIT_FORM_MEMBER: "/recruitform/member",

    ADMIN: "/admin",
    ADMIN_MEMBER: "/admin/member"


} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
