import { AuthLayout } from "@/components/auth/AuthLayout";
import { PasswordResetForm } from "@/components/auth/PasswordResetForm";
import PageLayout from "@/layouts/PageLayout";

export const PasswordResetPage = () => {
    return (
        <PageLayout>
            <AuthLayout title="비밀번호 찾기">
                <PasswordResetForm />
            </AuthLayout>
        </PageLayout>
    );
};
