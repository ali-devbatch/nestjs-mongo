import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/entities/user.entity';
import { PaginationService } from 'src/pagination/pagination.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly paginationService: PaginationService,
  ) {}
  async userPosts(userId: string, queryParams) {
    try {
      const user = await this.userModel.findById(userId).populate('posts'); // Assuming 'posts' is the field that holds user's posts

      if (!user) {
        return {
          status: 404,
          message: 'User not found',
        };
      }
      const userPosts = user.posts; // Posts associated with the user

      // Use the PaginationService to paginate userPosts
      return await this.paginationService.paginate(userPosts, queryParams);
    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }
}
