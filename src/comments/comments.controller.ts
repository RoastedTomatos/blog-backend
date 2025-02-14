import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CommentsService, Comment } from './comments.service';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getComments(@Param('postId') postId: string): Promise<Comment[]> {
    return await this.commentsService.findAllByPost(parseInt(postId, 10));
  }

  @Post()
  async addComment(
    @Param('postId') postId: string,
    @Body() commentData: { content: string },
  ): Promise<Comment> {
    return await this.commentsService.create({
      postId: parseInt(postId, 10),
      content: commentData.content,
    });
  }

  @Delete(':id')
  async removeComment(
    @Param('postId') postId: string,
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    return await this.commentsService.remove(parseInt(id, 10));
  }
}
