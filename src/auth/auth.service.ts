import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signUp.dto';
import { User } from './entities/user.entity';
import * as crypto from 'crypto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private emailService: EmailService, // Inject the EmailService
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
      resetToken: '',
      expireToken: '',
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
  async login(loginDto: LoginDto) {
    try {
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
    } catch (error) {
      throw new UnauthorizedException(
        'An error occurred while attempting to log in.',
      );
    }
  }

  // Request password reset
  async requestPasswordReset(email: string) {
    try {
      // Find the user by email
      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new UnauthorizedException('No user with this email exists.');
      }

      // Generate a unique reset token using crypto
      const resetToken = this.generateUniqueResetToken();

      // Set the resetToken and expiration time
      user.resetToken = resetToken;
      user.expireToken = new Date(Date.now() + 3600000); // Token expires in 1 hour

      await user.save();

      // subject and html tags to send in email to user
      const subject = 'Password Reset Request';
      const htmlContent = `<p>Your Verification Link For [AppName] is <br/><span style="color:green"><b/>
      <a href="https://github.com/">Click here to reset password</a>
      </b></span></p>this Link will be <span style="color:red"><b>expire after 1 hour</b></span>`;

      // Send an email to the user
      await this.emailService.sendEmail(user.email, subject, htmlContent);

      // Return the reset token
      return {
        data: resetToken,
        status: 200,
        message: 'Check your Email Address',
      };
    } catch (error) {
      // Handle any unexpected errors
      throw new InternalServerErrorException('Password reset request failed');
    }
  }

  // Reset the user's password
  async resetPassword(resetToken: string, newPassword: string) {
    try {
      // Verify the reset token and check its expiration
      const user = await this.userModel.findOne({
        resetToken,
        expireToken: { $gt: new Date() },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid or expired reset token');
      }

      // Update the user's password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.expireToken = undefined;

      await user.save();

      // subject and html tags to send in email to user
      const subject = 'Password Reset Successful';
      const htmlContent = `<p>Your  <span style="color:red"> password </span>has been changed against this email : <span style="color:red">${user.email} </span></p>`;

      // Send an email to the user
      await this.emailService.sendEmail(user.email, subject, htmlContent);

      // Return a success message
      return {
        status: 200,
        message: 'Password reset successful',
      };
    } catch (error) {
      // Handle any unexpected errors
      throw new InternalServerErrorException('Password reset failed');
    }
  }

  // Generate a unique password reset token with crypto
  private generateUniqueResetToken() {
    const tokenLength = 20; // Adjust the desired token length
    const resetToken = crypto.randomBytes(tokenLength).toString('hex');
    return resetToken;
  }
}
