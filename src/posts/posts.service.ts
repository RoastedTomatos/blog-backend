import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createPost(title: string, content: string): Promise<Post> {
    const newPost = this.postRepository.create({ title, content });
    return this.postRepository.save(newPost);
  }

  async getAllPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async getPostById(id: number): Promise<Post | null> {
    return this.postRepository.findOne({ where: { id } });
  }

  async updatePost(
    id: number,
    title: string,
    content: string,
  ): Promise<Post | null> {
    await this.postRepository.update(id, { title, content });
    return this.getPostById(id);
  }

  async deletePost(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
