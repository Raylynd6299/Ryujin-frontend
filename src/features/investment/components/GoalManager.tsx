import { useState } from 'react';
import { Plus, Trash2, Check, X, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useTranslation } from '@/hooks/useTranslation';
import type { CalculatorGoal, ResolvedGoal } from '@/types/investment.types';
import { formatCurrency } from '../utils/calculatorUtils';

// ─── Types ────────────────────────────────────────────────────────────────────

interface GoalFormState {
    label: string;
    type: 'value' | 'percentage';
    value: string;
}

const EMPTY_FORM: GoalFormState = { label: '', type: 'value', value: '' };

// ─── Single goal row ──────────────────────────────────────────────────────────

interface GoalRowProps {
    goal: CalculatorGoal;
    resolved: ResolvedGoal;
    currency: string;
    onRemove: (id: string) => void;
    onUpdate: (id: string, updates: Partial<Omit<CalculatorGoal, 'id' | 'color'>>) => void;
}

const GoalRow = ({ goal, resolved, currency, onRemove, onUpdate }: GoalRowProps) => {
    const { t } = useTranslation();
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState<GoalFormState>({
        label: goal.label,
        type: goal.type,
        value: String(goal.value),
    });

    const handleSave = () => {
        const parsed = parseFloat(form.value);
        if (!form.label.trim() || isNaN(parsed) || parsed <= 0) return;
        onUpdate(goal.id, { label: form.label.trim(), type: form.type, value: parsed });
        setEditing(false);
    };

    const handleCancel = () => {
        setForm({ label: goal.label, type: goal.type, value: String(goal.value) });
        setEditing(false);
    };

    const reachedLabel = (() => {
        if (resolved.yearReached === null) return null;
        if (resolved.monthReached !== undefined && resolved.monthReached > 0) {
            return t('calculator.goalYearMonth', {
                year: Math.floor(resolved.yearReached),
                month: resolved.monthReached,
            });
        }
        return t('calculator.goalYear', { year: resolved.yearReached });
    })();

    return (
        <div className="flex items-start gap-3 rounded-lg border p-3">
            {/* Color dot */}
            <div
                className="mt-1 h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: goal.color }}
            />

            {editing ? (
                <div className="flex flex-1 flex-col gap-2">
                    <Input
                        value={form.label}
                        onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                        placeholder={t('calculator.goalLabelPlaceholder')}
                        className="h-8 text-sm"
                        autoFocus
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <Select
                            value={form.type}
                            onValueChange={(v) =>
                                setForm((f) => ({ ...f, type: v as 'value' | 'percentage' }))
                            }
                        >
                            <SelectTrigger className="h-8 text-xs">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="value">{t('calculator.goalTypeValue')}</SelectItem>
                                <SelectItem value="percentage">
                                    {t('calculator.goalTypePercentage')}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Input
                            type="number"
                            min="0"
                            value={form.value}
                            onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
                            placeholder={
                                form.type === 'percentage'
                                    ? t('calculator.goalPercentagePlaceholder')
                                    : t('calculator.goalValuePlaceholder')
                            }
                            className="h-8 text-sm tabular-nums"
                        />
                    </div>
                    <div className="flex gap-1.5">
                        <Button size="sm" className="h-7 gap-1 text-xs" onClick={handleSave}>
                            <Check className="h-3 w-3" />
                            {t('calculator.goalSave')}
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 gap-1 text-xs"
                            onClick={handleCancel}
                        >
                            <X className="h-3 w-3" />
                            {t('calculator.goalCancel')}
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex flex-1 flex-col gap-0.5">
                        <button
                            className="text-left text-sm font-medium hover:underline"
                            onClick={() => setEditing(true)}
                        >
                            {goal.label}
                        </button>
                        <span className="text-muted-foreground text-xs">
                            {goal.type === 'value'
                                ? formatCurrency(goal.value, currency)
                                : `+${goal.value}% gains`}
                        </span>
                    </div>

                    {/* Status badge */}
                    {reachedLabel ? (
                        <Badge
                            variant="secondary"
                            className="shrink-0 text-xs"
                            style={{ borderColor: goal.color, color: goal.color }}
                        >
                            {t('calculator.goalReachedAt')} {reachedLabel}
                        </Badge>
                    ) : (
                        <Badge variant="outline" className="text-muted-foreground shrink-0 text-xs">
                            {t('calculator.goalNotReached')}
                        </Badge>
                    )}

                    <Button
                        size="icon"
                        variant="ghost"
                        className="text-muted-foreground hover:text-destructive h-7 w-7 shrink-0"
                        onClick={() => onRemove(goal.id)}
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                </>
            )}
        </div>
    );
};

// ─── Add goal form ────────────────────────────────────────────────────────────

interface AddGoalFormProps {
    onAdd: (goal: Omit<CalculatorGoal, 'id' | 'color'>) => void;
    onCancel: () => void;
}

const AddGoalForm = ({ onAdd, onCancel }: AddGoalFormProps) => {
    const { t } = useTranslation();
    const [form, setForm] = useState<GoalFormState>(EMPTY_FORM);

    const handleSubmit = () => {
        const parsed = parseFloat(form.value);
        if (!form.label.trim() || isNaN(parsed) || parsed <= 0) return;
        onAdd({ label: form.label.trim(), type: form.type, value: parsed });
        setForm(EMPTY_FORM);
    };

    return (
        <div className="rounded-lg border border-dashed p-3 space-y-3">
            <div className="space-y-2">
                <div className="space-y-1">
                    <Label className="text-xs">{t('calculator.goalLabel')}</Label>
                    <Input
                        value={form.label}
                        onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                        placeholder={t('calculator.goalLabelPlaceholder')}
                        className="h-8 text-sm"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                        <Label className="text-xs">{t('calculator.goalType')}</Label>
                        <Select
                            value={form.type}
                            onValueChange={(v) =>
                                setForm((f) => ({ ...f, type: v as 'value' | 'percentage' }))
                            }
                        >
                            <SelectTrigger className="h-8 text-xs">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="value">{t('calculator.goalTypeValue')}</SelectItem>
                                <SelectItem value="percentage">
                                    {t('calculator.goalTypePercentage')}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">{t('calculator.goalValue')}</Label>
                        <Input
                            type="number"
                            min="0"
                            value={form.value}
                            onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
                            placeholder={
                                form.type === 'percentage'
                                    ? t('calculator.goalPercentagePlaceholder')
                                    : t('calculator.goalValuePlaceholder')
                            }
                            className="h-8 text-sm tabular-nums"
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        />
                    </div>
                </div>
            </div>
            <div className="flex gap-1.5">
                <Button size="sm" className="h-7 gap-1 text-xs" onClick={handleSubmit}>
                    <Check className="h-3 w-3" />
                    {t('calculator.goalSave')}
                </Button>
                <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 gap-1 text-xs"
                    onClick={onCancel}
                >
                    <X className="h-3 w-3" />
                    {t('calculator.goalCancel')}
                </Button>
            </div>
        </div>
    );
};

// ─── Main component ───────────────────────────────────────────────────────────

interface GoalManagerProps {
    goals: CalculatorGoal[];
    resolvedGoals: ResolvedGoal[];
    currency: string;
    onAdd: (goal: Omit<CalculatorGoal, 'id' | 'color'>) => void;
    onUpdate: (id: string, updates: Partial<Omit<CalculatorGoal, 'id' | 'color'>>) => void;
    onRemove: (id: string) => void;
}

export const GoalManager = ({
    goals,
    resolvedGoals,
    currency,
    onAdd,
    onUpdate,
    onRemove,
}: GoalManagerProps) => {
    const { t } = useTranslation();
    const [showForm, setShowForm] = useState(false);

    const handleAdd = (goal: Omit<CalculatorGoal, 'id' | 'color'>) => {
        onAdd(goal);
        setShowForm(false);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Target className="text-muted-foreground h-4 w-4" />
                        <CardTitle className="text-base">{t('calculator.goals')}</CardTitle>
                    </div>
                    {!showForm && (
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-7 gap-1.5 text-xs"
                            onClick={() => setShowForm(true)}
                        >
                            <Plus className="h-3 w-3" />
                            {t('calculator.addGoal')}
                        </Button>
                    )}
                </div>
                <p className="text-muted-foreground text-xs">{t('calculator.goalsSubtitle')}</p>
            </CardHeader>
            <CardContent className="space-y-2">
                {goals.length === 0 && !showForm && (
                    <p className="text-muted-foreground py-2 text-center text-sm">
                        {t('calculator.goalNoGoals')}
                    </p>
                )}

                {goals.map((goal) => {
                    const resolved = resolvedGoals.find((r) => r.id === goal.id) ?? {
                        ...goal,
                        yearReached: null,
                        valueAtReach: null,
                    };
                    return (
                        <GoalRow
                            key={goal.id}
                            goal={goal}
                            resolved={resolved}
                            currency={currency}
                            onRemove={onRemove}
                            onUpdate={onUpdate}
                        />
                    );
                })}

                {showForm && (
                    <AddGoalForm onAdd={handleAdd} onCancel={() => setShowForm(false)} />
                )}
            </CardContent>
        </Card>
    );
};
