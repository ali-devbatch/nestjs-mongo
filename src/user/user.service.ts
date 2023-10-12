import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  // to add user
  async create(createUserDto: CreateUserDto) {
    try {
      // Check if the email already exists in the database
      const existingUser = await this.userModel.findOne({
        email: createUserDto.email,
      });

      if (existingUser) {
        return { data: null, status: 400, message: 'Email is already in use' }; // 400 Bad Request
      }

      // If the email doesn't exist, create a new user instance and save it
      const newUser = new this.userModel(createUserDto);
      const data = await newUser.save();

      return { data, status: 201, message: 'User created successfully' }; // 201 Created
    } catch (error) {
      return { data: error.message, status: 500, message: 'User not created' };
    }
  }

  // to get all users
  async findAll() {
    try {
      const data = await this.userModel.find(); // Assuming you want to retrieve all users
      if (!data) {
        return {
          data: data,
          status: 404,
          message: 'there is no registered user',
        }; // 404 Not Found
      }
      return { data: data, status: 200, message: 'users found successfully' }; // 200 OK
    } catch (error) {
      return { data: error.message, status: 500, message: 'users not found' };
    }
  }

  // to get user by id
  async findOne(id: string) {
    try {
      const data = await this.userModel.findById(id);
      if (!data) {
        return {
          data: data,
          status: 404,
          message: 'there is no registered user',
        }; // 404 Not Found
      }
      return { data: data, status: 200, message: 'users found successfully' }; // 200 OK
    } catch (error) {
      return { data: error.message, status: 500, message: 'user not found' };
    }
  }

  // to update user by id
  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const data = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true, //We pass the { new: true } option to ensure that the method returns the updated document.
      });

      if (!data) {
        return { data: '', status: 404, message: 'user not found' }; // 404 Not Found
      }
      return { data: data, status: 200, message: 'user updated successfully' }; // 200 OK
    } catch (error) {
      return { data: error.message, status: 500, message: 'user not updated' };
    }
  }

  // to delete a user
  async remove(id: string) {
    try {
      const data = await this.userModel.findByIdAndDelete(id);
      if (data) {
        return {
          data: data,
          status: 200,
          message: 'user deleted successfully',
        }; // 200 OK
      }
      return { data: data, status: 404, message: 'user not found' }; // 404 Not Found
    } catch (error) {
      return { data: error.message, status: 500, message: 'user not deleted' };
    }
  }
}
