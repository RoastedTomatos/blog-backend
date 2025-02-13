import {
  Controller,
  Get,
  Post as PostRequest,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './posts.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @PostRequest()
  create(@Body() post: { title: string; content: string }): Promise<Post> {
    return this.postsService.createPost(post.title, post.content);
  }

  @Get()
  findAll(): Promise<Post[]> {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Post | null> {
    return this.postsService.getPostById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() post: { title: string; content: string },
  ): Promise<Post | null> {
    return this.postsService.updatePost(id, post.title, post.content);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.postsService.deletePost(id);
  }
}
