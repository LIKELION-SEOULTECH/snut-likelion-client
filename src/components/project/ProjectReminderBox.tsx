interface ProjectReminderBoxProps {
    name: string;
    part: string;
    content: string;
    onClick?: () => void;
}

export const ProjectReminderBox = ({ name, part, content, onClick }: ProjectReminderBoxProps) => {
    return (
        <div
            className="flex flex-col gap-10 min-w-[600px] cursor-pointer p-7 rounded-xl bg-[#3A3A3A]"
            onClick={onClick}
        >
            <div className="flex flex-col gap-4">
                <div className="font-semibold text-[#fff] text-[24px] ">{name}</div>
                <div className="text-[18px] text-[#A7A7A7] font-medium">{part}</div>
            </div>
            <p className="text-[20px] font-light text-[#C4C4C4] leading-[150%]">{content}</p>
        </div>
    );
};
