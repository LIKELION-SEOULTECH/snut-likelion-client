import searchIcon from "@/assets/common/orgSearchIcon.svg";
export const MainSearchBar = () => {
    return (
        <div className="h-[52px] w-full border-[#A7A7A7] rounded-[500px] border-[1px] items-center flex">
            <input className=" text-5 px-[21px] py-4 w-full outline-none" placeholder="검색하기" />
            <img src={searchIcon} alt="검색" className="pr-[21px] cursor-pointer" />
        </div>
    );
};
