// Auth related types

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    defaultSavingsCurrency: string;
    defaultInvestmentCurrency: string;
    locale: 'es' | 'en';
    createdAt: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    locale?: 'es' | 'en';
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface AuthResponse {
    user: User;
    tokens: AuthTokens;
}
