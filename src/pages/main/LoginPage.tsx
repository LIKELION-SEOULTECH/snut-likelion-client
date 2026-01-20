import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import QuoteCardList from "@/components/project/QuoteCardList";
import PageLayout from "@/layouts/PageLayout";

export const LoginPage = () => {
    return (
        <PageLayout>
            <AuthLayout title="로그인">
                <LoginForm />
            </AuthLayout>
            <div className="w-full h-[150px] px-28 bg-[#1B1B1B]">
                <QuoteCardList />
            </div>
            console.log(email, password);
        </PageLayout>
    );
};
