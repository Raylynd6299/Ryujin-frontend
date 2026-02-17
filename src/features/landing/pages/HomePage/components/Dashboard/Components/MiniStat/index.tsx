import type React from "react";

type MiniStatProps = {
    label: string;
    value: string;
    color: string;
}

export const MiniStat = ({ label, value, color }: MiniStatProps): React.ReactElement => (
    <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className={`font-semibold ${color}`}>{value}</div>
    </div>
);