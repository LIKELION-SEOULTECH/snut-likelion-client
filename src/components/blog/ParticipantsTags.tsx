interface ParticipantTagsProps {
    names: string[];
}

export const ParticipantTags = ({ names }: ParticipantTagsProps) => {
    return (
        <div className="w-full flex flex-wrap gap-2 mt-4">
            {names.map((name) => (
                <span
                    key={name}
                    className="px-3 py-1 rounded-sm bg-[#ECECEC] text-[#666666] text-base"
                >
                    {name}
                </span>
            ))}
        </div>
    );
};
