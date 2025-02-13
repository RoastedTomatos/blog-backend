import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Post } from './posts/posts.entity';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'pass',
      database: process.env.DB_NAME || 'blog_db',
      autoLoadEntities: true,
      synchronize: true,
      entities: [Post],
    }),
    PostsModule,
  ],
})
export class AppModule {}
