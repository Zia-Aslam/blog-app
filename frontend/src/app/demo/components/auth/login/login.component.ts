import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    returnUrl = '/';

    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            rememberMe: [false],
        });
    }

    ngOnInit() {
        // Redirect if already logged in
        if (this.authService.isAuthenticated) {
            this.router.navigate(['/blog']);
            return;
        }

        // Get return URL from route parameters or default to '/'
        this.returnUrl =
            this.route.snapshot.queryParams['returnUrl'] || '/blog';
    }

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    onSubmit() {
        if (this.loginForm.valid && !this.loading) {
            this.loading = true;

            const loginData = {
                email: this.email?.value,
                password: this.password?.value,
            };

            this.authService.login(loginData).subscribe({
                next: (response) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Welcome back!',
                        detail: `Hello ${response.user.username}!`,
                    });
                    this.router.navigate([this.returnUrl]);
                },
                error: (error) => {
                    console.error('Login error:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Login Failed',
                        detail:
                            error.error?.message || 'Invalid email or password',
                    });
                    this.loading = false;
                },
            });
        } else {
            // Mark all fields as touched to show validation errors
            Object.keys(this.loginForm.controls).forEach((key) => {
                this.loginForm.get(key)?.markAsTouched();
            });
        }
    }

    navigateToRegister() {
        this.router.navigate(['/auth/register']);
    }

    getFieldError(fieldName: string): string {
        const field = this.loginForm.get(fieldName);
        if (field?.errors && field.touched) {
            if (field.errors['required']) {
                return `${
                    fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
                } is required`;
            }
            if (field.errors['email']) {
                return 'Please enter a valid email address';
            }
            if (field.errors['minlength']) {
                const required = field.errors['minlength'].requiredLength;
                return `Password must be at least ${required} characters`;
            }
        }
        return '';
    }
}
