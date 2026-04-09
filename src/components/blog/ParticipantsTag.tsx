import { useMemberDetail } from "@/hooks/useMemberDetail";

interface ParticipantTagProps {
    id: number;
}

export const ParticipantTag = ({ id }: ParticipantTagProps) => {
    const { data } = useMemberDetail(id);

    return (
        <>
            {data && (
                <span
                    key={data.id}
                    className="px-3 py-1 rounded-sm bg-[#ECECEC] text-[#666666] text-base"
                >
                    {data.name}
                </span>
            )}
        </>
    );
};
