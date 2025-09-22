import { NoticeCardItem } from "./NoticeCardItem";

interface News {
    id: number;
    type: string;
    title: string;
    date: string;
    isNew: boolean;
}

interface NewsCardListProps {
    newsList: News[];
}

export const NoticeCardList = ({ newsList }: NewsCardListProps) => {
    return (
        <div className="flex flex-col mt-18 w-[1217px] items-center border-t-2 border-[#2D2D2D]">
            {newsList.map((news: News) => (
                <NoticeCardItem
                    key={news.id}
                    id={news.id}
                    type={news.type}
                    title={news.title}
                    date={news.date}
                    isNew={news.isNew}
                />
            ))}
        </div>
    );
};
