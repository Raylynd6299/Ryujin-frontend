import type React from "react";
import { StatItem } from "./components/StatItem";

export const Stats = (): React.ReactElement => {
    return (
        <div className="grid grid-cols-3 gap-6 pt-8">
            <StatItem value="10K+" label="Usuarios Activos" />
            <StatItem value="$2.5M+" label="Gestionados" />
            <StatItem value="99.9%" label="Uptime" />
        </div>
    );
};