import { useState } from "react";
import { Button } from "../ui/button";
import Input from "./Input";
import { changePassword } from "@/apis/main/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

export const PasswordChangeForm = () => {
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const mutation = useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            alert("비밀번호가 변경되었습니다.");
            navigate(ROUTES.HOME);
        },
        onError: () => {
            alert("비밀번호 변경에 실패했습니다.");
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        mutation.mutate({
            oldPassword,
            newPassword,
            confirmPassword,
            passwordMatching: newPassword === confirmPassword
        });
    };

    return (
        <form
            className="text-white pt-[105px] pb-0 w-[599px] flex flex-1 flex-col gap-11"
            onSubmit={handleSubmit}
        >
            <Input
                label="기존 비밀번호"
                placeholder="olivia@untitledui.com"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
            />
            <Input
                label="새 비밀번호"
                placeholder="olivia@untitledui.com"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />{" "}
            <Input
                label="새 비밀번호 확인"
                placeholder="olivia@untitledui.com"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />{" "}
            <Button
                type="submit"
                className="w-full h-14 flex justify-center items-center bg-[#ff7700] rounded-lg font-bold text-xl text-white mt-15 mb-[47px] cursor-pointer hover:bg-primary-400"
            >
                변경하기
            </Button>
        </form>
    );
};
