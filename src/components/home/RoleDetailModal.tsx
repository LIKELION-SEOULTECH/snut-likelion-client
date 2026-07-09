import type { RoleCardProps } from "@/types/home";
import { useEffect } from "react";
import { createPortal } from "react-dom";

type RoleDetailModalProps = {
    role: RoleCardProps | null;
    onClose: () => void;
};

export const RoleDetailModal = ({ role, onClose }: RoleDetailModalProps) => {
    useEffect(() => {
        if (!role) return;

        const scrollY = window.scrollY;

        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.width = "";
            document.body.style.overflow = "";

            window.scrollTo(0, scrollY);
        };
    }, [role]);

    if (!role) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[99999] flex items-end justify-center bg-black/60 sm:hidden"
            onClick={onClose}
        >
            <div
                className="relative z-[100000] w-full min-h-[510px] rounded-2xl bg-white mx-5 px-5 pt-7 pb-7 mb-40 text-gray-900"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-5 flex flex-col gap-3 leading-none">
                    <div className="text-xl font-bold">{role.title}</div>
                    <div className="text-primary-400 font-medium">{role.subtitle}</div>
                </div>

                <div className="space-y-6 whitespace-pre-line">
                    <div>
                        <div className="mb-2 text-base font-semibold leading-none">
                            무슨 일을 하나요?
                        </div>
                        <div className="text-sm leading-[150%] text-gray-600">
                            {role.description1}
                        </div>
                    </div>

                    {role.isManeger && (
                        <div>
                            <div className="mb-2 text-base font-semibold leading-none">
                                주요업무
                            </div>
                            <div className="text-sm leading-[150%] text-gray-600">
                                {role.description1_5}
                            </div>
                        </div>
                    )}

                    <div>
                        <div className="mb-2 text-base font-semibold leading-none">
                            어떤 역량이 필요할까요?
                        </div>
                        <div className="text-sm leading-[150%] text-gray-600">
                            {role.description2}
                        </div>
                    </div>

                    <div>
                        <div className="mb-2 text-base font-semibold leading-none">
                            우리는 이런 사람을 찾고 있어요!
                        </div>
                        <div className="text-sm leading-[150%] text-gray-600">
                            {role.description3}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};
