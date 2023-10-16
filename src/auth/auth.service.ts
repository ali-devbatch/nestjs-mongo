import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // register user
  async registerUser(signUpDto: SignUpDto) {
    const { name, email, password } = signUpDto;

    if (!email || !password) {
      throw new ConflictException('Please fill email and password fields');
    }

    // Check if a user with the same email already exists
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      email,
      name,
      password: hashedPassword,
    });

    try {
      const savedData = await user.save();
      this.jwtService.sign({ id: savedData._id });

      // Omit the 'password' field from the savedData object
      savedData.password = undefined;

      const response = {
        data: savedData,
        status: 200,
        message: 'Sign up successful',
      };

      return response;
    } catch (error) {
      // Handle any error (e.g., database error)
      throw new ConflictException('User registration failed');
    }
  }

  // Other methods (e.g., login) can remain in the AuthService

  // login
  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    const response = {
      token: token,
      status: 200,
      message: 'Login Successful',
    };

    return response;
  }
}
