import Input from "./Input";

export const PasswordChangeForm = () => {
    return (
        <form className="text-white pt-[105px] pb-0 w-[599px] flex flex-1 flex-col">
            <Input label="기존 비밀번호" placeholder="olivia@untitledui.com" />{" "}
            <div className="pt-7 "></div>
            <Input label="새 비밀번호" placeholder="olivia@untitledui.com" />{" "}
            <div className="pt-7 "></div>
            <Input label="새 비밀번호 확인" placeholder="olivia@untitledui.com" />
            <button
                type="submit"
                className="w-full h-14 flex justify-center items-center bg-[#ff7700] rounded-lg font-bold text-xl text-white mt-[92px] mb-[28px] cursor-pointer"
            >
                로그인
            </button>
        </form>
    );
};
