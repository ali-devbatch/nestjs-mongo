import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { PaginationService } from 'src/pagination/pagination.service';
import { SharedModule } from 'src/shared/shared.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [BlogController],
  providers: [BlogService, PaginationService],
  imports: [AuthModule, SharedModule],
})
export class BlogModule {}
