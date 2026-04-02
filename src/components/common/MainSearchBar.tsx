import searchIcon from "@/assets/common/orgSearchIcon.svg";

interface Props {
    value: string;
    onChange: (v: string) => void;
    onSearch: () => void;
}

export const MainSearchBar = ({ value, onChange, onSearch }: Props) => {
    return (
        <div className="h-[52px] w-full border-[#A7A7A7] rounded-[500px] border-[1px] items-center flex">
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onSearch();
                    }
                }}
                className=" text-5 px-[21px] py-4 w-full outline-none"
                placeholder="검색하기"
            />
            <img
                src={searchIcon}
                alt="검색"
                className="pr-[21px] cursor-pointer"
                onClick={onSearch}
            />
        </div>
    );
};
