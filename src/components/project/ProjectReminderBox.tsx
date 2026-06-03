interface ProjectReminderBoxProps {
    name: string;
    part: string;
    content: string;
    onClick?: () => void;
}

export const ProjectReminderBox = ({ name, part, content, onClick }: ProjectReminderBoxProps) => {
    return (
        <div
            className="group w-full flex flex-col gap-10 min-w-70 sm:min-w-[600px] cursor-pointer px-4 py-[29.4px] sm:p-7 rounded-xl transition-colors bg-gray-800 hover:bg-white"
            onClick={onClick}
            style={{
                border: "1px solid #3A3A3A",
                borderRadius: "12px",
                color: "#FFF",
                fontSize: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
            }}
        >
            <div className="flex flex-col gap-2 sm:gap-4">
                <div className="font-semibold text-gray-0 text-[20px] sm:text-[24px] group-hover:text-gray-500">
                    {name}
                </div>
                <div className="text-base sm:text-lg text-gray-200 font-medium group-hover:text-primary-500">
                    {part}
                </div>
            </div>
            <p className="text-sm sm:text-[20px] font-light text-gray-100 leading-[150%] group-hover:text-gray-500">
                {content}
            </p>
        </div>
    );
};
