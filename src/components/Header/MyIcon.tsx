import SamplePrf from "@/assets/Header/SamplePrf.png";

interface MyIconProps {
    onClick: () => void;

    isLogin: boolean;
}

export const MyIcon = ({ onClick, isLogin }: MyIconProps) => {
    return (
        <div onClick={onClick} className="w-[33px] h-[33px] cursor-pointer">
            {isLogin ? <img src={SamplePrf} alt="mypage" /> : <div></div>}
        </div>
    );
};
