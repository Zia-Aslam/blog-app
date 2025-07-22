export interface Post {
    id?: number;
    title: string;
    body: string;
    excerpt?: string;
    slug?: string;
    authorId: number;
    author?: {
        id: number;
        username: string;
        firstName?: string;
        lastName?: string;
    };
    publishedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    isPublished?: boolean;
}

export interface CreatePostRequest {
    title: string;
    body: string;
}

export interface PostsResponse {
    posts: Post[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
