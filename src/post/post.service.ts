import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}
  // to add post
  async create(createPostDto: CreatePostDto) {
    try {
      const data = new this.postModel();
      data.title = createPostDto.title;
      data.description = createPostDto.description;
      await data.save();
      return { data: data, status: 200, message: 'post created successfully' }; // 200 OK
    } catch (error) {
      return { data: error.message, status: 500, message: 'post not created' };
    }
  }

  // to get all posts
  async findAll() {
    try {
      const data = await this.postModel.find(); // Assuming you want to retrieve all posts
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

  // to get post by id
  async findOne(id: string) {
    try {
      const data = await this.postModel.findById(id);
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
