import { useState, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hexToHsv(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    const s = max === 0 ? 0 : d / max;
    const v = max;
    let h = 0;
    if (d !== 0) {
        if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        else if (max === g) h = ((b - r) / d + 2) / 6;
        else h = ((r - g) / d + 4) / 6;
    }
    return [h * 360, s, v];
}

function hsvToHex(h: number, s: number, v: number): string {
    const hn = h / 360;
    const i = Math.floor(hn * 6);
    const f = hn * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    let r = 0, g = 0, b = 0;
    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }
    return '#' + [r, g, b].map((c) => Math.round(c * 255).toString(16).padStart(2, '0')).join('');
}

function isValidHex(hex: string): boolean {
    return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

// ─── Presets ──────────────────────────────────────────────────────────────────

const PRESETS = [
    '#ef4444', '#f97316', '#eab308', '#22c55e',
    '#14b8a6', '#3b82f6', '#6366f1', '#a855f7',
    '#ec4899', '#f43f5e', '#84cc16', '#06b6d4',
    '#8b5cf6', '#d97706', '#10b981', '#64748b',
];

// ─── Saturation/Value canvas ──────────────────────────────────────────────────

interface SvCanvasProps {
    hue: number;
    saturation: number;
    value: number;
    onChange: (s: number, v: number) => void;
}

function SvCanvas({ hue, saturation, value, onChange }: SvCanvasProps) {
    const canvasRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const pick = (e: MouseEvent | React.MouseEvent) => {
        const el = canvasRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const s = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const v = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));
        onChange(s, v);
    };

    useEffect(() => {
        const onMove = (e: MouseEvent) => { if (isDragging.current) pick(e); };
        const onUp = () => { isDragging.current = false; };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
    }, []);

    const cursorX = `${saturation * 100}%`;
    const cursorY = `${(1 - value) * 100}%`;

    return (
        <div
            ref={canvasRef}
            className="relative h-36 w-full cursor-crosshair rounded-md"
            style={{
                background: `
                    linear-gradient(to top, #000, transparent),
                    linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))
                `,
            }}
            onMouseDown={(e) => { isDragging.current = true; pick(e); }}
        >
            {/* Cursor */}
            <div
                className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
                style={{
                    left: cursorX,
                    top: cursorY,
                    backgroundColor: hsvToHex(hue, saturation, value),
                }}
            />
        </div>
    );
}

// ─── Hue slider ───────────────────────────────────────────────────────────────

interface HueSliderProps {
    hue: number;
    onChange: (h: number) => void;
}

function HueSlider({ hue, onChange }: HueSliderProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const pick = (e: MouseEvent | React.MouseEvent) => {
        const el = trackRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const h = Math.max(0, Math.min(360, ((e.clientX - rect.left) / rect.width) * 360));
        onChange(h);
    };

    useEffect(() => {
        const onMove = (e: MouseEvent) => { if (isDragging.current) pick(e); };
        const onUp = () => { isDragging.current = false; };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
    }, []);

    return (
        <div
            ref={trackRef}
            className="relative h-3 w-full cursor-pointer rounded-full"
            style={{
                background:
                    'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
            }}
            onMouseDown={(e) => { isDragging.current = true; pick(e); }}
        >
            <div
                className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
                style={{
                    left: `${(hue / 360) * 100}%`,
                    backgroundColor: `hsl(${hue}, 100%, 50%)`,
                }}
            />
        </div>
    );
}

// ─── ColorPicker ──────────────────────────────────────────────────────────────

interface ColorPickerProps {
    value: string;
    onChange: (color: string) => void;
    className?: string;
}

export function ColorPicker({ value, onChange, className }: ColorPickerProps) {
    const safeHex = isValidHex(value) ? value : '#6366f1';
    const [h, s, v] = hexToHsv(safeHex);

    const [hue, setHue] = useState(h);
    const [sat, setSat] = useState(s);
    const [val, setVal] = useState(v);
    const [hexInput, setHexInput] = useState(safeHex);
    const [open, setOpen] = useState(false);

    // Sync incoming value → internal state
    useEffect(() => {
        if (isValidHex(value) && value !== hsvToHex(hue, sat, val)) {
            const [nh, ns, nv] = hexToHsv(value);
            setHue(nh);
            setSat(ns);
            setVal(nv);
            setHexInput(value);
        }
    }, [value]);

    const emit = (nh: number, ns: number, nv: number) => {
        const hex = hsvToHex(nh, ns, nv);
        setHexInput(hex);
        onChange(hex);
    };

    const handleHue = (nh: number) => {
        setHue(nh);
        emit(nh, sat, val);
    };

    const handleSv = (ns: number, nv: number) => {
        setSat(ns);
        setVal(nv);
        emit(hue, ns, nv);
    };

    const handlePreset = (hex: string) => {
        const [nh, ns, nv] = hexToHsv(hex);
        setHue(nh);
        setSat(ns);
        setVal(nv);
        setHexInput(hex);
        onChange(hex);
    };

    const handleHexInput = (raw: string) => {
        setHexInput(raw);
        if (isValidHex(raw)) {
            const [nh, ns, nv] = hexToHsv(raw);
            setHue(nh);
            setSat(ns);
            setVal(nv);
            onChange(raw);
        }
    };

    const currentColor = isValidHex(value) ? value : '#6366f1';

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    className={cn(
                        'h-9 w-9 rounded-md border-2 border-input shadow-xs transition-all hover:border-ring focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        className
                    )}
                    style={{ backgroundColor: currentColor }}
                    aria-label="Pick a color"
                />
            </PopoverTrigger>

            <PopoverContent className="w-64 p-3" align="start" side="bottom">
                <div className="space-y-3">
                    {/* Saturation / Value canvas */}
                    <SvCanvas
                        hue={hue}
                        saturation={sat}
                        value={val}
                        onChange={handleSv}
                    />

                    {/* Hue slider */}
                    <HueSlider hue={hue} onChange={handleHue} />

                    {/* Presets */}
                    <div className="grid grid-cols-8 gap-1">
                        {PRESETS.map((preset) => (
                            <button
                                key={preset}
                                type="button"
                                onClick={() => handlePreset(preset)}
                                className={cn(
                                    'relative h-6 w-full rounded border-2 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                                    currentColor === preset ? 'border-white shadow-md scale-110' : 'border-transparent'
                                )}
                                style={{ backgroundColor: preset }}
                                title={preset}
                            >
                                {currentColor === preset && (
                                    <Check className="absolute inset-0 m-auto h-3 w-3 text-white drop-shadow" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Hex input + preview */}
                    <div className="flex items-center gap-2">
                        <div
                            className="h-8 w-8 shrink-0 rounded border"
                            style={{ backgroundColor: currentColor }}
                        />
                        <Input
                            value={hexInput}
                            onChange={(e) => handleHexInput(e.target.value)}
                            placeholder="#6366f1"
                            className="font-mono text-sm"
                            maxLength={7}
                            spellCheck={false}
                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
