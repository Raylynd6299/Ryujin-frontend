// ─── Enums / Union Types ──────────────────────────────────────────────────────

export type GoalPriority = 'low' | 'medium' | 'high';

// ─── Paginated List ───────────────────────────────────────────────────────────

export interface GoalPaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
}

// ─── Goal ─────────────────────────────────────────────────────────────────────

export interface Goal {
    id: string;
    userId: string;
    name: string;
    description: string;
    icon: string;
    targetAmount: number;
    currency: string;
    priority: GoalPriority;
    deadline?: string;
    isCompleted: boolean;
    // Computed analytics
    totalContributed: number;
    progressPercent: number;
    missingAmount: number;
    estimatedCompletion?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateGoalRequest {
    name: string;
    description?: string;
    icon?: string;
    targetAmount: number;
    currency: string;
    priority: GoalPriority;
    deadline?: string;
}

export interface UpdateGoalRequest {
    name: string;
    description?: string;
    icon?: string;
    targetAmount: number;
    currency: string;
    priority: GoalPriority;
    deadline?: string;
}

// ─── Contribution ─────────────────────────────────────────────────────────────

export interface GoalContribution {
    id: string;
    goalId: string;
    userId: string;
    amount: number;
    currency: string;
    date: string;
    notes: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateContributionRequest {
    amount: number;
    currency: string;
    date: string;
    notes?: string;
}

export interface ContributionListResponse {
    data: GoalContribution[];
    total: number;
}
