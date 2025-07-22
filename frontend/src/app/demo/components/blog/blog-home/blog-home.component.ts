import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { BlogService } from '../../../service/blog.service';
import { AuthService } from '../../../service/auth.service';
import { Post } from '../../../api/post';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-blog-home',
    templateUrl: './blog-home.component.html',
    styleUrls: ['./blog-home.component.scss'],
})
export class BlogHomeComponent implements OnInit {
    posts: Post[] = [];
    currentPage = 1;
    totalPages = 1;
    totalPosts = 0;
    pageSize = 5;
    loading = false;

    gridOptions: GridOptions = {
        columnDefs: [
            {
                headerName: 'Title',
                field: 'title',
                flex: 2,
                cellRenderer: (params: any) => {
                    return `<a href="#" data-post-id="${params.data.id}" class="text-primary font-medium hover:underline">${params.value}</a>`;
                },
            },
            {
                headerName: 'Excerpt',
                field: 'excerpt',
                flex: 3,
                cellRenderer: (params: any) => {
                    const excerpt =
                        params.value ||
                        params.data.body?.substring(0, 200) + '...';
                    return `<span class="text-700">${excerpt}</span>`;
                },
            },
            {
                headerName: 'Author',
                field: 'author.username',
                flex: 1,
                valueGetter: (params: any) => {
                    return params.data.author
                        ? `${params.data.author.firstName || ''} ${
                              params.data.author.lastName || ''
                          }`.trim() || params.data.author.username
                        : 'Unknown';
                },
            },
            {
                headerName: 'Published',
                field: 'publishedAt',
                flex: 1,
                cellRenderer: (params: any) => {
                    return params.value
                        ? new Date(params.value).toLocaleDateString()
                        : 'Draft';
                },
            },
        ],
        domLayout: 'autoHeight',
        suppressPaginationPanel: true,
        suppressHorizontalScroll: false,
        onCellClicked: (event) => {
            if (
                event.event?.target instanceof HTMLElement &&
                event.event.target.tagName === 'A'
            ) {
                event.event.preventDefault();
                const postId = event.event.target.getAttribute('data-post-id');
                if (postId) {
                    this.router.navigate(['/blog/post', postId]);
                }
            }
        },
    };

    constructor(
        private blogService: BlogService,
        private authService: AuthService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.loadPosts();
    }

    get isAuthenticated(): boolean {
        return this.authService.isAuthenticated;
    }

    get currentUser() {
        return this.authService.currentUserValue;
    }

    loadPosts() {
        this.loading = true;
        this.blogService.getPosts(this.currentPage, this.pageSize).subscribe({
            next: (response) => {
                this.posts = response.posts;
                this.totalPages = response.totalPages;
                this.totalPosts = response.total;
                this.currentPage = response.page;
                this.pageSize = response.limit;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading posts:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load blog posts',
                });
                this.loading = false;
            },
        });
    }

    onPageChange(page: number) {
        if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.loadPosts();
        }
    }

    createPost() {
        this.router.navigate(['/blog/create']);
    }

    get pageNumbers(): number[] {
        const pages = [];
        const maxPages = Math.min(this.totalPages, 5);
        const startPage = Math.max(
            1,
            this.currentPage - Math.floor(maxPages / 2)
        );
        const endPage = Math.min(this.totalPages, startPage + maxPages - 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    }
}
