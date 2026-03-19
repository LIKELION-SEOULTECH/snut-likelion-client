import { OrangeBtn } from "./OrangeBtn";

export type GenerationTabsProps = {
    selected: string;
    onSelect: (generation: string) => void;
    generations?: string[];
};

export default function GenerationTabs({
    selected,
    onSelect,
    generations = ["13기", "12기", "11기"]
}: GenerationTabsProps) {
    return (
        <div className="flex gap-[20.42px] sm:gap-7 px-0 sm:px-[21px] py-0 sm:py-3 font-medium">
            {generations.map((tag) => (
                <OrangeBtn key={tag} tag={tag} selected={selected} onSelect={onSelect} />
            ))}
        </div>
    );
}
