interface RyujinLogoProps {
    size?: number;
    className?: string;
}

export const RyujinLogo = ({ size = 32, className }: RyujinLogoProps) => (
    <img
        src="/favicon.svg"
        alt="Ryujin"
        width={size}
        height={size}
        className={className}
    />
);
