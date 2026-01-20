import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";

import TriggerClose from "@/assets/admin/trigger-close.svg?react";
import TriggerOpen from "@/assets/admin/trigger-open.svg?react";
import { type Dispatch, type SetStateAction } from "react";

interface SelectOption<T extends string | number | null> {
    label: string;
    value: T;
}

interface SelectProps<T extends string | number | null> {
    value: T;
    placeholder: string;
    onValueChange: Dispatch<SetStateAction<T>>;
    selectList: SelectOption<T>[];
}

export const CustomSelect = <T extends string | number | null>({
    value,
    placeholder,
    onValueChange,
    selectList
}: SelectProps<T>) => {
    return (
        <Select
            value={value === null ? undefined : String(value)}
            onValueChange={(v) => {
                const selected = selectList.find((item) => String(item.value) === v);
                if (selected) {
                    onValueChange(selected.value);
                }
            }}
        >
            <SelectTrigger
                isArrow={false}
                className="w-full min-w-full !h-11 pl-4 bg-white border-gray-100 rounded-sm data-[placeholder]:text-gray-200 [&_.icon-open]:hidden data-[state=open]:[&_.icon-open]:block data-[state=open]:[&_.icon-close]:hidden data-[state=open]:rounded-b-none data-[state=open]:border-b-0"
            >
                <SelectValue placeholder={placeholder} />
                <span className="ml-auto flex items-center">
                    <TriggerClose className="icon-close size-2" />
                    <TriggerOpen className="icon-open size-2" />
                </span>
            </SelectTrigger>

            <SelectContent className="w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)] rounded-sm border-gray-100 data-[side=bottom]:translate-y-0 data-[state=open]:rounded-t-none data-[state=open]:border-t-0 py-2">
                {selectList.map((item) => (
                    <SelectItem
                        key={item.value}
                        value={String(item.value)}
                        className="h-9 w-3 min-w-[98%] px-4 data-[state=checked]:font-semibold cursor-pointer"
                    >
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
