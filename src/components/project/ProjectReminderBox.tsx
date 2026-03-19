interface ProjectReminderBoxProps {
    name: string;
    part: string;
    content: string;
    onClick?: () => void;
}

export const ProjectReminderBox = ({ name, part, content, onClick }: ProjectReminderBoxProps) => {
    return (
        <div
            className="w-full flex flex-col gap-10 min-w-70 sm:min-w-[600px] cursor-pointer px-4 py-[29.4px] sm:p-7 rounded-xl"
            onClick={onClick}
            style={{
                border: "1px solid #3A3A3A",
                background: `linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), 
                linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%),  #232323`,
                borderRadius: "12px",
                color: "#FFF",
                fontSize: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
            }}
        >
            <div className="flex flex-col gap-2 sm:gap-4">
                <div className="font-semibold text-[#fff] text-[20px] sm:text-[24px] ">{name}</div>
                <div className="text-base sm:text-lg text-[#A7A7A7] font-medium">{part}</div>
            </div>
            <p className="text-sm sm:text-[20px] font-light text-[#C4C4C4] leading-[150%]">
                {content}
            </p>
        </div>
    );
};
