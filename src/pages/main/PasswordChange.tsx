import { AuthLayout } from "@/components/auth/AuthLayout";
import { PasswordChangeForm } from "@/components/auth/PasswordChangeForm";
import QuoteCardList from "@/components/project/QuoteCardList";
import PageLayout from "@/layouts/PageLayout";

export const PasswordChange = () => {
    return (
        <PageLayout>
            <AuthLayout title="비밀번호 변경">
                <PasswordChangeForm />
            </AuthLayout>
            <div className="w-full h-[150px] px-28 bg-[#1B1B1B]">
                <QuoteCardList />
            </div>
        </PageLayout>
    );
};
