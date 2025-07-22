import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, CreatePostRequest, PostsResponse } from '../api/post';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class BlogService {
    private apiUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient, private authService: AuthService) {}

    private getHttpOptions() {
        const token = this.authService.getAuthToken();
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: token ? `Bearer ${token}` : '',
            }),
        };
    }

    getPosts(page: number = 1, limit: number = 5): Observable<PostsResponse> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());

        return this.http.get<PostsResponse>(`${this.apiUrl}/posts`, { params });
    }

    getPost(id: number): Observable<Post> {
        return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
    }

    createPost(postData: CreatePostRequest): Observable<Post> {
        return this.http.post<Post>(
            `${this.apiUrl}/posts`,
            postData,
            this.getHttpOptions()
        );
    }

    updatePost(id: number, postData: Partial<Post>): Observable<Post> {
        return this.http.patch<Post>(
            `${this.apiUrl}/posts/${id}`,
            postData,
            this.getHttpOptions()
        );
    }

    deletePost(id: number): Observable<void> {
        return this.http.delete<void>(
            `${this.apiUrl}/posts/${id}`,
            this.getHttpOptions()
        );
    }
}
