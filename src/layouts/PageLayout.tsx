import { Footer } from "./Footer";
import { Header } from "./Header";
import { useEffect } from "react";

interface PageLayoutProps {
    children: React.ReactNode;
    white?: boolean;
}

export default function PageLayout({ children, white = false }: PageLayoutProps) {
    // html, body에 적용된 배경색 설정
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
            <Header white={white} />
            <main>{children}</main>
            <Footer white={white} />
        </>
    );
}
