export const PostContent = ({ content }: { content: string }) => {
    return (
        <div>
            <div
                className="w-full px-[103px] mt-20"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
};
