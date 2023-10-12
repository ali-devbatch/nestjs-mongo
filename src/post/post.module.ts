import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SharedModule } from 'src/shared/shared.module';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PaginationService],
  imports: [SharedModule],
})
export class PostModule {}
