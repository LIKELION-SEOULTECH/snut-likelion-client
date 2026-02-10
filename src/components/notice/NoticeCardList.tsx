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
        <>
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
        </>
    );
};
