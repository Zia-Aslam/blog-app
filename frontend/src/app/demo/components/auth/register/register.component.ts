import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;

    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService
    ) {
        this.registerForm = this.fb.group(
            {
                email: ['', [Validators.required, Validators.email]],
                username: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(20),
                    ],
                ],
                firstName: [''],
                lastName: [''],
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required]],
            },
            { validators: this.passwordMatchValidator }
        );
    }

    ngOnInit() {
        // Redirect if already logged in
        if (this.authService.isAuthenticated) {
            this.router.navigate(['/blog']);
        }
    }

    passwordMatchValidator(form: FormGroup) {
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');

        if (
            password &&
            confirmPassword &&
            password.value !== confirmPassword.value
        ) {
            confirmPassword.setErrors({ passwordMismatch: true });
        } else if (confirmPassword?.hasError('passwordMismatch')) {
            delete confirmPassword.errors['passwordMismatch'];
            if (Object.keys(confirmPassword.errors).length === 0) {
                confirmPassword.setErrors(null);
            }
        }
        return null;
    }

    get email() {
        return this.registerForm.get('email');
    }

    get username() {
        return this.registerForm.get('username');
    }

    get firstName() {
        return this.registerForm.get('firstName');
    }

    get lastName() {
        return this.registerForm.get('lastName');
    }

    get password() {
        return this.registerForm.get('password');
    }

    get confirmPassword() {
        return this.registerForm.get('confirmPassword');
    }

    onSubmit() {
        if (this.registerForm.valid && !this.loading) {
            this.loading = true;

            const registerData = {
                email: this.email?.value,
                username: this.username?.value,
                firstName: this.firstName?.value || undefined,
                lastName: this.lastName?.value || undefined,
                password: this.password?.value,
            };

            this.authService.register(registerData).subscribe({
                next: (response) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Welcome!',
                        detail: 'Your account has been created successfully!',
                    });
                    this.router.navigate(['/blog']);
                },
                error: (error) => {
                    console.error('Registration error:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Registration Failed',
                        detail:
                            error.error?.message || 'Failed to create account',
                    });
                    this.loading = false;
                },
            });
        } else {
            // Mark all fields as touched to show validation errors
            Object.keys(this.registerForm.controls).forEach((key) => {
                this.registerForm.get(key)?.markAsTouched();
            });
        }
    }

    navigateToLogin() {
        this.router.navigate(['/auth/login']);
    }

    getFieldError(fieldName: string): string {
        const field = this.registerForm.get(fieldName);
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
                return `${
                    fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
                } must be at least ${required} characters`;
            }
            if (field.errors['maxlength']) {
                const max = field.errors['maxlength'].requiredLength;
                return `${
                    fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
                } cannot exceed ${max} characters`;
            }
            if (field.errors['passwordMismatch']) {
                return 'Passwords do not match';
            }
        }
        return '';
    }
}
