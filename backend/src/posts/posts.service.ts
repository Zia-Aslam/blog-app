import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import {
  CreatePostDto,
  UpdatePostDto,
  PostsQueryDto,
  PostResponseDto,
  PostsResponseDto,
} from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    user: User,
  ): Promise<PostResponseDto> {
    const { title, body } = createPostDto;

    // Generate excerpt (first 200 characters)
    const excerpt = body.length > 200 ? body.substring(0, 200) + '...' : body;

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const post = this.postRepository.create({
      title,
      body,
      excerpt,
      slug,
      authorId: user.id,
      publishedAt: new Date(),
      isPublished: true,
    });

    const savedPost = await this.postRepository.save(post);

    return this.findOne(savedPost.id);
  }

  async findAll(query: PostsQueryDto): Promise<PostsResponseDto> {
    const { page, limit } = query;
    const numericPage = +page!;
    const numericLimit = +limit!;
    
    const skip = (numericPage - 1) * numericLimit;

    const [posts, total] = await this.postRepository.findAndCount({
      where: { isPublished: true },
      order: { publishedAt: 'DESC' },
      skip,
      take: numericLimit,
      relations: ['author'],
    });

    const totalPages = Math.ceil(total / numericLimit);

    return {
      posts: posts.map((post) => this.formatPostResponse(post)),
      total,
      page: numericPage,
      limit: numericLimit,
      totalPages,
    };
  }

  async findOne(id: number): Promise<PostResponseDto> {
    const post = await this.postRepository.findOne({
      where: { id, isPublished: true },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.formatPostResponse(post);
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    user: User,
  ): Promise<PostResponseDto> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.authorId !== user.id) {
      throw new ForbiddenException('You can only edit your own posts');
    }

    // Update excerpt if body is changed
    if (updatePostDto.body) {
      updatePostDto['excerpt'] =
        updatePostDto.body.length > 200
          ? updatePostDto.body.substring(0, 200) + '...'
          : updatePostDto.body;
    }

    // Update slug if title is changed
    if (updatePostDto.title) {
      updatePostDto['slug'] = updatePostDto.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    }

    Object.assign(post, updatePostDto);
    const updatedPost = await this.postRepository.save(post);

    return this.findOne(updatedPost.id);
  }

  async remove(id: number, user: User): Promise<void> {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.authorId !== user.id) {
      throw new ForbiddenException('You can only delete your own posts');
    }

    await this.postRepository.remove(post);
  }

  private formatPostResponse(post: Post): PostResponseDto {
    
    return {
      id: post.id,
      title: post.title,
      body: post.body,
      excerpt: post.excerpt,
      slug: post.slug,
      authorId: post.authorId,
      author: {
        id: post.author.id,
        username: post.author.username,
        firstName: post.author.firstName,
        lastName: post.author.lastName,
      },
      publishedAt: post.publishedAt,
      isPublished: post.isPublished,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }
}
