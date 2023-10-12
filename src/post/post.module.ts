import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SharedModule } from 'src/shared/shared.module';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Post, PostSchema } from './entities/post.entity';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [SharedModule],
  // imports: [
  //   MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  // ],
})
export class PostModule {}
