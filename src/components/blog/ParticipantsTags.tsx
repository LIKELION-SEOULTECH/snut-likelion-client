import { ParticipantTag } from "./ParticipantsTag";

interface ParticipantTagsProps {
    ids: number[];
}

export const ParticipantTags = ({ ids }: ParticipantTagsProps) => {
    return (
        <div className="w-full flex flex-wrap gap-2">
            {ids.map((id) => (
                <ParticipantTag id={id} />
            ))}
        </div>
    );
};
