import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import PageLayout from "@/layouts/PageLayout";

export const LoginPage = () => {
    return (
        <PageLayout>
            <AuthLayout title="로그인">
                <LoginForm />
            </AuthLayout>
        </PageLayout>
    );
};
