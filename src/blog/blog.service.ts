import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './entities/blog.entity';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/entities/user.entity';

@Injectable()
export class BlogService {
  constructor(
    private readonly paginationService: PaginationService,
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  // to add blog
  async create(createBlogDto: CreateBlogDto, userId: string) {
    const { blogTitle, blogDescription } = createBlogDto;
    try {
      const newBlog = new this.blogModel({
        title: blogTitle,
        description: blogDescription,
        postedBy: userId,
      });
      await newBlog.save();
      return {
        data: newBlog,
        status: 200,
        message: 'blog created successfully',
      }; // 200 OK
    } catch (error) {
      return { data: error.message, status: 500, message: 'blog not created' };
    }
  }

  // to get all blogs with pagination
  async findAll(queryParams) {
    const queryBuilder = this.blogModel.find(); // Build your query here
    return this.paginationService.paginate(queryBuilder, queryParams);
  }

  // to get blog by id
  async findOne(id: string) {
    try {
      const data = await this.blogModel.findById(id);
      if (!data) {
        return {
          data: data,
          status: 404,
          message: 'there is no registered post',
        }; // 404 Not Found
      }
      return { data: data, status: 200, message: 'blog found successfully' }; // 200 OK
    } catch (error) {
      return { data: error.message, status: 500, message: 'blog not found' };
    }
  }

  // to update blog by id
  async update(id: string, updateBlogDto: UpdateBlogDto) {
    try {
      const data = await this.blogModel.findByIdAndUpdate(id, updateBlogDto, {
        new: true, //We pass the { new: true } option to ensure that the method returns the updated document.
      });

      if (!data) {
        return { data: '', status: 404, message: 'blog not found' }; // 404 Not Found
      }
      return { data: data, status: 200, message: 'blog updated successfully' }; // 200 OK
    } catch (error) {
      return { data: error.message, status: 500, message: 'blog not updated' };
    }
  }

  // to delete a blog
  async remove(id: string) {
    try {
      const data = await this.blogModel.findByIdAndDelete(id);
      if (data) {
        return {
          data: data,
          status: 200,
          message: 'user deleted successfully',
        }; // 200 OK
      }
      return { data: data, status: 404, message: 'blog not found' }; // 404 Not Found
    } catch (error) {
      return { data: error.message, status: 500, message: 'blog not deleted' };
    }
  }
}
