import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedModule } from 'src/shared/shared.module';
import { AuthModule } from 'src/auth/auth.module';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PaginationService],
  imports: [SharedModule, AuthModule],
})
export class UserModule {}
