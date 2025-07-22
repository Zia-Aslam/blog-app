import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../../service/blog.service';
import { MessageService } from 'primeng/api';
import { Post } from '../../../api/post';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {
  post: Post | null = null;
  editForm: FormGroup;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private blogService: BlogService,
    private messageService: MessageService
  ) {
    this.editForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      body: ['', [Validators.required, Validators.minLength(50)]]
    });
  }

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.loadPost(+postId);
    } else {
      this.router.navigate(['/blog']);
    }
  }

  loadPost(id: number) {
    this.loading = true;
    this.blogService.getPost(id).subscribe({
      next: (post) => {
        this.post = post;
        this.editForm.patchValue({
          title: post.title,
          body: post.body
        });
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load post for editing.'
        });
        this.router.navigate(['/blog']);
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (this.editForm.valid && this.post) {
      this.blogService.updatePost(this.post.id!, this.editForm.value).subscribe({
        next: (updatedPost) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Post updated successfully!'
          });
          this.router.navigate(['/blog/post', updatedPost.id]);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update post.'
          });
        }
      });
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  goBack() {
    if (this.post) {
      this.router.navigate(['/blog/post', this.post.id]);
    } else {
      this.router.navigate(['/blog']);
    }
  }
} 