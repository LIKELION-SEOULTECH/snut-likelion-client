import { AuthLayout } from "@/components/auth/AuthLayout";
import { PasswordResetForm } from "@/components/auth/PasswordResetForm";
import QuoteCardList from "@/components/project/QuoteCardList";
import PageLayout from "@/layouts/PageLayout";

export const PasswordResetPage = () => {
    return (
        <PageLayout>
            <AuthLayout title="비밀번호 찾기">
                <PasswordResetForm />
            </AuthLayout>
            <div className="w-full h-[150px] px-28 bg-[#1B1B1B]">
                <QuoteCardList />
            </div>
        </PageLayout>
    );
};
