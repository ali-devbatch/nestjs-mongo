import { Controller, Post, Query, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('posts')
  @UseGuards(AuthGuard())
  findAll(@Request() req, @Query() queryParams) {
    const userId = req.user._id;
    return this.userService.userPosts(userId, queryParams);
  }
}
