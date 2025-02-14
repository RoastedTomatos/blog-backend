import { Injectable } from '@nestjs/common';

export interface Comment {
  id: number;
  postId: number;
  content: string;
}

@Injectable()
export class CommentsService {
  private comments: Comment[] = [];

  async create(comment: { postId: number; content: string }): Promise<Comment> {
    const newComment: Comment = { id: Date.now(), ...comment };
    this.comments.push(newComment);
    return newComment;
  }

  async findAllByPost(postId: number): Promise<Comment[]> {
    return this.comments.filter((comment) => comment.postId === Number(postId));
  }

  async remove(id: number): Promise<{ message: string }> {
    this.comments = this.comments.filter(
      (comment) => comment.id !== Number(id),
    );
    return { message: 'Comment deleted' };
  }
}
