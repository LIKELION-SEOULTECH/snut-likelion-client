// import sample from "@/assets/home/sample.png";

interface PostContentProps {
    content: string;
}

export const PostContent = ({ content }: PostContentProps) => {
    return (
        <div className="w-full">
            <section className="w-full px-[103px] mt-14">
                <div
                    className="leading-[200%] text-[#1b1b1b]"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </section>
        </div>
    );
};
