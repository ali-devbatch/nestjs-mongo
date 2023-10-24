import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // to register a new uer
  @Post('register')
  async registerUser(@Body() signUpDto: SignUpDto) {
    const response = await this.authService.registerUser(signUpDto);
    return response;
  }

  // login user
  @Get('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  //  Request password reset
  @Post('password-reset')
  async requestPasswordReset(@Body() body) {
    const email = body.email;
    return await this.authService.requestPasswordReset(email);
  }

  // Step 2: Reset password with token
  @Post('password-reset/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    const result = await this.authService.resetPassword(token, newPassword);
    return result;
  }
}
