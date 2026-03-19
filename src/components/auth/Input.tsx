import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "@/libs/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-2 sm:gap-3 w-full">
                {label && (
                    <label className="text-sm sm:text-base font-medium text-white">{label}</label>
                )}
                <input
                    ref={ref}
                    className={cn(
                        "h-12 sm:h-14 px-[14px] py-4 border rounded-lg text-base sm:text-xl bg-white text-black placeholder-[#A7A7A7] outline-none transition-colors",
                        error
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-100 focus:ring-blue-100 focus:border-blue-100",
                        className
                    )}
                    {...props}
                />
                {error && <div className="text-[14px] text-red-500 sm:mt-2">{error}</div>}
            </div>
        );
    }
);

Input.displayName = "Input";
export default Input;
