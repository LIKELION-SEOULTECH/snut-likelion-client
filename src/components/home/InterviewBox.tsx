import star from "../../assets/home/Star.svg";

interface InterviewBox {
    title: string;
    content: string;
    name: string;
    role: string;
}
export const InterviewBox = ({ title, content, name, role }: InterviewBox) => {
    return (
        <div
            className="w-[480px] h-[488px] rounded-[24px] cursor-pointer text-white"
            style={{
                background: "linear-gradient(0deg, #2D2D2D, #2D2D2D)"
            }}
        >
            <div
                className="flex flex-col w-full h-full rounded-[24px] p-[28px] "
                style={{
                    background:
                        "radial-gradient(86.25% 48.52% at 50% 100%, rgba(181, 84, 0, 0.2) 0%, rgba(181, 84, 0, 0) 100%"
                }}
            >
                <h3 className=" text-[24px] w-full h-[72px] font-semibold mb-[20px]">{title}</h3>
                <div className="text-[#C4C4C4] text-[20px] line-clamp-9 flex-1 mb-[35px] ">
                    {content}
                </div>
                <div className="flex relative w-full h-[30px]  mt-auto">
                    <div className="absolute bottom-0 text-[#ffffff] flex items-center  h-[30px] ">
                        <img src={star} alt="별" className="w-[30px] h-[30px] pr-[8px]" />
                        <span className="text-[20px]">{name}</span>
                        <span className="text-[15px]">・</span>
                        <span className="text-[20px]">{role}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
