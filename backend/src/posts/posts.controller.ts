import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import {
  CreatePostDto,
  UpdatePostDto,
  PostsQueryDto,
  PostResponseDto,
  PostsResponseDto,
} from './dto/post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createPostDto: CreatePostDto,
    @Request() req,
  ): Promise<PostResponseDto> {
    return this.postsService.create(createPostDto, req.user);
  }

  @Get()
  findAll(@Query() query: PostsQueryDto): Promise<PostsResponseDto> {
    return this.postsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PostResponseDto> {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req,
  ): Promise<PostResponseDto> {
    return this.postsService.update(id, updatePostDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number, @Request() req): Promise<void> {
    return this.postsService.remove(id, req.user);
  }
}
