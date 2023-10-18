import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './entities/post.entity';
import { PaginationService } from 'src/pagination/pagination.service';

@Injectable()
export class PostService {
  constructor(
    private readonly paginationService: PaginationService,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {}

  // to add post
  async create(createPostDto: CreatePostDto, user) {
    const { title, description } = createPostDto;
    try {
      const data = new this.postModel({
        title: title,
        description: description,
        postedBy: user,
      });
      await data.save();
      // Add the post's _id to the user's 'posts' array
      user.posts.push(data._id);
      // Save the updated user to the database
      await user.save();
      return { data: data, status: 200, message: 'post created successfully' }; // 200 OK
    } catch (error) {
      return { data: error.message, status: 500, message: 'post not created' };
    }
  }

  // to get all posts with pagination
  async findAll(queryParams) {
    const queryBuilder = this.postModel.find(); // Build your query here
    return this.paginationService.paginate(queryBuilder, queryParams);
  }

  // to get post by id and populating this
  async findOne(id: string) {
    try {
      const data = await this.postModel.findById(id).populate({
        path: 'postedBy', // field name which is in schema
        select: 'name email', // Select the fields you want to populate
      });
      if (!data) {
        return {
          data: data,
          status: 404,
          message: 'there is no registered post',
        }; // 404 Not Found
      }
      return { data: data, status: 200, message: 'posts found successfully' }; // 200 OK
    } catch (error) {
      return { data: error.message, status: 500, message: 'post not found' };
    }
  }

  // to update post by id
  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
      const data = await this.postModel.findByIdAndUpdate(id, updatePostDto, {
        new: true, //We pass the { new: true } option to ensure that the method returns the updated document.
      });

      if (!data) {
        return { data: '', status: 404, message: 'post not found' }; // 404 Not Found
      }
      return { data: data, status: 200, message: 'post updated successfully' }; // 200 OK
    } catch (error) {
      return { data: error.message, status: 500, message: 'post not updated' };
    }
  }

  // to delete a post
  async remove(id: string) {
    try {
      const data = await this.postModel.findByIdAndDelete(id);
      if (data) {
        return {
          data: data,
          status: 200,
          message: 'user deleted successfully',
        }; // 200 OK
      }
      return { data: data, status: 404, message: 'post not found' }; // 404 Not Found
    } catch (error) {
      return { data: error.message, status: 500, message: 'post not deleted' };
    }
  }
}
