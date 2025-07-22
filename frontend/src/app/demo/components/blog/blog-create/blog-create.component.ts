import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../../../service/blog.service';
import { AuthService } from '../../../service/auth.service';
import { CreatePostRequest } from '../../../api/post';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-blog-create',
    templateUrl: './blog-create.component.html',
    styleUrls: ['./blog-create.component.scss'],
})
export class BlogCreateComponent implements OnInit {
    postForm: FormGroup;
    loading = false;
    previewMode = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private blogService: BlogService,
        private authService: AuthService,
        private messageService: MessageService
    ) {
        this.postForm = this.fb.group({
            title: [
                '',
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(200),
                ],
            ],
            body: ['', [Validators.required, Validators.minLength(50)]],
        });
    }

    ngOnInit() {
        // Redirect if not authenticated
        if (!this.authService.isAuthenticated) {
            this.router.navigate(['/auth/login']);
            return;
        }
    }

    get currentUser() {
        return this.authService.currentUserValue;
    }

    get title() {
        return this.postForm.get('title');
    }

    get body() {
        return this.postForm.get('body');
    }

    togglePreview() {
        this.previewMode = !this.previewMode;
    }

    get currentTime() {
        return new Date().toLocaleDateString();
    }

    onSubmit() {
        if (this.postForm.valid && !this.loading) {
            this.loading = true;

            const postData: CreatePostRequest = {
                title: this.title?.value,
                body: this.body?.value,
            };

            this.blogService.createPost(postData).subscribe({
                next: (post) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Blog post created successfully!',
                    });

                    // Navigate to the created post
                    this.router.navigate(['/blog/post', post.id]);
                },
                error: (error) => {
                    console.error('Error creating post:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail:
                            error.error?.message ||
                            'Failed to create blog post',
                    });
                    this.loading = false;
                },
            });
        } else {
            // Mark all fields as touched to show validation errors
            Object.keys(this.postForm.controls).forEach((key) => {
                this.postForm.get(key)?.markAsTouched();
            });
        }
    }

    onCancel() {
        this.router.navigate(['/blog']);
    }

    getFieldError(fieldName: string): string {
        const field = this.postForm.get(fieldName);
        if (field?.errors && field.touched) {
            if (field.errors['required']) {
                return `${
                    fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
                } is required`;
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
        }
        return '';
    }

    getCharacterCount(fieldName: string): string {
        const field = this.postForm.get(fieldName);
        const value = field?.value || '';

        if (fieldName === 'title') {
            return `${value.length}/200`;
        } else if (fieldName === 'body') {
            return `${value.length} characters`;
        }
        return '';
    }
}
