import { IsString, MinLength, IsOptional, IsBoolean } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  @MinLength(50)
  body: string;
}

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(50)
  body?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}

export class PostsQueryDto {
  @IsOptional()
  page?: string = '1';

  @IsOptional()
  limit?: string = '5';
}

export class PostResponseDto {
  id: number;
  title: string;
  body: string;
  excerpt?: string;
  slug?: string;
  authorId: number;
  author: {
    id: number;
    username: string;
    firstName?: string;
    lastName?: string;
  };
  publishedAt?: Date;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class PostsResponseDto {
  posts: PostResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
