import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../service/blog.service';
import { AuthService } from '../../../service/auth.service';
import { Post } from '../../../api/post';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-blog-detail',
    templateUrl: './blog-detail.component.html',
    styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit {
    post: Post | null = null;
    loading = false;
    notFound = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private blogService: BlogService,
        private authService: AuthService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        const postId = this.route.snapshot.paramMap.get('id');
        if (postId) {
            this.loadPost(+postId);
        } else {
            this.router.navigate(['/blog']);
        }
    }

    get isAuthenticated(): boolean {
        return this.authService.isAuthenticated;
    }

    get currentUser() {
        return this.authService.currentUserValue;
    }

    get canEditPost(): boolean {
        return (
            this.isAuthenticated &&
            this.post &&
            this.currentUser &&
            this.post.authorId === this.currentUser.id
        );
    }

    loadPost(id: number) {
        this.loading = true;
        this.notFound = false;

        this.blogService.getPost(id).subscribe({
            next: (post) => {
                this.post = post;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading post:', error);
                if (error.status === 404) {
                    this.notFound = true;
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to load blog post',
                    });
                }
                this.loading = false;
            },
        });
    }

    goBack() {
        this.router.navigate(['/blog']);
    }

    editPost() {
        if (this.post) {
            // Try to navigate to edit, but handle forbidden/unauthorized errors gracefully
            this.router.navigate(['/blog/edit', this.post.id]).catch((error) => {
                if (error.status === 401) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Unauthorized',
                        detail: 'Please sign in to edit posts.'
                    });
                } else if (error.status === 403) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Forbidden',
                        detail: 'You can only edit your own posts.'
                    });
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to edit post.'
                    });
                }
            });
        }
    }

    formatDate(date: Date | string | undefined): string {
        if (!date) return '';
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    getAuthorName(): string {
        if (!this.post?.author) return 'Unknown Author';

        const { firstName, lastName, username } = this.post.author;
        if (firstName || lastName) {
            return `${firstName || ''} ${lastName || ''}`.trim();
        }
        return username || 'Unknown Author';
    }
}
