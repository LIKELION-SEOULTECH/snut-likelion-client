import SamplePrf from "@/assets/Header/SamplePrf.png";

interface MyIconProps {
    onClick: () => void;
    profileImageUrl?: string;
}

export const MyIcon = ({ onClick, profileImageUrl }: MyIconProps) => {
    return (
        <div
            onClick={onClick}
            className="w-[33px] h-[33px] rounded-full overflow-hidden cursor-pointer"
        >
            {profileImageUrl !== null ? (
                <img src={profileImageUrl} alt="mypage" className="w-full h-full object-cover" />
            ) : (
                <img src={SamplePrf} alt="mypage" className="w-full h-full object-cover" />
            )}
        </div>
    );
};
