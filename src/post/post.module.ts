import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SharedModule } from 'src/shared/shared.module';
import { PaginationService } from 'src/pagination/pagination.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PostController],
  providers: [PostService, PaginationService],
  imports: [AuthModule, SharedModule],
})
export class PostModule {}
