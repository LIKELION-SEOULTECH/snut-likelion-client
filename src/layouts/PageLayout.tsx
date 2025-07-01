import { Header } from "./Header";
import { PostHeader } from "./PostHeader";
import { Footer } from "./Footer";
import { useEffect } from "react";

interface PageLayoutProps {
    children: React.ReactNode;
    white?: boolean;
    isPost?: boolean;
    isUploadEnabled?: boolean;
    onSubmit?: () => void; // ⬅️ 추가
}

export default function PageLayout({
    children,
    white = false,
    isPost = false,
    isUploadEnabled = false,
    onSubmit
}: PageLayoutProps) {
    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;

        const background = white ? "#ffffff" : "#000000";

        html.style.backgroundColor = background;
        body.style.backgroundColor = background;

        return () => {
            html.style.backgroundColor = "";
            body.style.backgroundColor = "";
        };
    }, [white]);

    return (
        <>
            {isPost ? (
                <PostHeader isUploadEnabled={isUploadEnabled} onSubmit={onSubmit!} />
            ) : (
                <Header white={white} />
            )}
            <main>{children}</main>
            <Footer white={white} />
        </>
    );
}
