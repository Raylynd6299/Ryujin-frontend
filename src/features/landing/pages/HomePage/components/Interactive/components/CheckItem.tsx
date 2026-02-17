import type React from "react";

type CheckItemProps = {
    text: string;
}

export const CheckItem = ({ text }: CheckItemProps): React.ReactElement => (
    <li className="flex items-center gap-3 text-gray-300">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/20">
            <div className="h-2 w-2 rounded-full bg-violet-400" />
        </div>
        <span>{text}</span>
    </li>
);
