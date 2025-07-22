export interface User {
    id?: number;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface AuthResponse {
    user: User;
    token: string;
    refreshToken?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
}
