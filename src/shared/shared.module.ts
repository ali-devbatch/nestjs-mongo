// shared.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from 'src/blog/entities/blog.entity';
import { Post, PostSchema } from 'src/post/entities/post.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
      { name: Blog.name, schema: BlogSchema },
      // Add other schemas here as needed
    ]),
  ],
  exports: [MongooseModule],
})
export class SharedModule {}
