// Auth related types
export interface User {
    id: string;
    first_name?: string;
    last_name?: string;
    email: string;
    createdAt: string;
    locale: 'es' | 'en';
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface AuthResponse {
    user: User;
    tokens: AuthTokens;
}
