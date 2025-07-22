import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, AuthResponse, LoginRequest, RegisterRequest } from '../api/user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/api';
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    private tokenSubject = new BehaviorSubject<string | null>(null);

    public currentUser$ = this.currentUserSubject.asObservable();
    public token$ = this.tokenSubject.asObservable();

    constructor(private http: HttpClient) {
        // Load user and token from localStorage on service init
        const storedUser = localStorage.getItem('currentUser');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            this.currentUserSubject.next(JSON.parse(storedUser));
            this.tokenSubject.next(storedToken);
        }
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    public get tokenValue(): string | null {
        return this.tokenSubject.value;
    }

    public get isAuthenticated(): boolean {
        return !!this.tokenValue && !!this.currentUserValue;
    }

    login(credentials: LoginRequest): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
            .pipe(
                tap((response) => {
                    localStorage.setItem(
                        'currentUser',
                        JSON.stringify(response.user)
                    );
                    localStorage.setItem('token', response.token);

                    this.currentUserSubject.next(response.user);
                    this.tokenSubject.next(response.token);
                })
            );
    }

    register(userData: RegisterRequest): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(`${this.apiUrl}/auth/register`, userData)
            .pipe(
                tap((response) => {
                    localStorage.setItem(
                        'currentUser',
                        JSON.stringify(response.user)
                    );
                    localStorage.setItem('token', response.token);

                    this.currentUserSubject.next(response.user);
                    this.tokenSubject.next(response.token);
                })
            );
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');

        this.currentUserSubject.next(null);
        this.tokenSubject.next(null);
    }

    getAuthToken(): string | null {
        return this.tokenValue;
    }
}
