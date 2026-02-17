import type React from "react";

type StatItemProps = {
    value: string;
    label: string;
}

export const StatItem = ({ value, label }: StatItemProps): React.ReactElement => (
    <div className="space-y-1">
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
    </div>
);